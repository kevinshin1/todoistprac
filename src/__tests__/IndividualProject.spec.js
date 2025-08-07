import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { IndividualProject } from '../components/IndividualProject';
import { useProjectsValue } from '../context';

beforeEach(cleanup);

jest.mock("../firebase", () => ({
    firebase: {
        firestore: () => ({
            collection: jest.fn(() => ({
                doc: jest.fn(() => ({
                    delete: jest.fn(() => Promise.resolve('Never mock firebase')),
                    update: jest.fn(),
                })),
            })),
        }),
    },
}));

jest.mock('../context', () => ({
    useSelectedProjectValue: () => ({
        setSelectedProject: jest.fn(() => 'inbox')
    }),
    useProjectsValue: () => ({ 
        setProjects: jest.fn(),
        projects: [
            {
                name: 'DAILY',
                projectId: '1',
                userId: 'kjs1',
                docId: '1'
            }
    ] }),
}));

describe('<IndividualProject />', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const project = {
        name: 'DAILY',
        projectId: '1',
        userId: 'kjs1',
        docId: '1'
    };

    describe('Success', () => {
        it('renders the projects', () => {
            const { getByText } = render(<IndividualProject project={project} />);
            expect(getByText('DAILY')).toBeTruthy();
        });
/*
        it('renders the delete overlay and then deletes a project using onClick', () => {
            const { queryByTestId, getByText } = render(<IndividualProject project={project} />);

            fireEvent.click(queryByTestId('delete-project'));
            expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();

            fireEvent.click(getByText('Delete'));
        });

        it('renders the delete overlay and then deletes a project using onKeyDown', () => {
            const { queryByTestId, getByText } = render(<IndividualProject project={project} />);

            fireEvent.keyDown(queryByTestId('delete-project'));
            expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();

            fireEvent.keyDown(getByText('Delete'));
        });
*/
        it('renders the delete overlay and then cancels using onClick', () => {
            const { queryByTestId, getByText } = render(<IndividualProject project={project} />);

            fireEvent.click(queryByTestId('delete-project'));
            expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();

            fireEvent.click(getByText('Cancel'));
        });

        it('renders the delete overlay and then cancels using onKeyDown', () => {
            const { queryByTestId, getByText } = render(<IndividualProject project={project} />);

            fireEvent.keyDown(queryByTestId('delete-project'));
            expect(getByText('Are you sure you want to delete this project?')).toBeTruthy();

            fireEvent.keyDown(getByText('Cancel'));
        });
    });
})
