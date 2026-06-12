"use client";

import toast from "react-hot-toast";

import { deactivateUser } from "@/services/user.service";

import RoleBadge from "./role-badge";

interface Props {
  users: any[];
  refresh: () => void;
}

export default function UserTable({ users, refresh }: Props) {
  const handleDeactivate = async (id: string) => {
    try {
      await deactivateUser(id);

      toast.success("User deactivated successfully");

      refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to deactivate user",
      );
    }
  };

  return (
    <div
      className="
   bg-white
   rounded-3xl
   border
   border-gray-200
   shadow-sm
   overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead
            className="
         bg-linear-to-r
         from-slate-50
         to-gray-100
         border-b"
          >
            <tr>
              <th
                className="
             px-6
             py-4
             text-left
             text-xs
             font-bold
             uppercase
             tracking-wider
             text-gray-600"
              >
                User{" "}
              </th>
              <th
                className="
            px-6
            py-4
            text-left
            text-xs
            font-bold
            uppercase
            tracking-wider
            text-gray-600"
              >
                Email
              </th>
              <th
                className="
            px-6
            py-4
            text-left
            text-xs
            font-bold
            uppercase
            tracking-wider
            text-gray-600"
              >
                Role
              </th>
              <th
                className="
            px-6
            py-4
            text-left
            text-xs
            font-bold
            uppercase
            tracking-wider
            text-gray-600"
              >
                Status
              </th>
              <th
                className="
            px-6
            py-4
            text-center
            text-xs
            font-bold
            uppercase
            tracking-wider
            text-gray-600"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="
              border-b
              last:border-b-0
              hover:bg-blue-50/50
              transition-colors"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div
                        className="
                    h-11
                    w-11
                    rounded-full
                    bg-linear-to-r
                    from-blue-500
                    to-indigo-600
                    text-white
                    flex
                    items-center
                    justify-center
                    font-bold
                    shadow"
                      >
                        {user.name?.charAt(0)?.toUpperCase()}
                      </div>

                      <div>
                        <p
                          className="
                      font-semibold
                      text-gray-900"
                        >
                          {user.name}
                        </p>

                        <p
                          className="
                      text-xs
                      text-gray-500"
                        >
                          User ID: {user._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td
                    className="
                px-6
                py-5
                text-gray-700"
                  >
                    {user.email}
                  </td>

                  <td className="px-6 py-5">
                    <RoleBadge role={user.role} />
                  </td>

                  <td className="px-6 py-5">
                    {user.isActive ? (
                      <span
                        className="
                    inline-flex
                    items-center
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    bg-green-100
                    text-green-700"
                      >
                        ● Active
                      </span>
                    ) : (
                      <span
                        className="
                    inline-flex
                    items-center
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    bg-red-100
                    text-red-700"
                      >
                        ● Inactive
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {user.isActive ? (
                      <button
                        onClick={() => handleDeactivate(user._id)}
                        className="
                    px-4
                    py-2
                    rounded-xl
                    bg-red-100
                    text-red-700
                    hover:bg-red-200
                    font-medium
                    transition"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <span
                        className="
                    px-3
                    py-2
                    rounded-xl
                    bg-gray-100
                    text-gray-500
                    text-sm
                    font-medium"
                      >
                        Disabled
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="
              py-16
              text-center"
                >
                  <div className="space-y-2">
                    <div className="text-5xl">👥</div>

                    <h3
                      className="
                  text-lg
                  font-semibold
                  text-gray-700"
                    >
                      No Users Found
                    </h3>

                    <p className="text-gray-500">
                      Create your first team member to get started.
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
