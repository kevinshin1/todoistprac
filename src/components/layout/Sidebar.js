import React, { useState } from 'react';
import { FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar } from "react-icons/fa";
import { useSelectedProjectValue } from '../../context/selected-project-context';
import { Projects } from '../Projects';
import { AddProject } from '../AddProject';

export const Sidebar = () => {
    const { setSelectedProject } = useSelectedProjectValue();
    const [ active, setActive ] = useState('inbox');
    const [ showProjects, setShowProjects ] = useState(true);

    return (
        <div className="sidebar" data-test-id="sidebar">
            <ul className="sidebar__generic">
                <li 
                    data-testid="inbox" 
                    className={active === 'inbox' ? 'active' : undefined}
                >
                    <div
                        onClick={() => {
                            setActive('inbox');
                            setSelectedProject('INBOX');
                        }}
                        onKeyDown={() => {
                            setActive('inbox');
                            setSelectedProject('INBOX');
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label="Show inbox tasks"
                    >
                        <span>
                            <FaInbox />
                        </span>
                        <span>Inbox</span>
                    </div>
                </li>
                <li 
                    data-testid="today" 
                    className={active === 'today' ? 'active' : undefined}
                >
                    <div
                        onClick={() => {
                            setActive('today');
                            setSelectedProject('TODAY');
                        }}
                        onKeyDown={() => {
                            setActive('today');
                            setSelectedProject('TODAY');
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label="Show today's tasks"
                    >
                        <span>
                            <FaRegCalendar />
                        </span>
                        <span>Today</span>
                    </div>
                </li>
                <li 
                    data-testid="next_7" 
                    className={active === 'next_7' ? 'active' : undefined}
                >
                    <div
                        onClick={() => {
                            setActive('next_7');
                            setSelectedProject('NEXT_7');
                        }}
                        onKeyDown={() => {
                            setActive('next_7');
                            setSelectedProject('NEXT_7');
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label="Show tasks for the next 7 days"
                    >
                        <span>
                            <FaRegCalendarAlt />
                        </span>
                        <span>Next 7 days</span>
                    </div>
                </li>
            </ul>

            <div className="sidebar__middle"
                onClick={() => setShowProjects(!showProjects)}
                onKeyDown={() => setShowProjects(!showProjects)}
                tabIndex={0}
                role="button"
                aria-label="Show/Hide projects"
            >
                <span>
                    <FaChevronDown className={!showProjects ? 'hidden-projects' : undefined}/>
                </span>
                <h2>Projects</h2>
            </div>

            <ul className="sidebar__projects">{showProjects && <Projects />}</ul>

            {showProjects && <AddProject />}
        </div>
    );
}
