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
    fetchGoalDetails();
  }, [id]);

  const fetchGoalDetails = async () => {
    const allGoals = await apiClient.get("/api/savingsgoals");
    const goalData = allGoals.data.data.find((g: Goal) => g.id === id);
    setGoal(goalData);

    const tx = await apiClient.get(`/api/savingsgoals/${id}/transactions`);
    setTransactions(tx.data.data);
  };

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(
      depositToGoal({ goalId: id!, amount: Number(amount) })
    );
    if (depositToGoal.fulfilled.match(result)) {
      setToast({ message: result.payload, type: "success" });
      setAmount("");
      fetchGoalDetails(); // refresh goal + transactions
    } else {
      setToast({ message: result.payload as string, type: "error" });
    }
  };

  if (!goal) return <p className='p-6'>Loading goal details...</p>;

  const isGoalComplete = goal.currentAmount >= goal.targetAmount;

  return (
    <div className='p-6'>
      <div className='flex items-center justify-between mb-2'>
        <h1 className='text-2xl font-bold'>{goal.name}</h1>
        {isGoalComplete && (
          <span className='badge badge-success text-white'>
            🎉 Goal Completed
          </span>
        )}
      </div>

      <p className='text-gray-700 mb-1'>
        £{goal.currentAmount} of £{goal.targetAmount}
      </p>
      <progress
        className='progress progress-success w-full mb-4'
        value={goal.currentAmount}
        max={goal.targetAmount}
      ></progress>

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
        <p className='text-green-600 font-semibold mb-4'>
          🎉 You’ve reached your target. No more deposits allowed.
        </p>
      )}

      <h2 className='text-lg font-semibold mb-2'>Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet.</p>
      ) : (
        <ul className='space-y-2'>
          {transactions.map((tx) => (
            <li key={tx.transactionId} className='border p-2 rounded shadow-sm'>
              <span className='font-bold'>£{tx.amount}</span> on{" "}
              {new Date(tx.date ?? "").toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </li>
          ))}
        </ul>
      )}

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
