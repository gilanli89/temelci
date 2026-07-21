import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Stage, Layer, Image as KImage, Circle, Text, Group, Line, Rect } from 'react-konva';
import useImage from 'use-image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Undo, Redo, Trash2, Save, Copy, ExternalLink, ZoomIn, ZoomOut, Send, MousePointer2, CheckCircle2, MessageCircle } from 'lucide-react';
import { uploadDataUrl } from '@/lib/mediaUpload';
import { annotationToTreatmentItem, createAnnotation, DentalArch, getXrayTool, normalizeAnnotations, XrayAnnotation, XRAY_TOOLS, XrayTool, xrayPlanTotal } from '@/lib/xrayPlanning';

interface XrayRequest {
  id: string;
  share_token: string;
  patient_name: string;
  phone: string;
  email: string | null;
  message: string | null;
  xray_image_url: string;
  annotated_image_url: string | null;
  annotations: unknown;
  status: string;
  doctor_notes: string | null;
  currency: string | null;
  delivery_status: string | null;
  delivery_error: string | null;
  plan_version: number | null;
  plan_expires_at: string | null;
}

interface DeliveryResult {
  delivered: string[];
  deliveryStatus: string;
  shareUrl: string;
  manualWhatsAppUrl: string;
  warning: string | null;
}

function useImg(src: string): [HTMLImageElement | undefined] {
  const [image] = useImage(src, 'anonymous');
  return [image];
}

