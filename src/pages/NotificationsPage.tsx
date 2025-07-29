import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../state/notificationsSlice";
import { RootState, AppDispatch } from "../state/store";

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const isYesterday =
    date.toDateString() ===
    new Date(now.setDate(now.getDate() - 1)).toDateString();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function NotificationsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.notifications
  );

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleMarkAsRead = async (id: string) => {
    const result = await dispatch(markNotificationAsRead(id));
    if (markNotificationAsRead.fulfilled.match(result)) {
      setToast({ message: "Marked as read", type: "success" });
    } else {
      setToast({ message: result.payload as string, type: "error" });
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold mb-6'>Notifications</h1>

      {loading && <p className='text-gray-600'>Loading notifications...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      {items.length === 0 && !loading && (
        <p className='text-gray-500 text-center'>You have no notifications.</p>
      )}

      <ul className='space-y-4'>
        {items.map((n) => (
          <li
            key={n.id}
            className={`p-4 rounded-lg shadow-sm border flex justify-between items-start gap-4 relative ${
              n.isRead ? "bg-gray-100" : "bg-white border-l-4 border-blue-500"
            }`}
          >
            <div className='flex-1'>
              <p
                className={`mb-1 font-medium text-sm ${
                  n.isRead ? "text-gray-500" : "text-gray-800"
                }`}
              >
                {n.message}
              </p>
              <p className='text-xs text-gray-400'>
                {formatDate(n.notificationDate)}
              </p>
            </div>

            {!n.isRead && (
              <button
                className='btn btn-sm btn-outline btn-primary'
                onClick={() => handleMarkAsRead(n.id)}
              >
                Mark as read
              </button>
            )}
          </li>
        ))}
      </ul>

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
