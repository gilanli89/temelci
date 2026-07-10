import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/lib/adminAuth';
import { LayoutDashboard, FileText, Users, Stethoscope, Image as ImgIcon, MessageSquare, Settings, LogOut, ImagePlus, Scan, UserCog, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const nav = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true, roles: ['admin', 'doctor'] },
  { to: '/admin/posts', icon: FileText, label: 'Blog Posts', roles: ['admin'] },
  { to: '/admin/treatments', icon: Sparkles, label: 'Treatments', roles: ['admin'] },
  { to: '/admin/doctors', icon: Stethoscope, label: 'Doctors', roles: ['admin'] },
  { to: '/admin/before-after', icon: ImagePlus, label: 'Before / After', roles: ['admin'] },
  { to: '/admin/xrays', icon: Scan, label: 'X-Ray Quotes', roles: ['admin', 'doctor'] },
  { to: '/admin/leads', icon: MessageSquare, label: 'Leads', roles: ['admin'] },
  { to: '/admin/media', icon: ImgIcon, label: 'Media', roles: ['admin'] },
  { to: '/admin/users', icon: UserCog, label: 'Users & Roles', roles: ['admin'] },
  { to: '/admin/settings', icon: Settings, label: 'Site Settings', roles: ['admin'] },
];

export default function AdminLayout() {
  const { user, role, signOut } = useAdminAuth();
  const navigate = useNavigate();
  const visible = nav.filter(n => role && n.roles.includes(role));

  return (
    <div className="min-h-screen flex bg-secondary/20">
      <aside className="w-64 shrink-0 bg-card border-r border-border flex flex-col">
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
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
