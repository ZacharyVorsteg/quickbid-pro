'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, Mail, Lock, Eye, EyeOff, User, Building2, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { Button } from '@/components/ui';
import { Trade } from '@/lib/database.types';
import { useToast } from '@/contexts/ToastContext';

const trades: { value: Trade; label: string; color: string }[] = [
  { value: 'hvac', label: 'HVAC', color: 'bg-blue-500' },
  { value: 'plumbing', label: 'Plumbing', color: 'bg-emerald-500' },
  { value: 'electrical', label: 'Electrical', color: 'bg-amber-500' },
  { value: 'roofing', label: 'Roofing', color: 'bg-purple-500' },
];

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const toast = useToast();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [fullName, setFullName] = useState('');
  const [trade, setTrade] = useState<Trade | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Sign up with Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            company_name: companyName,
          },
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          company_name: companyName,
          trade: trade as Trade,
          subscription_status: 'trial',
        } as any);

        if (profileError) {
          // Profile creation failed - user can update later
        }
      }

      router.push('/dashboard');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-600 rounded-xl">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">QuickBid Pro</span>
          </Link>

          <h2 className="text-3xl font-bold text-gray-900">
            Start your free trial
          </h2>
          <p className="mt-2 text-gray-600">
            14 days free. No credit card required.
          </p>

          {/* Progress indicator */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200'
                }`}
              >
                {step > 1 ? <CheckCircle className="w-5 h-5" /> : '1'}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">
                Account
              </span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200">
              <div
                className={`h-full bg-primary-600 transition-all ${
                  step > 1 ? 'w-full' : 'w-0'
                }`}
              />
            </div>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200'
                }`}
              >
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-900">
                Business
              </span>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="John Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Must be at least 8 characters
                  </p>
                </div>

                <Button
                  type="button"
                  className="w-full"
                  size="lg"
                  onClick={() => setStep(2)}
                  disabled={!email || !password || !fullName || password.length < 8}
                >
                  Continue
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company name
                  </label>
                  <div className="mt-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Smith HVAC Services"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    What&apos;s your primary trade?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {trades.map((t) => (
                      <button
                        key={t.value}
                        type="button"
                        onClick={() => setTrade(t.value)}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                          trade === t.value
                            ? 'border-primary-600 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-3 h-3 rounded-full ${t.color}`} />
                        <span className="font-medium text-gray-900">
                          {t.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    size="lg"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    size="lg"
                    isLoading={isLoading}
                    disabled={!companyName || !trade}
                  >
                    Create account
                  </Button>
                </div>
              </>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary-600 font-medium hover:text-primary-500"
            >
              Sign in
            </Link>
          </p>

          <p className="mt-4 text-center text-xs text-gray-500">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>

      {/* Right side - Benefits */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h3 className="text-2xl font-bold mb-8">
              Join 2,000+ contractors saving time every day
            </h3>

            <ul className="space-y-6">
              {[
                {
                  title: 'Create estimates in minutes',
                  description:
                    'Pre-loaded materials and quick entry means no more hours on spreadsheets.',
                },
                {
                  title: 'Win more jobs',
                  description:
                    'Professional branded PDFs help you stand out from the competition.',
                },
                {
                  title: 'Track your success',
                  description:
                    'See your win rate, average job size, and growth over time.',
                },
                {
                  title: 'Access anywhere',
                  description:
                    'Mobile-friendly so you can estimate right from the job site.',
                },
              ].map((item, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-white/10 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-primary-100 text-sm">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
