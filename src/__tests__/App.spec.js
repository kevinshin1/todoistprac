import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { App } from '../App';

beforeEach(cleanup); // Clean up the DOM after each test

describe('<App />', () => {
    it('renders the application', () => {
        const { queryByTestId } = render(<App />);
        expect(queryByTestId('application')).toBeTruthy();
        expect(queryByTestId('application').classList.contains('darkmode')).toBeFalsy();
    });

    it('renders the application using dark mode', () => {
        const { queryByTestId, debug } = render(<App darkModeDefault />);
        expect(queryByTestId('application')).toBeTruthy();
        expect(queryByTestId('application').classList.contains('darkmode')).toBeTruthy();
    });
});
