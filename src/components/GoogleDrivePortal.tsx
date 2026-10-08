import React, { useState, useEffect, useRef } from 'react';
import {
  initAuth,
  googleSignIn,
  logout,
  getAccessToken,
} from '../services/googleDriveAuth';
import {
  listDriveFiles,
  getDriveAbout,
  createDriveFolder,
  uploadDriveFile,
  deleteDriveFile,
  formatFileSize,
  isFolder,
  DriveFile,
  DriveAbout,
} from '../services/googleDriveApi';
import { User } from 'firebase/auth';
import {
  Folder,
  FileText,
  FileSpreadsheet,
  FileImage,
  File,
  Upload,
  FolderPlus,
  RefreshCw,
  Search,
  Trash2,
  ExternalLink,
  ChevronRight,
  HardDrive,
  User as UserIcon,
  LogOut,
  AlertTriangle,
  X,
  CheckCircle2,
  Download,
  Filter,
  ShieldCheck,
  Building2,
  FileCheck,
} from 'lucide-react';

interface GoogleDrivePortalProps {
  onClose?: () => void;
}

interface BreadcrumbItem {
  id?: string;
  name: string;
}

export const GoogleDrivePortal: React.FC<GoogleDrivePortalProps> = ({ onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);

  // Drive state
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [driveAbout, setDriveAbout] = useState<DriveAbout | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Folder navigation
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { name: 'My Drive' },
  ]);
  const currentFolderId = breadcrumbs[breadcrumbs.length - 1].id;

  // Search and filter
  const [searchQuery, setSearchQuery] = useState('');
  const [mimeFilter, setMimeFilter] = useState<'all' | 'folders' | 'documents' | 'spreadsheets' | 'images'>('all');

  // Modals
  const [showNewFolderModal, setShowNewFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mandatory Delete Confirmation Modal
  const [fileToDelete, setFileToDelete] = useState<DriveFile | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Initialize Auth state listener on mount
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setAuthInitialized(true);
      },
      () => {
        setUser(null);
        setToken(null);
        setAuthInitialized(true);
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Fetch files and storage about info when token or folder changes
  const loadFiles = async (currentToken: string, folderId?: string, query?: string, filter?: string) => {
    setLoading(true);
    setError(null);
    try {
      const [filesRes, aboutRes] = await Promise.all([
        listDriveFiles(currentToken, {
          parentId: folderId,
          searchQuery: query,
          mimeTypeFilter: filter,
        }),
        getDriveAbout(currentToken).catch(() => null),
      ]);

      setFiles(filesRes.files || []);
      if (aboutRes) setDriveAbout(aboutRes);
    } catch (err: any) {
      console.error('Failed to load Google Drive content:', err);
      setError(err.message || 'Unable to load Google Drive files. Please check permissions.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadFiles(token, currentFolderId, searchQuery, mimeFilter);
    }
  }, [token, currentFolderId, mimeFilter]);

  // Handle Search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      loadFiles(token, currentFolderId, searchQuery, mimeFilter);
    }
  };

  // Google Sign-In
  const handleSignIn = async () => {
    setIsLoggingIn(true);
    setError(null);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        loadFiles(res.accessToken, currentFolderId);
      }
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      setError(err.message || 'Sign in was cancelled or failed.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setFiles([]);
    setDriveAbout(null);
    setBreadcrumbs([{ name: 'My Drive' }]);
  };

  // Navigation into folder
  const handleEnterFolder = (folder: DriveFile) => {
    setBreadcrumbs((prev) => [...prev, { id: folder.id, name: folder.name }]);
    setSearchQuery('');
  };

  // Navigation via breadcrumb click
  const handleBreadcrumbClick = (index: number) => {
    setBreadcrumbs((prev) => prev.slice(0, index + 1));
    setSearchQuery('');
  };

  // Create folder
  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newFolderName.trim()) return;

    setIsCreatingFolder(true);
    setError(null);
    try {
      await createDriveFolder(token, newFolderName.trim(), currentFolderId);
      setShowNewFolderModal(false);
      setNewFolderName('');
      setActionSuccess(`Folder created successfully`);
      setTimeout(() => setActionSuccess(null), 3000);
      await loadFiles(token, currentFolderId, searchQuery, mimeFilter);
    } catch (err: any) {
      setError(err.message || 'Failed to create folder');
    } finally {
      setIsCreatingFolder(false);
    }
  };

  // Trigger file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFileToUpload(selected);
    }
  };

  // Upload file
  const handleUploadSubmit = async () => {
    if (!token || !fileToUpload) return;

    setIsUploading(true);
    setError(null);
    try {
      await uploadDriveFile(token, fileToUpload, currentFolderId);
      setFileToUpload(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      setActionSuccess(`File "${fileToUpload.name}" uploaded to Google Drive!`);
      setTimeout(() => setActionSuccess(null), 3500);
      await loadFiles(token, currentFolderId, searchQuery, mimeFilter);
    } catch (err: any) {
      setError(err.message || 'Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  };

  // Execute mandatory delete operation after user confirmation
  const handleConfirmDelete = async () => {
    if (!token || !fileToDelete) return;

    setIsDeleting(true);
    setError(null);
    try {
      await deleteDriveFile(token, fileToDelete.id);
      const deletedName = fileToDelete.name;
      setFileToDelete(null);
      setActionSuccess(`"${deletedName}" was removed from Google Drive`);
      setTimeout(() => setActionSuccess(null), 3000);
      await loadFiles(token, currentFolderId, searchQuery, mimeFilter);
    } catch (err: any) {
      setError(err.message || 'Failed to delete file');
    } finally {
      setIsDeleting(false);
    }
  };

  const getFileIcon = (mimeType: string) => {
    if (isFolder(mimeType)) {
      return <Folder className="w-5 h-5 text-amber-500 fill-amber-500/20" />;
    }
    if (mimeType.includes('pdf')) {
      return <FileText className="w-5 h-5 text-red-500" />;
    }
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel') || mimeType.includes('csv')) {
      return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
    }
    if (mimeType.includes('document') || mimeType.includes('word') || mimeType.includes('text')) {
      return <FileText className="w-5 h-5 text-blue-600" />;
    }
    if (mimeType.includes('image/')) {
      return <FileImage className="w-5 h-5 text-purple-600" />;
    }
    return <File className="w-5 h-5 text-slate-500" />;
  };

  // Storage calculation
  const storageUsage = driveAbout?.storageQuota?.usage
    ? parseInt(driveAbout.storageQuota.usage, 10)
    : 0;
  const storageLimit = driveAbout?.storageQuota?.limit
    ? parseInt(driveAbout.storageQuota.limit, 10)
    : 0;
  const storagePercent =
    storageLimit > 0 ? Math.min(100, Math.round((storageUsage / storageLimit) * 100)) : 0;

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-5rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header Banner */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
                <HardDrive className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#b8860b] font-semibold block">
                  Cloud Document Vault
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Google Drive Integration
                </h1>
              </div>
            </div>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
              Connect your Google Drive account to securely store, organize, and access Kidrill Group commercial trade contracts, bills of lading, quality inspection certificates (SGS), and commodity specifications.
            </p>
          </div>

          {/* User Status / Sign In Area */}
          <div className="flex items-center gap-3 shrink-0">
            {user && token ? (
              <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-xl p-3">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Google User'}
                    className="w-10 h-10 rounded-full border border-slate-300 object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                    <UserIcon className="w-5 h-5" />
                  </div>
                )}
                <div className="text-left hidden sm:block">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-900 leading-tight block">
                      {user.displayName || 'Connected User'}
                    </span>
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" title="Active Drive Connection" />
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono block">
                    {user.email}
                  </span>
                </div>
                <button
                  onClick={handleSignOut}
                  title="Sign Out"
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* Official Google Sign-In Button as required by Workspace skill */
              <button
                onClick={handleSignIn}
                disabled={isLoggingIn}
                className="gsi-material-button inline-flex items-center justify-center gap-3 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium border border-slate-300 rounded-lg shadow-xs hover:shadow transition-all cursor-pointer disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{isLoggingIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
              </button>
            )}

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Close Portal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Success Alert */}
        {actionSuccess && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3 text-sm animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 flex items-center gap-3 text-sm">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            <div className="flex-grow">
              <p className="font-semibold">Google Drive Notice</p>
              <p className="text-xs text-red-700 mt-0.5">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-red-500 hover:text-red-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Not Authenticated Empty State */}
        {!token ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white mx-auto flex items-center justify-center shadow-md">
              <HardDrive className="w-8 h-8" />
            </div>
            <div className="max-w-md mx-auto space-y-2">
              <h3 className="text-xl font-bold text-slate-900">
                Connect Your Google Drive
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Authorize Kidrill Group to browse, upload, and organize trade documents directly with your Google Drive storage.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={handleSignIn}
                disabled={isLoggingIn}
                className="inline-flex items-center gap-3 px-6 py-3 bg-[#0f172a] hover:bg-[#1e293b] text-white text-sm font-semibold rounded-xl shadow-md transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span>{isLoggingIn ? 'Opening Google Auth...' : 'Connect Google Drive Account'}</span>
              </button>
            </div>

            {/* Features Preview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 border-t border-slate-100 text-left">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <FileCheck className="w-5 h-5 text-[#b8860b]" />
                <h4 className="text-sm font-semibold text-slate-900">Trade Documents</h4>
                <p className="text-xs text-slate-500">
                  Manage commercial invoices, packing lists, and export certificates in one place.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <FolderPlus className="w-5 h-5 text-blue-600" />
                <h4 className="text-sm font-semibold text-slate-900">Structured Folders</h4>
                <p className="text-xs text-slate-500">
                  Organize by commodity section (Minerals, Agriculture, Seafood) or shipment quarters.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-semibold text-slate-900">Direct & Secure</h4>
                <p className="text-xs text-slate-500">
                  Direct client-side OAuth connection with token in-memory caching and privacy.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="space-y-6">
            {/* Storage Quota & Quick Action Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Storage Quota */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Google Drive Storage
                  </span>
                  <HardDrive className="w-4 h-4 text-slate-400" />
                </div>
                <div className="mt-3">
                  <div className="flex items-baseline justify-between text-xs font-medium text-slate-700 mb-1.5">
                    <span>{formatFileSize(storageUsage)} used</span>
                    <span>{storageLimit > 0 ? formatFileSize(storageLimit) : 'Unlimited'}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${storagePercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Folder Creator */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Folder Organization
                  </span>
                  <p className="text-xs text-slate-600">Create target directory for trade contracts</p>
                </div>
                <button
                  onClick={() => setShowNewFolderModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <FolderPlus className="w-4 h-4 text-amber-600" />
                  <span>New Folder</span>
                </button>
              </div>

              {/* Quick File Upload */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Document Upload
                  </span>
                  <p className="text-xs text-slate-600">Upload PDF, Sheet, or Contract into Drive</p>
                </div>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="drive-file-input"
                  />
                  <label
                    htmlFor="drive-file-input"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-[#0f172a] hover:bg-[#1e293b] text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload File</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Selected File Upload Bar */}
            {fileToUpload && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <File className="w-5 h-5 text-blue-600 shrink-0" />
                  <div>
                    <span className="text-sm font-semibold text-blue-900 block">
                      Ready to upload: {fileToUpload.name}
                    </span>
                    <span className="text-xs text-blue-700">
                      Size: {formatFileSize(fileToUpload.size)} · Target:{' '}
                      {breadcrumbs[breadcrumbs.length - 1].name}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setFileToUpload(null);
                      if (fileInputRef.current) fileInputRef.current.value = '';
                    }}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUploadSubmit}
                    disabled={isUploading}
                    className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{isUploading ? 'Uploading...' : 'Confirm Upload'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Main File Explorer Container */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Explorer Toolbar */}
              <div className="p-4 sm:p-5 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
                {/* Breadcrumbs Navigation */}
                <div className="flex items-center gap-1.5 text-sm overflow-x-auto py-1">
                  {breadcrumbs.map((crumb, idx) => {
                    const isLast = idx === breadcrumbs.length - 1;
                    return (
                      <React.Fragment key={crumb.id || 'root'}>
                        {idx > 0 && <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />}
                        <button
                          onClick={() => handleBreadcrumbClick(idx)}
                          className={`font-medium px-2 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                            isLast
                              ? 'text-slate-900 bg-white border border-slate-200 shadow-2xs font-semibold'
                              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                          }`}
                        >
                          {idx === 0 ? '📁 ' + crumb.name : crumb.name}
                        </button>
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Search & Refresh */}
                <div className="flex items-center gap-2.5">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search Drive files..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#b8860b] w-48 sm:w-64"
                    />
                  </form>

                  <button
                    onClick={() => {
                      if (token) loadFiles(token, currentFolderId, searchQuery, mimeFilter);
                    }}
                    title="Refresh List"
                    className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="px-5 py-2.5 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-xs bg-white">
                <span className="text-slate-400 flex items-center gap-1 shrink-0 mr-1">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                {(
                  [
                    { id: 'all', label: 'All Items' },
                    { id: 'folders', label: 'Folders Only' },
                    { id: 'documents', label: 'Documents & PDFs' },
                    { id: 'spreadsheets', label: 'Spreadsheets & CSV' },
                    { id: 'images', label: 'Images' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setMimeFilter(tab.id)}
                    className={`px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                      mimeFilter === tab.id
                        ? 'bg-slate-900 text-white font-medium'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Files Table / List */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                      <th className="py-3 px-5">Name</th>
                      <th className="py-3 px-5 hidden sm:table-cell">Type</th>
                      <th className="py-3 px-5 hidden md:table-cell">Size</th>
                      <th className="py-3 px-5 hidden lg:table-cell">Last Modified</th>
                      <th className="py-3 px-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-slate-500">
                          <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-slate-400" />
                          <span>Loading files from Google Drive...</span>
                        </td>
                      </tr>
                    ) : files.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-14 text-center">
                          <div className="max-w-sm mx-auto space-y-3">
                            <Folder className="w-10 h-10 text-slate-300 mx-auto" />
                            <p className="text-sm font-semibold text-slate-700">No files found</p>
                            <p className="text-xs text-slate-500">
                              {searchQuery
                                ? `No results found for "${searchQuery}" in this folder.`
                                : 'This folder is currently empty. Upload trade documents or create subfolders.'}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      files.map((file) => {
                        const isDir = isFolder(file.mimeType);
                        return (
                          <tr
                            key={file.id}
                            className="hover:bg-slate-50/80 transition-colors group"
                          >
                            {/* File Name & Icon */}
                            <td className="py-3.5 px-5">
                              <div className="flex items-center gap-3">
                                <div className="shrink-0">{getFileIcon(file.mimeType)}</div>
                                <div className="min-w-0 max-w-xs sm:max-w-md lg:max-w-lg">
                                  {isDir ? (
                                    <button
                                      onClick={() => handleEnterFolder(file)}
                                      className="font-medium text-slate-900 hover:text-blue-600 truncate block text-left cursor-pointer transition-colors"
                                    >
                                      {file.name}
                                    </button>
                                  ) : (
                                    <span className="font-medium text-slate-800 truncate block">
                                      {file.name}
                                    </span>
                                  )}
                                  {file.shared && (
                                    <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-mono mt-0.5 inline-block">
                                      Shared
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* MIME Type label */}
                            <td className="py-3.5 px-5 hidden sm:table-cell text-xs text-slate-500">
                              {isDir ? 'Folder' : file.mimeType.split('.').pop()?.split('/').pop() || 'File'}
                            </td>

                            {/* File Size */}
                            <td className="py-3.5 px-5 hidden md:table-cell text-xs font-mono text-slate-500">
                              {isDir ? '--' : formatFileSize(file.size)}
                            </td>

                            {/* Last Modified */}
                            <td className="py-3.5 px-5 hidden lg:table-cell text-xs text-slate-500 font-mono">
                              {file.modifiedTime
                                ? new Date(file.modifiedTime).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                  })
                                : '--'}
                            </td>

                            {/* Action Buttons */}
                            <td className="py-3.5 px-5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {file.webViewLink && (
                                  <a
                                    href={file.webViewLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Open in Google Drive"
                                    className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                )}
                                {file.webContentLink && !isDir && (
                                  <a
                                    href={file.webContentLink}
                                    title="Download File"
                                    className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                                  >
                                    <Download className="w-4 h-4" />
                                  </a>
                                )}
                                {/* Delete button triggers explicit confirmation modal */}
                                <button
                                  onClick={() => setFileToDelete(file)}
                                  title="Delete from Google Drive"
                                  className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Folder Modal */}
      {showNewFolderModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FolderPlus className="w-5 h-5 text-amber-500" />
                <h3 className="text-lg font-bold text-slate-900">Create New Folder</h3>
              </div>
              <button
                onClick={() => setShowNewFolderModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Folder Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kidrill Trade Contracts 2026"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  autoFocus
                  required
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b8860b]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewFolderModal(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreatingFolder || !newFolderName.trim()}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#0f172a] hover:bg-[#1e293b] rounded-lg shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isCreatingFolder ? 'Creating...' : 'Create Folder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANDATORY USER CONFIRMATION DIALOG FOR DESTRUCTIVE OPERATIONS */}
      {fileToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-red-100 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-full bg-red-100 text-red-600 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">
                  Delete {isFolder(fileToDelete.mimeType) ? 'Folder' : 'File'} from Google Drive?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This action mutates your Google Drive data and permanently removes the selected item.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 flex items-center gap-3">
              {getFileIcon(fileToDelete.mimeType)}
              <div className="min-w-0 flex-grow">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {fileToDelete.name}
                </p>
                <p className="text-xs text-slate-500 font-mono">
                  {isFolder(fileToDelete.mimeType) ? 'Folder' : formatFileSize(fileToDelete.size)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFileToDelete(null)}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg shadow-xs transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isDeleting ? 'Deleting...' : 'Confirm Delete'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
