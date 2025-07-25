import { firebase } from '../firebase';
import React from 'react';

export const Checkbox = ({ id, taskDesc }) => {
    const archiveTask = () => {
        console.log(firebase.firestore());
        firebase.firestore().collection('tasks').doc(id).update({
            archived: true,
        });
    };

    return (
        <div 
            className="checkbox-holder" 
            data-testid="checkbox-action" 
            onClick={() => archiveTask()}
            onKeyDown={() => archiveTask()}
            role="button"
            tabIndex={0}
            aria-label={`Archive task: ${taskDesc}`}
        >
            <span className="checkbox" />
        </div>
    )
};
