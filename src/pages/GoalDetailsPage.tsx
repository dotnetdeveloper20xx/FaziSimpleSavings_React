import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";
import apiClient from "../core/apiClient";
import { depositToGoal } from "../state/goalsSlice";

interface Transaction {
  transactionId: string;
  amount: number;
  date: string;
}

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
}

export default function GoalDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const [goal, setGoal] = useState<Goal | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const fetchGoalDetails = async () => {
      const allGoals = await apiClient.get("/api/savingsgoals");
      const goalData = allGoals.data.data.find((g: Goal) => g.id === id);
      setGoal(goalData);

      const tx = await apiClient.get(`/api/savingsgoals/${id}/transactions`);
      setTransactions(tx.data.data);
    };

    fetchGoalDetails();
  }, [id]);

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      depositToGoal({ goalId: id!, amount: Number(amount) })
    );
    if (depositToGoal.fulfilled.match(result)) {
      setToast({ message: result.payload, type: "success" });
      setAmount("");

      const refreshed = await apiClient.get("/api/savingsgoals");
      const updatedGoal = refreshed.data.data.find((g: Goal) => g.id === id);
      setGoal(updatedGoal);

      const tx = await apiClient.get(`/api/savingsgoals/${id}/transactions`);
      setTransactions(tx.data.data);
    } else {
      setToast({ message: result.payload as string, type: "error" });
    }
  };

  if (!goal) return <p className='p-6'>Loading goal details...</p>;

  const isGoalComplete = goal.currentAmount >= goal.targetAmount;

  return (
    <div className='p-6'>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-3xl font-bold text-gray-800'>{goal.name}</h1>
        {isGoalComplete && (
          <span className='badge badge-success'>🎉 Goal Completed</span>
        )}
      </div>

      {/* Goal Progress */}
      <p className='text-gray-700 mb-2 text-sm'>
        £{goal.currentAmount.toFixed(2)} of £{goal.targetAmount.toFixed(2)}{" "}
        saved
      </p>
      <progress
        className='progress progress-success w-full mb-6'
        value={goal.currentAmount}
        max={goal.targetAmount}
      ></progress>

      {/* Deposit Form */}
      <form onSubmit={handleDeposit} className='flex gap-2 mb-6'>
        <input
          type='number'
          min={1}
          placeholder='Deposit amount'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='input input-bordered'
          disabled={isGoalComplete}
        />
        <button className='btn btn-primary' disabled={isGoalComplete}>
          Deposit
        </button>
      </form>

      {isGoalComplete && (
        <p className='text-green-600 font-semibold mb-6'>
          🎉 You’ve reached your target. No more deposits allowed.
        </p>
      )}

      {/* Transaction History */}
      <div>
        <h2 className='text-xl font-semibold mb-3'>Transaction History</h2>
        {transactions.length === 0 ? (
          <p className='text-gray-500 italic'>No transactions yet.</p>
        ) : (
          <ul className='space-y-3'>
            {transactions.map((tx) => (
              <li
                key={tx.transactionId}
                className='border rounded-md p-3 shadow-sm bg-white'
              >
                <div className='flex justify-between items-center text-sm'>
                  <span className='font-medium text-gray-800'>
                    £{tx.amount.toFixed(2)}
                  </span>
                  <span className='text-gray-500'>
                    {new Date(tx.date ?? "").toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className='toast toast-end z-50'>
          <div
            className={`alert ${
              toast.type === "success" ? "alert-success" : "alert-error"
            }`}
            onClick={() => setToast(null)}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
