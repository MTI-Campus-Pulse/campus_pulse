'use client'

import { useState } from 'react'
import { ReportsViewer, QueriesViewer } from '../components/ManagerDashboard'

export default function UniPresidentDashboard() {
  const [activeSection, setActiveSection] = useState<'home' | 'reports' | 'queries'>('home')

  // ✅ لو في قسم مفتوح (reports أو queries) نخفي الـ navbar
  if (activeSection !== 'home') {
    return (
      <>
        {/* ✅ Overlay to hide navbar - يغطي المنطقة بس */}
        <div className="fixed top-0 left-0 right-0 h-20 bg-white dark:bg-slate-900 z-[60]" />
        
        {/* Render the viewer */}
        {activeSection === 'reports' 
          ? <ReportsViewer userRole="president" onBack={() => setActiveSection('home')} />
          : <QueriesViewer userRole="president" onBack={() => setActiveSection('home')} />
        }
      </>
    );
  }

  // 🏠 Landing Page
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Welcome Section - Centered */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-xl">
            <i className="fas fa-certificate text-4xl text-white"></i>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white mb-4">
            University President Dashboard
          </h1>
        </div>

        {/* Quick Links Grid - Centered Cards */}
        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl">
            
            {/* Reports Card */}
            <div
              onClick={() => setActiveSection('reports')}
              className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-stone-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-blue-500 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <i className="fas fa-file-alt text-4xl text-blue-600 dark:text-blue-400"></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                  Reports
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                  View comprehensive reports sent by the Manager including analytics, assessments, and quality metrics.
                </p>
                <div className="mt-6 flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                  <span>View Reports</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </div>
              </div>
            </div>

            {/* Queries Card */}
            <div
              onClick={() => setActiveSection('queries')}
              className="group bg-white dark:bg-slate-900 p-8 rounded-3xl border-2 border-stone-200 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-purple-500 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                  <i className="fas fa-database text-4xl text-purple-600 dark:text-purple-400"></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                  Queries
                </h3>
                <p className="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                  Explore database queries and raw data exports for detailed analysis and auditing purposes.
                </p>
                <div className="mt-6 flex items-center text-purple-600 dark:text-purple-400 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                  <span>View Queries</span>
                  <i className="fas fa-arrow-right ml-2"></i>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Info Banner - Centered */}
        <div className="mt-16 flex justify-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white text-center max-w-2xl shadow-xl">
            <p className="text-blue-100 text-sm">
              <i className="fas fa-info-circle mr-2"></i>
              All reports and queries are securely delivered from the Manager dashboard.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}