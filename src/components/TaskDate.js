import React from 'react';
import { FaSpaceShuttle, FaSun, FaRegPaperPlane } from 'react-icons/fa';
import moment from 'moment';

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) => showTaskDate && (
    <div className="task-date" data-testid="task-date-overlay">
        <ul className="task-date__list">
            <li data-testid="task-date-overlay">
                <div
                    onClick={() => {
                        setShowTaskDate(false);
                        setTaskDate(moment().format('MM/DD/YYYY'));
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                        setShowTaskDate(false);
                        setTaskDate(moment().format('MM/DD/YYYY'));
                        }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Select today as the task date"
                >
                    <span>
                        <FaSpaceShuttle />
                    </span>
                    <span>Today</span>
                </div>
            </li>
            <li>
                <div
                    onClick={() => {
                    setShowTaskDate(false);
                    setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
                    }}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setShowTaskDate(false);
                        setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
                    }
                    }}
                    data-testid="task-date-tomorrow"
                    role="button"
                    tabIndex={0}
                    aria-label="Select tomorrow as the task date"
                >
                    <span>
                    <FaSun />
                    </span>
                    <span>Tomorrow</span>
                </div>
            </li>
            <li>
                <div
                    onClick={() => {
                    setShowTaskDate(false);
                    setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
                    }}
                    onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setShowTaskDate(false);
                        setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
                    }
                    }}
                    data-testid="task-date-next-week"
                    aria-label="Select next week as the task date"
                    tabIndex={0}
                    role="button"
                >
                    <span>
                    <FaRegPaperPlane />
                    </span>
                    <span>Next week</span>
                </div>
            </li>
        </ul>
    </div>
);
