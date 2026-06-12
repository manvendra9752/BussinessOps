"use client";

import { useQuery } from "@tanstack/react-query";

import { getFollowups } from "@/services/followup.service";

export const useFollowups = (params?: any) => {
  return useQuery({
    queryKey: ["followups", params],

    queryFn: async () => {
      const res = await getFollowups(params);

      return res.data;
    },
  });
};
