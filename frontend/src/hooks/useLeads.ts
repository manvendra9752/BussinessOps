"use client";

import { useQuery } from "@tanstack/react-query";

import { getLeads } from "@/services/lead.service";

export const useLeads = (params: any) => {
  return useQuery({
    queryKey: ["leads", params],

    queryFn: async () => {
      const res = await getLeads(params);

      return res.data;
    },
  });
};
