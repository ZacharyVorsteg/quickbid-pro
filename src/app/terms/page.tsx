import { FileText, Mail } from 'lucide-react'

export const metadata = {
  title: 'Terms of Service - QuickBid Pro',
  description: 'Terms of Service for QuickBid Pro Trade Contractor Estimating Software',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
              <p className="text-gray-500">Last updated: January 2025</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Welcome to QuickBid Pro. By using our software, you agree to these Terms of Service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-6">
              By accessing or using QuickBid Pro, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, please do not use the software.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">2. Description of Service</h2>
            <p className="text-gray-600 mb-6">
              QuickBid Pro is estimating software designed for trade contractors including plumbers, electricians, HVAC technicians, and other skilled trades. The software helps create professional estimates, track job profitability, and manage client relationships.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">3. User Accounts</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>You must provide accurate business information when creating an account</li>
              <li>You are responsible for maintaining account security</li>
              <li>You may authorize team members to access your account</li>
              <li>You are responsible for all activity under your account</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">4. Subscription Plans</h2>
            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Free Trial</h3>
            <p className="text-gray-600 mb-4">
              New users receive a 14-day free trial with full access to all features. No credit card required.
            </p>
            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">Paid Subscriptions</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li><strong>Starter:</strong> $79/month - For solo contractors</li>
              <li><strong>Pro:</strong> $149/month - For growing businesses with teams</li>
              <li>Subscriptions are billed monthly</li>
              <li>Cancel anytime - no long-term contracts</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">5. Estimate Accuracy Disclaimer</h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
              <p className="text-yellow-800">
                <strong>Important:</strong> QuickBid Pro provides tools to help you create estimates, but you are solely responsible for the accuracy of your estimates. Material prices, labor rates, and markups should be verified by you. We are not liable for estimate errors or job losses.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">6. Your Data</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>You retain ownership of all estimates, client data, and business information</li>
              <li>You grant us a license to store and process your data to provide the service</li>
              <li>You may export your data at any time</li>
              <li>Upon account deletion, your data will be removed within 30 days</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">7. Acceptable Use</h2>
            <p className="text-gray-600 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
              <li>Use the service for fraudulent estimates or deceptive practices</li>
              <li>Share account access with non-employees</li>
              <li>Attempt to reverse engineer the software</li>
              <li>Use automated systems to access the service</li>
              <li>Resell or redistribute access to the service</li>
            </ul>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">8. Refund Policy</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <p className="text-blue-800">
                If you&apos;re not satisfied within the first 30 days of your paid subscription, contact us for a full refund. After 30 days, refunds are prorated based on usage.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">9. Limitation of Liability</h2>
            <p className="text-gray-600 mb-6">
              To the maximum extent permitted by law, QuickBid Pro shall not be liable for any lost profits, lost revenue, lost contracts, or any indirect, incidental, or consequential damages arising from your use of the service.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">10. Service Availability</h2>
            <p className="text-gray-600 mb-6">
              We strive for 99.9% uptime but do not guarantee uninterrupted service. We are not liable for any losses due to service downtime or technical issues.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">11. Termination</h2>
            <p className="text-gray-600 mb-6">
              We may terminate accounts that violate these terms. You may cancel your subscription at any time. Upon cancellation, you retain access until the end of your billing period.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">12. Changes to Terms</h2>
            <p className="text-gray-600 mb-6">
              We may modify these terms with 30 days notice for material changes. Continued use after changes constitutes acceptance.
            </p>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">13. Contact Us</h2>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <Mail className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="text-gray-700 mb-2">
                    Questions about these Terms? Contact us:
                  </p>
                  <a href="mailto:legal@quickbidpro.com" className="text-blue-600 hover:text-blue-700 font-medium">
                    legal@quickbidpro.com
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
