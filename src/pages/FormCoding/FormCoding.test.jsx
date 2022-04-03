import React from 'react';
import faker from '@faker-js/faker';
import { fireEvent, render, screen } from '@testing-library/react';

import FormCoding from './FormCoding';

describe('FormCoding page', () => {
	test('render page', () => {
		render(<FormCoding />);

		expect(screen.getByText('Pendaftaran Peserta Coding Bootcamp')).toBeInTheDocument();
		expect(screen.getByLabelText(/Nama Lengkap/)).toBeInTheDocument();
		expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
		expect(screen.getByLabelText(/No Handphone/)).toBeInTheDocument();
		expect(screen.getByLabelText(/Latar Belakang/)).toBeInTheDocument();
		expect(screen.getByLabelText(/Kelas Coding/)).toBeInTheDocument();
		expect(screen.getByLabelText(/Surat Kesungguhan/)).toBeInTheDocument();
	});

	test('input data utama', () => {
		render(<FormCoding />);
		const fakerName = faker.name.findName();
		const fakerEmail = faker.internet.email();
		const fakerPhone = faker.phone.phoneNumber('08##########');

		// Input data
		fireEvent.input(screen.getByRole('textbox', { name: /Nama Lengkap/ }), { target: { value: fakerName } });
		fireEvent.input(screen.getByRole('textbox', { name: /Email/ }), { target: { value: fakerEmail } });
		fireEvent.input(screen.getByRole('spinbutton', { name: /No Handphone/ }), { target: { value: fakerPhone } });

		// Check data
		expect(screen.getByLabelText(/Nama Lengkap/).value).toBe(fakerName);
		expect(screen.getByLabelText(/Email/).value).toBe(fakerEmail);
		expect(screen.getByLabelText(/No Handphone/).value).toBe(fakerPhone);
	});

	test('input data invalid', () => {
		render(<FormCoding />);
		let generateRandomString = () => {
			let text = '';
			let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

			for (let i = 0; i < 20; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

			text += Math.ceil(Math.random() * 100);

			return text;
		};

		// Input data
		fireEvent.input(screen.getByRole('textbox', { name: /Nama Lengkap/ }), { target: { value: generateRandomString() } });
		fireEvent.input(screen.getByRole('textbox', { name: /Email/ }), { target: { value: generateRandomString() } });
		fireEvent.input(screen.getByRole('spinbutton', { name: /No Handphone/ }), { target: { value: 123123123123123123 } });

		// Check data
		expect(screen.getByText(/Nama Lengkap Harus Berupa Huruf/)).toBeInTheDocument();
		expect(screen.getByText(/Email Tidak Sesuai/)).toBeInTheDocument();
		expect(screen.getByText(/No Handphone Tidak Sesuai/)).toBeInTheDocument();
	});
});
