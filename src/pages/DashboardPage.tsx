import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../state/store";
import { createGoal, fetchGoals } from "../state/goalsSlice";
import CreateGoalModal from "../components/CreateGoalModal";
import { Plus } from "lucide-react";

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
    <div className='p-6 relative'>
      {/* Heading + Add Goal */}
      <div className='flex justify-between items-center mb-8'>
        <h1 className='text-3xl font-bold text-gray-800'>Your Savings Goals</h1>
        <button
          className='btn btn-primary flex items-center gap-2'
          onClick={() => setShowModal(true)}
        >
          <Plus size={18} />
          New Goal
        </button>
      </div>

      {/* Loading/Error */}
      {loading && <p className='text-gray-600'>Loading goals...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {/* Empty State */}
      {goals.length === 0 && !loading && (
        <div className='text-center text-gray-500 py-20'>
          <p className='text-xl'>You haven’t created any goals yet.</p>
          <p className='text-sm mt-1'>Start your savings journey now!</p>
        </div>
      )}

      {/* Goals Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {goals.map((goal) => {
          const isComplete = goal.currentAmount >= goal.targetAmount;

          return (
            <Link
              to={`/goal/${goal.id}`}
              key={goal.id}
              className='card bg-white border border-gray-200 shadow-sm rounded-xl p-5 hover:shadow-md transition-all relative group'
            >
              <div className='flex justify-between items-start mb-3'>
                <h2 className='text-lg font-semibold text-gray-800'>
                  {goal.name}
                </h2>
                {isComplete && (
                  <span className='badge badge-success text-xs'>
                    🎉 Completed
                  </span>
                )}
              </div>

              <p className='text-sm text-gray-600 mb-1'>
                £{goal.currentAmount.toFixed(2)} of £
                {goal.targetAmount.toFixed(2)}
              </p>

              <progress
                className='progress progress-success w-full'
                value={goal.currentAmount}
                max={goal.targetAmount}
              ></progress>
            </Link>
          );
        })}
      </div>

      {/* Create Goal Modal */}
      <CreateGoalModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreate}
      />

      {/* Toast Notification */}
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
