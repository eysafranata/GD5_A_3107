'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import SocialAuth from '@/components/SocialAuth';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaSyncAlt } from 'react-icons/fa';

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const generateCaptcha = () => Math.random().toString(36).substring(2, 8);

  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, []);

  const passwordVal = watch('password') || '';
  
  // Rumus Strength Password
  const strength = Math.min(
    100,
    (passwordVal.length > 7 ? 25 : 0) +
    (/[A-Z]/.test(passwordVal) ? 25 : 0) +
    (/[0-9]/.test(passwordVal) ? 25 : 0) +
    (/[^A-Za-z0-9]/.test(passwordVal) ? 25 : 0)
  );

  const onSubmit = (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Konfirmasi password tidak cocok!', { theme: 'dark' });
      return;
    }

    if (captchaInput !== captchaText) {
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
          <label className="text-sm font-medium text-gray-700">Username</label>
          <input
            {...register('username', { 
              required: 'Username wajib diisi',
              minLength: { value: 3, message: 'Minimal 3 karakter' },
              maxLength: { value: 8, message: 'Maksimal 8 karakter' }
            })}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan username"
          />
          {errors.username && <p className="text-red-500 text-sm italic">{errors.username.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email wajib diisi',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|co)$/,
                message: 'Format email tidak valid (wajib ada @ dan .com/.net/.co)'
              }
            })}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan email"
          />
          {errors.email && <p className="text-red-500 text-sm italic">{errors.email.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Nomor Telepon</label>
          <input
            type="tel"
            {...register('nomortelp', { 
              required: 'Nomor telepon wajib diisi',
              minLength: { value: 10, message: 'Minimal 10 karakter' },
              pattern: { value: /^[0-9]+$/, message: 'Hanya boleh berupa angka' }
            })}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.nomortelp ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan nomor telepon"
          />
          {errors.nomortelp && <p className="text-red-500 text-sm italic">{errors.nomortelp.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              {...register('password', { 
                required: 'Password wajib diisi',
                minLength: { value: 8, message: 'Minimal 8 karakter' }
              })}
              className={`w-full px-4 py-2.5 rounded-lg border pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Masukkan password"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-500">
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          
          {/* Indikator Strength */}
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div 
              className={`h-1.5 rounded-full ${strength <= 25 ? 'bg-red-500' : strength <= 50 ? 'bg-yellow-500' : strength <= 75 ? 'bg-blue-500' : 'bg-green-500'}`} 
              style={{ width: `${strength}%`, transition: 'width 0.3s' }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 text-right">Strength: {strength}%</p>
          {errors.password && <p className="text-red-500 text-sm italic mt-1">{errors.password.message as string}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              {...register('confirmPassword', { required: 'Konfirmasi password wajib diisi' })}
              className={`w-full px-4 py-2.5 rounded-lg border pr-10 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Masukkan konfirmasi password"
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3.5 text-gray-500">
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm italic">{errors.confirmPassword.message as string}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">Captcha:</span>
            <span className="font-mono text-lg font-bold text-gray-900 bg-gray-100 px-3 py-1.5 rounded tracking-widest">{captchaText}</span>
            <button type="button" onClick={() => setCaptchaText(generateCaptcha())} className="text-gray-500 hover:text-gray-800">
              <FaSyncAlt />
            </button>
          </div>
          <input
            type="text" value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)}
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