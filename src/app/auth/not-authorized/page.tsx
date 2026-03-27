'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotAuthorizedPage() {
  const router = useRouter();

  useEffect(() => {
    // Otomatis redirect kembali ke login setelah 3 detik
    const timer = setTimeout(() => {
      router.push('/auth/login');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold text-red-500 mb-2">❌ Anda belum login</h1>
        <p className="text-gray-500 mb-6">Silakan login terlebih dahulu.</p>
        <button
          onClick={() => router.push('/auth/login')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-semibold w-full"
        >
          ⬅ Kembali
        </button>
      </div>
    </div>
  );
}