"use client";

import { useQuery } from "@tanstack/react-query";

import { getInvoice, getInvoices } from "@/services/invoice.service";

export const useInvoices = (params?: any) =>
  useQuery({
    queryKey: ["invoices", params],
    queryFn: async () => {
      const res = await getInvoices(params);

      return res.data;
    },
  });

export const useInvoice = (id: string) =>
  useQuery({
    queryKey: ["invoice", id],
    queryFn: async () => {
      const res = await getInvoice(id);

      return res.data.invoice;
    },
    enabled: !!id,
  });
