import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import {
  getGroupGoalById,
  getGroupGoalTransactions,
  getAvailableUsers,
  addUserToGroup,
  contributeToGroupGoalThunk,
} from "../state/groupGoalsSlice";

const GroupGoalDetailPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { selectedGoal, transactions, availableUsers, loading, error } =
    useAppSelector((state) => state.groupGoals);

  const [amount, setAmount] = useState<string>("");
  const [contributeError, setContributeError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [inviteSuccess, setInviteSuccess] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(getGroupGoalById(id));
      dispatch(getGroupGoalTransactions(id));
      dispatch(getAvailableUsers(id));
    }
  }, [dispatch, id]);

  const handleContribute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    const parsedAmount = parseFloat(amount);

    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setContributeError("Please enter a valid amount.");
      return;
    }

    setContributeError("");
    setSuccessMessage("");

    const result = await dispatch(
      contributeToGroupGoalThunk({ id, amount: parsedAmount })
    );

    if (contributeToGroupGoalThunk.fulfilled.match(result)) {
      setSuccessMessage("Contribution successful!");
      dispatch(getGroupGoalById(id));
      dispatch(getGroupGoalTransactions(id));
      setAmount("");
    } else {
      setContributeError(result.payload as string);
    }
  };

  const handleInvite = async (userId: string) => {
    if (!id) return;

    const result = await dispatch(addUserToGroup({ goalId: id, userId }));

    if (addUserToGroup.fulfilled.match(result)) {
      setInviteSuccess(`User invited successfully.`);
      dispatch(getAvailableUsers(id)); // refresh user list
    } else {
      setInviteSuccess(result.payload as string);
    }
  };

  if (loading) return <p className='p-4'>Loading goal details...</p>;
  if (error) return <p className='p-4 text-red-500'>{error}</p>;
  if (!selectedGoal) return <p className='p-4'>No goal found.</p>;

  const isValidProgress =
    typeof selectedGoal.currentAmount === "number" &&
    typeof selectedGoal.targetAmount === "number" &&
    selectedGoal.targetAmount > 0;

  const progress = isValidProgress
    ? (selectedGoal.currentAmount / selectedGoal.targetAmount) * 100
    : 0;

  return (
    <div className='p-6 max-w-xl mx-auto space-y-6'>
      <div>
        <h1 className='text-2xl font-bold mb-2'>{selectedGoal.name}</h1>
        <p className='text-sm mb-1'>Target: £{selectedGoal.targetAmount}</p>
        <p className='text-sm mb-3'>Saved: £{selectedGoal.currentAmount}</p>
        <progress
          className='progress progress-primary w-full'
          value={progress}
          max={100}
        />
        <p className='text-xs mt-1 text-gray-500'>
          {isValidProgress
            ? `${progress.toFixed(1)}% complete`
            : "Progress unavailable"}
        </p>
      </div>

      {/* 🪙 Contribution Form */}
      <div className='border rounded p-4 bg-base-100'>
        <h2 className='font-semibold text-lg mb-2'>Contribute to this Goal</h2>
        <form onSubmit={handleContribute} className='space-y-4'>
          <input
            type='number'
            className='input input-bordered w-full'
            placeholder='Amount in £'
            value={amount || ""}
            onChange={(e) => setAmount(e.target.value)}
            required
            min={1}
            step='0.01'
          />
          <button type='submit' className='btn btn-primary w-full'>
            Contribute
          </button>
          {contributeError && (
            <p className='text-red-500 text-sm'>{contributeError}</p>
          )}
          {successMessage && (
            <p className='text-green-600 text-sm'>{successMessage}</p>
          )}
        </form>
      </div>

      {/* 💳 Transactions List */}
      <div className='border rounded p-4 bg-base-100'>
        <h2 className='font-semibold text-lg mb-2'>Transaction History</h2>
        {transactions.length === 0 ? (
          <p className='text-sm text-gray-600'>No contributions yet.</p>
        ) : (
          <ul className='space-y-2'>
            {transactions.map((tx) => (
              <li key={tx.transactionId} className='text-sm'>
                <span className='font-medium'>£{tx.amount.toFixed(2)}</span> on{" "}
                <span className='text-gray-500'>
                  {new Date(tx.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 👥 Invite Users */}
      <div className='border rounded p-4 bg-base-100'>
        <h2 className='font-semibold text-lg mb-2'>Invite Users</h2>
        {availableUsers.length === 0 ? (
          <p className='text-sm text-gray-600'>No users available to invite.</p>
        ) : (
          <ul className='space-y-3'>
            {availableUsers.map((user) => (
              <li key={user.id} className='flex justify-between items-center'>
                <span className='text-sm'>
                  {user.fullName} ({user.email})
                </span>
                <button
                  className='btn btn-outline btn-sm'
                  onClick={() => handleInvite(user.id)}
                >
                  Invite
                </button>
              </li>
            ))}
          </ul>
        )}
        {inviteSuccess && (
          <p className='text-green-600 text-sm mt-2'>{inviteSuccess}</p>
        )}
      </div>
    </div>
  );
};

export default GroupGoalDetailPage;
