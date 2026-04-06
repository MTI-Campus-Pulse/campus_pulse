import React, { useState, useEffect, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// --- Register Chart.js Plugin ---
Chart.register(ChartDataLabels);

// --- Constants & Config ---
const SUPABASE_URL = 'https://imlydashdkziznmjhfgy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltbHlkYXNoZGt6aXpubWpoZmd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyOTI2MDEsImV4cCI6MjA4NTg2ODYwMX0.MR0PyzmIwXlz06HOhyZt9dYypL9BV4YboVqbpuEAF-8';
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
const API_BASE_URL = "http://127.0.0.1:8000/api";

const noChartReports = ['student_interests', 'dormant_articles_report', 'dormant_students_report', 'my_reactions_history', 'my_activity_summary'];

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
];

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
];

const REPORT_IDS = [
  'faculty_engagement_league', 'monthly_user_growth', 'category_popularity',
  'content_impact_report', 'monthly_newsletter_simple', 'monthly_feedback_simple',
  'stakeholder_interaction_gap', 'stakeholders_report_count', 'most_active_category',
  'monthly_category_activity', 'top_engaged_newsletters', 'top_5_rated_newsletters',
  'engagement_hourly_pattern', 'top_10_feedback_users', 'my_activity_summary',
  'category_inventory_status', 'forgotten_categories'
];

const QUERY_IDS = [
  'dormant_articles_report', 'students_interests_by_faculty', 'recommended_articles',
  'my_reactions_history', 'dormant_students_report', 'articles_detailed',
  'interested_but_not_opened', 'pinned_articles', 'students_only',
  'user_preferences_ranked', 'stakeholder_access_list'
];

const getItemType = (viewName: string): 'report' | 'query' | 'unknown' => {
  if (REPORT_IDS.includes(viewName)) return 'report';
  if (QUERY_IDS.includes(viewName)) return 'query';
  return 'unknown';
};

// ✅ Mapping - تم إزالة media_adviser
const ROLE_TO_STAKEHOLDER_ID: Record<string, number> = {
  'ministry': 1,
  'supreme_council': 2,
  'council': 3,
  'quality': 4,
  'president': 5,
  'naqaae': 6,
  'admin': 7,
};

// ✅ Available Recipients - تم إزالة Media Adviser
const AVAILABLE_RECIPIENTS = [
  { id: 1, name: 'Ministry of Higher Education', component: 'ministry' },
  { id: 2, name: 'Supreme Council', component: 'supreme_council' },
  { id: 3, name: 'Council of Private Universities', component: 'council' },
  { id: 4, name: 'Quality Assurance', component: 'quality' },
  { id: 5, name: 'University President', component: 'president' },
  { id: 6, name: 'NAQAAE', component: 'naqaae' },
];

