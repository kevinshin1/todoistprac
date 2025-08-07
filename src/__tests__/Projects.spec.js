import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Projects } from '../components/Projects';
import { useProjectsValue } from '../context';

beforeEach(cleanup);

jest.mock('../context', () => ({
    useSelectedProjectValue: () => ({
        selectedProject: 'INBOX',

    }),
    useProjectsValue: () => ({ projects: [
        {
            name: 'DAILY',
            projectId: '1',
            userId: 'kjs1',
            docId: '1'
        }
    ] }),
}));

describe('<ProjectOverlay />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Success', () => {
        it('renders the projects', () => {
            const { queryByTestId } = render(<Projects />);
            expect(queryByTestId('project-action')).toBeTruthy();
        });
/*
        it('renders the projects and selects an active project using onClick', () => {
            const { queryByTestId } = render(<Projects activeValue="1" />);
            expect(queryByTestId('project-action')).toBeTruthy();

            fireEvent.click(queryByTestId('project-action'));
            expect(queryByTestId('project-action-parent').classList.contains('active')).toBeTruthy();
        });

        it('renders the projects and selects an active project using onKeyDown', () => {
            const { queryByTestId } = render(<Projects activeValue="1" />);
            expect(queryByTestId('project-action')).toBeTruthy();

            fireEvent.keyDown(queryByTestId('project-action'));
            expect(queryByTestId('project-action-parent').classList.contains('active')).toBeTruthy();
            });*/
        });
});
