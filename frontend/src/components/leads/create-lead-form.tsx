"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { leadSchema } from "@/validations/lead.schema";

export default function CreateLeadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(leadSchema),
  });

  const submit = async (data: any) => {
    // create lead
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <input {...register("name")} />

      <p>{errors.name?.message}</p>

      <button>Save</button>
    </form>
  );
}
