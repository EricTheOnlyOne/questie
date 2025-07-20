import React, { useState, useEffect } from "react";

export default function Quests() {
  const [quests, setQuests] = useState([]);
  const [completedQuests, setCompletedQuests] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [newQuest, setNewQuest] = useState("");

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
    
    if (value.trim() === "") {
      // Remove subtask if text is empty
      updatedQuests[questIndex].subtasks.splice(subtaskIndex, 1);
    } else {
      updatedQuests[questIndex].subtasks[subtaskIndex].text = value;
    }
    
    setQuests(updatedQuests);
  };

  const toggleQuestComplete = (index) => {
    const updatedQuests = [...quests];
    updatedQuests[index].completed = !updatedQuests[index].completed;
    setQuests(updatedQuests);
    checkQuestCompletion(index);
  };

  const toggleSubtaskComplete = (questIndex, subtaskIndex) => {
    const updatedQuests = [...quests];
    updatedQuests[questIndex].subtasks[subtaskIndex].completed = 
      !updatedQuests[questIndex].subtasks[subtaskIndex].completed;
    setQuests(updatedQuests);
    checkQuestCompletion(questIndex);
  };

  const checkQuestCompletion = (questIndex) => {
    const quest = quests[questIndex];
    const allSubtasksComplete = quest.subtasks.length === 0 || 
      quest.subtasks.every(subtask => subtask.completed);
    
    if (quest.completed && allSubtasksComplete) {
      // Move to completed quests
      setTimeout(() => {
        const questToComplete = { ...quest, completedAt: new Date().toISOString() };
        setCompletedQuests(prev => [...prev, questToComplete]);
        setQuests(prev => prev.filter((_, i) => i !== questIndex));
      }, 500); // Small delay for visual feedback
    }
  };

  const restoreQuest = (completedIndex) => {
    const questToRestore = { ...completedQuests[completedIndex] };
    delete questToRestore.completedAt;
    questToRestore.completed = false;
    questToRestore.subtasks = questToRestore.subtasks.map(st => ({ ...st, completed: false }));
    
    setQuests(prev => [...prev, questToRestore]);
    setCompletedQuests(prev => prev.filter((_, i) => i !== completedIndex));
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

  return (
    <div className="col-container">
      <div className="header">Quest Log</div>
      <div className="quest-container">
        
        {/* Active Quests */}
        <div className="quest-section">
          <div className="quest-list">
            {quests.map((quest, i) => (
              <div key={quest.id} className={`quest-item ${quest.completed ? 'quest-completed' : ''}`}>
                <div className="quest-header">
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
                    onKeyDown={(e) => handleKeyDown(e, i)}
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
                      onKeyDown={(e) => handleKeyDown(e, i, j)}
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
              onKeyDown={(e) => e.key === "Enter" && handleAddQuest()}
            />
            <button onClick={handleAddQuest} className="add-quest-btn">
              Accept Quest
            </button>
          </div>
        </div>

        {/* Completed Quests Toggle */}
        <div className="completed-section">
          <button 
            className="toggle-completed-btn"
            onClick={() => setShowCompleted(!showCompleted)}
          >
            {showCompleted ? 'Hide' : 'Show'} Completed Quests ({completedQuests.length})
          </button>
          
          {showCompleted && (
            <div className="completed-quest-list">
              {completedQuests.map((quest, i) => (
                <div key={quest.id} className="completed-quest-item">
                  <div className="completed-quest-text">{quest.text}</div>
                  {quest.subtasks.map((subtask, j) => (
                    <div key={subtask.id} className="completed-subtask-text">
                      • {subtask.text}
                    </div>
                  ))}
                  <button 
                    className="restore-quest-btn"
                    onClick={() => restoreQuest(i)}
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