"use client";

import { useState } from "react";

import { createUser } from "@/services/user.service";
import toast from "react-hot-toast";

export default function CreateUserForm({ refresh }: { refresh: () => void }) {
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "AGENT",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createUser(form);
      toast.success("Created user successfully");

      refresh();

      setForm({
        name: "",
        email: "",
        password: "",
        role: "AGENT",
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submit}
      className="
        bg-white
        rounded-3xl
        border
        border-gray-200
        shadow-sm
        p-8
        mb-8
      "
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create New User</h2>

        <p className="text-gray-500 mt-2">
          Add a new team member and assign permissions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>

          <input
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="
              w-full
              px-4
              py-3
              rounded-2xl
              border
              border-gray-300
              bg-gray-50
              focus:bg-white
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              outline-none
              transition-all
            "
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>

          <input
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="
              w-full
              px-4
              py-3
              rounded-2xl
              border
              border-gray-300
              bg-gray-50
              focus:bg-white
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              outline-none
              transition-all
            "
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Password
          </label>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="
                w-full
                px-4
                py-3
                rounded-2xl
                border
                border-gray-300
                bg-gray-50
                focus:bg-white
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
                outline-none
                transition-all
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-500
                hover:text-gray-700
              "
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19C7 19 2.73 15.11 1 12c.62-1.11 1.6-2.73 3.63-4.35M7.47 8.47A5.96 5.96 0 0012 7c5 0 9.27 3.89 11 7-1.16 2.08-3.06 4.51-6.32 6.06M13.83 12.12A3.001 3.001 0 0012 9a3 3 0 00-3 3c0 .33.04.65.12.96m.99.99A3 3 0 0012 15a3 3 0 002.1-.87m-6.51 1.44l10.98-10.98"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            User Role
          </label>

          <select
            value={form.role}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
            className="
              w-full
              px-4
              py-3
              rounded-2xl
              border
              border-gray-300
              bg-gray-50
              focus:bg-white
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
              outline-none
              transition-all
            "
          >
            <option value="AGENT">Agent</option>
            <option value="MANAGER">Manager</option>
            <option value="FINANCE">Finance</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          disabled={loading}
          className="
            px-8
            py-3
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            font-semibold
            text-white
            shadow-sm
            transition-all
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading ? "Creating User..." : "Create User"}
        </button>
      </div>
    </form>
  );
}
