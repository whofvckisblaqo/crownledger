"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isRegisterPage = pathname === "/admin/register";

  useEffect(() => {
    if (isRegisterPage) return;

    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.push("/dashboard");
    }
  }, [status, session, router, isRegisterPage]);

  if (isRegisterPage) return <>{children}</>;

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium" style={{ fontFamily: "'Outfit', sans-serif" }}>
            Loading admin panel...
          </p>
        </div>
      </div>
    );
  }

  if (session?.user?.role !== "admin") return null;

  return <>{children}</>;
}