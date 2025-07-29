import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (goal: { name: string; targetAmount: number }) => Promise<void>;
}

export default function CreateGoalModal({ isOpen, onClose, onCreate }: Props) {
  const [form, setForm] = useState({ name: "", targetAmount: "" });
  const [errors, setErrors] = useState<{
    name?: string;
    targetAmount?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.targetAmount || Number(form.targetAmount) <= 0) {
      newErrors.targetAmount = "Target amount must be a positive number";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    await onCreate({
      name: form.name,
      targetAmount: Number(form.targetAmount),
    });
    setForm({ name: "", targetAmount: "" });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-150'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-40' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-200'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-150'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform rounded bg-white p-6 shadow-xl transition-all'>
                <Dialog.Title className='text-lg font-bold mb-4'>
                  Create New Goal
                </Dialog.Title>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div>
                    <input
                      name='name'
                      placeholder='Goal Name'
                      className='input input-bordered w-full'
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                    />
                    {errors.name && (
                      <p className='text-red-500 text-sm'>{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <input
                      name='targetAmount'
                      type='number'
                      placeholder='Target Amount'
                      className='input input-bordered w-full'
                      value={form.targetAmount}
                      onChange={(e) =>
                        setForm({ ...form, targetAmount: e.target.value })
                      }
                    />
                    {errors.targetAmount && (
                      <p className='text-red-500 text-sm'>
                        {errors.targetAmount}
                      </p>
                    )}
                  </div>
                  <div className='flex justify-end gap-2'>
                    <button
                      type='button'
                      className='btn btn-ghost'
                      onClick={onClose}
                    >
                      Cancel
                    </button>
                    <button type='submit' className='btn btn-primary'>
                      Create
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
