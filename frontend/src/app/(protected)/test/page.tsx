"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function TestPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/payments/test");
  }, [router]);
  return null;
}
