import React from 'react';
import TabsButton from './TabsButton';
import {faCircleArrowLeft} from '@fortawesome/free-solid-svg-icons';

function ActivtiesList(props) {
  const {activities, onReassign} = props;

  return (
    <div>
        {activities.map((act, index) => (
          <div key={index} className={`Activity-item ${act.isEditing ? 'editing' : ''}`}>
            <p><strong>Reference:</strong> {act.reference}</p>
            <p><strong>Activity:</strong> {act.activity}</p>
            <p><strong>Time:</strong> {act.time}</p>
            <p><strong>Created Date:</strong> {act.createdDate}</p>
            <TabsButton 
                text='Reassign' 
                icon={faCircleArrowLeft} 
                onClick={() => onReassign(index)}
                className='height-fit-content small-font' />
          </div>
        ))}
    </div>
  );
}

export default ActivtiesList;