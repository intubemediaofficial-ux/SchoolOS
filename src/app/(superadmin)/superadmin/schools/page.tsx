"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SchoolsRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace("/superadmin"); }, [router]);
  return <div className="p-8 text-center text-gray-400">Redirecting to Super Admin dashboard...</div>;
}
