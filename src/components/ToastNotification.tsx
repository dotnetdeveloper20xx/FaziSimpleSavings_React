interface ToastNotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function ToastNotification({
  message,
  type,
  onClose,
}: ToastNotificationProps) {
  return (
    <div className='toast toast-end z-50'>
      <div
        role='alert' 
        className={`alert ${
          type === "success" ? "alert-success" : "alert-error"
        }`}
        onClick={onClose}
      >
        <span>{message}</span>
      </div>
    </div>
  );
}
