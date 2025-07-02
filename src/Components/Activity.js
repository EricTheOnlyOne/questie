import React from 'react';
import TabsButton from './TabsButton';
import {faCircleArrowLeft, faTrashCan} from '@fortawesome/free-solid-svg-icons';

function Activity(props) {
    const {index, onReassign, onDelete, act} = props;
    return (
        <div key={index} className={`Activity-item ${act.isEditing ? 'editing' : ''}`}>
        <p><strong>Reference:</strong> {act.reference}</p>
        <p><strong>Activity:</strong> {act.activity}</p>
        <p><strong>Time:</strong> {act.time}</p>
        <p><strong>Created Date:</strong> {act.createdDate}</p>
        <div class='activity-button-container'>
        <TabsButton 
            icon={faCircleArrowLeft} 
            onClick={() => onReassign(index)}
            className='height-fit-content mini-font'
            toolTip='Track more time'
            pos={index}
        /> 
        <TabsButton 
            icon={faTrashCan} 
            onClick={() => onDelete(index)}
            className='height-fit-content mini-font'
            toolTip='Delete'
            pos={index}
        /> 
        </div>
    </div>
    );
}

export default Activity;