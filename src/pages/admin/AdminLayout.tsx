import { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/lib/adminAuth';
import { LayoutDashboard, FileText, Stethoscope, Image as ImgIcon, MessageSquare, Settings, LogOut, ImagePlus, Scan, UserCog, Sparkles, PanelsTopLeft, Star, CircleHelp, Menu, X, BadgeEuro } from 'lucide-react';
import { Button } from '@/components/ui/button';

const nav = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true, roles: ['super_admin', 'admin', 'editor', 'doctor', 'lead_manager', 'viewer'] },
  { to: '/admin/pages', icon: PanelsTopLeft, label: 'Pages', roles: ['super_admin', 'admin', 'editor'] },
  { to: '/admin/posts', icon: FileText, label: 'Blog Posts', roles: ['super_admin', 'admin', 'editor'] },
  { to: '/admin/treatments', icon: Sparkles, label: 'Treatments', roles: ['super_admin', 'admin', 'editor'] },
  { to: '/admin/doctors', icon: Stethoscope, label: 'Doctors', roles: ['super_admin', 'admin', 'editor'] },
  { to: '/admin/before-after', icon: ImagePlus, label: 'Before / After', roles: ['super_admin', 'admin', 'editor'] },
  { to: '/admin/reviews', icon: Star, label: 'Reviews', roles: ['super_admin', 'admin', 'editor'] },
  { to: '/admin/faqs', icon: CircleHelp, label: 'FAQs', roles: ['super_admin', 'admin', 'editor'] },
  { to: '/admin/xrays', icon: Scan, label: 'X-Ray Planning', roles: ['super_admin', 'admin', 'doctor'] },
  { to: '/admin/xray-pricing', icon: BadgeEuro, label: 'X-Ray Unit Prices', roles: ['super_admin', 'admin'] },
  { to: '/admin/leads', icon: MessageSquare, label: 'Leads', roles: ['super_admin', 'admin', 'lead_manager'] },
  { to: '/admin/media', icon: ImgIcon, label: 'Media', roles: ['super_admin', 'admin', 'editor'] },
  { to: '/admin/users', icon: UserCog, label: 'Users & Roles', roles: ['super_admin', 'admin'] },
  { to: '/admin/settings', icon: Settings, label: 'Site Settings', roles: ['super_admin', 'admin'] },
];

export default function AdminLayout() {
  const { user, role, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const visible = nav.filter(n => role && n.roles.includes(role));

  useEffect(() => {
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robots) {
      robots = document.createElement('meta');
      robots.name = 'robots';
      document.head.appendChild(robots);
    }
    robots.content = 'noindex,nofollow,noarchive';
  }, []);

  return (
    <div className="min-h-screen flex bg-secondary/20">
      <aside className="hidden md:flex w-64 shrink-0 bg-card border-r border-border flex-col">
        <div className="p-5 border-b border-border">
          <div className="font-display font-bold text-lg">Temelci CMS</div>
          <div className="text-xs text-muted-foreground">{user?.email}</div>
          <div className="mt-1 inline-block text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">{role}</div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {visible.map(item => (
            <NavLink key={item.to} to={item.to} end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-primary text-primary-foreground font-semibold' : 'text-foreground/70 hover:bg-secondary hover:text-foreground'
                }`}>
              <item.icon className="w-4 h-4" /> {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border space-y-2">
          <Button variant="outline" className="w-full justify-start gap-2" onClick={() => window.open('/', '_blank')}>
            View site
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2 text-destructive"
            onClick={async () => { await signOut(); navigate('/admin/login'); }}>
            <LogOut className="w-4 h-4" /> Sign out
          </Button>
        </div>
      </aside>
      {mobileOpen && <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="CMS navigation">
        <button className="absolute inset-0 bg-foreground/50" aria-label="Close navigation" onClick={() => setMobileOpen(false)} />
        <aside className="relative w-72 h-full bg-card border-r border-border flex flex-col shadow-xl">
          <div className="p-5 border-b border-border flex items-start justify-between gap-3"><div><div className="font-display font-bold text-lg">Temelci CMS</div><div className="text-xs text-muted-foreground break-all">{user?.email}</div></div><Button variant="ghost" size="icon" aria-label="Close navigation" onClick={() => setMobileOpen(false)}><X className="w-5 h-5" /></Button></div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">{visible.map(item => <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setMobileOpen(false)} className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-primary text-primary-foreground font-semibold' : 'text-foreground/70 hover:bg-secondary hover:text-foreground'}`}><item.icon className="w-4 h-4" />{item.label}</NavLink>)}</nav>
          <div className="p-3 border-t border-border"><Button variant="ghost" className="w-full justify-start gap-2 text-destructive" onClick={async () => { await signOut(); navigate('/admin/login'); }}><LogOut className="w-4 h-4" />Sign out</Button></div>
        </aside>
      </div>}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="md:hidden sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center justify-between"><div><div className="font-display font-bold">Temelci CMS</div><div className="text-[10px] uppercase text-primary font-bold">{role}</div></div><Button variant="outline" size="icon" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><Menu className="w-5 h-5" /></Button></div>
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
