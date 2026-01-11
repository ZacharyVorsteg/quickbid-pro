'use client';

import { useState } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign } from 'lucide-react';

export function ROICalculator() {
  const [estimatesPerMonth, setEstimatesPerMonth] = useState(20);
  const [hoursPerEstimate, setHoursPerEstimate] = useState(2);
  const [hourlyRate, setHourlyRate] = useState(75);

  // Calculations
  const currentMonthlyHours = estimatesPerMonth * hoursPerEstimate;
  const newMonthlyHours = estimatesPerMonth * 0.25; // 15 minutes per estimate with QuickBid
  const hoursSaved = currentMonthlyHours - newMonthlyHours;
  const moneySaved = hoursSaved * hourlyRate;
  const yearlySavings = moneySaved * 12;

  return (
    <section className="py-24 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left - Calculator inputs */}
          <div className="text-white mb-12 lg:mb-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
              <Calculator className="w-4 h-4" />
              <span className="text-sm font-medium">ROI Calculator</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              See How Much Time and Money You Could Save
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Adjust the sliders to see your potential savings with QuickBid
              Pro.
            </p>

            <div className="space-y-8">
              {/* Estimates per month */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="font-medium">Estimates per month</span>
                  <span className="text-2xl font-bold">{estimatesPerMonth}</span>
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={estimatesPerMonth}
                  onChange={(e) => setEstimatesPerMonth(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-sm text-primary-200 mt-1">
                  <span>5</span>
                  <span>100</span>
                </div>
              </div>

              {/* Hours per estimate */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="font-medium">Hours per estimate (current)</span>
                  <span className="text-2xl font-bold">{hoursPerEstimate}h</span>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="8"
                  step="0.5"
                  value={hoursPerEstimate}
                  onChange={(e) => setHoursPerEstimate(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-sm text-primary-200 mt-1">
                  <span>30 min</span>
                  <span>8 hours</span>
                </div>
              </div>

              {/* Hourly rate */}
              <div>
                <label className="flex items-center justify-between mb-2">
                  <span className="font-medium">Your hourly rate</span>
                  <span className="text-2xl font-bold">${hourlyRate}</span>
                </label>
                <input
                  type="range"
                  min="25"
                  max="200"
                  step="5"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-sm text-primary-200 mt-1">
                  <span>$25</span>
                  <span>$200</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Results */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Your Potential Savings
            </h3>

            <div className="space-y-6">
              {/* Hours saved */}
              <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-600 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Hours saved per month</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {hoursSaved.toFixed(1)} hours
                  </p>
                </div>
              </div>

              {/* Money saved monthly */}
              <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-600 rounded-xl">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Value of time saved per month
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${moneySaved.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Yearly savings */}
              <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-600 rounded-xl">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Annual savings</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${yearlySavings.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* ROI message */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-center text-gray-600">
                  That&apos;s a{' '}
                  <span className="font-bold text-green-600">
                    {((yearlySavings / (79 * 12)) * 100).toFixed(0)}% return
                  </span>{' '}
                  on your QuickBid Pro subscription
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
