import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function XraySharedPlan() {
  const { token } = useParams<{ token: string }>();
  const [req, setReq] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    if (!token) return;
    (async () => {
      const { data } = await supabase.rpc('get_xray_plan', { _token: token });
      if (data) {
        const { items: its, ...rest } = data as any;
        setReq(rest);
        setItems(its || []);
      }
      setLoading(false);
    })();
  }, [token]);

  async function respond(accept: boolean) {
    if (!req) return;
    setResponding(true);
    const { data, error } = await supabase.rpc('respond_xray_plan', { _token: token!, _accept: accept });
    setResponding(false);
    if (error) toast.error(error.message);
    else { setReq({ ...req, status: (data as string) }); toast.success(accept ? 'Thank you! We will contact you shortly.' : 'Noted.'); }
  }

  if (loading) return <div className="min-h-screen grid place-items-center">Loading…</div>;
  if (!req) return <div className="min-h-screen grid place-items-center text-muted-foreground">Plan not found or link expired.</div>;

  const wa = `https://wa.me/905391104212?text=${encodeURIComponent(`Hi, I'd like to discuss my treatment plan (ref: ${req.patient_name})`)}`;

  return (
    <div className="min-h-screen bg-secondary/30 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-4">
        <div className="text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-2">Temelci Dental Clinic</div>
          <h1 className="font-display text-3xl font-bold">Hi {req.patient_name},</h1>
          <p className="text-muted-foreground mt-2">Here is your personalized treatment plan.</p>
        </div>

        {(req.annotated_image_url || req.xray_image_url) && (
          <Card className="p-2 bg-black">
            <img src={req.annotated_image_url || req.xray_image_url} alt="Your X-Ray" className="w-full rounded" />
          </Card>
        )}

        <Card className="p-6">
          <h2 className="font-semibold mb-4">Recommended treatments</h2>
          {items.length === 0 && <p className="text-sm text-muted-foreground">See the annotated image above.</p>}
          <ul className="divide-y divide-border">
            {items.map((it, i) => (
              <li key={it.id} className="py-3 flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground grid place-items-center text-xs font-bold shrink-0">{i + 1}</span>
                <div className="flex-1">
                  <div className="font-medium">{it.treatment_key}{it.tooth_number && <span className="text-muted-foreground"> · Tooth #{it.tooth_number}</span>}</div>
                  {it.note && <p className="text-sm text-muted-foreground mt-1">{it.note}</p>}
                </div>
                {it.price && <div className="font-bold text-primary whitespace-nowrap">{req.currency} {it.price}</div>}
              </li>
            ))}
          </ul>
          {req.price_total > 0 && (
            <div className="border-t border-border mt-4 pt-4 flex items-baseline justify-between">
              <span className="text-sm text-muted-foreground">Estimated total</span>
              <span className="font-display text-3xl font-bold text-primary">{req.currency} {req.price_total}</span>
            </div>
          )}
          {req.doctor_notes && (
            <div className="mt-4 p-3 rounded bg-secondary/50 text-sm">
              <strong>Doctor's notes: </strong>{req.doctor_notes}
            </div>
          )}
        </Card>

        <Card className="p-6">
          {req.status === 'accepted' ? (
            <div className="text-center">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
              <p className="font-semibold">Great! We'll contact you shortly to schedule.</p>
              <Button asChild className="mt-4" size="lg"><a href={wa}><MessageCircle className="w-4 h-4 mr-2" />Contact us on WhatsApp</a></Button>
            </div>
          ) : req.status === 'rejected' ? (
            <p className="text-center text-muted-foreground">Thanks for letting us know. We're here if you change your mind.</p>
          ) : (
            <>
              <p className="text-center text-sm text-muted-foreground mb-4">Ready to proceed? Let us know:</p>
              <div className="grid grid-cols-2 gap-3">
                <Button onClick={() => respond(true)} disabled={responding} size="lg"><CheckCircle2 className="w-4 h-4 mr-2" />Accept plan</Button>
                <Button onClick={() => respond(false)} disabled={responding} variant="outline" size="lg"><XCircle className="w-4 h-4 mr-2" />Not now</Button>
              </div>
              <Button asChild variant="ghost" className="w-full mt-2"><a href={wa}><MessageCircle className="w-4 h-4 mr-2" />Ask a question on WhatsApp</a></Button>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
