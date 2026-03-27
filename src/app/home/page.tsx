'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Game1 from "@/components/Game1";

export default function Home() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Cek apakah status login tersimpan di localStorage
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (!loggedIn) {
      router.push('/auth/not-authorized');
    } else {
      setIsAuth(true);
    }
  }, [router]);

  // Hindari tampilan berkedip sebelum redirect selesai
  if (!isAuth) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
      <h1 className="text-4xl font-bold mb-4 text-white">Selamat Datang!</h1>
      <Game1 />
    </div>
  );
}