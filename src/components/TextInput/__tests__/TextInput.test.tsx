import React from 'react';
import userEvent from '@testing-library/user-event';
import {render, screen, fireEvent} from '@testing-library/react';
import {TextInput} from '../TextInput';

describe('TextInput', () => {
    test('render input by default', () => {
        render(<TextInput />);
        const input = screen.getByRole('textbox');

        expect(input).toBeVisible();
        expect(input.tagName.toLowerCase()).toBe('input');
    });

    test('render textarea with multiline prop', () => {
        render(<TextInput multiline />);
        const input = screen.getByRole('textbox');

        expect(input).toBeVisible();
        expect(input.tagName.toLowerCase()).toBe('textarea');
    });

    test('render error message with error prop', () => {
        const {container} = render(<TextInput error="Some Error" />);

        expect(container.querySelector('.yc-text-input__error')).toBeInTheDocument();
        expect(screen.getByText('Some Error')).toBeVisible();
    });

    test('do not show error without error prop', () => {
        const {container} = render(<TextInput />);

        expect(container.querySelector('.yc-text-input__error')).not.toBeInTheDocument();
    });

    test('render clear button with hasClear prop', () => {
        const {container} = render(<TextInput hasClear />);

        expect(container.querySelector('.yc-text-input__clear')).toBeInTheDocument();
    });

    test('do not render clear button without hasClear prop', () => {
        const {container} = render(<TextInput />);

        expect(container.querySelector('.yc-text-input__clear')).not.toBeInTheDocument();
    });

    test('call onChange when input changes value', () => {
        const onChangeFn = jest.fn();

        render(<TextInput onChange={onChangeFn} />);
        fireEvent.change(screen.getByRole('textbox'), {target: {value: '1'}});

        expect(onChangeFn).toBeCalled();
    });

    test('call onUpdate with certain value when input changes value', () => {
        const onUpdateFn = jest.fn();
        const value = 'some';

        render(<TextInput onUpdate={onUpdateFn} />);
        fireEvent.change(screen.getByRole('textbox'), {target: {value}});

        expect(onUpdateFn).toBeCalledWith(value);
    });

    test('call onChange when click to clean button', async () => {
        const onChangeFn = jest.fn();
        const user = userEvent.setup();
        const {container} = render(<TextInput hasClear onChange={onChangeFn} />);
        const clear = container.querySelector('.yc-text-input__clear');

        if (clear) {
            await user.click(clear);
        }

        expect(onChangeFn).toBeCalled();
    });

    test('call onUpdate with emply value when click to clean button', async () => {
        const onUpdateFn = jest.fn();
        const user = userEvent.setup();
        const {container} = render(<TextInput hasClear onUpdate={onUpdateFn} />);
        const clear = container.querySelector('.yc-text-input__clear');

        if (clear) {
            await user.click(clear);
        }

        expect(onUpdateFn).toBeCalledWith('');
    });

    test('render autocomplete=on attribute with autoComplete prop', () => {
        render(<TextInput autoComplete />);
        const input = screen.getByRole('textbox');

        expect(input.getAttribute('autocomplete')).toBe('on');
    });

    test('render autocomplete=off attribute with autoComplete=false prop', () => {
        render(<TextInput autoComplete={false} />);
        const input = screen.getByRole('textbox');

        expect(input.getAttribute('autocomplete')).toBe('off');
    });
});