"use client";

import { useQuery } from "@tanstack/react-query";

import { getUsers } from "@/services/user.service";

export const useUsers = () =>
  useQuery({
    queryKey: ["users"],

    queryFn: async () => {
      const res = await getUsers();

      return res.data.data;
    },
  });
