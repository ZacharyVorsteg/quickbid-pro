'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  X,
  LayoutDashboard,
  FileText,
  Users,
  Package,
  Settings,
  LogOut,
  Plus,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Estimates', href: '/estimates', icon: FileText },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Materials', href: '/materials', icon: Package },
  { name: 'Settings', href: '/settings', icon: Settings },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (!isOpen) return null;

  return (
    <Fragment>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-gray-900/80 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-full max-w-xs bg-gray-900 lg:hidden">
        <div className="flex h-full flex-col gap-y-5 overflow-y-auto px-6 pb-4">
          {/* Header */}
          <div className="flex h-16 items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2" onClick={onClose}>
              <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">QuickBid Pro</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-400"
              onClick={onClose}
            >
              <span className="sr-only">Close sidebar</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* New Estimate Button */}
          <Link
            href="/estimates/new"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            onClick={onClose}
          >
            <Plus className="w-5 h-5" />
            New Estimate
          </Link>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          pathname === item.href || pathname.startsWith(item.href + '/')
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                          'group flex gap-x-3 rounded-lg p-3 text-sm font-medium leading-6 transition-colors'
                        )}
                        onClick={onClose}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {/* Sign Out */}
              <li className="mt-auto">
                <button
                  onClick={() => {
                    handleSignOut();
                    onClose();
                  }}
                  className="group -mx-2 flex w-full gap-x-3 rounded-lg p-3 text-sm font-medium leading-6 text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                >
                  <LogOut className="h-5 w-5 shrink-0" />
                  Sign out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Fragment>
  );
}
