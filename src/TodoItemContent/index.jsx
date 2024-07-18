
import React from 'react';
import './TodoItemContent.css';

function TodoItemContent(props) {
    
    return (
        <div className="TodoItem-c">
            <div className={`TodoItem-div-title`}>
                {props.title} 
            </div>
            <div className={`TodoItem-c-dates`}>
                <div className={`TodoItem-c-dates-start`}>
                    <label className={`TodoItem-c-dates-label`}>
                        Start:
                    </label>
                    <input 
                        className={`TodoItem-c-dates-input`} 
                        type='datetime-local' 
                        defaultValue={props.datetime_start}
                        disabled
                    ></input>
                </div>
                <div className={`TodoItem-c-dates-end`}>
                    <label className={`TodoItem-c-dates-label`}>
                        End:
                    </label>
                    <input 
                        className={`TodoItem-c-dates-input`} 
                        type='datetime-local' 
                        defaultValue={props.datetime_end}
                        disabled
                    ></input>
                </div>
            </div>
            <textarea
                defaultValue={props.description}
                className={`TodoItem-description ${props.completed && "TodoItem-element--complete"}`}
                placeholder='Write the duty description...'
                disabled
            />
        </div>
    );
}

export { TodoItemContent };