import React, { useState } from 'react';
import { cn } from '../../shared/lib/utils';

interface ExampleModalViewProps {
  readonly onClose: () => void;
  readonly onSubmit: (text: string) => void;
}

/**
 * Example modal view component with form input
 */
export function ExampleModalView({
  onClose,
  onSubmit
}: ExampleModalViewProps): React.ReactElement {
  const [text, setText] = useState<string>('');

  const handleSubmit = (): void => {
    onSubmit(text);
    onClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value);
  };

  return (
    <div className={cn('op-p-6 op-space-y-4')}>
      <h2 className={cn('op-text-2xl op-font-bold')}>Example Modal</h2>
      <p className={cn('op-text-gray-600')}>This is a simple React modal with Tailwind CSS.</p>

      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Type something..."
        className={cn(
          'op-w-full op-px-3 op-py-2 op-border op-rounded-md',
          'focus:op-outline-none focus:op-ring-2 focus:op-ring-blue-500'
        )}
      />

      <div className={cn('op-flex op-gap-2 op-justify-end')}>
        <button
          onClick={onClose}
          className={cn(
            'op-px-4 op-py-2 op-rounded-md',
            'op-border op-border-gray-300',
            'hover:op-bg-gray-100'
          )}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className={cn(
            'op-px-4 op-py-2 op-rounded-md',
            'op-bg-blue-500 op-text-white',
            'hover:op-bg-blue-600'
          )}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
