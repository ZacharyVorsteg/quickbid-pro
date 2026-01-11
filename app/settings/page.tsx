'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout';
import { Button, Input, Textarea } from '@/components/ui';
import { Building2, CreditCard, Bell, Shield, User, Save, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import { Profile, Trade } from '@/lib/database.types';
import { tradeLabels } from '@/lib/materials-data';
import { useToast } from '@/contexts/ToastContext';

export default function SettingsPage() {
  const supabase = createClient();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('company');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    company_name: '',
    phone: '',
    address: '',
    default_markup: 20,
    default_labor_rate: 75,
    tax_rate: 8.25,
    payment_terms: 'Net 30',
    trade: 'hvac' as Trade,
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (data) {
      const profileData = data as Profile;
      setProfile(profileData);
      setFormData({
        company_name: profileData.company_name || '',
        phone: profileData.phone || '',
        address: profileData.address || '',
        default_markup: profileData.default_markup,
        default_labor_rate: profileData.default_labor_rate,
        tax_rate: profileData.tax_rate,
        payment_terms: profileData.payment_terms,
        trade: profileData.trade || 'hvac',
      });
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);

    const { error } = await (supabase
      .from('profiles') as any)
      .update({
        company_name: formData.company_name,
        phone: formData.phone,
        address: formData.address,
        default_markup: formData.default_markup,
        default_labor_rate: formData.default_labor_rate,
        tax_rate: formData.tax_rate,
        payment_terms: formData.payment_terms,
        trade: formData.trade,
      })
      .eq('id', profile.id);

    if (!error) {
      toast.success('Settings saved successfully');
    } else {
      toast.error('Failed to save settings');
    }
    setIsSaving(false);
  };

  const tabs = [
    { id: 'company', name: 'Company', icon: Building2 },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
  ];

  if (isLoading) {
    return (
      <AppLayout title="Settings">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title="Settings">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-500">
            Manage your account and preferences
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <nav className="md:w-48 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.name}
              </button>
            ))}
          </nav>

          {/* Content */}
          <div className="flex-1">
            {activeTab === 'company' && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Company Information
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    This information will appear on your estimates
                  </p>
                </div>

                <div className="p-6 space-y-6">
                  <Input
                    label="Company Name"
                    value={formData.company_name}
                    onChange={(e) =>
                      setFormData({ ...formData, company_name: e.target.value })
                    }
                    placeholder="Your Company Name"
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="(555) 123-4567"
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Primary Trade
                      </label>
                      <select
                        value={formData.trade}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            trade: e.target.value as Trade,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        {Object.entries(tradeLabels).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <Input
                    label="Business Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    placeholder="123 Main St, City, State ZIP"
                  />

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Default Estimate Settings
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <Input
                        label="Default Markup (%)"
                        type="number"
                        value={formData.default_markup}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            default_markup: Number(e.target.value),
                          })
                        }
                        helperText="Applied to subtotal before tax"
                      />
                      <Input
                        label="Default Labor Rate ($/hr)"
                        type="number"
                        value={formData.default_labor_rate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            default_labor_rate: Number(e.target.value),
                          })
                        }
                      />
                      <Input
                        label="Tax Rate (%)"
                        type="number"
                        value={formData.tax_rate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            tax_rate: Number(e.target.value),
                          })
                        }
                      />
                      <Input
                        label="Payment Terms"
                        value={formData.payment_terms}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            payment_terms: e.target.value,
                          })
                        }
                        placeholder="e.g., Net 30, Due on Receipt"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-gray-200">
                    <Button onClick={handleSave} isLoading={isSaving}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Subscription & Billing
                  </h2>
                </div>

                <div className="p-6">
                  <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-primary-900">
                          {profile?.subscription_status === 'trial'
                            ? 'Free Trial'
                            : 'Pro Plan'}
                        </p>
                        <p className="text-sm text-primary-700 mt-1">
                          {profile?.subscription_status === 'trial'
                            ? 'Your trial expires in 14 days'
                            : '$149/month'}
                        </p>
                      </div>
                      <Button variant="outline">Manage Subscription</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900">Plan Features</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Unlimited estimates
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Full material database
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        PDF generation
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        Priority support
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Notification Preferences
                  </h2>
                </div>

                <div className="p-6 space-y-6">
                  {[
                    {
                      title: 'Estimate viewed',
                      description:
                        'Get notified when a client views your estimate',
                    },
                    {
                      title: 'Estimate accepted',
                      description:
                        'Get notified when a client accepts your estimate',
                    },
                    {
                      title: 'Weekly summary',
                      description:
                        'Receive a weekly summary of your estimate activity',
                    },
                    {
                      title: 'Product updates',
                      description:
                        'Learn about new features and improvements',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600" />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Security Settings
                  </h2>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-4">
                      Change Password
                    </h3>
                    <div className="space-y-4 max-w-md">
                      <Input
                        label="Current Password"
                        type="password"
                        placeholder="Enter current password"
                      />
                      <Input
                        label="New Password"
                        type="password"
                        placeholder="Enter new password"
                      />
                      <Input
                        label="Confirm New Password"
                        type="password"
                        placeholder="Confirm new password"
                      />
                      <Button>Update Password</Button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="font-medium text-gray-900 mb-4">
                      Two-Factor Authentication
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