function Button({ children, onClick, variant = 'default', size = 'md', className = '', disabled = false }: any) {
  const baseClasses = "font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2";
  const variants: any = {
    default: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20",
    outline: "border-2 border-stone-300 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-700 dark:text-stone-300",
    ghost: "hover:bg-stone-100 dark:hover:bg-slate-800 text-stone-600 dark:text-stone-400",
    success: "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-900/20",
    danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20"
  };
  const sizes: any = { sm: "px-4 py-2 text-sm", md: "px-6 py-3", lg: "px-8 py-4 text-lg" };
  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

function SendReportModal({ reportData, reportName, onClose, onSuccess }: {
  reportData: any;
  reportName: string;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [selectedRecipients, setSelectedRecipients] = useState<number[]>([]);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const toggleRecipient = (recipientId: number) => {
    setSelectedRecipients(prev => 
      prev.includes(recipientId) 
        ? prev.filter(id => id !== recipientId)
        : [...prev, recipientId]
    );
  };

  const handleSend = async () => {
    if (selectedRecipients.length === 0) {
      setMessage('Please select at least one recipient');
      return;
    }

    setSending(true);
    setMessage('');
    
    const formattedReportData = {
      table: reportData,
      charts: [],
      comment: '',
      reportTitle: reportName,
      generatedAt: new Date().toISOString()
    };

    const insertsData = selectedRecipients.map(stakeholderId => ({
      stakeholder_id: stakeholderId,
      view_name: reportName,
      report_name: reportName,
      report_data: formattedReportData,
      sent_by: 'manager',
      assigned_at: new Date().toISOString(),
      is_read: false
    }));

    const { error } = await supabaseClient
      .from('report_permissions')
      .insert(insertsData);
    
    if (error) {
      setMessage('Error sending reports: ' + error.message);
    } else {
      setMessage(`✅ Successfully sent to ${selectedRecipients.length} recipient(s)`);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);
    }
    setSending(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            📤 Send Report: {reportName.replace(/_/g, ' ').toUpperCase()}
          </h2>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-600 text-2xl">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-slate-700 dark:text-slate-300 mb-4">Select Recipients:</h3>
          <div className="grid grid-cols-2 gap-3">
            {AVAILABLE_RECIPIENTS.map(recipient => (
              <label 
                key={recipient.id}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedRecipients.includes(recipient.id)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-stone-200 dark:border-slate-700 hover:border-blue-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedRecipients.includes(recipient.id)}
                  onChange={() => toggleRecipient(recipient.id)}
                  className="w-5 h-5 rounded text-blue-600"
                />
                <div>
                  <div className="font-bold text-slate-800 dark:text-white">{recipient.name}</div>
                  <div className="text-xs text-stone-500">{recipient.component}</div>
                </div>
              </label>
            ))}
          </div>
        </div> 
        {message && (
          <div className={`p-4 rounded-xl mb-4 ${
            message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <div className="flex gap-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            variant="default"
            onClick={handleSend} 
            disabled={sending || selectedRecipients.length === 0}
            className="flex-1"
          >
            {sending ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-paper-plane"></i>}
            {sending ? 'Sending...' : `Send to ${selectedRecipients.length} Recipient(s)`}
          </Button>
        </div>
      </div>
    </div>
  );
}

function InnerQueryManager({ onBack }: { onBack?: () => void }) {
  const [op, setOp] = useState('add');
  const [queries, setQueries] = useState<any[]>([]);
  const [selectedQ, setSelectedQ] = useState('');
  const [qName, setQName] = useState('');
  const [qText, setQText] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const { data } = await supabaseClient.from('queries').select('*');
    if (data) setQueries(data);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const handleAction = async () => {
    if (!qName && op === 'add') { setMsg('❌ Please enter a query name'); return; }
    if (!qText) { setMsg('❌ Please enter SQL logic'); return; }
    if (!selectedQ && op !== 'add') { setMsg('❌ Please select a query'); return; }
    
    setLoading(true);
    setMsg('⏳ Processing...');
    let error;
    
    if (op === 'add') {
      const { error: e } = await supabaseClient.from('queries').insert([{ query_name: qName, query_text: qText, db_type: 'PostgreSQL' }]);
      error = e;
    } else if (op === 'update') {
      const { error: e } = await supabaseClient.from('queries').update({ query_text: qText }).eq('query_name', selectedQ);
      error = e;
    } else {
      const { error: e } = await supabaseClient.from('queries').delete().eq('query_name', selectedQ);
      error = e;
    }
    
    if (error) setMsg('❌ Error: ' + error.message);
    else { 
      setMsg('✅ Success!'); 
      setQName(''); 
      setQText(''); 
      setSelectedQ('');
      refresh(); 
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 mb-6">
        {onBack && (
          <Button variant="ghost" onClick={onBack} size="sm">
            <i className="fas fa-arrow-left mr-2"></i>Back
          </Button>
        )}
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">⚙️ Query Management</h2>
      </div>
      
      <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-sm">
        <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl mb-6">
          {['add', 'update', 'delete'].map(m => (
            <button 
              key={m} 
              onClick={() => { setOp(m); setMsg(''); }} 
              className={`flex-1 py-3 rounded-lg text-sm font-bold capitalize transition-all ${
                op === m ? 'bg-white dark:bg-slate-800 shadow text-blue-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <i className={`fas fa-${m === 'add' ? 'plus' : m === 'update' ? 'edit' : 'trash'} mr-2`}></i>
              {m}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {op === 'add' ? (
            <input 
              placeholder="Query Name (e.g., monthly_sales)" 
              value={qName} 
              onChange={e => setQName(e.target.value)} 
              className="w-full p-4 rounded-xl border border-stone-200 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          ) : (
            <select 
              value={selectedQ} 
              onChange={e => {
                setSelectedQ(e.target.value);
                const q = queries.find((i: any) => i.query_name === e.target.value);
                setQText(q?.query_text || '');
              }} 
              className="w-full p-4 rounded-xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Query...</option>
              {queries.map((q: any) => <option key={q.id} value={q.query_name}>{q.query_name}</option>)}
            </select>
          )}
          
          <textarea 
            placeholder="Enter SQL query here..." 
            value={qText} 
            onChange={e => setQText(e.target.value)} 
            rows={8} 
            className="w-full p-4 rounded-xl border border-stone-200 dark:border-slate-700 font-mono text-sm bg-stone-50 dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          
          <Button 
            onClick={handleAction} 
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white ${
              op === 'delete' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className={`fas fa-${op === 'add' ? 'plus' : op === 'update' ? 'save' : 'trash'}`}></i>}
            {loading ? 'Processing...' : `Submit ${op === 'add' ? 'New Query' : op === 'update' ? 'Update' : 'Delete'}`}
          </Button>
          
          {msg && (
            <p className={`text-center text-sm font-bold mt-4 p-3 rounded-xl ${
              msg.includes('✅') ? 'bg-green-100 text-green-700' : 
              msg.includes('❌') ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {msg}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function QueriesViewer({ userRole = 'admin', onBack }: { userRole?: string; onBack?: () => void }) {
  const [queries, setQueries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuery, setSelectedQuery] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const ROLE_TO_STAKEHOLDER_ID: Record<string, number> = {
    'ministry': 1, 'supreme_council': 2, 'council': 3,
    'quality': 4, 'president': 5, 'naqaae': 6,
    'admin': 7
  };

  useEffect(() => {
    fetchQueries();
  }, [userRole]);

  const fetchQueries = async () => {
    setLoading(true);
    const stakeholderId = ROLE_TO_STAKEHOLDER_ID[userRole];

    if (!stakeholderId) {
      setQueries([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabaseClient
      .from('report_permissions')
      .select('*')
      .eq('stakeholder_id', stakeholderId)
      .order('assigned_at', { ascending: false });
    
    if (data) {
      const filteredQueries = data
        .filter(item => {
          const name = item.report_name || item.view_name;
          return QUERY_IDS.includes(name); 
        })
        .reduce((acc: any[], current) => {
          const name = current.report_name || current.view_name;
          const existing = acc.find(item => 
            (item.report_name || item.view_name) === name
          );
          
          if (!existing || new Date(current.assigned_at) > new Date(existing.assigned_at)) {
            const index = acc.findIndex(item => 
              (item.report_name || item.view_name) === name
            );
            if (index !== -1) acc.splice(index, 1);
            acc.push(current);
          }
          return acc;
        }, []);
      
      setQueries(filteredQueries);
    }
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    await supabaseClient
      .from('report_permissions')
      .update({ is_read: true })
      .eq('id', id);
    fetchQueries();
  };

  const openQuery = (query: any) => {
    setSelectedQuery(query);
    setShowModal(true);
    if (!query.is_read) markAsRead(query.id);
  };

  const handlePrint = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    const clone = element.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('.no-print').forEach(el => el.remove());
    const printWindow = window.open('', '_blank', 'width=1200,height=800');
    if (!printWindow) return;
    const content = `
      <!DOCTYPE html><html class="light"><head><title>Print Query</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>@media print { body { margin: 0; padding: 20px; background: white !important; color: black !important; } .no-print { display: none !important; } @page { margin: 1.5cm; size: A4; } table { width: 100%; border-collapse: collapse; page-break-inside: auto; } th, td { border: 1px solid #e2e8f0; padding: 8px; } th { background: #f8fafc; font-weight: bold; } }</style>
      </head><body class="bg-white text-slate-900 font-sans">${clone.outerHTML}
      <script>window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 500); };</script></body></html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-6xl mx-auto pb-12">
        
        {onBack && (
          <div className="sticky top-0 z-[60] bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="px-6 py-4">
              <button 
                onClick={onBack}
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-slate-700 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-400 rounded-xl font-medium transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700"
              >
                <i className="fas fa-arrow-left text-sm"></i>
                <span>Back to Dashboard</span>
              </button>
            </div>
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            
            <div className="p-8 border-b border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center border-b-2 border-purple-500/80 pb-6 mb-6">
                <img src="/logoL.jpeg" alt="Faculty Logo" className="h-14 w-auto object-contain" />
                <img src="/logoR.jpeg" alt="Newsletter Logo" className="h-16 w-auto object-contain" />
                <img src="/logoC.jpeg" alt="MTI Logo" className="h-14 w-auto object-contain" />
              </div>
              
              <div className='text-center'>
                <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">
                  Database Queries
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base">
                  View queries sent to <span className="font-semibold text-purple-600 dark:text-purple-400 capitalize">{userRole.replace('_', ' ')}</span>
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-200 dark:border-slate-700"></div>
                </div>
              ) : queries.length === 0 ? (
                <div className="p-16 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-lg">No queries received yet</p>
                </div>
              ) : (
                queries.map((query) => {
                  const safeQueryName = query.report_name || query.view_name || 'Untitled Query';
                  return (
                    <div 
                      key={query.id}
                      onClick={() => openQuery(query)}
                      className={`group p-6 cursor-pointer transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                        !query.is_read ? 'bg-purple-50/30 dark:bg-purple-900/5' : 'bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {safeQueryName.replace(/_/g, ' ').toUpperCase()}
                            </h3>
                            {!query.is_read && (
                              <span className="inline-flex items-center px-3 py-1 bg-purple-500 text-white rounded-full text-xs font-bold">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Sent: {new Date(query.assigned_at).toLocaleString('en-US', { 
                              dateStyle: 'medium', 
                              timeStyle: 'short' 
                            })}
                          </p>
                        </div>
                        <i className="fas fa-chevron-right text-slate-400 group-hover:text-purple-500 transition-colors mt-1"></i>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {showModal && selectedQuery && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[80]"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowModal(false);
            }}
          >
            <div id={`print-query-${selectedQuery.id}`} className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
              
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-500 hover:text-red-600 rounded-xl flex items-center justify-center transition-all duration-200 z-10 no-print"
              >
                <i className="fas fa-times text-lg"></i>
              </button>

              <div className="p-8">
                <div className="flex justify-between items-center border-b-2 border-purple-500/80 pb-6 mb-6">
                  <img src="/logoL.jpeg" alt="Faculty Logo" className="h-14 w-auto object-contain" />
                  <img src="/logoR.jpeg" alt="Newsletter Logo" className="h-16 w-auto object-contain" />
                  <img src="/logoC.jpeg" alt="MTI Logo" className="h-14 w-auto object-contain" />
                </div>

                <div className="mb-8 pb-6 border-b-2 border-slate-200 dark:border-slate-800 text-center">
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">
                    {(selectedQuery.report_name || selectedQuery.view_name || 'Query').replace(/_/g, ' ').toUpperCase()}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Sent: {new Date(selectedQuery.assigned_at).toLocaleString('en-US', { 
                      dateStyle: 'medium', 
                      timeStyle: 'short' 
                    })}
                  </p>
                </div>

                {selectedQuery.report_data && (
                  <div className="bg-white dark:bg-slate-950 rounded-2xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800">
                          <tr>
                            {Object.keys(
                              Array.isArray(selectedQuery.report_data) 
                                ? selectedQuery.report_data[0] 
                                : selectedQuery.report_data.table?.[0] || {}
                            ).map(key => (
                              <th key={key} className="p-4 text-left font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs">
                                {key.replace(/_/g, ' ')}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {(Array.isArray(selectedQuery.report_data) 
                            ? selectedQuery.report_data 
                            : selectedQuery.report_data.table || []
                          ).map((row: any, i: number) => (
                            <tr key={i} className="hover:bg-purple-50/50 dark:hover:bg-purple-900/10">
                              {Object.values(row).map((val: any, j: number) => (
                                <td key={j} className="p-4 text-slate-600 dark:text-slate-400">
                                  {val ?? '-'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t-2 border-slate-200 dark:border-slate-800 flex justify-end gap-3 no-print">
                  <Button variant="outline" onClick={() => setShowModal(false)} className="px-6 py-3">
                    Close
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handlePrint(`print-query-${selectedQuery.id}`)}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700"
                  >
                    <i className="fas fa-print mr-2"></i>
                    Print / Save PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ReportsViewer({ userRole = 'admin', onBack }: { userRole?: string; onBack?: () => void }) {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const ROLE_TO_STAKEHOLDER_ID: Record<string, number> = {
    'ministry': 1, 'supreme_council': 2, 'council': 3,
    'quality': 4, 'president': 5, 'naqaae': 6,
    'admin': 7
  };

  useEffect(() => {
    fetchReports();
  }, [userRole]);

  const fetchReports = async () => {
    setLoading(true);
    const stakeholderId = ROLE_TO_STAKEHOLDER_ID[userRole];

    if (!stakeholderId) {
      setReports([]);
      setLoading(false);
      return;
    }

    const { data, error } = await supabaseClient
      .from('report_permissions')
      .select('*')
      .eq('stakeholder_id', stakeholderId)
      .order('assigned_at', { ascending: false });
    
    if (data) {
      const filteredReports = data
        .filter(item => {
          const name = item.report_name || item.view_name;
          return REPORT_IDS.includes(name);
        })
        .reduce((acc: any[], current) => {
          const name = current.report_name || current.view_name;
          const existing = acc.find(item => 
            (item.report_name || item.view_name) === name
          );
          
          if (!existing || new Date(current.assigned_at) > new Date(existing.assigned_at)) {
            const index = acc.findIndex(item => 
              (item.report_name || item.view_name) === name
            );
            if (index !== -1) acc.splice(index, 1);
            acc.push(current);
          }
          return acc;
        }, []);
      
      setReports(filteredReports);
    }
    setLoading(false);
  };

  const markAsRead = async (id: string) => {
    await supabaseClient
      .from('report_permissions')
      .update({ is_read: true })
      .eq('id', id);
    fetchReports();
  };

  const openReport = (report: any) => {
    setSelectedReport(report);
    setShowModal(true);
    if (!report.is_read) markAsRead(report.id);
  };

  const handlePrint = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    const clone = element.cloneNode(true) as HTMLElement;
    clone.querySelectorAll('.no-print').forEach(el => el.remove());
    const printWindow = window.open('', '_blank', 'width=1200,height=800');
    if (!printWindow) return;
    const content = `
      <!DOCTYPE html><html class="light"><head><title>Print Report</title>
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
      <style>@media print { body { margin: 0; padding: 20px; background: white !important; color: black !important; } .no-print { display: none !important; } @page { margin: 1.5cm; size: A4; } table { width: 100%; border-collapse: collapse; page-break-inside: auto; } th, td { border: 1px solid #e2e8f0; padding: 8px; } th { background: #f8fafc; font-weight: bold; } }</style>
      </head><body class="bg-white text-slate-900 font-sans">${clone.outerHTML}
      <script>window.onload = () => { setTimeout(() => { window.print(); window.close(); }, 500); };</script></body></html>
    `;
    printWindow.document.write(content);
    printWindow.document.close();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-6xl mx-auto pb-12">
        
        {onBack && (
          <div className="sticky top-0 z-[60] bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="px-6 py-4">
              <button 
                onClick={onBack}
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 rounded-xl font-medium transition-all duration-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700"
              >
                <i className="fas fa-arrow-left text-sm"></i>
                <span>Back to Dashboard</span>
              </button>
            </div>
          </div>
        )}

        <div className="p-6 md:p-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            
            <div className="p-8 border-b border-slate-200 dark:border-slate-800">
              <div className="flex justify-between items-center border-b-2 border-orange-500/80 pb-6 mb-6">
                <img src="/logoL.jpeg" alt="Faculty Logo" className="h-14 w-auto object-contain" />
                <img src="/logoR.jpeg" alt="Newsletter Logo" className="h-16 w-auto object-contain" />
                <img src="/logoC.jpeg" alt="MTI Logo" className="h-14 w-auto object-contain" />
              </div>
              
              <div className='text-center'>
                <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-2 tracking-tight">
                  Received Reports
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-base">
                  View reports sent to <span className="font-semibold text-blue-600 dark:text-blue-400 capitalize">{userRole.replace('_', ' ')}</span>
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 dark:border-slate-700"></div>
                </div>
              ) : reports.length === 0 ? (
                <div className="p-16 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-lg">No reports received yet</p>
                </div>
              ) : (
                reports.map((report) => {
                  const safeReportName = report.report_name || report.view_name || 'Untitled Report';
                  return (
                    <div 
                      key={report.id}
                      onClick={() => openReport(report)}
                      className={`group p-6 cursor-pointer transition-all duration-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                        !report.is_read ? 'bg-blue-50/30 dark:bg-blue-900/5' : 'bg-white dark:bg-slate-900'
                      }`}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {safeReportName.replace(/_/g, ' ').toUpperCase()}
                            </h3>
                            {!report.is_read && (
                              <span className="inline-flex items-center px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">
                                NEW
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Sent: {new Date(report.assigned_at).toLocaleString('en-US', { 
                              dateStyle: 'medium', 
                              timeStyle: 'short' 
                            })}
                          </p>
                        </div>
                        <i className="fas fa-chevron-right text-slate-400 group-hover:text-blue-500 transition-colors mt-1"></i>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {showModal && selectedReport && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[80]"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowModal(false);
            }}
          >
            <div id={`print-report-${selectedReport.id}`} className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
              
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-red-100 dark:hover:bg-red-900/30 text-slate-500 hover:text-red-600 rounded-xl flex items-center justify-center transition-all duration-200 z-10 no-print"
              >
                <i className="fas fa-times text-lg"></i>
              </button>

              <div className="p-8">
                <div className="flex justify-between items-center border-b-2 border-orange-500/80 pb-6 mb-6">
                  <img src="/logoL.jpeg" alt="Faculty Logo" className="h-14 w-auto object-contain" />
                  <img src="/logoR.jpeg" alt="Newsletter Logo" className="h-16 w-auto object-contain" />
                  <img src="/logoC.jpeg" alt="MTI Logo" className="h-14 w-auto object-contain" />
                </div>

                <div className="mb-8 pb-6 border-b-2 border-slate-200 dark:border-slate-800 text-center">
                  <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-2">
                    {(selectedReport.report_name || selectedReport.view_name || 'Report').replace(/_/g, ' ').toUpperCase()}
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Sent: {new Date(selectedReport.assigned_at).toLocaleString('en-US', { 
                      dateStyle: 'medium', 
                      timeStyle: 'short' 
                    })}
                  </p>
                </div>

                {selectedReport.report_data?.table && (
                  <div className="bg-white dark:bg-slate-950 rounded-2xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800">
                          <tr>
                            {Object.keys(selectedReport.report_data.table[0] || {}).map(key => (
                              <th key={key} className="p-4 text-left font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs">
                                {key.replace(/_/g, ' ')}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {selectedReport.report_data.table.map((row: any, i: number) => (
                            <tr key={i} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10">
                              {Object.values(row).map((val: any, j: number) => (
                                <td key={j} className="p-4 text-slate-600 dark:text-slate-400">
                                  {val ?? '-'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {selectedReport.report_data && !selectedReport.report_data.table && Array.isArray(selectedReport.report_data) && (
                  <div className="bg-white dark:bg-slate-950 rounded-2xl border-2 border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800">
                          <tr>
                            {Object.keys(selectedReport.report_data[0] || {}).map(key => (
                              <th key={key} className="p-4 text-left font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-xs">
                                {key.replace(/_/g, ' ')}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {selectedReport.report_data.map((row: any, i: number) => (
                            <tr key={i} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10">
                              {Object.values(row).map((val: any, j: number) => (
                                <td key={j} className="p-4 text-slate-600 dark:text-slate-400">
                                  {val ?? '-'}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t-2 border-slate-200 dark:border-slate-800 flex justify-end gap-3 no-print">
                  <Button variant="outline" onClick={() => setShowModal(false)} className="px-6 py-3">
                    Close
                  </Button>
                  <Button
                    variant="default"
                    onClick={() => handlePrint(`print-report-${selectedReport.id}`)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700"
                  >
                    <i className="fas fa-print mr-2"></i>
                    Print / Save PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

function ReportsExplorer({ onBack }: { onBack?: () => void }) {
  const [dynamicQueries, setDynamicQueries] = useState<any[]>([]);
  const [lastFetchedData, setLastFetchedData] = useState<any>(null);
  const [reportTitle, setReportTitle] = useState("Select a Query from the sidebar");
  const [currentView, setCurrentView] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [showQueryManager, setShowQueryManager] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);

  useEffect(() => {
    const fetchQueries = async () => {
      const { data, error } = await supabaseClient.from('queries').select('*');
      if (data) setDynamicQueries(data);
      if (error) console.error("Error fetching queries:", error);
    };
    fetchQueries();
  }, []);

  const loadStandardReport = async (viewName: string, title: string) => {
    setShowQueryManager(false);
    setLoading(true);
    setCurrentView(viewName);
    setReportTitle(title);
    try {
      const response = await fetch(`${API_BASE_URL}/report-data/${viewName}`);
      const data = await response.json();
      setLastFetchedData(data);
    } catch (error) {
      setLastFetchedData([{ error: "FastAPI server not reachable - showing demo data", status: "offline" }]);
    } finally {
      setLoading(false);
    }
  };

  const loadDynamicReport = async (name: string, sqlText: string) => {
    setShowQueryManager(false);
    setLoading(true);
    setCurrentView(name);
    setReportTitle(name);
    try {
      const { data, error } = await supabaseClient.rpc('execute_sql', { sql_query: sqlText });
      if (error) throw error;
      setLastFetchedData(Array.isArray(data) ? data : [data]);
    } catch (err: any) {
      setLastFetchedData([{ error: err.message, status: "SQL Error" }]);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!currentView) return alert("Please select a report first.");
    setIsExporting(true);
    const url = `${API_BASE_URL}/generate-pdf/${currentView}?comment=${encodeURIComponent(comment)}&include=table`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const blob = await response.blob();
        const dUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = dUrl;
        a.download = `${currentView}_Report.pdf`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        alert("Server error during PDF generation.");
      }
    } catch (e) {
      alert("Connection error - PDF download simulated");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden min-h-[85vh] border border-stone-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-80 bg-slate-950 text-white p-6 overflow-y-auto border-r border-slate-800 flex-shrink-0">
        <div className="text-center mb-8">
          <h2 className="text-orange-500 text-xl font-black tracking-widest uppercase">Queries Explorer</h2>
          <div className="h-1 w-12 bg-blue-500 mx-auto mt-2 rounded-full"></div>
        </div>
        
        <div className="space-y-6">
          <button
            onClick={() => setShowQueryManager(true)}
            className="w-full mb-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 p-4 rounded-2xl flex items-center gap-3 border border-blue-500 transition-all group shadow-lg shadow-blue-900/30"
          >
            <span className="text-2xl group-hover:rotate-90 transition-transform">⚙️</span>
            <div className="text-left">
              <div className="text-sm font-bold text-white">Manage Queries</div>
              <div className="text-xs text-blue-200">Add, Edit, Delete SQL Queries</div>
            </div>
          </button>

          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">Standard Queries</div>
            <div className="space-y-2">
              {standardQueries.map((report: any, index: number) => (
                <button
                  key={report.id}
                  onClick={() => loadStandardReport(report.id, report.title)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 text-sm group ${
                    currentView === report.id && !showQueryManager 
                    ? 'bg-blue-600 shadow-lg shadow-blue-900/20' 
                    : 'hover:bg-slate-900 border border-transparent hover:border-slate-800'
                  }`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] group-hover:bg-blue-500 transition-colors">
                    {index + 1}
                  </span>
                  <span className={currentView === report.id && !showQueryManager ? 'font-bold text-white' : 'text-slate-400 group-hover:text-white'}>
                    {report.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {dynamicQueries.length > 0 && (
            <div>
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2 border-t border-slate-800 pt-6">Dynamic Database Queries</div>
              <div className="space-y-2">
                {dynamicQueries.map((q: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => loadDynamicReport(q.query_name, q.query_text)}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 text-sm group ${
                      currentView === q.query_name && !showQueryManager 
                      ? 'bg-orange-600 shadow-lg shadow-orange-900/20' 
                      : 'hover:bg-slate-900 border border-transparent hover:border-slate-800'
                    }`}
                  >
                    <i className="fas fa-database text-blue-400 text-xs"></i>
                    <span className="truncate">{q.query_name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 p-8 bg-stone-50/50 dark:bg-slate-900/50 overflow-y-auto">
        {showQueryManager ? (
          <InnerQueryManager onBack={() => setShowQueryManager(false)} />
        ) : (
          <>
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-slate-800 mb-8">
              <div className="flex justify-between items-center w-full border-b-2 border-orange-500 pb-4 mb-6 px-4">
                <img src="/logoL.jpeg" alt="Faculty Logo" className="h-16 w-auto object-contain" />
                <img src="/logoR.jpeg" alt="Newsletter Logo" className="h-18 w-auto object-contain" />
                <img src="/logoC.jpeg" alt="MTI Logo" className="h-16 w-auto object-contain" />
              </div>
              <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white uppercase tracking-tight">
                {loading ? 'Fetching Data...' : reportTitle.toUpperCase()}
              </h2>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-slate-500 animate-pulse">Loading university records...</p>
              </div>
            ) : lastFetchedData ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-stone-200 dark:border-slate-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-center">
                      <thead className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-b border-stone-200 dark:border-slate-800">
                        <tr>
                          {Object.keys(lastFetchedData[0] || {}).map(key => (
                            <th key={key} className="p-4 font-bold uppercase tracking-wider">{key.replace(/_/g, ' ')}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100 dark:divide-slate-800">
                        {lastFetchedData.length > 0 ? lastFetchedData.map((row: any, i: number) => (
                          <tr key={i} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                            {Object.values(row).map((val: any, j: number) => (
                              <td key={j} className="p-4 text-slate-600 dark:text-slate-300 font-medium">{val ?? '-'}</td>
                            ))}
                          </tr>
                        )) : (
                          <tr><td colSpan={100} className="p-10 text-stone-400 italic">No records found for this query.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-sm">
                  <h4 className="font-black text-lg mb-4 flex items-center gap-2 text-slate-800 dark:text-white uppercase">
                    <i className="fas fa-file-invoice text-orange-500"></i> Executive Summary
                  </h4>
                  <textarea
                    className="w-full h-32 p-4 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all mb-6 text-slate-700 dark:text-slate-300 resize-none"
                    placeholder="Enter your analytical findings here..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  
                  <div className="flex gap-4">
                    <Button
                      variant="default"
                      onClick={() => setShowSendModal(true)}
                      className="flex-1"
                    >
                      <i className="fas fa-paper-plane"></i>
                      Send to Recipients
                    </Button>
                    
                    <Button
                      onClick={downloadPDF}
                      disabled={isExporting}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black h-14 rounded-xl shadow-lg"
                    >
                      <i className={`fas ${isExporting ? 'fa-spinner fa-spin' : 'fa-file-pdf'}`}></i>
                      {isExporting ? 'Generating Report...' : 'Export Official PDF Report'}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-stone-200 dark:border-slate-800 rounded-3xl">
                <i className="fas fa-chart-pie text-6xl text-stone-200 mb-4"></i>
                <p className="text-stone-400 font-medium">Select a dataset from the sidebar to begin analysis</p>
              </div>
            )}
          </>
        )}
      </div>

      {showSendModal && (
        <SendReportModal
          reportData={lastFetchedData}
          reportName={currentView}
          onClose={() => setShowSendModal(false)}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
}

function ReportsSystem() {
  const [dynamicQueries, setDynamicQueries] = useState<any[]>([]);
  const [currentView, setCurrentView] = useState("");
  const [reportName, setReportName] = useState("");
  const [activeReport, setActiveReport] = useState<any>(null);
  const [lastFetchedData, setLastFetchedData] = useState<any>(null);
  const [displayOptions, setDisplayOptions] = useState({ table: true, bar: true, pie: false });
  const [comment, setComment] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const barChartRef = useRef<HTMLCanvasElement>(null);
  const pieChartRef = useRef<HTMLCanvasElement>(null);
  const barChartInstance = useRef<any>(null);
  const pieChartInstance = useRef<any>(null);

  const isNoChart = noChartReports.includes(currentView);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        const { data, error } = await supabaseClient.from('queries').select('*');
        if (error) throw error;
        if (data) setDynamicQueries(data);
      } catch (err) {
        console.error("Error fetching queries:", err);
      }
    };
    fetchQueries();
  }, []);

  useEffect(() => {
    if (!currentView) return;
    if (isNoChart) {
      setDisplayOptions({ table: true, bar: false, pie: false });
    } else {
      setDisplayOptions(prev => ({ ...prev, bar: true }));
    }
  }, [currentView]);

  useEffect(() => {
    barChartInstance.current?.destroy();
    pieChartInstance.current?.destroy();
    if (!lastFetchedData?.length) return;
    
    const keys = Object.keys(lastFetchedData[0]);
    const labelKey = keys.find(k => k.includes('name') || k.includes('title') || k.includes('id')) || keys[0];
    const valueKey = keys.find(k => typeof lastFetchedData[0][k] === 'number' && k !== labelKey) || keys[1] || keys[0];
    
    const chartData = lastFetchedData.slice(0, 6);
    const labels = chartData.map((d: any) => String(d[labelKey]).substring(0, 20));
    const values = chartData.map((d: any) => Number(d[valueKey]) || 0);
    const datasetLabel = String(valueKey).replace(/_/g, ' ').toUpperCase();

    if (displayOptions.bar && barChartRef.current && !isNoChart) {
      barChartInstance.current = new Chart(barChartRef.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label: datasetLabel,
            data: values,
            backgroundColor: ['#00AEEF', '#F39C12', '#e74c3c', '#3498db', '#9b59b6', '#1abc9c'],
            barThickness: 35,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { title: { display: true, text: String(labelKey).replace(/_/g, ' ').toUpperCase() }, grid: { display: false } },
            y: { title: { display: true, text: datasetLabel }, beginAtZero: true }
          },
          plugins: {
            legend: { display: false },
            datalabels: { anchor: 'center', align: 'center', color: '#fff', font: { weight: 'bold' } }
          }
        }
      });
    }

    if (displayOptions.pie && pieChartRef.current && !isNoChart) {
      pieChartInstance.current = new Chart(pieChartRef.current, {
        type: 'pie',
        data: {
          labels,
          datasets: [{
            label: datasetLabel,
            data: values,
            backgroundColor: ['#00AEEF', '#F39C12', '#e74c3c', '#3498db', '#9b59b6', '#1abc9c'],
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: true, position: 'bottom' },
            datalabels: {
              anchor: 'center',
              align: 'center',
              color: '#fff',
              font: { weight: 'bold' },
              formatter: (value: number, context: any) => {
                const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
                return ((Number(value) / total) * 100).toFixed(1) + "%";
              }
            }
          }
        }
      });
    }

    return () => {
      barChartInstance.current?.destroy();
      pieChartInstance.current?.destroy();
    };
  }, [lastFetchedData, displayOptions, currentView, reportName, isNoChart]);

  const loadReport = async (viewName: string, title: string) => {
    setLoading(true);
    setActiveReport(viewName);
    setCurrentView(viewName);
    setReportName(title);
    try {
      const res = await fetch(`${API_BASE_URL}/report-data/${viewName}`);
      if (!res.ok) throw new Error("Network response was not ok");
      const data = await res.json();
      setLastFetchedData(data);
    } catch (err) {
      setLastFetchedData([{ error: "Demo data - server offline", status: "offline" }]);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = async () => {
    if (!currentView) return alert("Please select a report first.");
    setIsExporting(true);
    setTimeout(() => {
      alert("PDF download simulated (server offline)");
      setIsExporting(false);
    }, 1500);
  };

  return (
    <div className="flex bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden min-h-[85vh] border border-stone-200 dark:border-slate-800 font-sans animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-80 bg-slate-950 text-white p-6 overflow-y-auto border-r border-slate-800 flex-shrink-0">
        <div className="text-center mb-8">
          <h2 className="text-orange-500 text-xl font-black tracking-widest uppercase">Reports Explorer</h2>
          <div className="h-1 w-12 bg-blue-500 mx-auto mt-2 rounded-full"></div>
        </div>
        <div className="space-y-6">
          <div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">Standard Analytics</div>
            <div className="space-y-2">
              {standardReports.map((report: any, idx: number) => (
                <button
                  key={report.id}
                  onClick={() => loadReport(report.id, report.title)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-center gap-3 text-sm group ${
                    activeReport === report.id
                    ? 'bg-blue-600 shadow-lg shadow-blue-900/20'
                    : 'hover:bg-slate-900 border border-transparent hover:border-slate-800'
                  }`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] group-hover:bg-blue-500 transition-colors">
                    {report.num}
                  </span>
                  <span className={activeReport === report.id ? 'font-bold text-white' : 'text-slate-400 group-hover:text-white'}>
                    {report.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 md:p-8 bg-stone-50/50 dark:bg-slate-900/50 overflow-y-auto">
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-slate-800 mb-8">
          <div className="flex justify-between items-center w-full border-b-2 border-orange-500 pb-4 mb-6 px-4">
            <img src="/logoL.jpeg" alt="Faculty Logo" className="h-16 w-auto object-contain" />
            <img src="/logoR.jpeg" alt="Newsletter Logo" className="h-18 w-auto object-contain" />
            <img src="/logoC.jpeg" alt="MTI Logo" className="h-16 w-auto object-contain" />
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white uppercase tracking-tight">
            {loading ? 'Processing Data...' : currentView ? reportName.toUpperCase() : 'Select a Report From the Sidebar'}
          </h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-slate-500 font-bold animate-pulse">Fetching Insights...</p>
          </div>
        ) : lastFetchedData ? (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-sm">
              <div className="flex flex-wrap gap-6 items-center">
                <span className="font-black text-blue-600 text-sm uppercase tracking-widest">Display Options:</span>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                  <input type="checkbox" className="rounded" checked={displayOptions.table} onChange={e => setDisplayOptions(s => ({ ...s, table: e.target.checked }))} />
                  <i className="fas fa-table"></i> Data Table
                </label>
                {!isNoChart && (
                  <>
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                      <input type="checkbox" className="rounded" checked={displayOptions.bar} onChange={e => setDisplayOptions(s => ({ ...s, bar: e.target.checked }))} />
                      <i className="fas fa-chart-bar"></i> Bar Chart
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                      <input type="checkbox" className="rounded" checked={displayOptions.pie} onChange={e => setDisplayOptions(s => ({ ...s, pie: e.target.checked }))} />
                      <i className="fas fa-chart-pie"></i> Pie Chart
                    </label>
                  </>
                )}
              </div>
            </div>

            {(displayOptions.bar || displayOptions.pie) && !isNoChart && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {displayOptions.bar && (
                  <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-sm h-96">
                    <canvas ref={barChartRef}></canvas>
                  </div>
                )}
                {displayOptions.pie && (
                  <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-sm h-96">
                    <canvas ref={pieChartRef}></canvas>
                  </div>
                )}
              </div>
            )}

            {displayOptions.table && (
              <div className="bg-white dark:bg-slate-950 rounded-2xl shadow-sm border border-stone-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-center">
                    <thead className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-b border-stone-200 dark:border-slate-800">
                      <tr>
                        {Object.keys(lastFetchedData[0] || {}).map(key => (
                          <th key={key} className="p-4 font-black uppercase tracking-wider text-[11px]">{key.replace(/_/g, ' ')}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-slate-800">
                      {lastFetchedData.length > 0 ? (
                        lastFetchedData.map((row: any, i: number) => (
                          <tr key={i} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors">
                            {Object.values(row).map((val: any, j: number) => (
                              <td key={j} className="p-4 text-slate-600 dark:text-slate-300 font-medium">{val ?? 'N/A'}</td>
                            ))}
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan={99} className="p-10 text-stone-400 italic">No records found</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-stone-200 dark:border-slate-800 shadow-sm">
              <h4 className="font-black text-lg mb-4 flex items-center gap-2 text-slate-800 dark:text-white uppercase">
                <i className="fas fa-file-invoice text-orange-500"></i> Executive Summary
              </h4>
              <textarea
                className="w-full h-32 p-4 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all mb-6 text-slate-700 dark:text-slate-300 resize-none"
                placeholder="Enter your analytical findings here..."
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              
              <div className="flex gap-4">
                <Button
                  variant="default"
                  onClick={() => setShowSendModal(true)}
                  className="flex-1"
                >
                  <i className="fas fa-paper-plane"></i>
                  Send to Recipients
                </Button>
                
                <Button
                  onClick={downloadPDF}
                  disabled={isExporting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-black h-14 rounded-xl shadow-lg"
                >
                  <i className={`fas ${isExporting ? 'fa-spinner fa-spin' : 'fa-file-export'}`}></i>
                  {isExporting ? 'Generating Report...' : 'Export Official PDF Report'}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-stone-200 dark:border-slate-800 rounded-3xl">
            <div className="w-24 h-24 bg-stone-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
              <i className="fas fa-chart-line text-4xl text-stone-300"></i>
            </div>
            <p className="text-slate-500 font-black uppercase tracking-widest text-sm">Select a dataset from the sidebar</p>
          </div>
        )}
      </div>

      {showSendModal && (
        <SendReportModal
          reportData={lastFetchedData}
          reportName={currentView}
          onClose={() => setShowSendModal(false)}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
}

export default function ManagerDashboard() {
  const [activePage, setActivePage] = useState('home');

  const pages = [
    { id: 'home', label: 'Home', href: '#' },
    { id: 'reports', label: 'Reports', href: '#' },
    { id: 'Queries', label: 'Queries', href: '#' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 font-sans text-stone-900 dark:text-stone-100">
      <nav className="bg-white dark:bg-slate-900 shadow-md border-b border-stone-200 dark:border-stone-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-blue-600">
            <i className="fas fa-chart-line mr-2"></i>MTI Smart Dashboard
          </div>
          <div className="flex items-center gap-4">
            {pages.map(page => (
              <Button
                key={page.id}
                variant={activePage === page.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActivePage(page.id)}
              >
                <i className={`fas fa-${page.id === 'home' ? 'home' : page.id === 'reports' ? 'file-alt' : 'database'}`}></i>
                {page.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {activePage === 'home' && (
          <div className="text-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <i className="fas fa-user-graduate text-6xl text-white"></i>
            </div>
            <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">Welcome</h1>
            <p className="text-stone-500 text-lg mb-8">Select "Reports" or "Queries" from the menu above to view university analytics.</p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => setActivePage('reports')} size="lg">
                <i className="fas fa-file-alt"></i> View Reports
              </Button>
              <Button onClick={() => setActivePage('Queries')} variant="outline" size="lg">
                <i className="fas fa-database"></i> Manage Queries
              </Button>
            </div>
          </div>
        )}
        {activePage === 'reports' && <ReportsSystem />}
        {activePage === 'Queries' && <ReportsExplorer />}
      </main>

      <footer className="bg-white dark:bg-slate-900 border-t border-stone-200 dark:border-slate-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-stone-500 text-sm">
          <p>© 2024 MTI Smart Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export { ReportsViewer, QueriesViewer };