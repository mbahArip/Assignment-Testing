import React from 'react';
import axios from 'axios';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from './Search';

jest.mock('axios');

describe('Test search component', () => {
	test('fetch API kemudian tampilkan', async () => {
		const stories = [
			{ objectID: '1', title: 'title 1' },
			{ objectID: '2', title: 'title 2' },
		];

		axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits: stories } }));

		render(<Search />);

		// eslint-disable-next-line testing-library/no-unnecessary-act
		await act(async () => {
			await userEvent.click(screen.getByRole('button'));
		});

		const items = await screen.findAllByRole('listitem');
		expect(items).toHaveLength(2);
	});

	test('catch error saat fetching API', async () => {
		axios.get.mockImplementationOnce(() => Promise.reject(new Error('error')));

		render(<Search />);

		// eslint-disable-next-line testing-library/no-unnecessary-act
		await act(async () => {
			await userEvent.click(screen.getByRole('button'));
		});

		const items = await screen.findByText('Ada yang error ...');
		expect(items).toBeInTheDocument();
	});
});
