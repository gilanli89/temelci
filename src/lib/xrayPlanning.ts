export type XrayTool =
  | 'implant'
  | 'extraction'
  | 'crown'
  | 'root_canal'
  | 'all_on_4'
  | 'all_on_6'
  | 'note';

export type DentalArch = 'upper' | 'lower';

export interface XrayAnnotation {
  id: string;
  kind: XrayTool;
  x: number;
  y: number;
  label: string;
  tooth: string;
  price: number | null;
  note: string;
  arch?: DentalArch;
}

export interface XrayToolDefinition {
  kind: XrayTool;
  label: string;
  shortLabel: string;
  color: string;
  description: string;
}

export const XRAY_TOOLS: XrayToolDefinition[] = [
  { kind: 'implant', label: 'Implant', shortLabel: 'IM', color: '#22c55e', description: 'Place an implant marker' },
  { kind: 'extraction', label: 'Extraction', shortLabel: 'EX', color: '#ef4444', description: 'Mark a tooth for extraction' },
  { kind: 'crown', label: 'Crown', shortLabel: 'CR', color: '#8b5cf6', description: 'Mark a crown restoration' },
  { kind: 'root_canal', label: 'Root canal', shortLabel: 'RC', color: '#f59e0b', description: 'Mark endodontic treatment' },
  { kind: 'all_on_4', label: 'All-on-4', shortLabel: 'A4', color: '#06b6d4', description: 'Plan a four-implant full arch' },
  { kind: 'all_on_6', label: 'All-on-6', shortLabel: 'A6', color: '#0ea5e9', description: 'Plan a six-implant full arch' },
  { kind: 'note', label: 'Clinical note', shortLabel: 'N', color: '#64748b', description: 'Add a general clinical note' },
];

const LEGACY_KIND_BY_LABEL: Record<string, XrayTool> = {
  implant: 'implant',
  extraction: 'extraction',
  crown: 'crown',
  'root canal': 'root_canal',
  'all-on-4': 'all_on_4',
  'all on 4': 'all_on_4',
  'all-on-6': 'all_on_6',
  'all on 6': 'all_on_6',
  note: 'note',
};

export const getXrayTool = (kind: XrayTool) => XRAY_TOOLS.find(tool => tool.kind === kind) ?? XRAY_TOOLS[0];

export function normalizeAnnotations(value: unknown): XrayAnnotation[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry): XrayAnnotation[] => {
    if (!entry || typeof entry !== 'object') return [];
    const raw = entry as Record<string, unknown>;
    const legacyLabel = typeof raw.label === 'string' ? raw.label : 'Implant';
    const kind = typeof raw.kind === 'string' && XRAY_TOOLS.some(tool => tool.kind === raw.kind)
      ? raw.kind as XrayTool
      : LEGACY_KIND_BY_LABEL[legacyLabel.toLowerCase()] ?? 'note';
    const definition = getXrayTool(kind);
    const x = Number(raw.x);
    const y = Number(raw.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return [];
    const arch = raw.arch === 'lower' ? 'lower' : raw.arch === 'upper' ? 'upper' : undefined;
    const price = raw.price === null || raw.price === '' || raw.price === undefined ? null : Number(raw.price);
    return [{
      id: typeof raw.id === 'string' ? raw.id : crypto.randomUUID(),
      kind,
      x: Math.min(1, Math.max(0, x)),
      y: Math.min(1, Math.max(0, y)),
      label: kind === 'all_on_4' || kind === 'all_on_6'
        ? `${definition.label}${arch ? ` (${arch})` : ''}`
        : definition.label,
      tooth: typeof raw.tooth === 'string' ? raw.tooth : '',
      price: price !== null && Number.isFinite(price) ? price : null,
      note: typeof raw.note === 'string' ? raw.note : '',
      ...(arch ? { arch } : {}),
    }];
  });
}

export function createAnnotation(kind: XrayTool, x: number, y: number, arch: DentalArch = 'upper'): XrayAnnotation {
  const definition = getXrayTool(kind);
  const fullArch = kind === 'all_on_4' || kind === 'all_on_6';
  return {
    id: crypto.randomUUID(),
    kind,
    x: Math.min(1, Math.max(0, x)),
    y: Math.min(1, Math.max(0, y)),
    label: fullArch ? `${definition.label} (${arch})` : definition.label,
    tooth: '',
    price: null,
    note: '',
    ...(fullArch ? { arch } : {}),
  };
}

export function annotationToTreatmentItem(annotation: XrayAnnotation, requestId: string, sortOrder: number) {
  return {
    request_id: requestId,
    treatment_key: annotation.label,
    tooth_number: annotation.tooth || null,
    note: annotation.note || null,
    price: annotation.price ?? 0,
    sort_order: sortOrder,
  };
}

export const xrayPlanTotal = (annotations: XrayAnnotation[]) =>
  annotations.reduce((sum, annotation) => sum + (annotation.price ?? 0), 0);

