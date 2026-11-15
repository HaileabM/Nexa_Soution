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
  Upload,
  FileUp,
  Menu,
  BarChart3,
  TrendingUp,
  PieChart,
  Activity,
  ArrowUpRight,
  CheckCheck,
  Calendar,
  Briefcase,
  Radio,
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
  priceInfo?: string | null;
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

interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

interface DashboardClientProps {
  adminUser: { id: string; username: string; name: string; role: string };
  initialServices: ServiceItem[];
  initialNews: NewsItem[];
  initialInquiries: InquiryItem[];
  initialContactMessages?: ContactMessageItem[];
}

export function DashboardClient({
  adminUser,
  initialServices,
  initialNews,
  initialInquiries,
  initialContactMessages = [],
}: DashboardClientProps) {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const [activeTab, setActiveTab] = useState<'analytics' | 'services' | 'news' | 'inquiries' | 'messages' | 'password'>('analytics');

  // Services State
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [serviceForm, setServiceForm] = useState({
    title: '',
    category: 'Creative',
    type: 'PDF',
    shortDesc: '',
    description: '',
    features: '',
    fileUrl: '',
    imageUrl: '',
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

  // Contact Messages State
  const [contactMessages, setContactMessages] = useState<ContactMessageItem[]>(initialContactMessages);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessageItem | null>(null);

  // Responsive Sidebar Drawer State
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Deletion Confirmation Modal State
  const [itemToDelete, setItemToDelete] = useState<{
    type: 'service' | 'news' | 'inquiry' | 'message';
    id: string;
    title: string;
  } | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Global operation loading & feedback
  const [actionLoading, setActionLoading] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const showFeedback = (msg: string) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 3500);
  };

  // Direct File Upload Handler
  const handleFileUpload = async (file: File, targetField: 'fileUrl' | 'imageUrl' | 'newsImageUrl') => {
    setUploadingField(targetField);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      if (targetField === 'fileUrl') {
        setServiceForm((prev) => ({ ...prev, fileUrl: data.url }));
        showFeedback(`Deliverable file uploaded: ${data.filename}`);
      } else if (targetField === 'imageUrl') {
        setServiceForm((prev) => ({ ...prev, imageUrl: data.url }));
        showFeedback(`Thumbnail uploaded: ${data.filename}`);
      } else if (targetField === 'newsImageUrl') {
        setNewsForm((prev) => ({ ...prev, imageUrl: data.url }));
        showFeedback(`Article banner uploaded: ${data.filename}`);
      }
    } catch (err: any) {
      alert(err.message || 'File upload failed');
    } finally {
      setUploadingField(null);
    }
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
      category: 'Creative',
      type: 'PDF',
      shortDesc: '',
      description: '',
      features: '',
      fileUrl: '',
      imageUrl: '',
      isFeatured: false,
    });
    setServiceModalOpen(true);
  };

  const openEditServiceModal = (item: ServiceItem) => {
    setEditingService(item);
    setServiceForm({
      title: item.title,
      category: item.category || 'Creative',
      type: item.type,
      shortDesc: item.shortDesc,
      description: item.description,
      features: item.features || '',
      fileUrl: item.fileUrl || '',
      imageUrl: item.imageUrl || '',
      isFeatured: Boolean(item.isFeatured),
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
        setServices((prev) =>
          prev.map((s) => (s.id === editingService.id || s.slug === editingService.id ? data.service : s))
        );
        showFeedback('Deliverable updated successfully');
      } else {
        setServices((prev) => [data.service, ...prev]);
        showFeedback('New deliverable / material published');
      }

      setServiceModalOpen(false);
      router.refresh();
    } catch (err: any) {
      showFeedback(`Error: ${err.message || 'Failed to save deliverable'}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteService = (id: string, title: string) => {
    setItemToDelete({ type: 'service', id, title });
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
        setNewsList((prev) =>
          prev.map((n) => (n.id === editingNews.id || n.slug === editingNews.id ? data.news : n))
        );
        showFeedback('News article updated successfully');
      } else {
        setNewsList((prev) => [data.news, ...prev]);
        showFeedback('New article published');
      }

      setNewsModalOpen(false);
      router.refresh();
    } catch (err: any) {
      showFeedback(`Error: ${err.message || 'Failed to save news article'}`);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteNews = (id: string, title: string) => {
    setItemToDelete({ type: 'news', id, title });
  };

  // -------------------------------------------------------------
  // DELETION CONFIRMATION HANDLER
  // -------------------------------------------------------------
  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setDeleteLoading(true);

    try {
      const endpoint =
        itemToDelete.type === 'service'
          ? `/api/services/${itemToDelete.id}`
          : itemToDelete.type === 'news'
          ? `/api/news/${itemToDelete.id}`
          : itemToDelete.type === 'message'
          ? `/api/contact/${itemToDelete.id}`
          : `/api/inquiries/${itemToDelete.id}`;

      const res = await fetch(endpoint, { method: 'DELETE' });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `Failed to delete ${itemToDelete.type}`);

      if (itemToDelete.type === 'service') {
        setServices((prev) => prev.filter((s) => s.id !== itemToDelete.id && s.slug !== itemToDelete.id));
        showFeedback(`Deliverable "${itemToDelete.title}" deleted.`);
      } else if (itemToDelete.type === 'news') {
        setNewsList((prev) => prev.filter((n) => n.id !== itemToDelete.id && n.slug !== itemToDelete.id));
        showFeedback(`News article "${itemToDelete.title}" deleted.`);
      } else if (itemToDelete.type === 'inquiry') {
        setInquiries((prev) => prev.filter((i) => i.id !== itemToDelete.id));
        showFeedback(`Service request from "${itemToDelete.title}" deleted.`);
        if (selectedInquiry?.id === itemToDelete.id) {
          setSelectedInquiry(null);
        }
      } else if (itemToDelete.type === 'message') {
        setContactMessages((prev) => prev.filter((m) => m.id !== itemToDelete.id));
        showFeedback(`Contact message from "${itemToDelete.title}" deleted.`);
        if (selectedMessage?.id === itemToDelete.id) {
          setSelectedMessage(null);
        }
      }

      setItemToDelete(null);
      router.refresh();
    } catch (err: any) {
      showFeedback(`Error: ${err.message || 'Could not delete item'}`);
    } finally {
      setDeleteLoading(false);
    }
  };

  // -------------------------------------------------------------
  // INQUIRY STATUS UPDATE & REFRESH
  // -------------------------------------------------------------
  const handleUpdateInquiryStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');

      setInquiries((prev) => prev.map((inq) => (inq.id === id ? data.inquiry : inq)));
      showFeedback(`Status set to ${newStatus}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const refreshInquiries = async () => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.inquiries) {
        setInquiries(data.inquiries);
        showFeedback('Service requests updated');
      }
    } catch (err) {
      showFeedback('Failed to refresh service requests');
    } finally {
      setActionLoading(false);
    }
  };

  // -------------------------------------------------------------
  // CONTACT MESSAGE STATUS UPDATE & REFRESH
  // -------------------------------------------------------------
  const handleUpdateMessageStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update message status');

      setContactMessages((prev) => prev.map((msg) => (msg.id === id ? data.message : msg)));
      showFeedback(`Message marked as ${newStatus}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const refreshContactMessages = async () => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/contact');
      const data = await res.json();
      if (data.messages) {
        setContactMessages(data.messages);
        showFeedback('Contact messages updated');
      }
    } catch (err) {
      showFeedback('Failed to refresh contact messages');
    } finally {
      setActionLoading(false);
    }
  };

  const refreshServices = async () => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/services');
      const data = await res.json();
      if (data.services) {
        setServices(data.services);
        showFeedback('Deliverables list updated');
      }
    } catch (err) {
      showFeedback('Failed to refresh deliverables');
    } finally {
      setActionLoading(false);
    }
  };

  // -------------------------------------------------------------
  // PASSWORD MANAGEMENT
  // -------------------------------------------------------------
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (newPassword !== confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'New password and confirmation do not match' });
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
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Left Navigation Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src="/nexa-logo-transparent.png"
              alt="Nexa Logo"
              style={{ height: '34px', width: 'auto' }}
            />
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', lineHeight: 1.2 }}>
                <span style={{ color: 'var(--c1-blue)' }}>Nexa</span> <span style={{ color: 'var(--c2-teal)' }}>Admin</span>
              </div>
              <div style={{ fontSize: '0.675rem', color: 'var(--text-muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Management Portal
              </div>
            </div>
          </div>

          <button
            className="admin-sidebar-toggle-btn"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Administrator Profile Card */}
        <div style={{ padding: '0.85rem 1.15rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-card-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: 'var(--c1-blue-soft)',
              color: 'var(--c1-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem',
              flexShrink: 0
            }}>
              {adminUser.username.slice(0, 2).toUpperCase()}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {adminUser.name}
              </div>
              <div style={{ fontSize: '0.725rem', color: 'var(--text-muted)' }}>
                @{adminUser.username} • <span style={{ color: 'var(--c2-teal)', fontWeight: 700 }}>{adminUser.role}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Navigation Links */}
        <nav className="admin-sidebar-nav">
          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '0.25rem 0.5rem 0.4rem' }}>
            Content & Operations
          </div>

          <button
            onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }}
            className={`admin-sidebar-btn ${activeTab === 'analytics' ? 'active' : ''}`}
          >
            <BarChart3 size={18} />
            <span style={{ flex: 1 }}>Analytics</span>
          </button>

          <button
            onClick={() => { setActiveTab('services'); setSidebarOpen(false); }}
            className={`admin-sidebar-btn ${activeTab === 'services' ? 'active' : ''}`}
          >
            <Layers size={18} />
            <span style={{ flex: 1 }}>Deliverables</span>
            <span className="badge badge-neutral" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}>{services.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('news'); setSidebarOpen(false); }}
            className={`admin-sidebar-btn ${activeTab === 'news' ? 'active' : ''}`}
          >
            <Newspaper size={18} />
            <span style={{ flex: 1 }}>News & Insights</span>
            <span className="badge badge-neutral" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}>{newsList.length}</span>
          </button>

          <button
            onClick={() => { setActiveTab('inquiries'); setSidebarOpen(false); }}
            className={`admin-sidebar-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
          >
            <Inbox size={18} />
            <span style={{ flex: 1 }}>Service Requests</span>
            {inquiries.filter((i) => i.status === 'PENDING').length > 0 ? (
              <span style={{ padding: '2px 7px', borderRadius: '10px', backgroundColor: '#ef4444', color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>
                {inquiries.filter((i) => i.status === 'PENDING').length}
              </span>
            ) : (
              <span className="badge badge-neutral" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}>{inquiries.length}</span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab('messages'); setSidebarOpen(false); }}
            className={`admin-sidebar-btn ${activeTab === 'messages' ? 'active' : ''}`}
          >
            <Mail size={18} />
            <span style={{ flex: 1 }}>Contact Messages</span>
            {contactMessages.filter((m) => m.status === 'UNREAD').length > 0 ? (
              <span style={{ padding: '2px 7px', borderRadius: '10px', backgroundColor: 'var(--c2-teal)', color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>
                {contactMessages.filter((m) => m.status === 'UNREAD').length}
              </span>
            ) : (
              <span className="badge badge-neutral" style={{ fontSize: '0.75rem', padding: '0.15rem 0.5rem' }}>{contactMessages.length}</span>
            )}
          </button>

          <div style={{ fontSize: '0.675rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '1.25rem 0.5rem 0.4rem' }}>
            System & Security
          </div>

          <button
            onClick={() => { setActiveTab('password'); setSidebarOpen(false); }}
            className={`admin-sidebar-btn ${activeTab === 'password' ? 'active' : ''}`}
          >
            <KeyRound size={18} />
            <span style={{ flex: 1 }}>Change Password</span>
          </button>
        </nav>
      </aside>

      {/* Main Right Content Area */}
      <div className="admin-content-area">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="admin-sidebar-toggle-btn"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                {activeTab === 'analytics' && 'Analytics & Performance Overview'}
                {activeTab === 'services' && 'Deliverables & Materials'}
                {activeTab === 'news' && 'News & SBCC Insights'}
                {activeTab === 'inquiries' && 'Incoming Service Requests'}
                {activeTab === 'messages' && 'Website Contact Messages'}
                {activeTab === 'password' && 'Change Administrator Password'}
              </h1>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                Nexa Solutions SBCC Ethiopia Portal
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link
              href="/"
              target="_blank"
              className="btn btn-outline btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
            >
              <span>Public Site</span>
              <ExternalLink size={13} />
            </Link>
            <button onClick={toggleTheme} className="theme-toggle-btn" aria-label="Toggle theme">
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>
            <button
              onClick={handleLogout}
              className="btn btn-outline btn-sm"
              style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              title="Sign Out"
            >
              <LogOut size={14} />
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
          {/* =================================================================
              TAB 0: ANALYTICS & DASHBOARD OVERVIEW (LANDING PAGE)
              ================================================================= */}
          {activeTab === 'analytics' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {/* Welcome & Quick Action Banner */}
              <div
                className="card"
                style={{
                  padding: '1.75rem 2rem',
                  background: 'linear-gradient(135deg, var(--bg-card) 0%, var(--bg-card-subtle) 100%)',
                  borderLeft: '4px solid var(--c1-blue)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1.5rem',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '1.35rem', fontWeight: 800 }}>
                      Welcome back, {adminUser.name}
                    </span>
                    <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                      Operational Portal Active
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0, maxWidth: '650px' }}>
                    Real-time performance metrics, client service intake, SBCC deliverable distributions, and website communication feeds for Nexa Solutions Ethiopia.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={openCreateServiceModal}
                    className="btn btn-primary btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Plus size={15} />
                    <span>New Deliverable</span>
                  </button>
                  <button
                    onClick={openCreateNewsModal}
                    className="btn btn-outline btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Plus size={15} />
                    <span>Post Insight</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="btn btn-outline btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <Inbox size={15} />
                    <span>View Requests</span>
                  </button>
                </div>
              </div>

              {/* KPI Summary Cards */}
              <div className="grid-4">
                {/* 1. Deliverables Card */}
                <div className="card" style={{ padding: '1.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Deliverables & Assets
                      </span>
                      <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--c1-blue)', lineHeight: 1.15, marginTop: '0.25rem' }}>
                        {services.length}
                      </div>
                    </div>
                    <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--c1-blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c1-blue)' }}>
                      <Layers size={22} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>
                      {services.filter((s) => s.isFeatured).length} featured works
                    </span>
                    <button
                      onClick={() => setActiveTab('services')}
                      style={{ background: 'none', border: 'none', color: 'var(--c1-blue)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}
                    >
                      Manage <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>

                {/* 2. Service Inquiries Card */}
                <div className="card" style={{ padding: '1.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Service Requests
                      </span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
                        <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--c3-purple)', lineHeight: 1.15 }}>
                          {inquiries.length}
                        </div>
                        {inquiries.filter((i) => i.status === 'PENDING').length > 0 && (
                          <span className="badge badge-orange" style={{ fontSize: '0.7rem' }}>
                            {inquiries.filter((i) => i.status === 'PENDING').length} pending
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--c3-purple-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c3-purple)' }}>
                      <Inbox size={22} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>
                      {inquiries.filter((i) => i.status === 'COMPLETED').length} projects fulfilled
                    </span>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      style={{ background: 'none', border: 'none', color: 'var(--c3-purple)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}
                    >
                      Review <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>

                {/* 3. Contact Messages Card */}
                <div className="card" style={{ padding: '1.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Contact Inquiries
                      </span>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' }}>
                        <div style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--c2-teal)', lineHeight: 1.15 }}>
                          {contactMessages.length}
                        </div>
                        {contactMessages.filter((m) => m.status === 'UNREAD').length > 0 && (
                          <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                            {contactMessages.filter((m) => m.status === 'UNREAD').length} unread
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--c2-teal-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c2-teal)' }}>
                      <Mail size={22} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>
                      {contactMessages.filter((m) => m.status === 'REPLIED').length} replied
                    </span>
                    <button
                      onClick={() => setActiveTab('messages')}
                      style={{ background: 'none', border: 'none', color: 'var(--c2-teal)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}
                    >
                      Inbox <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>

                {/* 4. News & Publications Card */}
                <div className="card" style={{ padding: '1.4rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        News & Insights
                      </span>
                      <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0ea5e9', lineHeight: 1.15, marginTop: '0.25rem' }}>
                        {newsList.length}
                      </div>
                    </div>
                    <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', backgroundColor: 'rgba(14, 165, 233, 0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9' }}>
                      <Newspaper size={22} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', fontSize: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>
                      {newsList.filter((n) => n.published).length} published articles
                    </span>
                    <button
                      onClick={() => setActiveTab('news')}
                      style={{ background: 'none', border: 'none', color: '#0ea5e9', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', padding: 0 }}
                    >
                      Editorial <ArrowUpRight size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid: Request Pipeline Status & Category Distribution */}
              <div className="grid-2">
                {/* Card Left: Inquiries Pipeline Progress Bar */}
                <div className="card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                        Service Inquiries Pipeline
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                        Intake lifecycle & client project fulfillment status
                      </p>
                    </div>
                    <span className="badge badge-neutral" style={{ fontSize: '0.75rem' }}>
                      {inquiries.length} Total
                    </span>
                  </div>

                  {/* Visual Progress Bar */}
                  <div style={{
                    height: '14px',
                    borderRadius: '7px',
                    backgroundColor: 'var(--bg-card-subtle)',
                    display: 'flex',
                    overflow: 'hidden',
                    marginBottom: '1.5rem',
                    border: '1px solid var(--border-color)',
                  }}>
                    {inquiries.length === 0 ? (
                      <div style={{ width: '100%', backgroundColor: 'var(--border-color)' }} />
                    ) : (
                      <>
                        <div
                          style={{
                            width: `${(inquiries.filter((i) => i.status === 'PENDING').length / inquiries.length) * 100}%`,
                            backgroundColor: '#f59e0b',
                            transition: 'width 0.4s ease',
                          }}
                          title={`Pending: ${inquiries.filter((i) => i.status === 'PENDING').length}`}
                        />
                        <div
                          style={{
                            width: `${(inquiries.filter((i) => i.status === 'IN_REVIEW').length / inquiries.length) * 100}%`,
                            backgroundColor: 'var(--c1-blue)',
                            transition: 'width 0.4s ease',
                          }}
                          title={`In Review: ${inquiries.filter((i) => i.status === 'IN_REVIEW').length}`}
                        />
                        <div
                          style={{
                            width: `${(inquiries.filter((i) => i.status === 'COMPLETED').length / inquiries.length) * 100}%`,
                            backgroundColor: 'var(--c2-teal)',
                            transition: 'width 0.4s ease',
                          }}
                          title={`Completed: ${inquiries.filter((i) => i.status === 'COMPLETED').length}`}
                        />
                        <div
                          style={{
                            width: `${(inquiries.filter((i) => i.status === 'REJECTED').length / inquiries.length) * 100}%`,
                            backgroundColor: '#94a3b8',
                            transition: 'width 0.4s ease',
                          }}
                          title={`Closed: ${inquiries.filter((i) => i.status === 'REJECTED').length}`}
                        />
                      </>
                    )}
                  </div>

                  {/* Pipeline Details */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)', borderLeft: '3px solid #f59e0b' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Pending Triage</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f59e0b', marginTop: '0.2rem' }}>
                        {inquiries.filter((i) => i.status === 'PENDING').length}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {inquiries.length > 0 ? Math.round((inquiries.filter((i) => i.status === 'PENDING').length / inquiries.length) * 100) : 0}% of inquiries
                      </div>
                    </div>

                    <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)', borderLeft: '3px solid var(--c1-blue)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Under Review / Scoping</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--c1-blue)', marginTop: '0.2rem' }}>
                        {inquiries.filter((i) => i.status === 'IN_REVIEW').length}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {inquiries.length > 0 ? Math.round((inquiries.filter((i) => i.status === 'IN_REVIEW').length / inquiries.length) * 100) : 0}% in progress
                      </div>
                    </div>

                    <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)', borderLeft: '3px solid var(--c2-teal)' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Fulfilled & Delivered</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--c2-teal)', marginTop: '0.2rem' }}>
                        {inquiries.filter((i) => i.status === 'COMPLETED').length}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {inquiries.length > 0 ? Math.round((inquiries.filter((i) => i.status === 'COMPLETED').length / inquiries.length) * 100) : 0}% success rate
                      </div>
                    </div>

                    <div style={{ padding: '0.85rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)', borderLeft: '3px solid #94a3b8' }}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Archived / Closed</div>
                      <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.2rem' }}>
                        {inquiries.filter((i) => i.status === 'REJECTED').length}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        {inquiries.length > 0 ? Math.round((inquiries.filter((i) => i.status === 'REJECTED').length / inquiries.length) * 100) : 0}% closed
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Right: Deliverables by SBCC Pillar */}
                <div className="card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                        Deliverables by SBCC Pillar
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
                        Asset allocation across core strategic capabilities
                      </p>
                    </div>
                    <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
                      5 Strategic Pillars
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                    {[
                      { label: 'Creative & Campaign Production', category: 'Creative', color: 'var(--c1-blue)' },
                      { label: 'Research & Formative Studies', category: 'Research', color: 'var(--c2-teal)' },
                      { label: 'Strategy & Framework Design', category: 'Strategy', color: 'var(--c3-purple)' },
                      { label: 'Monitoring & Evaluation (M&E)', category: 'M&E', color: '#f59e0b' },
                      { label: 'Capacity Building & Training', category: 'Training', color: '#ec4899' },
                    ].map((pillar) => {
                      const count = services.filter((s) => s.category === pillar.category).length;
                      const pct = services.length > 0 ? Math.round((count / services.length) * 100) : 0;
                      return (
                        <div key={pillar.category}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', marginBottom: '0.3rem', fontWeight: 600 }}>
                            <span style={{ color: 'var(--text-main)' }}>{pillar.label}</span>
                            <span style={{ color: 'var(--text-muted)' }}>
                              {count} ({pct}%)
                            </span>
                          </div>
                          <div style={{ height: '7px', borderRadius: '4px', backgroundColor: 'var(--bg-card-subtle)', overflow: 'hidden' }}>
                            <div
                              style={{
                                height: '100%',
                                width: `${pct}%`,
                                backgroundColor: pillar.color,
                                borderRadius: '4px',
                                transition: 'width 0.5s ease',
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Grid: Resource Formats & Platform Infrastructure Status */}
              <div className="grid-2">
                {/* Resource Formats */}
                <div className="card" style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.25rem' }}>
                    Asset Media & Deliverable Formats
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1.25rem' }}>
                    Production format distribution across digital guidelines, toolkits, audio, and video
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.85rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(239, 68, 68, 0.12)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                          {services.filter((s) => s.type === 'PDF').length}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          PDF Guides & Strategies
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.85rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(14, 165, 233, 0.12)', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Video size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                          {services.filter((s) => s.type === 'Video').length}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Video & Motion Materials
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.85rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(168, 85, 247, 0.12)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Radio size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                          {services.filter((s) => s.type === 'Audio').length}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Audio Spots & Jingles
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', padding: '0.85rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', backgroundColor: 'rgba(16, 185, 129, 0.12)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                          {services.filter((s) => !['PDF', 'Video', 'Audio'].includes(s.type)).length}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          Toolkits & Interactive Models
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operations & Communications Relay */}
                <div className="card" style={{ padding: '1.75rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.25rem' }}>
                    Operations & Notification Gateway
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1.25rem' }}>
                    Real-time platform dispatch channels and server health status
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0.95rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email Notification Dispatch</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--c2-teal)', fontWeight: 700 }}>
                        nexasolutionsethiopia@gmail.com
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0.95rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Database & Fallback Engine</span>
                      </div>
                      <span className="badge badge-blue" style={{ fontSize: '0.75rem' }}>
                        Prisma SQLite Resilient
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0.95rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-card-subtle)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Active Session</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        @{adminUser.username} ({adminUser.role})
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid: Recent Incoming Activity */}
              <div className="grid-2">
                {/* Recent Inquiries */}
                <div className="card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                        Recent Service Inquiries
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
                        Latest organizations requesting SBCC partnerships
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="btn btn-outline btn-sm"
                    >
                      View All ({inquiries.length})
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      No service requests received yet.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {inquiries.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          style={{
                            padding: '0.75rem 0.95rem',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--bg-card-subtle)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '0.75rem',
                          }}
                        >
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                                {item.organization || item.name}
                              </span>
                              <span
                                className={`badge ${
                                  item.status === 'PENDING'
                                    ? 'badge-orange'
                                    : item.status === 'IN_REVIEW'
                                    ? 'badge-blue'
                                    : item.status === 'COMPLETED'
                                    ? 'badge-teal'
                                    : 'badge-neutral'
                                }`}
                                style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}
                              >
                                {item.status}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {item.serviceType} • {item.name}
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedInquiry(item);
                              setActiveTab('inquiries');
                            }}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                          >
                            Details
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Contact Messages */}
                <div className="card" style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                        Recent Contact Messages
                      </h3>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
                        Direct website inquiries from public visitors
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="btn btn-outline btn-sm"
                    >
                      View All ({contactMessages.length})
                    </button>
                  </div>

                  {contactMessages.length === 0 ? (
                    <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                      No contact messages received yet.
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {contactMessages.slice(0, 4).map((msg) => (
                        <div
                          key={msg.id}
                          style={{
                            padding: '0.75rem 0.95rem',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: 'var(--bg-card-subtle)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '0.75rem',
                          }}
                        >
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                              <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>
                                {msg.name}
                              </span>
                              <span
                                className={`badge ${
                                  msg.status === 'UNREAD'
                                    ? 'badge-teal'
                                    : msg.status === 'REPLIED'
                                    ? 'badge-blue'
                                    : 'badge-neutral'
                                }`}
                                style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}
                              >
                                {msg.status}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {msg.subject || msg.message}
                            </div>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedMessage(msg);
                              setActiveTab('messages');
                            }}
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.3rem 0.65rem', fontSize: '0.75rem' }}
                          >
                            Read
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        {/* =================================================================
            TAB 1: SERVICES & HEALTH MATERIALS MANAGEMENT
            ================================================================= */}
        {activeTab === 'services' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem' }}>Deliverables & Health Materials</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Manage prior model works, guidelines, PNG infographics, posters, and campaign videos.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button onClick={refreshServices} disabled={actionLoading} className="btn btn-outline">
                  <span>Refresh</span>
                </button>
                <button onClick={openCreateServiceModal} className="btn btn-primary">
                  <Plus size={16} />
                  <span>Upload New Deliverable</span>
                </button>
              </div>
            </div>

            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title & Domain</th>
                    <th>Type</th>
                    <th>Sample File</th>
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
                        <span className={`badge ${item.type === 'PDF' ? 'badge-orange' : item.type === 'VIDEO' ? 'badge-teal' : 'badge-neutral'}`}>
                          {item.type}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>
                        {item.fileUrl ? (
                          <a
                            href={item.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: 'var(--c1-blue)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}
                          >
                            <span>Preview</span>
                            <ExternalLink size={12} />
                          </a>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>None</span>
                        )}
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
            TAB 3: SERVICE REQUESTS
            ================================================================= */}
        {activeTab === 'inquiries' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem' }}>Incoming Service Requests</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  These are requests generated from the Service Utilization Form and sent to <strong>nexasolutionsethiopia@gmail.com</strong>.
                </p>
              </div>

              <button onClick={refreshInquiries} disabled={actionLoading} className="btn btn-outline btn-sm">
                <span>Refresh Requests</span>
              </button>
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
                      <th>Requested Service / Domain</th>
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
                          <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => setSelectedInquiry(inq)}
                              className="btn btn-outline btn-sm"
                              title="View Scope"
                            >
                              <Eye size={14} />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => setItemToDelete({ type: 'inquiry', id: inq.id, title: inq.name })}
                              className="btn btn-outline btn-sm"
                              style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                              title="Delete Request"
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
            )}
          </div>
        )}

        {/* =================================================================
            TAB 4: CONTACT MESSAGES
            ================================================================= */}
        {activeTab === 'messages' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.5rem' }}>Website Contact Messages</h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Inquiries and messages sent through the public &ldquo;Contact Us&rdquo; portal to <strong>nexasolutionsethiopia@gmail.com</strong>.
                </p>
              </div>

              <button onClick={refreshContactMessages} disabled={actionLoading} className="btn btn-outline btn-sm">
                <span>Refresh Messages</span>
              </button>
            </div>

            {contactMessages.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p>No contact messages received yet.</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Sender</th>
                      <th>Subject & Message Snippet</th>
                      <th>Status</th>
                      <th>Received</th>
                      <th style={{ textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactMessages.map((msg) => (
                      <tr key={msg.id} style={{ backgroundColor: msg.status === 'UNREAD' ? 'var(--bg-card-subtle)' : 'transparent' }}>
                        <td>
                          <div style={{ fontWeight: 700 }}>{msg.name}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--c1-blue)' }}>{msg.email}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{msg.subject}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', maxWidth: '320px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {msg.message}
                          </div>
                        </td>
                        <td>
                          <select
                            value={msg.status}
                            onChange={(e) => handleUpdateMessageStatus(msg.id, e.target.value)}
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
                            <option value="UNREAD">UNREAD</option>
                            <option value="READ">READ</option>
                            <option value="REPLIED">REPLIED</option>
                          </select>
                        </td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => {
                                setSelectedMessage(msg);
                                if (msg.status === 'UNREAD') {
                                  handleUpdateMessageStatus(msg.id, 'READ');
                                }
                              }}
                              className="btn btn-outline btn-sm"
                              title="View Message"
                            >
                              <Eye size={14} />
                              <span>View</span>
                            </button>
                            <button
                              onClick={() => setItemToDelete({ type: 'message', id: msg.id, title: `${msg.name} (${msg.subject})` })}
                              className="btn btn-outline btn-sm"
                              style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                              title="Delete Message"
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
            )}
          </div>
        )}

        {/* =================================================================
            TAB 5: ADMIN PASSWORD & CREDENTIAL MANAGEMENT
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
    </div>

      {/* =================================================================
          MODAL: ADD / EDIT DELIVERABLE (With Direct File Upload & No Price)
          ================================================================= */}
      {serviceModalOpen && (
        <div className="modal-overlay" onClick={() => setServiceModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setServiceModalOpen(false)}>
              <X size={20} />
            </button>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
              {editingService ? 'Edit Deliverable' : 'Post New Deliverable / Model Material'}
            </h3>

            <form onSubmit={handleSaveService}>
              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  placeholder="e.g. Health Awareness Guidelines & PNG Infographics Pack"
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Core Domain (Page 5 Classification) *</label>
                  <select
                    className="form-select"
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({ ...serviceForm, category: e.target.value })}
                  >
                    <option value="Research">Research (Protocols, FGD Guides, Insight Reports)</option>
                    <option value="Strategy">Strategy (Situation Analysis, Roadmaps, Objectives)</option>
                    <option value="Creative">Creative (Guidelines, PNG Posters, Videos)</option>
                    <option value="M&E">M&E / MEL (Frameworks, Indicator Matrix)</option>
                    <option value="Training">Training (Facilitator Guides, Coaching Aids)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Asset Format *</label>
                  <select
                    className="form-select"
                    value={serviceForm.type}
                    onChange={(e) => setServiceForm({ ...serviceForm, type: e.target.value })}
                  >
                    <option value="PDF">PDF Handbook / Brief</option>
                    <option value="IMAGE">PNG Poster / Infographics</option>
                    <option value="VIDEO">Video Series / Campaign</option>
                    <option value="PACKAGE">Full Awareness Package</option>
                    <option value="RESEARCH">Research Protocol</option>
                    <option value="STRATEGY">Strategy Roadmap</option>
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
                  placeholder="e.g. Health guidelines; PNG infographics; Campaign video brief"
                  value={serviceForm.features}
                  onChange={(e) => setServiceForm({ ...serviceForm, features: e.target.value })}
                />
              </div>

              {/* DIRECT FILE UPLOAD FOR SAMPLE DELIVERABLE */}
              <div style={{
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1.25rem',
              }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                  <FileUp size={16} style={{ color: 'var(--c1-blue)' }} />
                  <span>Upload Sample Deliverable File (PDF / PNG / Video)</span>
                </label>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Directly upload files from your device instead of entering links:
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', backgroundColor: 'var(--bg-card)' }}>
                    <Upload size={14} />
                    <span>{uploadingField === 'fileUrl' ? 'Uploading File...' : 'Choose File to Upload'}</span>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg,.mp4,.webp"
                      style={{ display: 'none' }}
                      disabled={uploadingField === 'fileUrl'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'fileUrl');
                      }}
                    />
                  </label>

                  {serviceForm.fileUrl && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--c1-blue)', fontWeight: 600 }}>
                      <CheckCircle size={15} />
                      <span style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {serviceForm.fileUrl}
                      </span>
                      <button
                        type="button"
                        onClick={() => setServiceForm({ ...serviceForm, fileUrl: '' })}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        (Remove)
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '0.75rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                    placeholder="Or enter external link/URL if hosted elsewhere (e.g. YouTube, Drive)"
                    value={serviceForm.fileUrl}
                    onChange={(e) => setServiceForm({ ...serviceForm, fileUrl: e.target.value })}
                  />
                </div>
              </div>

              {/* DIRECT FILE UPLOAD FOR THUMBNAIL IMAGE */}
              <div style={{
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1.25rem',
              }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                  <ImageIcon size={16} style={{ color: 'var(--c2-teal)' }} />
                  <span>Upload Thumbnail Image</span>
                </label>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                  Upload image preview directly from your device:
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', backgroundColor: 'var(--bg-card)' }}>
                    <Upload size={14} />
                    <span>{uploadingField === 'imageUrl' ? 'Uploading Image...' : 'Choose Image to Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      disabled={uploadingField === 'imageUrl'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'imageUrl');
                      }}
                    />
                  </label>

                  {serviceForm.imageUrl && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--c2-teal)', fontWeight: 600 }}>
                      <CheckCircle size={15} />
                      <span style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {serviceForm.imageUrl}
                      </span>
                      <button
                        type="button"
                        onClick={() => setServiceForm({ ...serviceForm, imageUrl: '' })}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem' }}
                      >
                        (Remove)
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '0.75rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                    placeholder="Or enter image URL (e.g. Unsplash or web image)"
                    value={serviceForm.imageUrl}
                    onChange={(e) => setServiceForm({ ...serviceForm, imageUrl: e.target.value })}
                  />
                </div>
              </div>

              {/* Feature checkbox without Price field */}
              <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={serviceForm.isFeatured}
                  onChange={(e) => setServiceForm({ ...serviceForm, isFeatured: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="isFeatured" style={{ cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                  Feature in Home Page Deliverables Showcase
                </label>
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
          MODAL: ADD / EDIT NEWS (With Direct Image Upload)
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

              {/* Direct image upload for news article */}
              <div style={{
                backgroundColor: 'var(--bg-card-subtle)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                marginBottom: '1.25rem',
              }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
                  <ImageIcon size={16} style={{ color: 'var(--c2-teal)' }} />
                  <span>Article Header Image</span>
                </label>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer', backgroundColor: 'var(--bg-card)' }}>
                    <Upload size={14} />
                    <span>{uploadingField === 'newsImageUrl' ? 'Uploading...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      disabled={uploadingField === 'newsImageUrl'}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'newsImageUrl');
                      }}
                    />
                  </label>

                  {newsForm.imageUrl && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--c2-teal)', fontWeight: 600 }}>
                      <CheckCircle size={15} />
                      <span style={{ maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {newsForm.imageUrl}
                      </span>
                    </div>
                  )}
                </div>

                <div style={{ marginTop: '0.75rem' }}>
                  <input
                    type="text"
                    className="form-input"
                    style={{ fontSize: '0.8rem', padding: '0.5rem 0.75rem' }}
                    placeholder="Or enter image URL"
                    value={newsForm.imageUrl}
                    onChange={(e) => setNewsForm({ ...newsForm, imageUrl: e.target.value })}
                  />
                </div>
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

            <div className="badge badge-orange" style={{ marginBottom: '0.75rem' }}>
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

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setItemToDelete({ type: 'inquiry', id: selectedInquiry.id, title: selectedInquiry.name })}
                  className="btn btn-outline"
                  style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                >
                  <Trash2 size={15} />
                  <span>Delete</span>
                </button>

                <button onClick={() => setSelectedInquiry(null)} className="btn btn-outline">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================
          MODAL: VIEW CONTACT MESSAGE DETAILS
          ================================================================= */}
      {selectedMessage && (
        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedMessage(null)}>
              <X size={20} />
            </button>

            <div className="badge badge-teal" style={{ marginBottom: '0.75rem' }}>
              Reference ID: NEXA-MSG-{selectedMessage.id.slice(-6).toUpperCase()}
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              {selectedMessage.subject}
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
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Sender Name</div>
                <div style={{ fontWeight: 600 }}>{selectedMessage.name}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Email Address</div>
                <div style={{ fontWeight: 600, color: 'var(--c1-blue)' }}>{selectedMessage.email}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Status</div>
                <div style={{ fontWeight: 600 }}>{selectedMessage.status}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Received At</div>
                <div style={{ fontWeight: 600 }}>{new Date(selectedMessage.createdAt).toLocaleString()}</div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Message Content:</div>
              <div style={{
                padding: '1rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-main)',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
              }}>
                {selectedMessage.message}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <a
                href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(`Re: [Nexa Solutions] ${selectedMessage.subject}`)}`}
                className="btn btn-primary"
              >
                <Mail size={16} />
                <span>Reply to Sender via Email</span>
              </a>

              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setItemToDelete({ type: 'message', id: selectedMessage.id, title: `${selectedMessage.name} (${selectedMessage.subject})` })}
                  className="btn btn-outline"
                  style={{ color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                >
                  <Trash2 size={15} />
                  <span>Delete</span>
                </button>

                <button onClick={() => setSelectedMessage(null)} className="btn btn-outline">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================
          MODAL: CONFIRM DELETION (In-App Modal, No window.confirm)
          ================================================================= */}
      {itemToDelete && (
        <div className="modal-overlay" onClick={() => !deleteLoading && setItemToDelete(null)}>
          <div
            className="modal-card"
            style={{ maxWidth: '480px', textAlign: 'center', padding: '2rem' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.25rem',
            }}>
              <AlertCircle size={32} />
            </div>

            <h3 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', fontWeight: 800 }}>
              Confirm Deletion
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: 1.5, marginBottom: '1.75rem' }}>
              Are you sure you want to permanently delete{' '}
              <strong style={{ color: 'var(--text-main)' }}>&ldquo;{itemToDelete.title}&rdquo;</strong>?
              This record will be removed immediately and cannot be undone.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
              <button
                type="button"
                disabled={deleteLoading}
                onClick={() => setItemToDelete(null)}
                className="btn btn-outline"
                style={{ minWidth: '110px' }}
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleteLoading}
                onClick={handleConfirmDelete}
                className="btn"
                style={{
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  minWidth: '130px',
                  fontWeight: 700,
                  cursor: deleteLoading ? 'not-allowed' : 'pointer',
                }}
              >
                {deleteLoading ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
