'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import SocialAuth from '@/components/SocialAuth';
import { toast } from 'react-toastify';

const DEFAULT_CAPTCHA = 'ABCD12';

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [captchaInput, setCaptchaInput] = useState('');

  const onSubmit = (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Konfirmasi password tidak cocok!', { theme: 'dark' });
      return;
    }

    if (captchaInput !== DEFAULT_CAPTCHA) {
      toast.error('Captcha salah', { theme: 'dark' });
      return;
    }

    toast.success('Register Berhasil!', { theme: 'dark', position: 'top-right' });
    router.push('/auth/login');
  };

  return (
    <AuthFormWrapper title="Register">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium text-gray-700">Username</label>
          <input
            {...register('username', { required: 'Username wajib diisi' })}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan username"
          />
          {errors.username && <p className="text-red-500 text-sm italic mt-1">{errors.username.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', { required: 'Email wajib diisi' })}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan email"
          />
          {errors.email && <p className="text-red-500 text-sm italic mt-1">{errors.email.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password wajib diisi' })}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan password"
          />
          {errors.password && <p className="text-red-500 text-sm italic mt-1">{errors.password.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Konfirmasi Password</label>
          <input
            type="password"
            {...register('confirmPassword', { required: 'Konfirmasi password wajib diisi' })}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan ulang password"
          />
          {errors.confirmPassword && <p className="text-red-500 text-sm italic mt-1">{errors.confirmPassword.message as string}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">Captcha:</span>
            <span className="font-mono text-lg font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded">{DEFAULT_CAPTCHA}</span>
          </div>
          <input
            type="text"
            value={captchaInput}
            onChange={(e) => setCaptchaInput(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300"
            placeholder="Masukkan captcha"
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg">
          Register
        </button>

        <SocialAuth />

        <p className="mt-6 text-center text-sm text-gray-600">
          Sudah punya akun? <Link href="/auth/login" className="text-blue-600 hover:text-blue-800 font-semibold">Login</Link>
        </p>
      </form>
    </AuthFormWrapper>
  );
}