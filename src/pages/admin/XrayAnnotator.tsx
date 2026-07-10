import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Stage, Layer, Image as KImage, Circle, Text, Group } from 'react-konva';
import useImage from 'use-image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Undo, Redo, Trash2, Save, Copy, ExternalLink } from 'lucide-react';
import { uploadDataUrl } from '@/lib/mediaUpload';

type Marker = { id: string; x: number; y: number; label: string; tooth: string; price: number | null; note: string };

const TREATMENTS = ['Implant', 'Extraction', 'Root canal', 'Crown', 'Veneer', 'Filling', 'Cleaning', 'Whitening', 'Gum treatment', 'Other'];

function useImg(src: string): [HTMLImageElement | undefined, string] {
  const [img, status] = useImage(src, 'anonymous');
  return [img, status];
}

export default function XrayAnnotator() {
  const { id } = useParams<{ id: string }>();
  const nav = useNavigate();
  const [req, setReq] = useState<any>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [history, setHistory] = useState<Marker[][]>([]);
  const [future, setFuture] = useState<Marker[][]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [stageSize, setStageSize] = useState({ w: 800, h: 600 });
  const [notes, setNotes] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [saving, setSaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<any>(null);

  const [img] = useImg(req?.xray_image_url || '');

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await supabase.from('xray_requests').select('*').eq('id', id).maybeSingle();
      if (!data) { toast.error('Not found'); nav('/admin/xrays'); return; }
      setReq(data);
      setMarkers((data.annotations as any) || []);
      setNotes(data.doctor_notes || '');
      setCurrency(data.currency || 'EUR');
    })();
  }, [id, nav]);

  useEffect(() => {
    function update() {
      if (!containerRef.current || !img) return;
      const w = Math.min(containerRef.current.clientWidth, 900);
      const ratio = img.height / img.width;
      setStageSize({ w, h: w * ratio });
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [img]);

  function push(newMarkers: Marker[]) {
    setHistory(h => [...h, markers]);
    setFuture([]);
    setMarkers(newMarkers);
  }
  function undo() {
    if (!history.length) return;
    setFuture(f => [markers, ...f]);
    setMarkers(history[history.length - 1]);
    setHistory(h => h.slice(0, -1));
  }
  function redo() {
    if (!future.length) return;
    setHistory(h => [...h, markers]);
    setMarkers(future[0]);
    setFuture(f => f.slice(1));
  }

  function onStageClick(e: any) {
    if (e.target !== e.target.getStage()) return;
    const pos = e.target.getStage().getPointerPosition();
    if (!pos) return;
    const m: Marker = {
      id: crypto.randomUUID(),
      x: pos.x / stageSize.w, y: pos.y / stageSize.h,
      label: 'Implant', tooth: '', price: null, note: '',
    };
    push([...markers, m]);
    setSelected(m.id);
  }

  function updateMarker(mid: string, patch: Partial<Marker>) {
    push(markers.map(m => m.id === mid ? { ...m, ...patch } : m));
  }
  function removeMarker(mid: string) {
    push(markers.filter(m => m.id !== mid));
    setSelected(null);
  }

  const total = markers.reduce((s, m) => s + (m.price || 0), 0);
  const selMarker = markers.find(m => m.id === selected);

  async function save(sendQuote = false) {
    if (!req) return;
    setSaving(true);
    let annotatedUrl = req.annotated_image_url;
    try {
      if (stageRef.current) {
        const dataUrl = stageRef.current.toDataURL({ pixelRatio: 2 });
        const uploaded = await uploadDataUrl('xrays', dataUrl, `annotated-${id}.png`, `annotated/${id}`);
        annotatedUrl = uploaded.url;
      }
    } catch (e) { console.warn('annotation snapshot failed', e); }

    const status = sendQuote ? 'quoted' : (req.status === 'new' ? 'in_review' : req.status);
    const { error } = await supabase.from('xray_requests').update({
      annotations: markers as any,
      annotated_image_url: annotatedUrl,
      doctor_notes: notes,
      price_total: total,
      currency,
      status,
    }).eq('id', req.id);

    // Sync treatment items
    await supabase.from('xray_treatment_items').delete().eq('request_id', req.id);
    if (markers.length) {
      await supabase.from('xray_treatment_items').insert(markers.map((m, i) => ({
        request_id: req.id, treatment_key: m.label, tooth_number: m.tooth,
        note: m.note, price: m.price, sort_order: i,
      })));
    }

    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success(sendQuote ? 'Quote ready — share link below' : 'Saved');
    if (sendQuote) setReq({ ...req, status: 'quoted' });
  }

  if (!req) return <div>Loading…</div>;

  const shareUrl = `${window.location.origin}/quote/${req.share_token}`;

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => nav('/admin/xrays')}><ArrowLeft className="w-4 h-4" /></Button>
          <div>
            <h1 className="font-display text-xl font-bold">{req.patient_name}</h1>
            <p className="text-xs text-muted-foreground">{req.phone} · {req.email || 'no email'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={undo} disabled={!history.length} size="sm"><Undo className="w-4 h-4" /></Button>
          <Button variant="outline" onClick={redo} disabled={!future.length} size="sm"><Redo className="w-4 h-4" /></Button>
          <Button variant="outline" onClick={() => save(false)} disabled={saving} size="sm"><Save className="w-4 h-4 mr-1" />Save</Button>
          <Button onClick={() => save(true)} disabled={saving} size="sm">Send quote</Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div>
          <Card ref={containerRef as any} className="p-2 bg-black touch-none">
            {img && (
              <Stage ref={stageRef} width={stageSize.w} height={stageSize.h} onClick={onStageClick} onTap={onStageClick}>
                <Layer>
                  <KImage image={img} width={stageSize.w} height={stageSize.h} />
                  {markers.map((m, i) => (
                    <Group key={m.id}
                      x={m.x * stageSize.w} y={m.y * stageSize.h}
                      draggable onClick={() => setSelected(m.id)} onTap={() => setSelected(m.id)}
                      onDragEnd={e => updateMarker(m.id, { x: e.target.x() / stageSize.w, y: e.target.y() / stageSize.h })}>
                      <Circle radius={14} fill={selected === m.id ? '#0ea5e9' : '#ef4444'} stroke="white" strokeWidth={2} />
                      <Text text={String(i + 1)} fill="white" fontSize={13} fontStyle="bold" x={-4} y={-6} />
                      <Text text={`${m.label}${m.tooth ? ' #' + m.tooth : ''}${m.price ? ` — ${currency} ${m.price}` : ''}`}
                        fill="white" fontSize={12} x={18} y={-8} shadowColor="black" shadowBlur={4} />
                    </Group>
                  ))}
                </Layer>
              </Stage>
            )}
          </Card>
          <p className="text-xs text-muted-foreground mt-2">Tap/click the image to add a marker. Drag markers to reposition. Undo/redo supported.</p>
        </div>

        <div className="space-y-3">
          {selMarker ? (
            <Card className="p-4 border-primary">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Marker #{markers.findIndex(m => m.id === selMarker.id) + 1}</h3>
                <Button size="icon" variant="ghost" onClick={() => removeMarker(selMarker.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
              <div className="space-y-3">
                <div><Label>Treatment</Label>
                  <Select value={selMarker.label} onValueChange={v => updateMarker(selMarker.id, { label: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{TREATMENTS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div><Label>Tooth #</Label><Input value={selMarker.tooth} onChange={e => updateMarker(selMarker.id, { tooth: e.target.value })} placeholder="14" /></div>
                  <div><Label>Price</Label><Input type="number" value={selMarker.price ?? ''} onChange={e => updateMarker(selMarker.id, { price: e.target.value ? +e.target.value : null })} /></div>
                </div>
                <div><Label>Note</Label><Textarea rows={2} value={selMarker.note} onChange={e => updateMarker(selMarker.id, { note: e.target.value })} /></div>
              </div>
            </Card>
          ) : <Card className="p-4 text-sm text-muted-foreground">Tap a marker to edit it, or tap the X-ray to add one.</Card>}

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Label>Currency</Label>
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger className="w-24 h-8"><SelectValue /></SelectTrigger>
                <SelectContent>{['EUR','USD','GBP','TRY'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="text-3xl font-display font-bold text-primary text-right">{currency} {total}</div>
            <p className="text-xs text-muted-foreground text-right">{markers.length} item(s)</p>
          </Card>

          <Card className="p-4">
            <Label>Doctor notes (visible to patient)</Label>
            <Textarea rows={4} value={notes} onChange={e => setNotes(e.target.value)} />
          </Card>

          {req.status === 'quoted' && (
            <Card className="p-4 bg-primary/5 border-primary/30">
              <h3 className="font-semibold mb-2">🔗 Share with patient</h3>
              <div className="flex gap-2">
                <Input readOnly value={shareUrl} />
                <Button size="icon" variant="outline" onClick={() => { navigator.clipboard.writeText(shareUrl); toast.success('Copied'); }}><Copy className="w-4 h-4" /></Button>
                <Button size="icon" variant="outline" asChild><a href={shareUrl} target="_blank"><ExternalLink className="w-4 h-4" /></a></Button>
              </div>
              {req.phone && (
                <Button className="w-full mt-2" variant="outline" asChild>
                  <a target="_blank" href={`https://wa.me/${req.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${req.patient_name}, your treatment plan is ready: ${shareUrl}`)}`}>
                    Send via WhatsApp
                  </a>
                </Button>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
