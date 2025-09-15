import { showToast } from '@/lib/toastUtils';
import { cn } from '@/lib/utils';
import { Popover } from 'radix-ui';
import React, { useState } from 'react';

const Feedback = () => {
  const [open, setOpen] = useState(false);
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger className='px-3 py-2 rounded-lg font-bold bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-all duration-200 cursor-pointer'>
        Any Feedback?
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side='top'
          sideOffset={8}
          align='end'
          avoidCollisions
          className={cn(
            'z-50 w-[300px] rounded-xl border dark:border-white/30 border-black/30 bg-white p-4 shadow-lg dark:bg-neutral-900'
          )}
        >
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const message = (
                e.currentTarget.elements.namedItem(
                  'feedback'
                ) as HTMLTextAreaElement
              ).value;

              const res = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message }),
              });

              if (res.ok) {
                showToast('✅ Feedback successfully submitted!');
              } else {
                showToast('❌ Something went wrong. Try again later.');
              }

              setOpen(false);
            }}
            className='flex flex-col gap-3'
          >
            <label className='text-sm font-medium'>
              Tell us what you think 💗
            </label>
            <textarea
              name='feedback'
              className='h-24 resize-none rounded-md border dark:border-white/30 border-black/30 p-2 text-sm outline-none dark:bg-neutral-800 bg-black/5'
              placeholder='Your feedback...'
            />
            <div className='flex justify-end gap-2'>
              <Popover.Close className='px-3 py-1 rounded-lg font-bold bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-all duration-200 cursor-pointer'>
                Cancel
              </Popover.Close>
              <button
                type='submit'
                className='px-3 py-1 rounded-lg font-bold bg-green-500/40 hover:bg-green-500/50 dark:bg-green-300/40 dark:hover:bg-green-300/50 transition-all duration-200 cursor-pointer'
              >
                Submit
              </button>
            </div>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default Feedback;
