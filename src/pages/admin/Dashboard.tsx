import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { FileText, MessageSquare, Scan, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({ posts: 0, leads: 0, xrays: 0, xraysNew: 0, doctors: 0 });

  useEffect(() => {
    (async () => {
      const [posts, leads, xrays, xraysNew, doctors] = await Promise.all([
        supabase.from('posts').select('*', { count: 'exact', head: true }),
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('xray_requests').select('*', { count: 'exact', head: true }),
        supabase.from('xray_requests').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('doctors').select('*', { count: 'exact', head: true }),
      ]);
      setStats({
        posts: posts.count || 0,
        leads: leads.count || 0,
        xrays: xrays.count || 0,
        xraysNew: xraysNew.count || 0,
        doctors: doctors.count || 0,
      });
    })();
  }, []);

  const cards = [
    { icon: FileText, label: 'Blog Posts', value: stats.posts, to: '/admin/posts', color: 'bg-blue-500/10 text-blue-600' },
    { icon: MessageSquare, label: 'Leads', value: stats.leads, to: '/admin/leads', color: 'bg-emerald-500/10 text-emerald-600' },
    { icon: Scan, label: `X-Ray Requests (${stats.xraysNew} new)`, value: stats.xrays, to: '/admin/xrays', color: 'bg-amber-500/10 text-amber-600' },
    { icon: Stethoscope, label: 'Doctors', value: stats.doctors, to: '/admin/doctors', color: 'bg-purple-500/10 text-purple-600' },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <Link key={c.label} to={c.to}>
            <Card className="p-5 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-lg grid place-items-center ${c.color} mb-3`}><c.icon className="w-5 h-5" /></div>
              <div className="text-3xl font-display font-bold">{c.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card className="p-5">
          <h2 className="font-semibold mb-2">Quick actions</h2>
          <div className="space-y-2 text-sm">
            <Link to="/admin/posts/new" className="block text-primary hover:underline">→ Write a new blog post</Link>
            <Link to="/admin/treatments" className="block text-primary hover:underline">→ Add / edit treatments</Link>
            <Link to="/admin/before-after" className="block text-primary hover:underline">→ Upload before / after case</Link>
            <Link to="/admin/settings" className="block text-primary hover:underline">→ Update site settings</Link>
          </div>
        </Card>
        <Card className="p-5 bg-primary/5 border-primary/20">
          <h2 className="font-semibold mb-2">🎯 X-Ray patient link</h2>
          <p className="text-sm text-muted-foreground mb-3">Share this public form so patients can upload an X-ray and request a quote.</p>
          <code className="block bg-background px-2 py-1.5 rounded text-xs break-all">{window.location.origin}/xray-quote</code>
        </Card>
      </div>
    </div>
  );
}
