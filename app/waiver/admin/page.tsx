'use client';

import { useState, useMemo } from 'react';

interface WaiverRow {
  id: number;
  confirmation_code: string;
  full_name: string;
  email: string;
  phone: string;
  date_of_birth: string;
  age_on_event: number;
  photo_opt_out: boolean;
  drive_upload_status: string;
  submitted_at: string;
  ip_address: string;
}

interface Filters {
  name: string;
  code: string;
  email: string;
  signed: string;
  photoOptOut: '' | 'yes' | 'no';
  drive: '' | 'uploaded' | 'failed' | 'pending' | 'test_mode';
}

const emptyFilters: Filters = { name: '', code: '', email: '', signed: '', photoOptOut: '', drive: '' };

export default function WaiverAdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [waivers, setWaivers] = useState<WaiverRow[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filters
  const [filters, setFilters] = useState<Filters>(emptyFilters);

  // Selection
  const [selectedCodes, setSelectedCodes] = useState<Set<string>>(new Set());

  // Download state
  const [downloading, setDownloading] = useState<string | null>(null); // confirmation_code or 'bulk'

  async function fetchWaivers() {
    setLoading(true);
    try {
      const res = await fetch('/api/waiver-admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, query: '' }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          setAuthError('Wrong password.');
          setAuthenticated(false);
        }
        return;
      }

      setWaivers(data.waivers);
      setTotal(data.total);
      setAuthenticated(true);
      setAuthError('');
    } catch {
      setAuthError('Connection error.');
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchWaivers();
  }

  // Client-side filtering
  const filtered = useMemo(() => {
    return waivers.filter((w) => {
      if (filters.name && !w.full_name.toLowerCase().includes(filters.name.toLowerCase())) return false;
      if (filters.code && !w.confirmation_code.toLowerCase().includes(filters.code.toLowerCase())) return false;
      if (filters.email && !w.email.toLowerCase().includes(filters.email.toLowerCase())) return false;
      if (filters.signed && !w.submitted_at.toLowerCase().includes(filters.signed.toLowerCase())) return false;
      if (filters.photoOptOut === 'yes' && !w.photo_opt_out) return false;
      if (filters.photoOptOut === 'no' && w.photo_opt_out) return false;
      if (filters.drive && w.drive_upload_status !== filters.drive) return false;
      return true;
    });
  }, [waivers, filters]);

  const filteredCodes = useMemo(() => new Set(filtered.map(w => w.confirmation_code)), [filtered]);
  const allVisibleSelected = filtered.length > 0 && filtered.every(w => selectedCodes.has(w.confirmation_code));

  function toggleSelectAll() {
    if (allVisibleSelected) {
      // Deselect all visible
      const next = new Set(selectedCodes);
      for (const w of filtered) next.delete(w.confirmation_code);
      setSelectedCodes(next);
    } else {
      // Select all visible
      const next = new Set(selectedCodes);
      for (const w of filtered) next.add(w.confirmation_code);
      setSelectedCodes(next);
    }
  }

  function toggleSelect(code: string) {
    const next = new Set(selectedCodes);
    if (next.has(code)) next.delete(code);
    else next.add(code);
    setSelectedCodes(next);
  }

  // Count of selected that are currently visible
  const selectedVisibleCount = filtered.filter(w => selectedCodes.has(w.confirmation_code)).length;

  async function downloadSingle(code: string) {
    setDownloading(code);
    try {
      const res = await fetch('/api/waiver-admin/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, confirmationCode: code }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const disposition = res.headers.get('Content-Disposition') || '';
      const match = disposition.match(/filename="(.+)"/);
      const filename = match ? match[1] : `waiver-${code}.pdf`;
      triggerDownload(blob, filename);
    } catch (err) {
      console.error('Download failed:', err);
    } finally {
      setDownloading(null);
    }
  }

  async function downloadBulk() {
    const codes = filtered.filter(w => selectedCodes.has(w.confirmation_code)).map(w => w.confirmation_code);
    if (codes.length === 0) return;
    setDownloading('bulk');
    try {
      const res = await fetch('/api/waiver-admin/download-bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, confirmationCodes: codes }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      triggerDownload(blob, 'waivers-bulk.zip');
    } catch (err) {
      console.error('Bulk download failed:', err);
    } finally {
      setDownloading(null);
    }
  }

  function triggerDownload(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function updateFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters(prev => ({ ...prev, [key]: value }));
  }

  function clearFilters() {
    setFilters(emptyFilters);
  }

  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  // ===== LOGIN SCREEN =====
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#0a0808' }}>
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="text-xs tracking-[3px] uppercase mb-2" style={{ color: '#57534e' }}>6CUPS</p>
            <h1 className="text-xl font-bold" style={{ color: '#f5efe6', fontFamily: 'var(--font-posterama), sans-serif' }}>
              WAIVER <span style={{ color: '#f61813' }}>ADMIN</span>
            </h1>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 text-sm mb-3 outline-none"
              style={{ background: '#111010', border: '1px solid #333', color: '#f5efe6' }}
              autoFocus
            />
            {authError && <p className="text-sm mb-3" style={{ color: '#f61813' }}>{authError}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-bold uppercase tracking-wider cursor-pointer"
              style={{ background: '#f61813', color: '#fff', border: 'none' }}
            >
              {loading ? 'Checking...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ===== ADMIN DASHBOARD =====
  return (
    <div className="min-h-screen" style={{ background: '#0a0808', color: '#f5efe6' }}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl font-bold" style={{ fontFamily: 'var(--font-posterama), sans-serif' }}>
              WAIVER <span style={{ color: '#f61813' }}>ADMIN</span>
            </h1>
            <p className="text-xs mt-1" style={{ color: '#57534e' }}>
              {total} total waiver{total !== 1 ? 's' : ''} signed
              {hasActiveFilters && ` · ${filtered.length} shown`}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="px-3 py-2 text-xs cursor-pointer"
                style={{ background: '#1c1917', border: '1px solid #333', color: '#a8a29e' }}
              >
                Clear Filters
              </button>
            )}
            {selectedVisibleCount > 0 && (
              <button
                type="button"
                onClick={downloadBulk}
                disabled={downloading === 'bulk'}
                className="px-4 py-2 text-xs font-bold uppercase cursor-pointer"
                style={{ background: '#f61813', color: '#fff', border: 'none', opacity: downloading === 'bulk' ? 0.6 : 1 }}
              >
                {downloading === 'bulk' ? 'Zipping...' : `Download Selected (${selectedVisibleCount})`}
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto" style={{ background: '#111010', border: '1px solid #222' }}>
          <table className="w-full text-xs" style={{ minWidth: '850px' }}>
            <thead>
              {/* Column headers */}
              <tr style={{ borderBottom: '1px solid #333' }}>
                <th className="px-2 py-3 w-8">
                  <input
                    type="checkbox"
                    checked={allVisibleSelected && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="cursor-pointer accent-[#f61813]"
                  />
                </th>
                <th className="text-left px-3 py-3 font-bold uppercase tracking-wider" style={{ color: '#a8a29e' }}>Name</th>
                <th className="text-left px-3 py-3 font-bold uppercase tracking-wider" style={{ color: '#a8a29e' }}>Code</th>
                <th className="text-left px-3 py-3 font-bold uppercase tracking-wider" style={{ color: '#a8a29e' }}>Email</th>
                <th className="text-left px-3 py-3 font-bold uppercase tracking-wider" style={{ color: '#a8a29e' }}>Signed</th>
                <th className="text-center px-3 py-3 font-bold uppercase tracking-wider" style={{ color: '#a8a29e' }}>Photo Opt-Out</th>
                <th className="text-center px-3 py-3 font-bold uppercase tracking-wider" style={{ color: '#a8a29e' }}>Drive</th>
                <th className="text-center px-3 py-3 font-bold uppercase tracking-wider" style={{ color: '#a8a29e' }}>Actions</th>
              </tr>
              {/* Filter row */}
              <tr style={{ borderBottom: '1px solid #222' }}>
                <td className="px-2 py-2"></td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={filters.name}
                    onChange={(e) => updateFilter('name', e.target.value)}
                    placeholder="Filter..."
                    className="w-full px-2 py-1 text-xs outline-none"
                    style={{ background: '#0a0808', border: '1px solid #333', color: '#f5efe6' }}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={filters.code}
                    onChange={(e) => updateFilter('code', e.target.value)}
                    placeholder="Filter..."
                    className="w-full px-2 py-1 text-xs outline-none"
                    style={{ background: '#0a0808', border: '1px solid #333', color: '#f5efe6' }}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={filters.email}
                    onChange={(e) => updateFilter('email', e.target.value)}
                    placeholder="Filter..."
                    className="w-full px-2 py-1 text-xs outline-none"
                    style={{ background: '#0a0808', border: '1px solid #333', color: '#f5efe6' }}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    value={filters.signed}
                    onChange={(e) => updateFilter('signed', e.target.value)}
                    placeholder="Filter..."
                    className="w-full px-2 py-1 text-xs outline-none"
                    style={{ background: '#0a0808', border: '1px solid #333', color: '#f5efe6' }}
                  />
                </td>
                <td className="px-3 py-2">
                  <select
                    value={filters.photoOptOut}
                    onChange={(e) => updateFilter('photoOptOut', e.target.value as Filters['photoOptOut'])}
                    className="w-full px-2 py-1 text-xs outline-none cursor-pointer"
                    style={{ background: '#0a0808', border: '1px solid #333', color: '#f5efe6' }}
                  >
                    <option value="">All</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select
                    value={filters.drive}
                    onChange={(e) => updateFilter('drive', e.target.value as Filters['drive'])}
                    className="w-full px-2 py-1 text-xs outline-none cursor-pointer"
                    style={{ background: '#0a0808', border: '1px solid #333', color: '#f5efe6' }}
                  >
                    <option value="">All</option>
                    <option value="uploaded">Uploaded</option>
                    <option value="failed">Failed</option>
                    <option value="pending">Pending</option>
                    <option value="test_mode">Test</option>
                  </select>
                </td>
                <td className="px-3 py-2"></td>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center px-3 py-8" style={{ color: '#57534e' }}>
                    {loading ? 'Loading...' : 'No waivers found.'}
                  </td>
                </tr>
              ) : (
                filtered.map((w) => (
                  <tr key={w.id} style={{ borderBottom: '1px solid #1c1917' }}>
                    <td className="px-2 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={selectedCodes.has(w.confirmation_code)}
                        onChange={() => toggleSelect(w.confirmation_code)}
                        className="cursor-pointer accent-[#f61813]"
                      />
                    </td>
                    <td className="px-3 py-3 font-bold">{w.full_name}</td>
                    <td className="px-3 py-3" style={{ fontFamily: 'monospace', color: '#f61813', fontWeight: 'bold' }}>{w.confirmation_code}</td>
                    <td className="px-3 py-3" style={{ color: '#a8a29e' }}>{w.email}</td>
                    <td className="px-3 py-3" style={{ color: '#a8a29e', fontSize: '10px' }}>{w.submitted_at}</td>
                    <td className="px-3 py-3 text-center">{w.photo_opt_out ? <span style={{ color: '#eab308' }}>YES</span> : <span style={{ color: '#57534e' }}>No</span>}</td>
                    <td className="px-3 py-3 text-center">
                      {w.drive_upload_status === 'uploaded' && <span style={{ color: '#22c55e' }}>&#10003;</span>}
                      {w.drive_upload_status === 'failed' && <span style={{ color: '#f61813' }}>&#10007;</span>}
                      {w.drive_upload_status === 'pending' && <span style={{ color: '#eab308' }}>...</span>}
                      {w.drive_upload_status === 'test_mode' && <span style={{ color: '#3b82f6' }}>TEST</span>}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <button
                        type="button"
                        onClick={() => downloadSingle(w.confirmation_code)}
                        disabled={downloading === w.confirmation_code}
                        className="px-2 py-1 text-xs cursor-pointer"
                        style={{
                          background: 'transparent',
                          border: '1px solid #333',
                          color: downloading === w.confirmation_code ? '#57534e' : '#a8a29e',
                        }}
                        title="Download PDF"
                      >
                        {downloading === w.confirmation_code ? '...' : '↓ PDF'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
