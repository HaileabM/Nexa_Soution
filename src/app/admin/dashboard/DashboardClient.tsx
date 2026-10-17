'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';
import {
  ShieldCheck,
  LogOut,
  Plus,
  Edit,
  Trash2,
  FileText,
  Image as ImageIcon,
  Video,
  Layers,
  Newspaper,
  Inbox,
  KeyRound,
  ExternalLink,
  Sun,
  Moon,
  CheckCircle,
  X,
  AlertCircle,
  Mail,
  User,
  Clock,
  Sparkles,
  Phone,
  Eye,
} from 'lucide-react';

interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  type: string;
  shortDesc: string;
  description: string;
  features: string;
  fileUrl: string | null;
  imageUrl: string | null;
  priceInfo: string | null;
  isFeatured: boolean;
  createdAt: string;
}

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  author: string;
  imageUrl: string | null;
  published: boolean;
  createdAt: string;
}

interface InquiryItem {
  id: string;
  name: string;
  organization: string | null;
  email: string;
  phone: string | null;
  serviceType: string;
  projectScope: string;
  targetAudience: string | null;
  timeline: string | null;
  status: string;
  createdAt: string;
}

interface DashboardClientProps {
  adminUser: { id: string; username: string; name: string; role: string };
  initialServices: ServiceItem[];
  initialNews: NewsItem[];
  initialInquiries: InquiryItem[];
}

