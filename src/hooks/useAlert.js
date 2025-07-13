import { useState, useCallback } from "react";

export default function useAlert() {
  const [alert, setAlert] = useState(null);

  const showMessage = useCallback((message, type = "info", duration = 3000) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), duration);
  }, []);

  const AlertComponent = () =>
    alert ? (
      <div
        className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-lg text-white animate-fade-in-down transition-all duration-300 ${
          alert.type === "success"
            ? "bg-green-500"
            : alert.type === "error"
            ? "bg-red-500"
            : "bg-blue-500"
        }`}
      >
        {alert.message}
      </div>
    ) : null;

  return { showMessage, AlertComponent };
}
