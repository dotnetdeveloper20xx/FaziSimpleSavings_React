import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../state/store";
import { createGoal, fetchGoals } from "../state/goalsSlice";
import CreateGoalModal from "../components/CreateGoalModal";

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { goals, loading, error } = useSelector(
    (state: RootState) => state.goals
  );

  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    dispatch(fetchGoals());
  }, [dispatch]);

  const handleCreate = async (goal: { name: string; targetAmount: number }) => {
    const result = await dispatch(createGoal(goal));
    if (createGoal.fulfilled.match(result)) {
      setToast({ message: "Goal created successfully", type: "success" });
      dispatch(fetchGoals());
      setShowModal(false);
    } else {
      setToast({ message: result.payload as string, type: "error" });
    }
  };

  return (
    <div className='p-6'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Your Savings Goals</h1>
        <button className='btn btn-primary' onClick={() => setShowModal(true)}>
          + New Goal
        </button>
      </div>

      {loading && <p>Loading goals...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {goals.map((goal) => (
          <Link
            to={`/goal/${goal.id}`}
            key={goal.id}
            className='card bg-white shadow-lg p-4 hover:shadow-xl'
          >
            <h2 className='text-xl font-semibold'>{goal.name}</h2>
            <p className='text-sm text-gray-600'>
              £{goal.currentAmount} of £{goal.targetAmount}
            </p>
            <progress
              className='progress progress-success w-full mt-2'
              value={goal.currentAmount}
              max={goal.targetAmount}
            ></progress>
          </Link>
        ))}
      </div>

      {/* 🔁 Modal */}
      <CreateGoalModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreate}
      />

      {/* 🔔 Toast */}
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