function AnnotationShape({ annotation, currency, selected }: { annotation: XrayAnnotation; currency: string; selected: boolean }) {
  const tool = getXrayTool(annotation.kind);
  const fullArchCount = annotation.kind === 'all_on_4' ? 4 : 6;
  const fullArch = annotation.kind === 'all_on_4' || annotation.kind === 'all_on_6';
  const archDirection = annotation.arch === 'lower' ? -1 : 1;
  return (
    <>
      {selected && <Circle name="selection" radius={fullArch ? 62 : 21} stroke="#38bdf8" strokeWidth={3} dash={[6, 4]} />}
      {annotation.kind === 'implant' && <>
        <Rect x={-6} y={-17} width={12} height={30} cornerRadius={4} fill={tool.color} stroke="white" strokeWidth={2} />
        <Line points={[-6, -8, 6, -4, -6, 0, 6, 4, -6, 8]} stroke="white" strokeWidth={1.5} />
      </>}
      {annotation.kind === 'extraction' && <>
        <Circle radius={17} fill="rgba(239,68,68,.2)" stroke={tool.color} strokeWidth={2} />
        <Line points={[-12, -12, 12, 12]} stroke={tool.color} strokeWidth={5} lineCap="round" />
        <Line points={[12, -12, -12, 12]} stroke={tool.color} strokeWidth={5} lineCap="round" />
      </>}
      {annotation.kind === 'crown' && <>
        <Circle radius={16} fill="rgba(139,92,246,.25)" stroke={tool.color} strokeWidth={4} />
        <Text text="C" fill="white" fontSize={14} fontStyle="bold" x={-5} y={-7} />
      </>}
      {annotation.kind === 'root_canal' && <>
        <Circle radius={16} fill="rgba(245,158,11,.25)" stroke={tool.color} strokeWidth={3} />
        <Line points={[0, -12, 0, 12]} stroke={tool.color} strokeWidth={5} lineCap="round" />
        <Circle y={-12} radius={4} fill={tool.color} />
      </>}
      {annotation.kind === 'note' && <>
        <Circle radius={16} fill={tool.color} stroke="white" strokeWidth={2} />
        <Text text="N" fill="white" fontSize={14} fontStyle="bold" x={-5} y={-7} />
      </>}
      {fullArch && <>
        <Line points={[-58, 8 * archDirection, -32, -4 * archDirection, 0, -9 * archDirection, 32, -4 * archDirection, 58, 8 * archDirection]} stroke={tool.color} strokeWidth={5} tension={0.4} lineCap="round" />
        {Array.from({ length: fullArchCount }, (_, index) => {
          const x = fullArchCount === 4 ? -42 + index * 28 : -50 + index * 20;
          const y = (Math.abs(x) / 10 - 7) * archDirection;
          return <Group key={index} x={x} y={y}><Circle radius={8} fill={tool.color} stroke="white" strokeWidth={2} /><Text text={String(index + 1)} x={-3} y={-4} fill="white" fontSize={9} fontStyle="bold" /></Group>;
        })}
      </>}
      <Text
        text={`${annotation.label}${annotation.tooth ? ` · #${annotation.tooth}` : ''}${annotation.price ? ` · ${currency} ${annotation.price}` : ''}`}
        fill="white" fontSize={12} fontStyle="bold" x={fullArch ? -58 : 22} y={fullArch ? 22 : -8}
        shadowColor="black" shadowBlur={5} shadowOpacity={1}
      />
    </>
  );
}

export default function XrayAnnotator() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [request, setRequest] = useState<XrayRequest | null>(null);
  const [annotations, setAnnotations] = useState<XrayAnnotation[]>([]);
  const [history, setHistory] = useState<XrayAnnotation[][]>([]);
  const [future, setFuture] = useState<XrayAnnotation[][]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<XrayTool>('implant');
  const [arch, setArch] = useState<DentalArch>('upper');
  const [baseSize, setBaseSize] = useState({ width: 800, height: 600 });
  const [zoom, setZoom] = useState(1);
  const [notes, setNotes] = useState('');
  const [currency, setCurrency] = useState('EUR');
  const [saving, setSaving] = useState(false);
  const [sourceUrl, setSourceUrl] = useState('');
  const [manualWhatsAppUrl, setManualWhatsAppUrl] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<any>(null);
  const [image] = useImg(sourceUrl);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data, error } = await supabase.rpc('claim_xray_request', { _request_id: id });
      if (error || !data) {
        toast.error(error?.message || 'Case not found');
        navigate('/admin/xrays');
        return;
      }
      const claimed = data as XrayRequest;
      setRequest(claimed);
      setAnnotations(normalizeAnnotations(claimed.annotations));
      setNotes(claimed.doctor_notes || '');
      setCurrency(claimed.currency || 'EUR');
      if (/^https?:\/\//.test(claimed.xray_image_url)) setSourceUrl(claimed.xray_image_url);
      else {
        const { data: signed, error: signError } = await supabase.storage.from('xrays').createSignedUrl(claimed.xray_image_url, 3600);
        if (signError || !signed) toast.error('The private X-ray image could not be opened.');
        else setSourceUrl(signed.signedUrl);
      }
    })();
  }, [id, navigate]);

  useEffect(() => {
    function resize() {
      if (!containerRef.current || !image) return;
      const width = Math.min(Math.max(containerRef.current.clientWidth - 16, 320), 1000);
      setBaseSize({ width, height: width * (image.height / image.width) });
    }
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [image]);

  const drawingSize = useMemo(() => ({ width: baseSize.width * zoom, height: baseSize.height * zoom }), [baseSize, zoom]);
  const selectedAnnotation = annotations.find(annotation => annotation.id === selectedId);
  const total = xrayPlanTotal(annotations);
  const closed = request ? ['accepted', 'rejected', 'archived'].includes(request.status) : false;

  const push = useCallback((next: XrayAnnotation[]) => {
    setHistory(previous => [...previous.slice(-49), annotations]);
    setFuture([]);
    setAnnotations(next);
  }, [annotations]);

  const undo = useCallback(() => {
    if (!history.length) return;
    setFuture(previous => [annotations, ...previous]);
    setAnnotations(history[history.length - 1]);
    setHistory(previous => previous.slice(0, -1));
  }, [annotations, history]);

  const redo = useCallback(() => {
    if (!future.length) return;
    setHistory(previous => [...previous, annotations]);
    setAnnotations(future[0]);
    setFuture(previous => previous.slice(1));
  }, [annotations, future]);

  const removeAnnotation = useCallback((annotationId: string) => {
    push(annotations.filter(annotation => annotation.id !== annotationId));
    setSelectedId(null);
  }, [annotations, push]);

  useEffect(() => {
    function keyboard(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.matches('input,textarea,[contenteditable="true"]')) return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        if (event.shiftKey) redo(); else undo();
      }
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedId) {
        event.preventDefault();
        removeAnnotation(selectedId);
      }
      if (event.key === 'Escape') setSelectedId(null);
    }
    window.addEventListener('keydown', keyboard);
    return () => window.removeEventListener('keydown', keyboard);
  }, [redo, removeAnnotation, selectedId, undo]);

  function addAtPointer(event: any) {
    if (closed) return;
    const targetName = event.target?.name?.();
    if (event.target !== event.target.getStage() && targetName !== 'xray-background') return;
    const position = event.target.getStage().getPointerPosition();
    if (!position) return;
    const annotation = createAnnotation(selectedTool, position.x / drawingSize.width, position.y / drawingSize.height, arch);
    push([...annotations, annotation]);
    setSelectedId(annotation.id);
  }

  function updateAnnotation(annotationId: string, patch: Partial<XrayAnnotation>) {
    push(annotations.map(annotation => {
      if (annotation.id !== annotationId) return annotation;
      const updated = { ...annotation, ...patch };
      if (patch.arch && (updated.kind === 'all_on_4' || updated.kind === 'all_on_6')) {
        updated.label = `${getXrayTool(updated.kind).label} (${patch.arch})`;
      }
      return updated;
    }));
  }

  async function persist(markReady: boolean) {
    if (!request || !id) return null;
    if (markReady && annotations.length === 0) {
      toast.error('Add at least one treatment marker before sending.');
      return null;
    }
    setSaving(true);
    try {
      let annotatedPath = request.annotated_image_url || '';
      if (stageRef.current) {
        const selectionNodes = stageRef.current.find('.selection');
        selectionNodes.forEach((node: any) => node.hide());
        const dataUrl = stageRef.current.toDataURL({ pixelRatio: 2 / zoom });
        selectionNodes.forEach((node: any) => node.show());
        const uploaded = await uploadDataUrl('xrays', dataUrl, `plan-v${(request.plan_version || 0) + 1}.png`, `annotated/${id}`);
        annotatedPath = uploaded.path;
      }
      const items = annotations.map((annotation, index) => annotationToTreatmentItem(annotation, request.id, index));
      const { data, error } = await supabase.rpc('save_xray_plan', {
        _request_id: request.id,
        _annotations: annotations as unknown as any,
        _items: items,
        _doctor_notes: notes,
        _currency: currency,
        _annotated_image_url: annotatedPath,
        _mark_ready: markReady,
      });
      if (error) throw error;
      setRequest(data as XrayRequest);
      setHistory([]);
      setFuture([]);
      toast.success(markReady ? 'Plan is ready for delivery' : 'Draft saved');
      return data as XrayRequest;
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Plan could not be saved');
      return null;
    } finally {
      setSaving(false);
    }
  }

  async function sendPlan() {
    const saved = await persist(true);
    if (!saved) return;
    setSaving(true);
    try {
      const { data, error } = await supabase.functions.invoke<DeliveryResult>('send-xray-plan', { body: { requestId: saved.id } });
      if (error) throw error;
      if (!data) throw new Error('Delivery service returned no response');
      setManualWhatsAppUrl(data.manualWhatsAppUrl);
      setRequest(previous => previous ? { ...previous, status: data.delivered.length ? 'sent' : 'ready', delivery_status: data.deliveryStatus } : previous);
      if (data.delivered.length) toast.success(`Plan sent via ${data.delivered.join(' and ')}`);
      else toast.info('Plan is secure and ready. Use the prepared WhatsApp button to deliver it.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Plan delivery failed');
    } finally {
      setSaving(false);
    }
  }

  if (!request) return <div className="min-h-[50vh] grid place-items-center text-muted-foreground">Claiming private case…</div>;

  const shareUrl = `${window.location.origin}/quote/${request.share_token}`;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" aria-label="Back to X-ray pool" onClick={() => navigate('/admin/xrays')}><ArrowLeft className="w-4 h-4" /></Button>
          <div>
            <div className="flex items-center gap-2"><h1 className="font-display text-xl font-bold">{request.patient_name}</h1><span className="rounded bg-primary/10 text-primary text-[10px] uppercase font-bold px-2 py-1">{request.status.replace('_', ' ')}</span></div>
            <p className="text-xs text-muted-foreground">{request.phone} · {request.email || 'No email'} · Plan v{request.plan_version || 0}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="outline" onClick={undo} disabled={!history.length || closed} size="sm" aria-label="Undo"><Undo className="w-4 h-4" /></Button>
          <Button variant="outline" onClick={redo} disabled={!future.length || closed} size="sm" aria-label="Redo"><Redo className="w-4 h-4" /></Button>
          <Button variant="outline" onClick={() => persist(false)} disabled={saving || closed} size="sm"><Save className="w-4 h-4 mr-1" />Save draft</Button>
          <Button onClick={sendPlan} disabled={saving || closed} size="sm"><Send className="w-4 h-4 mr-1" />Send plan</Button>
        </div>
      </div>

      {closed && <Card className="p-4 border-emerald-200 bg-emerald-50 text-emerald-800 text-sm flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />This patient has responded. The clinical plan is locked.</Card>}

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-3 min-w-0">
          <Card className="p-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase text-muted-foreground mr-1">Plan tools</span>
              {XRAY_TOOLS.map(tool => (
                <button key={tool.kind} type="button" title={tool.description} disabled={closed} onClick={() => setSelectedTool(tool.kind)}
                  className={`rounded-lg border px-3 py-2 text-xs font-semibold transition ${selectedTool === tool.kind ? 'text-white shadow-sm' : 'bg-background hover:bg-secondary'}`}
                  style={selectedTool === tool.kind ? { backgroundColor: tool.color, borderColor: tool.color } : { borderColor: `${tool.color}66`, color: tool.color }}>
                  {tool.shortLabel} · {tool.label}
                </button>
              ))}
              {(selectedTool === 'all_on_4' || selectedTool === 'all_on_6') && (
                <Select value={arch} onValueChange={value => setArch(value as DentalArch)}><SelectTrigger className="w-28 h-9"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="upper">Upper arch</SelectItem><SelectItem value="lower">Lower arch</SelectItem></SelectContent></Select>
              )}
              <div className="ml-auto flex items-center gap-1">
                <Button variant="outline" size="icon" aria-label="Zoom out" onClick={() => setZoom(value => Math.max(1, +(value - 0.25).toFixed(2)))} disabled={zoom <= 1}><ZoomOut className="w-4 h-4" /></Button>
                <span className="w-12 text-center text-xs font-semibold">{Math.round(zoom * 100)}%</span>
                <Button variant="outline" size="icon" aria-label="Zoom in" onClick={() => setZoom(value => Math.min(2.5, +(value + 0.25).toFixed(2)))} disabled={zoom >= 2.5}><ZoomIn className="w-4 h-4" /></Button>
              </div>
            </div>
          </Card>

          <Card ref={containerRef as any} className="p-2 bg-slate-950 touch-none overflow-auto max-h-[72vh]">
            {image && (
              <Stage ref={stageRef} width={drawingSize.width} height={drawingSize.height} onClick={addAtPointer} onTap={addAtPointer}>
                <Layer>
                  <KImage name="xray-background" image={image} width={drawingSize.width} height={drawingSize.height} />
                  {annotations.map(annotation => (
                    <Group key={annotation.id} name="annotation" x={annotation.x * drawingSize.width} y={annotation.y * drawingSize.height} draggable={!closed}
                      onClick={(event: any) => { event.cancelBubble = true; setSelectedId(annotation.id); }}
                      onTap={(event: any) => { event.cancelBubble = true; setSelectedId(annotation.id); }}
                      onDragEnd={(event: any) => updateAnnotation(annotation.id, {
                        x: Math.min(1, Math.max(0, event.target.x() / drawingSize.width)),
                        y: Math.min(1, Math.max(0, event.target.y() / drawingSize.height)),
                      })}>
                      <AnnotationShape annotation={annotation} currency={currency} selected={selectedId === annotation.id} />
                    </Group>
                  ))}
                </Layer>
              </Stage>
            )}
          </Card>
          <p className="text-xs text-muted-foreground flex items-center gap-2"><MousePointer2 className="w-3 h-3" />Choose a tool, click the X-ray to place it, then drag to reposition. Ctrl/Cmd+Z undo · Shift+Ctrl/Cmd+Z redo · Delete removes the selected marker.</p>
        </div>

        <aside className="space-y-3">
          {request.message && <Card className="p-4"><div className="text-xs uppercase font-bold text-muted-foreground mb-1">Patient concern</div><p className="text-sm">{request.message}</p></Card>}
          {selectedAnnotation ? (
            <Card className="p-4 border-primary">
              <div className="flex items-center justify-between mb-3">
                <div><div className="text-xs uppercase font-bold text-muted-foreground">Selected marker</div><h3 className="font-semibold">{selectedAnnotation.label}</h3></div>
                <Button size="icon" variant="ghost" disabled={closed} aria-label="Delete marker" onClick={() => removeAnnotation(selectedAnnotation.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
              </div>
              <div className="space-y-3">
                <div><Label>Treatment</Label><Select value={selectedAnnotation.kind} disabled={closed} onValueChange={value => {
                  const kind = value as XrayTool;
                  const fullArch = kind === 'all_on_4' || kind === 'all_on_6';
                  updateAnnotation(selectedAnnotation.id, { kind, label: fullArch ? `${getXrayTool(kind).label} (${selectedAnnotation.arch || arch})` : getXrayTool(kind).label, ...(fullArch ? { arch: selectedAnnotation.arch || arch } : {}) });
                }}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{XRAY_TOOLS.map(tool => <SelectItem key={tool.kind} value={tool.kind}>{tool.label}</SelectItem>)}</SelectContent></Select></div>
                {(selectedAnnotation.kind === 'all_on_4' || selectedAnnotation.kind === 'all_on_6') && <div><Label>Dental arch</Label><Select value={selectedAnnotation.arch || 'upper'} disabled={closed} onValueChange={value => updateAnnotation(selectedAnnotation.id, { arch: value as DentalArch })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="upper">Upper arch</SelectItem><SelectItem value="lower">Lower arch</SelectItem></SelectContent></Select></div>}
                <div className="grid grid-cols-2 gap-2">
                  <div><Label>Tooth #</Label><Input disabled={closed} value={selectedAnnotation.tooth} onChange={event => updateAnnotation(selectedAnnotation.id, { tooth: event.target.value })} placeholder="FDI: 14" maxLength={50} /></div>
                  <div><Label>Price</Label><Input disabled={closed} type="number" min="0" value={selectedAnnotation.price ?? ''} onChange={event => updateAnnotation(selectedAnnotation.id, { price: event.target.value ? Math.max(0, +event.target.value) : null })} /></div>
                </div>
                <div><Label>Item note</Label><Textarea disabled={closed} rows={3} value={selectedAnnotation.note} onChange={event => updateAnnotation(selectedAnnotation.id, { note: event.target.value })} maxLength={2000} /></div>
              </div>
            </Card>
          ) : <Card className="p-4 text-sm text-muted-foreground">Select a marker to edit its tooth number, fee and clinical note.</Card>}

          <Card className="p-4">
            <div className="flex items-center justify-between mb-2"><Label>Currency</Label><Select value={currency} disabled={closed} onValueChange={setCurrency}><SelectTrigger className="w-24 h-8"><SelectValue /></SelectTrigger><SelectContent>{['EUR','USD','GBP','TRY'].map(value => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select></div>
            <div className="text-3xl font-display font-bold text-primary text-right">{currency} {total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground text-right">{annotations.length} treatment item(s)</p>
          </Card>

          <Card className="p-4"><Label>Doctor notes visible to patient</Label><Textarea disabled={closed} rows={5} value={notes} onChange={event => setNotes(event.target.value)} maxLength={10000} placeholder="Explain priorities, sequencing and the need for an in-person examination…" /></Card>

          {['ready', 'sent', 'accepted', 'rejected'].includes(request.status) && (
            <Card className="p-4 bg-primary/5 border-primary/30">
              <h3 className="font-semibold mb-2">Secure patient plan</h3>
              <div className="flex gap-2"><Input readOnly value={shareUrl} /><Button size="icon" variant="outline" aria-label="Copy secure link" onClick={() => { navigator.clipboard.writeText(shareUrl); toast.success('Secure link copied'); }}><Copy className="w-4 h-4" /></Button><Button size="icon" variant="outline" asChild><a href={shareUrl} target="_blank" rel="noreferrer" aria-label="Open patient plan"><ExternalLink className="w-4 h-4" /></a></Button></div>
              <div className="mt-2 text-xs text-muted-foreground">Delivery: {request.delivery_status || 'not sent'} · Link expires after 30 days.</div>
              {request.delivery_error && <p className="mt-2 text-xs text-destructive">{request.delivery_error}</p>}
              {manualWhatsAppUrl && <Button className="w-full mt-3" asChild><a href={manualWhatsAppUrl} target="_blank" rel="noreferrer"><MessageCircle className="w-4 h-4 mr-2" />Send prepared WhatsApp message</a></Button>}
            </Card>
          )}

          <Card className="p-4 text-xs leading-relaxed text-muted-foreground">Clinical safeguard: this remote X-ray plan is preliminary. Final diagnosis, implant position and surgical suitability require an in-person examination and appropriate 3D imaging.</Card>
        </aside>
      </div>
    </div>
  );
}
