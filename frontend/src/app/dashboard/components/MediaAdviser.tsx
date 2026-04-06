'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Chart from 'chart.js/auto'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { Button } from '@/components/ui/button'
import {
  Clock, CheckCircle, XCircle, FileText, Loader2,
  AlertTriangle, RefreshCcw, Calendar, ThumbsUp, ThumbsDown,
  Megaphone, Newspaper, Database, ArrowLeft
} from 'lucide-react'

// --- Register Chart.js Plugin ---
Chart.register(ChartDataLabels)

// ============================================================
// 🔧 Config & Constants
// ============================================================
const SUPABASE_URL = 'https://imlydashdkziznmjhfgy.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbHlkYXNoZGt6aXpubWpoZmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTI2MDEsImV4cCI6MjA4NTg2ODYwMX0.MR0PyzmIwXlz06HOhyZt9dYypL9BV4YboVqbpuEAF-8'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)
const API_BASE_URL = "http://127.0.0.1:8000/api"

const noChartReports = ['student_interests', 'dormant_articles_report', 'dormant_students_report', 'my_reactions_history', 'my_activity_summary']

const standardReports = [
  { id: 'faculty_engagement_league', title: 'Faculty Engagement League', icon: 'fa-trophy', num: 1 },
  { id: 'monthly_user_growth', title: 'Monthly User Growth', icon: 'fa-layer-group', num: 2 },
  { id: 'category_popularity', title: 'Category Popularity', icon: 'fa-layer-group', num: 3 },
  { id: 'content_impact_report', title: 'Content Impact Report', icon: 'fa-comments', num: 4 },
  { id: 'monthly_newsletter_simple', title: 'Monthly Publication Volume', icon: 'fa-layer-group', num: 5 },
  { id: 'monthly_feedback_simple', title: 'Overall Engagement Growth Analysis', icon: 'fa-comments', num: 6 },
  { id: 'stakeholder_interaction_gap', title: 'Partner Communication Latency Audit', icon: 'fa-layer-group', num: 7 },
  { id: 'stakeholders_report_count', title: 'Stakeholder Reporting Volume', icon: 'fa-comments', num: 8 },
  { id: 'most_active_category', title: 'Primary News Category Activity', icon: 'fa-layer-group', num: 9 },
  { id: 'monthly_category_activity', title: 'Monthly Categorical Output Summary', icon: 'fa-comments', num: 10 },
  { id: 'top_engaged_newsletters', title: 'High-Impact Newsletter Performance', icon: 'fa-comments', num: 11 },
  { id: 'top_5_rated_newsletters', title: 'Weekly Top-Rated Content Highlights', icon: 'fa-layer-group', num: 12 },
  { id: 'engagement_hourly_pattern', title: 'Peak Student Engagement Hourly Patterns', icon: 'fa-comments', num: 13 },
  { id: 'top_10_feedback_users', title: 'Top Community Contributors Recognition', icon: 'fa-layer-group', num: 14 },
  { id: 'my_activity_summary', title: 'Personal User Activity Dashboard', icon: 'fa-comments', num: 15 },
  { id: 'category_inventory_status', title: 'Category Inventory Status', icon: 'fa-comments', num: 16 },
  { id: 'forgotten_categories', title: 'Forgotten Categories', icon: 'fa-comments', num: 17 },
]

const standardQueries = [
  { id: 'dormant_articles_report', title: 'Dormant Articles', icon: 'fa-table' },
  { id: 'students_interests_by_faculty', title: 'Student Academic Interest Mapping', icon: 'fa-table' },
  { id: 'recommended_articles', title: 'AI-Driven Personalized Content Recommendations', icon: 'fa-table' },
  { id: 'my_reactions_history', title: 'Individual Interaction History Log', icon: 'fa-table' },
  { id: 'dormant_students_report', title: 'Inactive Student Identification', icon: 'fa-table' },
  { id: 'articles_detailed', title: 'Articles Detailed', icon: 'fa-table' },
  { id: 'interested_but_not_opened', title: 'Dormant Interest Tracker', icon: 'fa-table' },
  { id: 'pinned_articles', title: 'Pinned Articles', icon: 'fa-table' },
  { id: 'students_only', title: 'Students Only', icon: 'fa-table' },
  { id: 'user_preferences_ranked', title: 'Content Preference Analytics', icon: 'fa-table' },
  { id: 'stakeholder_access_list', title: 'Stakeholder Access List', icon: 'fa-table' },
]

