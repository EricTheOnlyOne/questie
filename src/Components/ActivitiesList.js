import React from 'react';
import Activity from './Activity';

function ActivtiesList(props) {
  const {activities, onReassign} = props;
  return (
    <div>
        {activities.map((act, index) => (
          <Activity index={index} onReassign={onReassign} act={act}/>
        ))}
    </div>
  );
}

export default ActivtiesList;