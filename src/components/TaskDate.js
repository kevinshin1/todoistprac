import React from 'react';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';
import moment from 'moment';

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) => showTaskDate && (
    <div className="task-date" data-testid="task-date-overlay">
        <ul className="task-date__list">
            <li
                onClick={() => {
                    setShowTaskDate(false);
                    setTaskDate(moment().format('MM/DD/YYYY'));
                }}
                data-testid="task-date-overlay"
            >
                <span>
                    <FaSpaceShuttle />
                </span>
                <span>Today</span>
            </li>
            <li
                onClick={() => {
                    setShowTaskDate(false);
                    setTaskDate(
                        moment()
                            .add(1, 'day')
                            .format('MM/DD/YYYY'));
                }}
                data-testid="task-date-tomorrow"
            >
                <span>
                    <FaSun />
                </span>
                <span>Tomorrow</span>
            </li>
            <li
                onClick={() => {
                    setShowTaskDate(false);
                    setTaskDate(
                        moment()
                            .add(7, 'day')
                            .format('MM/DD/YYYY'));
                }}
                data-testid="task-date-next-week"
            >
                <span>
                    <FaRegPaperPlane />
                </span>
                <span>Next Week</span>
            </li>
        </ul>
    </div>
);