const REPORT_IDS = standardReports.map(r => r.id)
const QUERY_IDS = standardQueries.map(q => q.id)

// ============================================================
// 🔧 UI Components
// ============================================================
function UIButton({ children, onClick, variant = 'default', size = 'md', className = '', disabled = false }: any) {
  const baseClasses = "font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
  const variants: any = {
    default: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20",
    outline: "border-2 border-stone-300 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300",
    ghost: "hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-600 dark:text-stone-400",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20"
  }
  const sizes: any = { sm: "px-4 py-2 text-sm", md: "px-6 py-3", lg: "px-8 py-4 text-lg" }
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {children}
    </button>
  )
}

// ============================================================
// ✅ ReportsSystem Component (معدل - بدون Send، مع Back Button)
// ============================================================
function ReportsSystem({ onBack }: { onBack: () => void }) {
  const [currentView, setCurrentView] = useState("")
  const [reportName, setReportName] = useState("")
  const [activeReport, setActiveReport] = useState<any>(null)
  const [lastFetchedData, setLastFetchedData] = useState<any>(null)
  const [displayOptions, setDisplayOptions] = useState({ table: true, bar: true, pie: false })
  const [comment, setComment] = useState("")
  const [isExporting, setIsExporting] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const barChartRef = useRef<HTMLCanvasElement>(null)
  const pieChartRef = useRef<HTMLCanvasElement>(null)
  const barChartInstance = useRef<any>(null)
  const pieChartInstance = useRef<any>(null)

  const isNoChart = noChartReports.includes(currentView)

  useEffect(() => {
    if (!currentView) return
    if (isNoChart) {
      setDisplayOptions({ table: true, bar: false, pie: false })
    } else {
      setDisplayOptions(prev => ({ ...prev, bar: true }))
    }
  }, [currentView])

  useEffect(() => {
    barChartInstance.current?.destroy()
    pieChartInstance.current?.destroy()
    if (!lastFetchedData?.length) return
    
    const keys = Object.keys(lastFetchedData[0])
    const labelKey = keys.find(k => k.includes('name') || k.includes('title') || k.includes('id')) || keys[0]
    const valueKey = keys.find(k => typeof lastFetchedData[0][k] === 'number' && k !== labelKey) || keys[1] || keys[0]
    
    const chartData = lastFetchedData.slice(0, 6)
    const labels = chartData.map((d: any) => String(d[labelKey]).substring(0, 20))
    const values = chartData.map((d: any) => Number(d[valueKey]) || 0)
    const datasetLabel = String(valueKey).replace(/_/g, ' ').toUpperCase()

    if (displayOptions.bar && barChartRef.current && !isNoChart) {
      barChartInstance.current = new Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [{ label: datasetLabel, data: values, backgroundColor: ['#00AEEF', '#F39C12', '#e74c3c', '#3498db', '#9b59b6', '#1abc9c'], barThickness: 35 }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          scales: { x: { title: { display: true, text: String(labelKey).replace(/_/g, ' ').toUpperCase() }, grid: { display: false } }, y: { title: { display: true, text: datasetLabel }, beginAtZero: true } },
          plugins: { legend: { display: false }, datalabels: { anchor: 'center', align: 'center', color: '#fff', font: { weight: 'bold' } } }
        }
      })
    }

    if (displayOptions.pie && pieChartRef.current && !isNoChart) {
      pieChartInstance.current = new Chart(pieChartRef.current, {
        type: 'pie',
        data: {
          labels,
          datasets: [{ label: datasetLabel, data: values, backgroundColor: ['#00AEEF', '#F39C12', '#e74c3c', '#3498db', '#9b59b6', '#1abc9c'] }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: {
            legend: { display: true, position: 'bottom' },
            datalabels: { anchor: 'center', align: 'center', color: '#fff', font: { weight: 'bold' }, formatter: (value: number, context: any) => { const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0); return ((Number(value) / total) * 100).toFixed(1) + "%" } }
          }
        }
      })
    }
    return () => { barChartInstance.current?.destroy(); pieChartInstance.current?.destroy() }
  }, [lastFetchedData, displayOptions, currentView, reportName, isNoChart])

  const loadReport = async (viewName: string, title: string) => {
    setLoading(true); setActiveReport(viewName); setCurrentView(viewName); setReportName(title)
    try {
      const res = await fetch(`${API_BASE_URL}/report-data/${viewName}`)
      if (!res.ok) throw new Error("Network response was not ok")
      setLastFetchedData(await res.json())
    } catch (err) { setLastFetchedData([{ error: "Demo data - server offline", status: "offline" }]) }
    finally { setLoading(false) }
  }

  const handlePrint = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (!element) return
    const clone = element.cloneNode(true) as HTMLElement
    clone.querySelectorAll('.no-print').forEach(el => el.remove())
    const printWindow = window.open('', '_blank', 'width=1200,height=800')
    if (!printWindow) return
    const content = `<!DOCTYPE html><html class="light"><head><title>Print</title><script src="https://cdn.tailwindcss.com"></script><style>@media print { body { margin: 0; padding: 20px; background: white !important; } .no-print { display: none !important; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #e2e8f0; padding: 8px; } th { background: #f8fafc; } }</style></head><body class="bg-white text-slate-900 font-sans">${clone.outerHTML}<script>window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 500); };</script></body></html>`
    printWindow.document.write(content); printWindow.document.close()
  }

  return (
    <div className="animate-in fade-in duration-300">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-stone-500 hover:text-blue-600 transition-colors font-medium">
          <ArrowLeft className="h-5 w-5" /> Back to Dashboard
        </button>
      </div>

      <div className="flex bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden min-h-[70vh] border border-stone-200 dark:border-slate-800">
        {/* Sidebar */}
        <div className="w-72 bg-slate-950 text-white p-6 overflow-y-auto border-r border-slate-800 flex-shrink-0 hidden md:block">
          <div className="text-center mb-6">
            <h2 className="text-orange-500 text-lg font-black tracking-widest uppercase">Reports Explorer</h2>
          </div>
          <div className="space-y-1">
            {standardReports.map((report: any, idx: number) => (
              <button key={report.id} onClick={() => loadReport(report.id, report.title)} className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 text-sm ${activeReport === report.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900 hover:text-white'}`}>
                <span className={`w-6 h-6 rounded flex items-center justify-center text-[10px] ${activeReport === report.id ? 'bg-white/20' : 'bg-slate-800'}`}>{report.num}</span>
                <span className="truncate">{report.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-8 bg-stone-50/50 dark:bg-slate-900/50 overflow-y-auto">
          <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-slate-800 mb-6">
            <div className="flex justify-between items-center w-full border-b-2 border-orange-500 pb-4 mb-4 px-2">
              <img src="/logoL.jpeg" alt="Faculty" className="h-12 w-auto object-contain" />
              <img src="/logoR.jpeg" alt="Newsletter" className="h-14 w-auto object-contain" />
              <img src="/logoC.jpeg" alt="MTI" className="h-12 w-auto object-contain" />
            </div>
            <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white uppercase">
              {loading ? 'Loading...' : currentView ? reportName.toUpperCase() : 'Select a Report'}
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-blue-600" /></div>
          ) : lastFetchedData ? (
            <div id={`print-report-${currentView}`} className="space-y-6">
              {/* Controls */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-wrap gap-4 items-center">
                <span className="font-bold text-sm text-blue-600">Display Options:</span>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={displayOptions.table} onChange={e => setDisplayOptions(s => ({ ...s, table: e.target.checked }))} /> Table</label>
                {!isNoChart && (<>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={displayOptions.bar} onChange={e => setDisplayOptions(s => ({ ...s, bar: e.target.checked }))} /> Bar Chart</label>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={displayOptions.pie} onChange={e => setDisplayOptions(s => ({ ...s, pie: e.target.checked }))} /> Pie Chart</label>
                </>)}
              </div>

              {/* Charts */}
              {(displayOptions.bar || displayOptions.pie) && !isNoChart && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {displayOptions.bar && <div className="bg-white p-4 rounded-xl border h-80"><canvas ref={barChartRef}></canvas></div>}
                  {displayOptions.pie && <div className="bg-white p-4 rounded-xl border h-80"><canvas ref={pieChartRef}></canvas></div>}
                </div>
              )}

              {/* Table */}
              {displayOptions.table && (
                <div className="bg-white rounded-xl border overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-slate-600 border-b">
                        <tr>{Object.keys(lastFetchedData[0] || {}).map(key => <th key={key} className="p-3 text-left font-bold">{key.replace(/_/g, ' ')}</th>)}</tr>
                      </thead>
                      <tbody className="divide-y">
                        {lastFetchedData.map((row: any, i: number) => <tr key={i}>{Object.values(row).map((val: any, j: number) => <td key={j} className="p-3">{val ?? '-'}</td>)}</tr>)}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Footer - Print Only (No Send Button) */}
              <div className="flex justify-end pt-4 border-t">
                <UIButton onClick={() => handlePrint(`print-report-${currentView}`)} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg">
                  <i className="fas fa-print mr-2"></i> Print / Export PDF
                </UIButton>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-stone-400 border-2 border-dashed rounded-2xl">
              <Database className="h-16 w-16 mb-4 opacity-20" />
              <p>Select a dataset from the sidebar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// ✅ ReportsExplorer Component (Queries) - Modified
// ============================================================
function ReportsExplorer({ onBack }: { onBack: () => void }) {
  const [lastFetchedData, setLastFetchedData] = useState<any>(null)
  const [reportTitle, setReportTitle] = useState("Select a Query")
  const [currentView, setCurrentView] = useState("")
  const [loading, setLoading] = useState(false)

  const loadQuery = async (viewName: string, title: string) => {
    setLoading(true); setCurrentView(viewName); setReportTitle(title)
    try {
      const response = await fetch(`${API_BASE_URL}/report-data/${viewName}`)
      setLastFetchedData(await response.json())
    } catch { setLastFetchedData([{ error: "Server offline" }]) }
    finally { setLoading(false) }
  }

  const handlePrint = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (!element) return
    const clone = element.cloneNode(true) as HTMLElement
    clone.querySelectorAll('.no-print').forEach(el => el.remove())
    const printWindow = window.open('', '_blank', 'width=1200,height=800')
    if (!printWindow) return
    const content = `<!DOCTYPE html><html class="light"><head><title>Print</title><script src="https://cdn.tailwindcss.com"></script><style>@media print { body { margin: 0; padding: 20px; background: white !important; } .no-print { display: none !important; } table { width: 100%; border-collapse: collapse; } th, td { border: 1px solid #e2e8f0; padding: 8px; } th { background: #f8fafc; } }</style></head><body class="bg-white text-slate-900 font-sans">${clone.outerHTML}<script>window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 500); };</script></body></html>`
    printWindow.document.write(content); printWindow.document.close()
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-stone-500 hover:text-blue-600 transition-colors font-medium">
          <ArrowLeft className="h-5 w-5" /> Back to Dashboard
        </button>
      </div>

      <div className="flex bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden min-h-[70vh] border border-stone-200 dark:border-slate-800">
        <div className="w-72 bg-slate-950 text-white p-6 overflow-y-auto border-r border-slate-800 flex-shrink-0 hidden md:block">
          <h2 className="text-orange-500 text-lg font-black tracking-widest uppercase text-center mb-6">Queries Explorer</h2>
          <div className="space-y-1">
            {standardQueries.map((q: any, i: number) => (
              <button key={q.id} onClick={() => loadQuery(q.id, q.title)} className={`w-full text-left p-3 rounded-lg transition-all text-sm ${currentView === q.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-900'}`}>
                {i + 1}. {q.title}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 p-6 md:p-8 bg-stone-50/50 dark:bg-slate-900/50 overflow-y-auto">
          <div className="bg-white p-6 rounded-2xl shadow-sm border mb-6 text-center">
            <h2 className="text-xl font-bold uppercase text-slate-800">{reportTitle}</h2>
          </div>

          {loading ? <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin" /></div> : lastFetchedData ? (
            <div id={`print-query-${currentView}`} className="space-y-6">
              <div className="bg-white rounded-xl border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600 border-b">
                      <tr>{Object.keys(lastFetchedData[0] || {}).map(key => <th key={key} className="p-3 text-left font-bold">{key.replace(/_/g, ' ')}</th>)}</tr>
                    </thead>
                    <tbody className="divide-y">
                      {lastFetchedData.map((row: any, i: number) => <tr key={i}>{Object.values(row).map((val: any, j: number) => <td key={j} className="p-3">{val ?? '-'}</td>)}</tr>)}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t">
                <UIButton onClick={() => handlePrint(`print-query-${currentView}`)} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow-lg">
                  <i className="fas fa-print mr-2"></i> Print / Export PDF
                </UIButton>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 text-stone-400 border-2 border-dashed rounded-2xl">
              <Database className="h-16 w-16 mb-4 opacity-20" />
              <p>Select a query from the sidebar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 🔧 Article Types & Mock Data
// ============================================================
type Article = {
  article_id: number; title: string; summary: string; category: string;
  status: 'pending' | 'approved' | 'rejected'; image: string | null;
  published_at: string | null; created_at: string; written_by_adviser: boolean
}
type Tab = 'pending' | 'approved' | 'rejected' | 'mine'

const MOCK_ARTICLES: Article[] = [
  { article_id: 1, title: "AI Detects Early Signs of Campus Issues", summary: "Infrastructure monitoring system...", category: "tech", status: "pending", image: null, published_at: null, created_at: "2026-04-01T10:00:00Z", written_by_adviser: false },
  { article_id: 2, title: "MTI Research Team Climate Study", summary: "Urban heat islands study...", category: "research", status: "pending", image: null, published_at: null, created_at: "2026-04-01T08:30:00Z", written_by_adviser: false },
  { article_id: 3, title: "Annual Sports Day", summary: "Competitions planned...", category: "sports", status: "pending", image: null, published_at: null, created_at: "2026-03-31T14:00:00Z", written_by_adviser: false },
  { article_id: 4, title: "New Library Wing", summary: "Digital resources wing...", category: "announcements", status: "approved", image: null, published_at: "2026-03-30T09:00:00Z", created_at: "2026-03-29T11:00:00Z", written_by_adviser: false },
  { article_id: 5, title: "Blockchain Workshop", summary: "CS students workshop...", category: "tech", status: "rejected", image: null, published_at: null, created_at: "2026-03-28T10:00:00Z", written_by_adviser: false },
  { article_id: 6, title: "Welcome Message", summary: "Adviser welcome note...", category: "announcements", status: "approved", image: null, published_at: "2026-03-27T12:00:00Z", created_at: "2026-03-27T10:00:00Z", written_by_adviser: true },
]

const TAB_CONFIG: Record<Tab, { label: string; icon: React.ReactNode; color: string }> = {
  pending: { label: "Pending Review", icon: <Clock className="h-4 w-4" />, color: "text-amber-600 dark:text-amber-400" },
  approved: { label: "Approved", icon: <CheckCircle className="h-4 w-4" />, color: "text-emerald-600 dark:text-emerald-400" },
  rejected: { label: "Rejected", icon: <XCircle className="h-4 w-4" />, color: "text-red-600 dark:text-red-400" },
  mine: { label: "My Articles", icon: <FileText className="h-4 w-4" />, color: "text-indigo-600 dark:text-indigo-400" },
}
const CATEGORY_LABELS: Record<string, string> = { events: "Campus Events", sports: "Sports", tech: "Technology", research: "Research", announcements: "Announcements", clubs: "Student Clubs" }
const STATUS_BADGE: Record<string, string> = { pending: "bg-amber-100 text-amber-800", approved: "bg-emerald-100 text-emerald-800", rejected: "bg-red-100 text-red-800" }

// ============================================================
// ✅ MAIN COMPONENT
// ============================================================
export default function MediaAdviserDashboard() {
  const router = useRouter()
  const [activePage, setActivePage] = useState<'home' | 'reports' | 'queries'>('home')
  const [activeTab, setActiveTab] = useState<Tab>('pending')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<number | null>(null)

  useEffect(() => {
    setTimeout(() => { setArticles(MOCK_ARTICLES); setLoading(false) }, 800)
  }, [])

  const handleApprove = (id: number) => {
    setActionLoading(id); setTimeout(() => { setArticles(p => p.map(a => a.article_id === id ? { ...a, status: 'approved' } : a)); setActionLoading(null) }, 600)
  }
  const handleReject = (id: number) => {
    setActionLoading(id); setTimeout(() => { setArticles(p => p.map(a => a.article_id === id ? { ...a, status: 'rejected' } : a)); setActionLoading(null) }, 600)
  }

  const filteredArticles = articles.filter(a => activeTab === 'mine' ? a.written_by_adviser : a.status === activeTab)
  const counts = { pending: articles.filter(a => a.status === 'pending').length, approved: articles.filter(a => a.status === 'approved').length, rejected: articles.filter(a => a.status === 'rejected').length, mine: articles.filter(a => a.written_by_adviser).length }

  return (
    <div className="min-h-screen bg-[#f8f5f0] dark:bg-slate-950 font-serif">
      
      {/* ✅ Navbar - Visible Always */}
      <nav className="bg-white dark:bg-slate-900 shadow-md border-b border-stone-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-purple-600 flex items-center gap-2">
            <i className="fas fa-bullhorn"></i> Media Adviser
          </div>
          <div className="flex items-center gap-4">
            {[{ id: 'home', label: 'Home', icon: 'home' }, { id: 'reports', label: 'Reports', icon: 'file-alt' }, { id: 'queries', label: 'Queries', icon: 'database' }].map(page => (
              <button key={page.id} onClick={() => setActivePage(page.id as any)} className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${activePage === page.id ? 'bg-purple-600 text-white shadow-lg' : 'text-stone-600 hover:bg-stone-100'}`}>
                <i className={`fas fa-${page.icon}`}></i> {page.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ✅ Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {activePage === 'home' && (
          <>
            <div className="flex justify-between items-center mb-8 border-b pb-6">
              <div>
                <h1 className="text-3xl font-black uppercase text-stone-900">Article Management</h1>
                <p className="text-stone-500 mt-1">Review and manage campus articles.</p>
              </div>
              <div className="flex gap-3">
                <Button onClick={() => router.push('/media-adviser/write/article')} className="bg-indigo-600 text-white rounded-xl"><Newspaper className="h-4 w-4 mr-2" />Write Article</Button>
                <Button variant="outline" className="rounded-xl"><Megaphone className="h-4 w-4 mr-2" />Write Announcement</Button>
              </div>
            </div>

            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {(Object.keys(TAB_CONFIG) as Tab[]).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold border transition-all ${activeTab === tab ? 'bg-stone-900 text-white border-stone-900' : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'}`}>
                  {TAB_CONFIG[tab].icon} {TAB_CONFIG[tab].label} <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{counts[tab]}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {loading ? <div className="flex justify-center py-20"><Loader2 className="h-10 w-10 animate-spin text-indigo-600" /></div> : filteredArticles.map(article => (
                <div key={article.article_id} className="bg-white rounded-xl border border-stone-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${STATUS_BADGE[article.status]}`}>{article.status.toUpperCase()}</span>
                        <span className="px-2 py-1 rounded text-xs bg-stone-100 text-stone-600">{CATEGORY_LABELS[article.category]}</span>
                      </div>
                      <h3 className="text-lg font-bold text-stone-900 mb-1">{article.title}</h3>
                      <p className="text-stone-500 text-sm line-clamp-2">{article.summary}</p>
                    </div>
                    {article.status === 'pending' && (
                      <div className="flex gap-2 shrink-0">
                        <Button onClick={() => handleApprove(article.article_id)} disabled={actionLoading === article.article_id} className="bg-emerald-600 text-white h-10 px-4"><ThumbsUp className="h-4 w-4 mr-2" />Approve</Button>
                        <Button onClick={() => handleReject(article.article_id)} disabled={actionLoading === article.article_id} variant="outline" className="border-red-400 text-red-600 h-10 px-4"><ThumbsDown className="h-4 w-4 mr-2" />Reject</Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activePage === 'reports' && <ReportsSystem onBack={() => setActivePage('home')} />}
        {activePage === 'queries' && <ReportsExplorer onBack={() => setActivePage('home')} />}

      </div>
    </div>
  )
}