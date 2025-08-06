import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { AddTask } from '../components/AddTask';
import { useSelectedProjectValue } from '../context';
import { firebase } from '../firebase';
import { it } from '@jest/globals';

beforeEach(cleanup); // Clean up the DOM after each test

jest.mock('../context', () => ({
    useSelectedProjectValue: () => ({ selectedProject: '1' }),
    useProjectsValue: () => ({ projects: [] })
}));



jest.mock("../firebase", () => ({
    firebase: {
        firestore: () => ({
            collection: jest.fn(() => ({
                add: jest.fn(() => Promise.resolve('Never mock firebase')),
            })),
        }),
    },
}));

describe('<AddTask />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Success', () => {
        it('renders the AddTask component', () => {
            const { queryByTestId } = render(<AddTask />);
            expect(queryByTestId('add-task-comp')).toBeTruthy();
        });

        it('renders the AddTask quick overlay', () => {
            const setShowQuickAddTask = jest.fn();
            const { queryByTestId } = render(<AddTask 
                showAddTaskMain
                shouldShowMain={false}
                showQuickAddTask
                setShowQuickAddTask={setShowQuickAddTask}
            />);
            expect(queryByTestId('quick-add-task')).toBeTruthy();
        });

        it('renders the AddTask main showable when using onClick', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);

            fireEvent.click(queryByTestId('show-main-action'));
            expect(queryByTestId('show-main-action')).toBeTruthy();
        });

        it('renders the AddTask main showable when using keyDown', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);

            fireEvent.keyDown(queryByTestId('show-main-action'));
            expect(queryByTestId('show-main-action')).toBeTruthy();
        });

        it('renders the AddTask project overlay when clicked using onClick', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);

            fireEvent.click(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-main')).toBeTruthy();

            fireEvent.click(queryByTestId('show-project-overlay'));
            expect(queryByTestId('project-overlay')).toBeTruthy();
        });

        it('renders the AddTask project overlay when clicked using keyDown', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);

            fireEvent.keyDown(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-main')).toBeTruthy();

            fireEvent.keyDown(queryByTestId('show-project-overlay'));
            expect(queryByTestId('project-overlay')).toBeTruthy();
        });

        it('renders the AddTask task date overlay when clicked using onClick', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);

            fireEvent.click(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-main')).toBeTruthy();

            fireEvent.click(queryByTestId('show-task-date-overlay'));
            expect(queryByTestId('task-date-overlay')).toBeTruthy();
        });

        it('renders the AddTask task date overlay when clicked using keyDown', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);

            fireEvent.keyDown(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-main')).toBeTruthy();

            fireEvent.keyDown(queryByTestId('show-task-date-overlay'));
            expect(queryByTestId('task-date-overlay')).toBeTruthy();
        });

        it('hides the AddTask main when cancel is clicked using onClick', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);

            fireEvent.click(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-main')).toBeTruthy();

            fireEvent.click(queryByTestId('add-task-main-cancel'));
            expect(queryByTestId('add-task-main')).toBeFalsy();
        });

        it('hides the AddTask main when cancel is clicked using keyDown', () => {
            const { queryByTestId } = render(<AddTask showAddTaskMain />);

            fireEvent.keyDown(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-main')).toBeTruthy();

            fireEvent.keyDown(queryByTestId('add-task-main-cancel'));
            expect(queryByTestId('add-task-main')).toBeFalsy();
        });

        it('renders AddTask for quick add task and then clicks cancel using onClick', () => {
            const showQuickAddTask = true;
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

            const { queryByTestId } = render(
                <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
            );

            fireEvent.click(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-main')).toBeTruthy();

            fireEvent.click(queryByTestId('add-task-quick-cancel'));
            expect(setShowQuickAddTask).toHaveBeenCalled();
        });

        it('renders AddTask for quick add task and then clicks cancel using keyDown', () => {
            const showQuickAddTask = true;
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);

            const { queryByTestId } = render(
                <AddTask setShowQuickAddTask={setShowQuickAddTask} showQuickAddTask />
            );

            fireEvent.keyDown(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-main')).toBeTruthy();

            fireEvent.keyDown(queryByTestId('add-task-quick-cancel'));
            expect(setShowQuickAddTask).toHaveBeenCalled();
        });
        /*
        it('renders AddTask and adds a task to TODAY', () => {
            useSelectedProjectValue.mockReturnValue({
                selectedProject: 'TODAY'
            })

            const showQuickAddTask = true;
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
            const { queryByTestId } = render(
                <AddTask showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
            );
            fireEvent.click(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-content')).toBeTruthy();

            fireEvent.change(queryByTestId('add-task-content'), {
                target: {value: 'I am a new task!'}
            });
            expect(queryByTestId('add-task-content').value).toBe('I am a new task!');

            fireEvent.click(queryByTestId('add-task'));
            expect(setShowQuickAddTask).toHaveBeenCalled();
        });

        it('renders AddTask and adds a task to NEXT_7', () => {
            useSelectedProjectValue.mockReturnValue({
                selectedProject: 'NEXT_7'
            })

            const showQuickAddTask = true;
            const setShowQuickAddTask = jest.fn(() => !showQuickAddTask);
            const { queryByTestId } = render(
                <AddTask showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
            );
            fireEvent.click(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-content')).toBeTruthy();

            fireEvent.change(queryByTestId('add-task-content'), {
                target: {value: 'I am a new task!'}
            });
            expect(queryByTestId('add-task-content').value).toBe('I am a new task!');

            fireEvent.click(queryByTestId('add-task'));
            expect(setShowQuickAddTask).toHaveBeenCalled();
        });

        it('renders AddTask and adds a task with a task date', () => {
            useSelectedProjectValue.mockReturnValue({
                selectedProject: '1'
            });

            const { queryByTestId } = render(<AddTask showMain />)
            fireEvent.click(queryByTestId('show-main-action'));
            expect(queryByTestId('add-task-content')).toBeTruthy();
            expect(queryByTestId('add-task-main')).toBeTruthy();

            fireEvent.change(queryByTestId('add-task-content'), {
                target: {value: 'I am another new task'}
            });
            expect(queryByTestId('add-task-content').value).toBe('I am another new task');
            
            fireEvent.click(queryByTestId('show-task-date-overlay'));
            expect(queryByTestId('task-date-overlay')).toBeTruthy();

            fireEvent.click(queryByTestId('task-date-tomorrow'));
            expect(queryByTestId('task-date-overlay')).toBeFalsy();

            fireEvent.click(queryByTestId('add-task'));
        });*/
    });
});
