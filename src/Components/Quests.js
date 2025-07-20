import React, { useState, useEffect } from "react";
import soundEffects from "../utils/soundEffects";

export default function Quests() {
  const [quests, setQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [newQuest, setNewQuest] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedQuests = localStorage.getItem('wow-quests');
    const savedCompleted = localStorage.getItem('wow-completed-quests');

    if (savedQuests) {
      setQuests(JSON.parse(savedQuests));
    }
    if (savedCompleted) {
      setCompletedQuests(JSON.parse(savedCompleted));
    }
  }, []);

  // Save to localStorage whenever quests change
  useEffect(() => {
    localStorage.setItem('wow-quests', JSON.stringify(quests));
  }, [quests]);

  useEffect(() => {
    localStorage.setItem('wow-completed-quests', JSON.stringify(completedQuests));
  }, [completedQuests]);

  const handleAddQuest = () => {
    if (newQuest.trim() === "") return;
    soundEffects.playButtonClick();
    const newQuestObj = {
      id: Date.now(),
      text: newQuest,
      completed: false,
      subtasks: []
    };
    setQuests([...quests, newQuestObj]);
    setNewQuest("");
  };

  const handleQuestChange = (index, value) => {
    if (value.trim() === "") {
      // Remove quest if text is empty
      const updatedQuests = quests.filter((_, i) => i !== index);
      setQuests(updatedQuests);
      return;
    }

    const updatedQuests = [...quests];
    updatedQuests[index].text = value;
    setQuests(updatedQuests);
  };

  const handleSubtaskChange = (questIndex, subtaskIndex, value) => {
    const updatedQuests = [...quests];
    updatedQuests[questIndex].subtasks[subtaskIndex].text = value;
    setQuests(updatedQuests);
  };

  const handleSubtaskKeyDown = (e, questIndex, subtaskIndex) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const updatedQuests = [...quests];
      const newSubtask = {
        id: Date.now(),
        text: "",
        completed: false
      };
      updatedQuests[questIndex].subtasks.push(newSubtask);
      setQuests(updatedQuests);
    } else if (e.key === "Backspace") {
      const subtask = quests[questIndex].subtasks[subtaskIndex];
      if (subtask.text.trim() === "") {
        e.preventDefault();
        const updatedQuests = [...quests];
        updatedQuests[questIndex].subtasks.splice(subtaskIndex, 1);
        setQuests(updatedQuests);
      }
    }
  };

  const toggleQuestComplete = (index) => {
    const updatedQuests = [...quests];
    const wasCompleted = updatedQuests[index].completed;
    updatedQuests[index].completed = !updatedQuests[index].completed;
    
    // Play appropriate sound
    if (updatedQuests[index].completed) {
      soundEffects.playCheckboxCheck();
    } else {
      soundEffects.playCheckboxUncheck();
    }
    
    setQuests(updatedQuests);
    checkQuestCompletion(index);
  };

  const toggleSubtaskComplete = (questIndex, subtaskIndex) => {
    const updatedQuests = [...quests];
    const wasCompleted = updatedQuests[questIndex].subtasks[subtaskIndex].completed;
    updatedQuests[questIndex].subtasks[subtaskIndex].completed = !wasCompleted;
    
    // Play appropriate sound
    if (updatedQuests[questIndex].subtasks[subtaskIndex].completed) {
      soundEffects.playCheckboxCheck();
    } else {
      soundEffects.playCheckboxUncheck();
    }
    
    setQuests(updatedQuests);
    checkQuestCompletion(questIndex);
  };

  const checkQuestCompletion = (questIndex) => {
    const quest = quests[questIndex];
    const allSubtasksComplete = quest.subtasks.length === 0 ||
      quest.subtasks.every(subtask => subtask.completed);

    if (quest.completed && allSubtasksComplete) {
      // Play quest completion sound
      soundEffects.playQuestComplete();
      
      // Move to completed quests
      setTimeout(() => {
        const questToComplete = { ...quest, completedAt: new Date().toISOString() };
        setCompletedQuests(prev => [...prev, questToComplete]);
        setQuests(prev => prev.filter((_, i) => i !== questIndex));
      }, 500); // Small delay for visual feedback
    }
  };

  const restoreQuest = (completedIndex) => {
    soundEffects.playButtonClick();
    const questToRestore = { ...completedQuests[completedIndex] };
    delete questToRestore.completedAt;
    questToRestore.completed = false;
    // Keep subtask completion states when restoring

    setQuests(prev => [...prev, questToRestore]);
    setCompletedQuests(prev => prev.filter((_, i) => i !== completedIndex));
  };

  // Handle typing sounds for text inputs
  const handleTextInput = (e) => {
    if (e.key && e.key.length === 1) { // Only for actual character input
      soundEffects.playTypingSound();
    }
  };

  // Handle button hover sounds
  const handleButtonHover = () => {
    soundEffects.playButtonHover();
  };

  // Handle show/hide completed quests
  const handleToggleCompleted = () => {
    soundEffects.playButtonClick();
    setShowCompleted(!showCompleted);
  };

  const handleKeyDown = (e, questIndex, subtaskIndex = null) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const updatedQuests = [...quests];
      const newSubtask = {
        id: Date.now(),
        text: "",
        completed: false
      };
      updatedQuests[questIndex].subtasks.push(newSubtask);
      setQuests(updatedQuests);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updatedQuests = [...quests];

    // Simple approach: swap the items directly
    const temp = updatedQuests[draggedIndex];
    updatedQuests[draggedIndex] = updatedQuests[dropIndex];
    updatedQuests[dropIndex] = temp;

    setQuests(updatedQuests);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="col-container">
      <div className="header">Quest Log</div>
      <div className="quest-container">

        {/* Active Quests */}
        <div className="quest-section">
          <div className="quest-list">
            {quests.map((quest, i) => (
              <div
                key={quest.id}
                className={`quest-item ${quest.completed ? 'quest-completed' : ''} ${draggedIndex === i ? 'quest-dragging' : ''
                  } ${dragOverIndex === i ? 'quest-drag-over' : ''}`}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, i)}
                onDragOver={(e) => handleDragOver(e, i)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, i)}
                onDragEnd={handleDragEnd}
              >
                <div className="quest-header">
                  <div className="drag-handle">⋮⋮</div>
                  <input
                    type="checkbox"
                    className="quest-checkbox"
                    checked={quest.completed}
                    onChange={() => toggleQuestComplete(i)}
                  />
                  <textarea
                    className="quest-text"
                    value={quest.text}
                    onChange={(e) => handleQuestChange(i, e.target.value)}
                    onKeyDown={(e) => {
                      handleTextInput(e);
                      handleKeyDown(e, i);
                    }}
                    placeholder="Enter your quest... (Tab to add subtask)"
                    rows="1"
                  />
                </div>

                {/* Subtasks */}
                {quest.subtasks.map((subtask, j) => (
                  <div key={subtask.id} className="subtask-item">
                    <input
                      type="checkbox"
                      className="subtask-checkbox"
                      checked={subtask.completed}
                      onChange={() => toggleSubtaskComplete(i, j)}
                    />
                    <textarea
                      className="subtask-text"
                      value={subtask.text}
                      onChange={(e) => handleSubtaskChange(i, j, e.target.value)}
                      onKeyDown={(e) => {
                        handleTextInput(e);
                        handleSubtaskKeyDown(e, i, j);
                      }}
                      placeholder="Subtask... (Tab to add another)"
                      rows="1"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Add New Quest */}
          <div className="add-quest-section">
            <input
              type="text"
              className="new-quest-input"
              placeholder="Accept new quest..."
              value={newQuest}
              onChange={(e) => setNewQuest(e.target.value)}
              onKeyDown={(e) => {
                handleTextInput(e);
                if (e.key === "Enter") handleAddQuest();
              }}
            />
            <button 
              onClick={handleAddQuest} 
              className="add-quest-btn"
              onMouseEnter={handleButtonHover}
            >
              Accept Quest
            </button>
          </div>
        </div>

        {/* Completed Quests Toggle */}
        <div className="completed-section">
          <button
            className="pomodoro-tab"
            onClick={handleToggleCompleted}
            onMouseEnter={handleButtonHover}
          >
            {showCompleted ? 'Hide' : 'Show'} Completed Quests ({completedQuests.length})
          </button>

          {showCompleted && (
            <div className="completed-quest-list">
              {completedQuests.map((quest, i) => (
                <div key={quest.id} className="completed-quest-item">
                  <div className="completed-quest-text">{quest.text}</div>
                  <div className="completed-quest-info">
                    {quest.subtasks.length > 0 && (
                      <div className="subtask-count">
                        {quest.subtasks.filter(st => st.completed).length}/{quest.subtasks.length} subtasks completed
                      </div>
                    )}
                  </div>
                  <button
                    className="restore-quest-btn"
                    onClick={() => restoreQuest(i)}
                    onMouseEnter={handleButtonHover}
                  >
                    Restore Quest
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}