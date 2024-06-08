"use client";

import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <main className="flex">
      <Sidebar />
      {children}
      <Toaster />
    </main>
  );
}
