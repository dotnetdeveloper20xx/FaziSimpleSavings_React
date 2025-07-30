import React from "react";

interface GroupGoalCardProps {
  goal: {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
  };
}

const GroupGoalCard: React.FC<GroupGoalCardProps> = ({ goal }) => {
  const progress = (goal.currentAmount / goal.targetAmount) * 100;

  return (
    <div className='card bg-base-100 shadow-md p-4'>
      <h2 className='font-bold text-xl mb-2'>{goal.name}</h2>
      <p className='text-sm'>Target: £{goal.targetAmount}</p>
      <p className='text-sm'>Saved: £{goal.currentAmount}</p>
      <progress
        className='progress progress-primary w-full mt-2'
        value={progress}
        max={100}
      />
      <p className='text-xs mt-1 text-gray-500'>
        {progress.toFixed(1)}% complete
      </p>
    </div>
  );
};

export default GroupGoalCard;
