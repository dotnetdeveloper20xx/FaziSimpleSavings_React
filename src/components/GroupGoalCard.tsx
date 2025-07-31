import React from "react";
import { useNavigate } from "react-router-dom";

interface GroupGoalCardProps {
  goal: {
    id: string;
    name: string;
    targetAmount: number;
    currentAmount: number;
  };
}

const GroupGoalCard: React.FC<GroupGoalCardProps> = ({ goal }) => {
  const navigate = useNavigate();

  const isValid =
    typeof goal.currentAmount === "number" &&
    typeof goal.targetAmount === "number" &&
    goal.targetAmount > 0;

  const progress = isValid ? (goal.currentAmount / goal.targetAmount) * 100 : 0;

  return (
    <div
      className='card bg-base-100 shadow-md p-4 cursor-pointer hover:bg-base-200 transition'
      onClick={() => navigate(`/group-goals/${goal.id}`)}
    >
      <h2 className='font-bold text-xl mb-2'>{goal.name}</h2>
      <p className='text-sm'>Target: £{goal.targetAmount}</p>
      <p className='text-sm'>Saved: £{goal.currentAmount}</p>
      <progress
        className='progress progress-primary w-full mt-2'
        value={progress}
        max={100}
      />
      <p className='text-xs mt-1 text-gray-500'>
        {isValid ? `${progress.toFixed(1)}% complete` : "Progress unavailable"}
      </p>
    </div>
  );
};

export default GroupGoalCard;
