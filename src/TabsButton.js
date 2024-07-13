import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TabsButton(props) {
  const { text, icon, onClick, className } = props;
  const cssClass = `Tabs-button ${className}`;

  return (
    <button className={cssClass} onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} className="Tabs-button-icon" />}
      {text && <span className="Tabs-button-text">{text}</span>}
    </button>
  );
}

export default TabsButton;