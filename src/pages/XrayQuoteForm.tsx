import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { Upload, CheckCircle2, Scan } from 'lucide-react';
import { uploadToBucket } from '@/lib/mediaUpload';

export default function XrayQuoteForm() {
  const [form, setForm] = useState({ patient_name: '', phone: '', email: '', message: '' });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [consent, setConsent] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  function pickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 15 * 1024 * 1024) { toast.error('Max file size 15MB'); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!file) { toast.error('Please attach your X-ray image'); return; }
    if (!consent) { toast.error('Please confirm the clinical data consent'); return; }
    setSubmitting(true);
    try {
      const { path } = await uploadToBucket('xrays', file, 'requests');
      const { error } = await supabase.from('xray_requests').insert({
        ...form, xray_image_url: path, status: 'new', patient_consent_at: new Date().toISOString(),
      });
      if (error) throw error;
      setDone(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Submission failed');
    } finally { setSubmitting(false); }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-secondary/30 grid place-items-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
          <h1 className="font-display text-2xl font-bold mb-2">Thank you!</h1>
          <p className="text-muted-foreground">Our dentist will review your X-ray and send you a personalized treatment plan on WhatsApp within 24 hours.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary text-primary-foreground grid place-items-center mx-auto mb-3"><Scan className="w-7 h-7" /></div>
          <h1 className="font-display text-3xl font-bold">Free X-Ray Review</h1>
          <p className="text-muted-foreground mt-2">Upload your dental X-ray and receive a personalized treatment plan with pricing from Temelci Dental Clinic — Kyrenia, Cyprus.</p>
        </div>
        <Card className="p-6">
          <form onSubmit={submit} className="space-y-4">
            <div>
              <Label>Your name *</Label>
              <Input required value={form.patient_name} onChange={e => set('patient_name', e.target.value)} maxLength={200} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label>WhatsApp / phone *</Label>
                <Input required value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+90..." maxLength={50} />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} maxLength={255} />
              </div>
            </div>
            <div>
              <Label>X-Ray image (JPG / PNG, max 15MB) *</Label>
              <label className="mt-1 flex items-center justify-center gap-2 px-4 py-6 border-2 border-dashed border-primary/40 rounded-lg cursor-pointer hover:bg-primary/5 transition">
                {preview
                  ? <img src={preview} alt="preview" className="max-h-48 rounded" />
                  : <div className="text-center"><Upload className="w-6 h-6 mx-auto text-primary mb-2" /><p className="text-sm text-muted-foreground">Click to upload X-ray</p></div>}
                <input type="file" accept="image/*" className="hidden" onChange={pickFile} required />
              </label>
            </div>
            <div>
              <Label>Message (concerns, symptoms)</Label>
              <Textarea rows={3} value={form.message} onChange={e => set('message', e.target.value)} maxLength={5000} />
            </div>
            <label className="flex items-start gap-3 rounded-lg border border-border p-3 text-xs leading-relaxed cursor-pointer">
              <Checkbox checked={consent} onCheckedChange={value => setConsent(value === true)} aria-label="Clinical data consent" />
              <span>I consent to Temelci Dental Clinic securely processing this X-ray and my contact details for a preliminary clinical review and treatment-plan response. I understand that an online review does not replace an in-person examination.</span>
            </label>
            <Button type="submit" className="w-full" size="lg" disabled={submitting || !consent}>
              {submitting ? 'Sending…' : 'Get my free treatment plan'}
            </Button>
            <p className="text-[11px] text-muted-foreground text-center">Your data is confidential and only used by our medical team for this consultation.</p>
          </form>
        </Card>
      </div>
    </div>
  );
}
