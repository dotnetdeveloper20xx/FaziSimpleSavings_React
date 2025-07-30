import { Link } from "react-router-dom";

interface GoalCardProps {
  id: string;
  name: string;
  currentAmount: number;
  targetAmount: number;
}

export default function GoalCard({
  id,
  name,
  currentAmount,
  targetAmount,
}: GoalCardProps) {
  const isComplete = currentAmount >= targetAmount;

  return (
    <Link
      to={`/goal/${id}`}
      className='card bg-white border border-gray-200 shadow-sm rounded-xl p-5 hover:shadow-md transition-all relative group'
    >
      <div className='flex justify-between items-start mb-3'>
        <h2 className='text-lg font-semibold text-gray-800'>{name}</h2>
        {isComplete && (
          <span className='badge badge-success text-xs'>🎉 Completed</span>
        )}
      </div>

      <p className='text-sm text-gray-600 mb-1'>
        £{currentAmount.toFixed(2)} of £{targetAmount.toFixed(2)}
      </p>

      <progress
        className='progress progress-success w-full'
        value={currentAmount}
        max={targetAmount}
      ></progress>
    </Link>
  );
}
