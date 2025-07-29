import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationAsRead,
} from "../state/notificationsSlice";
import { RootState, AppDispatch } from "../state/store";

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
      <h1 className='text-2xl font-bold mb-4'>Notifications</h1>

      {loading && <p>Loading notifications...</p>}
      {error && <p className='text-red-500'>{error}</p>}

      <ul className='space-y-3'>
        {items.map((n) => (
          <li
            key={n.id}
            className={`p-4 rounded border shadow-sm flex justify-between items-center ${
              n.isRead ? "bg-gray-100" : "bg-white"
            }`}
          >
            <div>
              <p
                className={`font-medium ${
                  n.isRead ? "text-gray-500" : "text-black"
                }`}
              >
                {n.message}
              </p>
              <p className='text-xs text-gray-400'>
                {new Date(n.notificationDate).toLocaleString()}
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
