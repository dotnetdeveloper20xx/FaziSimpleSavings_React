import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { createNewGroupGoal, getMyGroupGoals } from "../state/groupGoalsSlice";

const GroupGoalForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.groupGoals.loading);
  const error = useAppSelector((state) => state.groupGoals.error);

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      targetAmount: parseFloat(targetAmount),
    };

    const result = await dispatch(createNewGroupGoal(payload));

    if (createNewGroupGoal.fulfilled.match(result)) {
      await dispatch(getMyGroupGoals()); // Refresh list after creation
      navigate("/group-goals");
    }
  };

  return (
    <div className='max-w-md mx-auto p-4 bg-base-100 shadow-md rounded-lg'>
      <h2 className='text-xl font-bold mb-4'>Create Group Goal</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='label'>Goal Name</label>
          <input
            type='text'
            className='input input-bordered w-full'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='label'>Target Amount (£)</label>
          <input
            type='number'
            className='input input-bordered w-full'
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            required
            min='1'
            step='0.01'
          />
        </div>
        {error && <div className='text-red-500'>{error}</div>}
        <button
          type='submit'
          className='btn btn-primary w-full'
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Goal"}
        </button>
      </form>
    </div>
  );
};

export default GroupGoalForm;
