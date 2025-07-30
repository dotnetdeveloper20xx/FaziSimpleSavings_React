import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { createGoal, fetchGoals } from "../state/goalsSlice";
import CreateGoalModal from "../components/CreateGoalModal";
import ToastNotification from "../components/ToastNotification";
import GoalCard from "../components/GoalCard";
import EmptyState from "../components/EmptyState";
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

      {loading && <p className='text-gray-600'>Loading goals...</p>}
      {error && <p className='text-red-500'>{error}</p>}
      {goals.length === 0 && !loading && <EmptyState />}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {goals.map((goal) => (
          <GoalCard key={goal.id} {...goal} />
        ))}
      </div>

      <CreateGoalModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onCreate={handleCreate}
      />

      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
