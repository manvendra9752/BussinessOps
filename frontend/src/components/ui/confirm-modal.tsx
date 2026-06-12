"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, Send, XCircle } from "lucide-react";

type Variant = "danger" | "warning" | "info";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: Variant;
  loading?: boolean;
}

const variantConfig: Record<
  Variant,
  {
    icon: typeof AlertTriangle;
    iconBg: string;
    iconColor: string;
    btnBg: string;
    btnHover: string;
  }
> = {
  danger: {
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    btnBg: "bg-red-600",
    btnHover: "hover:bg-red-700",
  },
  warning: {
    icon: XCircle,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    btnBg: "bg-amber-600",
    btnHover: "hover:bg-amber-700",
  },
  info: {
    icon: Send,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    btnBg: "bg-blue-600",
    btnHover: "hover:bg-blue-700",
  },
};

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
  loading = false,
}: Props) {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));

      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    } else {
      // Use a timer to schedule setAnimate(false), not synchronously
      setTimeout(() => setAnimate(false), 0);
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose, loading]);

  if (!visible) return null;

  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${
        animate ? "bg-black/50 backdrop-blur-sm" : "bg-black/0"
      }`}
      onClick={() => !loading && onClose()}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transition-all duration-200 ${
          animate
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`h-12 w-12 rounded-full ${config.iconBg} flex items-center justify-center shrink-0`}
          >
            <Icon size={22} className={config.iconColor} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-500 mt-0.5">{message}</p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 border border-gray-300 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`px-5 py-2.5 ${config.btnBg} ${config.btnHover} text-white rounded-xl text-sm font-medium transition disabled:opacity-50 flex items-center gap-2`}
          >
            {loading && (
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
