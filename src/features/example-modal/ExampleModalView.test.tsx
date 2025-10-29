import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExampleModalView } from './ExampleModalView';

describe('ExampleModalView', () => {
  it('renders modal content', () => {
    const onClose = vi.fn();
    const onSubmit = vi.fn();

    render(<ExampleModalView onClose={onClose} onSubmit={onSubmit} />);

    expect(screen.getByText('Example Modal')).toBeInTheDocument();
    expect(
      screen.getByText('This is a simple React modal with Tailwind CSS.')
    ).toBeInTheDocument();
  });

  it('handles text input', () => {
    const onClose = vi.fn();
    const onSubmit = vi.fn();

    render(<ExampleModalView onClose={onClose} onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText('Type something...');
    fireEvent.change(input, { target: { value: 'test text' } });

    expect(input).toHaveValue('test text');
  });

  it('calls onSubmit with text when submit is clicked', () => {
    const onClose = vi.fn();
    const onSubmit = vi.fn();

    render(<ExampleModalView onClose={onClose} onSubmit={onSubmit} />);

    const input = screen.getByPlaceholderText('Type something...');
    fireEvent.change(input, { target: { value: 'hello' } });

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith('hello');
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when cancel is clicked', () => {
    const onClose = vi.fn();
    const onSubmit = vi.fn();

    render(<ExampleModalView onClose={onClose} onSubmit={onSubmit} />);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(onClose).toHaveBeenCalled();
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
