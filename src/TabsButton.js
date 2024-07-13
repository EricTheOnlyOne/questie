import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TabsButton(props) {
  const { text, icon, onClick } = props;

  return (
    <button className='Tabs-button' onClick={onClick}>
      {icon && <FontAwesomeIcon icon={icon} className="Tabs-button-icon" />}
      {text && <span className="Tabs-button-text">{text}</span>}
    </button>
  );
}

export default TabsButton;