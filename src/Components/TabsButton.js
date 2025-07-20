import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function TabsButton(props) {
  const { text, icon, onClick, className, toolTip, pos, outerClass, onMouseEnter} = props;
  const cssClass = `Tabs-button ${className}`;
  const toolTipId = toolTip+pos;

  return (
    <div className={outerClass}>
      <button 
        className={cssClass} 
        onClick={onClick} 
        onMouseEnter={onMouseEnter}
        data-tooltip-id={toolTipId} 
        data-tooltip-content={toolTip}
      >
        {icon && <FontAwesomeIcon  icon={icon} className="Tabs-button-icon" />}
        {text && <span className="Tabs-button-text">{text}</span>}
      </button>
    </div>
  );
}

export default TabsButton;