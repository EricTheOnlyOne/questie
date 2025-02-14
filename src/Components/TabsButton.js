import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from 'react-tooltip';

function TabsButton(props) {
  const { text, icon, onClick, className, toolTip, pos} = props;
  const cssClass = `Tabs-button ${className}`;
  const toolTipId = toolTip+pos;

  return (
    <div>
      <Tooltip id={toolTipId} />
      <button className={cssClass} onClick={onClick} data-tooltip-id={toolTipId} data-tooltip-content={toolTip}>
        {icon && <FontAwesomeIcon  icon={icon} className="Tabs-button-icon" />}
        {text && <span className="Tabs-button-text">{text}</span>}
      </button>
    </div>
  );
}

export default TabsButton;