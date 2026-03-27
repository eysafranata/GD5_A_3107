'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import SocialAuth from '@/components/SocialAuth';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaSyncAlt } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();

  // Acuan Email dan Password NPM
  const VALID_EMAIL = '3107@gmail.com';
  const VALID_PASSWORD = '241713107';

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    captchaInput: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState<{ email?: string; password?: string; captcha?: string }>({});
  const [loginAttempts, setLoginAttempts] = useState(3);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaText, setCaptchaText] = useState('');

  // Generate Captcha Acak
  const generateCaptcha = () => Math.random().toString(36).substring(2, 8);

  useEffect(() => {
    setCaptchaText(generateCaptcha());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: any = {};

    if (loginAttempts <= 0) {
      toast.error('Kesempatan login habis!', { theme: 'dark' });
      return;
    }

    if (!formData.email.trim()) newErrors.email = 'Email tidak boleh kosong';
    if (!formData.password.trim()) newErrors.password = 'Password tidak boleh kosong';
    if (!formData.captchaInput.trim()) {
      newErrors.captcha = 'Captcha belum diisi';
    } else if (formData.captchaInput !== captchaText) {
      newErrors.captcha = 'Captcha salah';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Validasi Sesuai Aturan NPM
    if (formData.email !== VALID_EMAIL || formData.password !== VALID_PASSWORD) {
      const remaining = loginAttempts - 1;
      setLoginAttempts(remaining);
      toast.error(`Login Gagal, sisa kesempatan: ${remaining}`, { theme: 'dark', position: 'top-right' });
      return;
    }

    // Jika Berhasil
    localStorage.setItem('isLoggedIn', 'true');
    toast.success('Login Berhasil!', { theme: 'dark', position: 'top-right' });
    router.push('/home');
  };

  const handleResetAttempts = () => {
    if (loginAttempts === 0) {
      setLoginAttempts(3);
      toast.success('Kesempatan login berhasil direset!', { theme: 'dark' });
    }
  };

  return (
    <AuthFormWrapper title="Login">
      <div className="text-center mb-4 text-sm text-gray-500">Sisa kesempatan: {loginAttempts}</div>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
          <input
            id="email" name="email" type="email"
            value={formData.email} onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan email"
          />
          {errors.email && <p className="text-red-600 text-sm italic mt-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
          <div className="relative">
            <input
              id="password" name="password" type={showPassword ? 'text' : 'password'}
              value={formData.password} onChange={handleChange}
              className={`w-full px-4 py-2.5 rounded-lg border pr-10 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Masukkan password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && <p className="text-red-600 text-sm italic mt-1">{errors.password}</p>}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox" name="rememberMe"
              checked={formData.rememberMe} onChange={handleChange}
              className="mr-2 w-4 h-4 rounded border-gray-300"
            />
            Ingat Saya
          </label>
          <Link href="#" className="text-blue-600 hover:text-blue-800 font-semibold">Forgot Password?</Link>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">Captcha:</span>
            <span className="font-mono text-lg font-bold text-gray-900 bg-gray-100 px-3 py-1 rounded tracking-wider">
              {captchaText}
            </span>
            <button type="button" onClick={() => setCaptchaText(generateCaptcha())} className="text-gray-500 hover:text-gray-800">
              <FaSyncAlt />
            </button>
          </div>
          <input
            type="text" name="captchaInput"
            value={formData.captchaInput} onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.captcha ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukkan captcha"
          />
          {errors.captcha && <p className="text-red-600 text-sm italic mt-1">{errors.captcha}</p>}
        </div>

        <button 
          type="submit" 
          disabled={loginAttempts === 0}
          className={`w-full font-semibold py-2.5 px-4 rounded-lg text-white transition-colors ${loginAttempts === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          Sign In
        </button>

        <button 
          type="button" 
          onClick={handleResetAttempts}
          disabled={loginAttempts > 0}
          className={`w-full font-semibold py-2.5 px-4 rounded-lg text-white transition-colors ${loginAttempts > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
        >
          Reset Kesempatan
        </button>

        <SocialAuth />

        <p className="mt-6 text-center text-sm text-gray-600">
          Tidak punya akun? <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 font-semibold">Daftar</Link>
        </p>
      </form>
    </AuthFormWrapper>
  );
}