export function DashboardClient({
  adminUser,
  initialServices,
  initialNews,
  initialInquiries,
}: DashboardClientProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<'services' | 'news' | 'inquiries' | 'password'>('services');

  // Services State
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    category: 'Consulting & Strategy',
    type: 'PACKAGE',
    shortDesc: '',
    description: '',
    features: '',
    fileUrl: '',
    imageUrl: '',
    priceInfo: 'Custom Consultation / Inquire via Email',
    isFeatured: false,
  });

  // News State
  const [newsList, setNewsList] = useState<NewsItem[]>(initialNews);
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Thought Leadership',
    summary: '',
    content: '',
    author: 'Nexa SBCC Strategy Team',
    imageUrl: '',
    published: true,
  });

  // Inquiries State
  const [inquiries, setInquiries] = useState<InquiryItem[]>(initialInquiries);
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Global operation loading & feedback
  const [actionLoading, setActionLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  // Logout Handler
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  // -------------------------------------------------------------
  // SERVICE OPERATIONS
  // -------------------------------------------------------------
  const openCreateServiceModal = () => {
    setEditingService(null);
    setServiceForm({
      title: '',
      category: 'Health Awareness & Behavior Change',
      type: 'PDF',
      shortDesc: '',
      description: '',
      features: '',
      fileUrl: '',
      imageUrl: '',
      priceInfo: 'Custom Project / Grant Scope',
      isFeatured: false,
    });
    setServiceModalOpen(true);
  };

  const openEditServiceModal = (item: ServiceItem) => {
    setEditingService(item);
    setServiceForm({
      title: item.title,
      category: item.category,
      type: item.type,
      shortDesc: item.shortDesc,
      description: item.description,
      features: item.features,
      fileUrl: item.fileUrl || '',
      imageUrl: item.imageUrl || '',
      priceInfo: item.priceInfo || '',
      isFeatured: item.isFeatured,
    });
    setServiceModalOpen(true);
  };

  const handleSaveService = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const url = editingService ? `/api/services/${editingService.id}` : '/api/services';
      const method = editingService ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save service');

      if (editingService) {
        setServices(services.map((s) => (s.id === editingService.id ? data.service : s)));
        showFeedback('Service updated successfully');
      } else {
        setServices([data.service, ...services]);
        showFeedback('New service / material published');
      }

      setServiceModalOpen(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteService = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete service');
      setServices(services.filter((s) => s.id !== id));
      showFeedback('Service deleted');
    } catch (err: any) {
      alert(err.message);
    }
  };

  // -------------------------------------------------------------
  // NEWS OPERATIONS
  // -------------------------------------------------------------
  const openCreateNewsModal = () => {
    setEditingNews(null);
    setNewsForm({
      title: '',
      category: 'Thought Leadership',
      summary: '',
      content: '',
      author: 'Nexa SBCC Strategy Team',
      imageUrl: '',
      published: true,
    });
    setNewsModalOpen(true);
  };

  const openEditNewsModal = (item: NewsItem) => {
    setEditingNews(item);
    setNewsForm({
      title: item.title,
      category: item.category,
      summary: item.summary,
      content: item.content,
      author: item.author,
      imageUrl: item.imageUrl || '',
      published: item.published,
    });
    setNewsModalOpen(true);
  };

  const handleSaveNews = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      const url = editingNews ? `/api/news/${editingNews.id}` : '/api/news';
      const method = editingNews ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newsForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save news article');

      if (editingNews) {
        setNewsList(newsList.map((n) => (n.id === editingNews.id ? data.news : n)));
        showFeedback('News article updated');
      } else {
        setNewsList([data.news, ...newsList]);
        showFeedback('New article published');
      }

      setNewsModalOpen(false);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteNews = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete news article "${title}"?`)) return;

    try {
      const res = await fetch(`/api/news/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete news article');
      setNewsList(newsList.filter((n) => n.id !== id));
      showFeedback('News article deleted');
    } catch (err: any) {
      alert(err.message);
    }
  };

  // -------------------------------------------------------------
  // INQUIRY STATUS UPDATE
  // -------------------------------------------------------------
  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');
      setInquiries(inquiries.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq)));
      showFeedback(`Inquiry status updated to ${newStatus}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // -------------------------------------------------------------
  // PASSWORD CHANGE
  // -------------------------------------------------------------
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'New passwords do not match' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordStatus({ type: 'error', message: 'Password must be at least 6 characters' });
      return;
    }

    setPasswordLoading(true);

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update password');

      setPasswordStatus({ type: 'success', message: 'Admin password successfully updated!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setPasswordStatus({ type: 'error', message: err.message });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="admin-shell">
      {/* Top Admin Header */}
      <header className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            backgroundColor: 'var(--c1-blue-soft)',
            color: 'var(--c1-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>
              Nexa <span style={{ color: 'var(--c1-blue)' }}>Admin Dashboard</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Logged in as <strong style={{ color: 'var(--c2-teal)' }}>{adminUser.username}</strong> ({adminUser.name})
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Public Website Preview Link */}
          <Link
            href="/"
            target="_blank"
            className="btn btn-outline btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <span>Live Site</span>
            <ExternalLink size={14} />
          </Link>

          {/* Theme Switch */}
          <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="btn btn-outline btn-sm"
            style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Floating feedback alert */}
      {feedback && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          backgroundColor: 'var(--c1-blue)',
          color: '#ffffff',
          padding: '0.75rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1100,
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <CheckCircle size={18} />
          <span>{feedback}</span>
        </div>
      )}

      {/* Main Admin Content */}
      <main className="admin-main">
        {/* Metric Overview Cards */}
        <div className="grid-4" style={{ marginBottom: '2.5rem' }}>
          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Active Services
              </span>
              <Layers size={18} style={{ color: 'var(--c1-blue)' }} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--c1-blue)' }}>
              {services.length}
            </div>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                News & Articles
              </span>
              <Newspaper size={18} style={{ color: 'var(--c2-teal)' }} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--c2-teal)' }}>
              {newsList.length}
            </div>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Service Requests
              </span>
              <Inbox size={18} style={{ color: 'var(--c1-blue)' }} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--c1-blue)' }}>
              {inquiries.length}
            </div>
          </div>

          <div className="card" style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Official Service Email
              </span>
              <Mail size={18} style={{ color: 'var(--c2-teal)' }} />
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', wordBreak: 'break-all' }}>
              nexasolutionsethiopia@gmail.com
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="admin-tabs">
          <button
            onClick={() => setActiveTab('services')}
            className={`admin-tab ${activeTab === 'services' ? 'active' : ''}`}
          >
            <Layers size={18} />
            <span>Manage Services & Materials ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('news')}
            className={`admin-tab ${activeTab === 'news' ? 'active' : ''}`}
          >
            <Newspaper size={18} />
            <span>Manage News & Insights ({newsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`admin-tab ${activeTab === 'inquiries' ? 'active' : ''}`}
          >
            <Inbox size={18} />
            <span>Service Requests / Email Orders ({inquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('password')}
            className={`admin-tab ${activeTab === 'password' ? 'active' : ''}`}
          >
            <KeyRound size={18} />
            <span>Admin Password & Security</span>
          </button>
        </div>

        {/* =================================================================
            TAB 1: SERVICES & HEALTH MATERIALS MANAGEMENT
            ================================================================= */}
        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem' }}>Services & Health Awareness Materials</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Manage public consulting packages, health awareness PDFs, PNG posters, and campaign videos.
                </p>
              </div>

              <button onClick={openCreateServiceModal} className="btn btn-primary">
                <Plus size={16} />
                <span>Post New Service / Material</span>
              </button>
            </div>

            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title & Category</th>
                    <th>Type</th>
                    <th>Price / Package Info</th>
                    <th>Featured</th>
                    <th>Date Added</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '0.95rem' }}>{item.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--c2-teal)' }}>{item.category}</div>
                      </td>
                      <td>
                        <span className={`badge ${item.type === 'PDF' ? 'badge-blue' : item.type === 'VIDEO' ? 'badge-teal' : 'badge-neutral'}`}>
                          {item.type}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>
                        {item.priceInfo || 'Direct Inquiry'}
                      </td>
                      <td>
                        {item.isFeatured ? (
                          <span style={{ color: 'var(--c1-blue)', fontWeight: 700, fontSize: '0.8rem' }}>★ Featured</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Standard</span>
                        )}
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => openEditServiceModal(item)}
                            className="btn btn-outline btn-sm"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteService(item.id, item.title)}
                            className="btn btn-outline btn-sm"
                            style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 2: NEWS & HEALTH INSIGHTS MANAGEMENT
            ================================================================= */}
        {activeTab === 'news' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem' }}>News & SBCC Insights</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Publish field updates, case studies, and thought leadership articles to the website.
                </p>
              </div>

              <button onClick={openCreateNewsModal} className="btn btn-secondary">
                <Plus size={16} />
                <span>Publish New Article</span>
              </button>
            </div>

            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Article Title</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Date Published</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {newsList.map((item) => (
                    <tr key={item.id}>
                      <td style={{ maxWidth: '350px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{item.title}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.summary}
                        </div>
                      </td>
                      <td>
                        <span className="badge badge-teal">{item.category}</span>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>{item.author}</td>
                      <td>
                        {item.published ? (
                          <span style={{ color: 'var(--c2-teal)', fontWeight: 600, fontSize: '0.85rem' }}>Published</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Draft</span>
                        )}
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => openEditNewsModal(item)}
                            className="btn btn-outline btn-sm"
                            title="Edit"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteNews(item.id, item.title)}
                            className="btn btn-outline btn-sm"
                            style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =================================================================
            TAB 3: SERVICE INQUIRIES & ORDERS (From nexasolutionsethiopia@gmail.com portal)
            ================================================================= */}
        {activeTab === 'inquiries' && (
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem' }}>Incoming Service Requests & Material Orders</h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                These are requests generated by users to utilize your services via <strong>nexasolutionsethiopia@gmail.com</strong>.
              </p>
            </div>

            {inquiries.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p>No service requests recorded yet.</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Client & Organization</th>
                      <th>Requested Service</th>
                      <th>Timeline</th>
                      <th>Status</th>
                      <th>Received</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => (
                      <tr key={inq.id}>
                        <td>
                          <div style={{ fontWeight: 700 }}>{inq.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{inq.organization || 'Individual'}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--c1-blue)' }}>{inq.email} {inq.phone && `• ${inq.phone}`}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{inq.serviceType}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {inq.projectScope}
                          </div>
                        </td>
                        <td style={{ fontSize: '0.85rem' }}>{inq.timeline || 'Flexible'}</td>
                        <td>
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                            style={{
                              padding: '0.35rem 0.65rem',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid var(--border-color)',
                              backgroundColor: 'var(--bg-card)',
                              color: 'var(--text-main)',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                            }}
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="IN_PROGRESS">IN PROGRESS</option>
                            <option value="COMPLETED">COMPLETED</option>
                          </select>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="btn btn-outline btn-sm"
                          >
                            <Eye size={14} />
                            <span>View Scope</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* =================================================================
            TAB 4: ADMIN PASSWORD & CREDENTIAL MANAGEMENT
            ================================================================= */}
        {activeTab === 'password' && (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div className="card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: 'var(--c1-blue-soft)', color: 'var(--c1-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <KeyRound size={22} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.4rem' }}>Change Administrator Password</h2>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Update your access credentials for the Nexa Admin Portal.
                  </p>
                </div>
              </div>

              {passwordStatus && (
                <div style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: passwordStatus.type === 'success' ? 'var(--c2-teal-soft)' : 'rgba(239, 68, 68, 0.1)',
                  color: passwordStatus.type === 'success' ? 'var(--c2-teal)' : '#ef4444',
                  border: `1px solid ${passwordStatus.type === 'success' ? 'var(--c2-teal-border)' : 'rgba(239, 68, 68, 0.2)'}`,
                  fontSize: '0.875rem',
                  marginBottom: '1.5rem',
                }}>
                  {passwordStatus.message}
                </div>
              )}

              <form onSubmit={handleChangePassword}>
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    required
                    className="form-input"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">New Password (min 6 characters)</label>
                  <input
                    type="password"
                    required
                    className="form-input"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{ marginBottom: '2rem' }}>
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    className="form-input"
                    placeholder="Repeat new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  {passwordLoading ? 'Updating Password...' : 'Save New Password'}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* =================================================================
          MODAL: ADD / EDIT SERVICE
          ================================================================= */}
      {serviceModalOpen && (
        <div className="modal-overlay" onClick={() => setServiceModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setServiceModalOpen(false)}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              {editingService ? 'Edit Service / Material' : 'Post New Service or Health Material'}
            </h3>

            <form onSubmit={handleSaveService}>
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Maternal Care Behavioral Handbook"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Maternal Health / Youth / Research"
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Asset Type *</label>
                  <select
                    className="form-select"
                    value={serviceForm.type}
                    onChange={(e) => setServiceForm({ ...serviceForm, type: e.target.value })}
                  >
                    <option value="PDF">PDF Handbook / Brief</option>
                    <option value="IMAGE">PNG Poster / Infographics</option>
                    <option value="VIDEO">Video Series / Campaign</option>
                    <option value="PACKAGE">Full Awareness Package</option>
                    <option value="CONSULTING">Consulting & Research</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Short Description (for cards) *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="One sentence summary of the deliverable"
                  value={serviceForm.shortDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Full Description *</label>
                <textarea
                  required
                  rows={4}
                  className="form-textarea"
                  placeholder="Detailed breakdown of behavioral problem, audience, and scope..."
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Deliverables List (separate with semicolons ';')</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Protocol; PDF Handbook; PNG Infographics; Video Spots"
                  value={serviceForm.features}
                  onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Sample File URL (PDF/PNG/Video)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="/materials/sample-maternal-health-guide.pdf"
                    value={serviceForm.fileUrl}
                    onChange={(e) => setServiceForm({ ...serviceForm, fileUrl: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Thumbnail Image URL</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="https://images.unsplash.com/..."
                    value={serviceForm.imageUrl}
                    onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'center' }}>
                <div className="form-group">
                  <label className="form-label">Price / Engagement Terms</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Grant Basis / Custom Quote"
                    value={serviceForm.priceInfo}
                    onChange={(e) => setServiceForm({ ...serviceForm, priceInfo: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem', marginTop: '1.25rem' }}>
                  <input
                    type="checkbox"
                    id="isFeatured"
                    checked={serviceForm.isFeatured}
                    onChange={(e) => setServiceForm({ ...serviceForm, isFeatured: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <label htmlFor="isFeatured" style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                    Feature on Home Page
                  </label>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.75rem' }}>
                <button type="button" onClick={() => setServiceModalOpen(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" disabled={actionLoading} className="btn btn-primary">
                  {actionLoading ? 'Saving...' : 'Save & Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================
          MODAL: ADD / EDIT NEWS
          ================================================================= */}
      {newsModalOpen && (
        <div className="modal-overlay" onClick={() => setNewsModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setNewsModalOpen(false)}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              {editingNews ? 'Edit News Article' : 'Publish New Article / Insight'}
            </h3>

            <form onSubmit={handleSaveNews}>
              <div className="form-group">
                <label className="form-label">Article Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Evidence Before Assumptions in SBCC"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Field Insight, Case Study"
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Author</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="e.g. Nexa SBCC Strategy Team"
                    value={newsForm.author}
                    onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Summary *</label>
                <textarea
                  required
                  rows={2}
                  className="form-textarea"
                  placeholder="Brief summary for feed cards..."
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Article Body Content *</label>
                <textarea
                  required
                  rows={6}
                  className="form-textarea"
                  placeholder="Full text of the insight, analysis, or news update..."
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Header Image URL</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="https://images.unsplash.com/..."
                  value={newsForm.imageUrl}
                  onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })}
                />
              </div>

              <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="published"
                  checked={newsForm.published}
                  onChange={(e) => setNewsForm({ ...newsForm, published: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="published" style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                  Publish immediately (visible to public)
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.75rem' }}>
                <button type="button" onClick={() => setNewsModalOpen(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" disabled={actionLoading} className="btn btn-secondary">
                  {actionLoading ? 'Saving...' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================
          MODAL: VIEW INQUIRY DETAILS
          ================================================================= */}
      {selectedInquiry && (
        <div className="modal-overlay" onClick={() => setSelectedInquiry(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedInquiry(null)}>
              <X size={20} />
            </button>

            <div className="badge badge-blue" style={{ marginBottom: '0.75rem' }}>
              Reference ID: NEXA-REQ-{selectedInquiry.id.slice(-6).toUpperCase()}
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              {selectedInquiry.serviceType}
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-card-subtle)',
              marginBottom: '1.5rem',
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Client Name</div>
                <div style={{ fontWeight: 600 }}>{selectedInquiry.name}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Organization</div>
                <div style={{ fontWeight: 600 }}>{selectedInquiry.organization || 'N/A'}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Email</div>
                <div style={{ fontWeight: 600, color: 'var(--c1-blue)' }}>{selectedInquiry.email}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Phone</div>
                <div style={{ fontWeight: 600 }}>{selectedInquiry.phone || 'N/A'}</div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Project Scope / Requirements:</div>
              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-main)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
              }}>
                {selectedInquiry.projectScope}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <a
                href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(`Re: [Nexa Solutions] ${selectedInquiry.serviceType}`)}`}
                className="btn btn-primary"
              >
                <Mail size={16} />
                <span>Reply to Client via Email</span>
              </a>

              <button onClick={() => setSelectedInquiry(null)} className="btn btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
