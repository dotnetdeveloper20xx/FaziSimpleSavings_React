import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { getMyGroupGoals } from "../state/groupGoalsSlice";
import GroupGoalCard from "../components/GroupGoalCard";

const GroupGoalsDashboard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const goals = useAppSelector((state) => state.groupGoals.goals);
  const loading = useAppSelector((state) => state.groupGoals.loading);
  const error = useAppSelector((state) => state.groupGoals.error);

  useEffect(() => {
    dispatch(getMyGroupGoals());
  }, [dispatch]);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-2xl font-bold'>My Group Goals</h1>
        <button
          className='btn btn-primary'
          onClick={() => navigate("/group-goals/create")}
        >
          + New Group Goal
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {goals.map((goal) => (
          <GroupGoalCard key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
};

export default GroupGoalsDashboard;
