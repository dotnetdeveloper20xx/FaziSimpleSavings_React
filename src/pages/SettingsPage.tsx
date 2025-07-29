import { useEffect, useState } from "react";
import apiClient from "../core/apiClient";

export default function SettingsPage() {
  const [currency, setCurrency] = useState("GBP");
  const [receiveEmailNotifications, setReceiveEmailNotifications] =
    useState(true);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await apiClient.get("/api/usersettings");
        setCurrency(res.data.data.currency);
        setReceiveEmailNotifications(res.data.data.receiveEmailNotifications);
      } catch {
        setToast({ message: "Failed to load settings", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      await apiClient.put("/api/usersettings", {
        currency,
        receiveEmailNotifications,
      });
      setToast({ message: "Settings saved", type: "success" });
    } catch {
      setToast({ message: "Failed to save settings", type: "error" });
    }
  };

  return (
    <div className='max-w-xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6 text-center'>⚙️ Settings</h1>

      <div className='bg-white shadow-md rounded-lg p-6 space-y-6'>
        {loading ? (
          <p className='text-gray-500'>Loading settings...</p>
        ) : (
          <>
            {/* Currency Selector */}
            <div>
              <label className='label font-medium'>Preferred Currency</label>
              <select
                className='select select-bordered w-full'
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value='GBP'>GBP (£)</option>
                <option value='USD'>USD ($)</option>
                <option value='EUR'>EUR (€)</option>
              </select>
            </div>

            {/* Email Notifications */}
            <div className='flex items-center justify-between'>
              <span className='font-medium'>Receive Email Notifications</span>
              <input
                type='checkbox'
                className='toggle toggle-primary'
                checked={receiveEmailNotifications}
                onChange={(e) => setReceiveEmailNotifications(e.target.checked)}
              />
            </div>

            <button onClick={handleSave} className='btn btn-primary w-full'>
              Save Settings
            </button>
          </>
        )}
      </div>

      {toast && (
        <div className='toast toast-end z-50 mt-4'>
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
