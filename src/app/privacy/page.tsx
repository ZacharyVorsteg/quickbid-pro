import { Shield, Lock, Eye, Mail } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy - QuickBid Pro',
  description: 'Privacy Policy for QuickBid Pro Trade Contractor Estimating Software',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-gray-500">Last updated: January 2025</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              At QuickBid Pro, we understand that your business data is sensitive. This Privacy Policy explains how we collect, use, and protect your information.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-start gap-3">
                <Lock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-2">Your Data Security</h3>
                  <p className="text-blue-800">All estimate and client data is encrypted in transit and at rest. We never share your business information with third parties.</p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>

            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Account Information</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Name and email address</li>
              <li>Company name and contact information</li>
              <li>Password (encrypted)</li>
              <li>Business license information (optional)</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Business Data</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Estimates and proposals you create</li>
              <li>Client contact information</li>
              <li>Material pricing and markup settings</li>
              <li>Project history and win rates</li>
            </ul>

            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Payment Information</h3>
            <p className="text-gray-600 mb-6">
              Payment processing is handled by Stripe. We do not store your credit card information. See Stripe&apos;s privacy policy for details.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>To provide the QuickBid Pro estimating service</li>
              <li>To generate estimates and proposals</li>
              <li>To track your win rates and business metrics</li>
              <li>To process subscription payments</li>
              <li>To send important service updates</li>
              <li>To provide customer support</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. Data Storage & Security</h2>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-3">
                <Eye className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700">
                    Your data is stored on secure, SOC 2 compliant servers. All data is encrypted using AES-256 encryption both in transit and at rest. We perform regular security audits and backups.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Data Sharing</h2>
            <p className="text-gray-600 mb-4">We do not sell your business data. We may share data with:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Service providers:</strong> Stripe (payments), cloud hosting, email services</li>
              <li><strong>Your clients:</strong> Only when you send them estimates</li>
              <li><strong>Legal requirements:</strong> When required by law</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Your Rights</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Data Export</h4>
                <p className="text-sm text-gray-600">Export all your estimates and client data anytime</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Account Deletion</h4>
                <p className="text-sm text-gray-600">Request complete deletion of your account</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Data Correction</h4>
                <p className="text-sm text-gray-600">Update your business information anytime</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Access</h4>
                <p className="text-sm text-gray-600">Request a copy of all data we hold</p>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Data Retention</h2>
            <p className="text-gray-600 mb-6">
              We retain your data for as long as your account is active. Upon cancellation, you may export your data. After account deletion, we remove personal data within 30 days, retaining only anonymized analytics.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Changes to This Policy</h2>
            <p className="text-gray-600 mb-6">
              We may update this Privacy Policy periodically. We will notify you of significant changes via email or in-app notification.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Contact Us</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 mb-2">
                    Questions about this Privacy Policy? Contact us:
                  </p>
                  <a href="mailto:privacy@quickbidpro.com" className="text-blue-600 hover:text-blue-700 font-medium">
                    privacy@quickbidpro.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              ← Back to QuickBid Pro
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
