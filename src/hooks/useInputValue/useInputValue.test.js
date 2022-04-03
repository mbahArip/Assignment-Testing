import { renderHook, act } from '@testing-library/react-hooks';
import { useInputValue } from './useInputValue';

describe('Test ketika render', () => {
	it('return value awal', () => {
		const { result } = renderHook(() => useInputValue('lorem ipsum'));
		expect(result.current.value).toEqual('lorem ipsum');
	});
});

describe('Test ketika update', () => {
	it('return value baru', () => {
		const { result } = renderHook(() => useInputValue('lorem ipsum'));
		act(() => {
			result.current.onChange({ target: { value: 'dolor sit amet' } });
		});
		expect(result.current.value).toEqual('dolor sit amet');
	});
});

describe('Test re-render', () => {
	it('return value baru', () => {
		const { result, rerender } = renderHook(({ texts }) => useInputValue(texts), {
			initialProps: { texts: 'lorem ipsum' },
		});
		rerender({ texts: 'lorem ipsum dolor sit amet' });
		expect(result.current.value).toEqual('lorem ipsum dolor sit amet');
	});
});
