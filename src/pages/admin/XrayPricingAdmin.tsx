import { useCallback, useEffect, useState } from 'react';
import { BadgeEuro, Plus, Save, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { DEFAULT_XRAY_PRICING_ITEMS, XRAY_TOOLS, type XrayPricingItem, type XrayTool } from '@/lib/xrayPlanning';

const CURRENCIES = ['EUR', 'GBP', 'USD', 'TRY'];

const newPricingItem = (sortOrder: number): XrayPricingItem => ({
  id: crypto.randomUUID(),
  code: `new-item-${Date.now()}`,
  kind: 'implant',
  display_name: 'New unit price',
  brand: null,
  unit_price: 0,
  currency: 'EUR',
  active: true,
  sort_order: sortOrder,
});

export default function XrayPricingAdmin() {
  const [items, setItems] = useState<XrayPricingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [databaseReady, setDatabaseReady] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('xray_pricing_catalog')
      .select('*')
      .order('sort_order')
      .order('display_name');

    if (error) {
      setDatabaseReady(false);
      setItems(DEFAULT_XRAY_PRICING_ITEMS);
    } else {
      setDatabaseReady(true);
      setItems((data || []) as XrayPricingItem[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  function patchItem(id: string, patch: Partial<XrayPricingItem>) {
    setItems(current => current.map(item => item.id === id ? { ...item, ...patch } : item));
  }

  async function saveItem(item: XrayPricingItem) {
    if (!databaseReady) {
      toast.error('Apply the included database migration before saving unit prices.');
      return;
    }
    const code = item.code.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
    const displayName = item.display_name.trim();
    if (!code || !displayName) {
      toast.error('Code and display name are required.');
      return;
    }

    setSavingId(item.id);
    const { error } = await supabase.from('xray_pricing_catalog').upsert({
      ...item,
      code,
      display_name: displayName,
      brand: item.brand?.trim() || null,
      unit_price: Math.max(0, Number(item.unit_price) || 0),
      sort_order: Number(item.sort_order) || 0,
    });
    setSavingId(null);

    if (error) toast.error(error.message);
    else {
      toast.success('Unit price saved');
      load();
    }
  }

  async function deleteItem(item: XrayPricingItem) {
    if (!databaseReady) {
      toast.error('Apply the included database migration before deleting unit prices.');
      return;
    }
    if (!confirm(`Delete “${item.display_name}”? Existing plans keep their saved price.`)) return;
    const { error } = await supabase.from('xray_pricing_catalog').delete().eq('id', item.id);
    if (error) toast.error(error.message);
    else {
      toast.success('Unit price deleted');
      setItems(current => current.filter(candidate => candidate.id !== item.id));
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <BadgeEuro className="h-6 w-6 text-primary" />
            <h1 className="font-display text-2xl font-bold">X-ray Unit Prices</h1>
          </div>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            These presets automatically price markers in the doctor’s X-ray planner. A doctor can still override a fee for an exceptional case.
          </p>
        </div>
        <Button onClick={() => setItems(current => [...current, newPricingItem((current.at(-1)?.sort_order || 0) + 10)])}>
          <Plus className="mr-2 h-4 w-4" />Add unit price
        </Button>
      </div>

      {!databaseReady && (
        <Card className="border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
          Preview mode: the unit-price database migration has not been applied to this backend yet. The complete starter catalog is shown below, but saving is disabled until the migration is deployed.
        </Card>
      )}

      {items.some(item => item.active && item.unit_price === 0) && (
        <Card className="border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Active rows with a zero price will add a zero-value item to the plan. Enter the clinic’s approved fees before using them for patient quotes.
        </Card>
      )}

      {loading && <Card className="p-8 text-center text-sm text-muted-foreground">Loading unit prices…</Card>}
      {!loading && items.length === 0 && <Card className="p-8 text-center text-sm text-muted-foreground">No unit prices yet. Add the first price above.</Card>}

      <div className="grid gap-4 lg:grid-cols-2">
        {items.map(item => (
          <Card key={item.id} className="space-y-4 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-semibold">{item.display_name}</div>
                <div className="text-xs text-muted-foreground">{item.code}</div>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor={`active-${item.id}`} className="text-xs">Active</Label>
                <Switch id={`active-${item.id}`} checked={item.active} onCheckedChange={active => patchItem(item.id, { active })} />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label>Display name</Label>
                <Input value={item.display_name} onChange={event => patchItem(item.id, { display_name: event.target.value })} />
              </div>
              <div>
                <Label>Internal code</Label>
                <Input value={item.code} onChange={event => patchItem(item.id, { code: event.target.value })} />
              </div>
              <div>
                <Label>Marker type</Label>
                <Select value={item.kind} onValueChange={kind => patchItem(item.id, { kind: kind as XrayTool })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {XRAY_TOOLS.map(tool => <SelectItem key={tool.kind} value={tool.kind}>{tool.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Brand / material</Label>
                <Input value={item.brand || ''} placeholder="Straumann, Neodent…" onChange={event => patchItem(item.id, { brand: event.target.value || null })} />
              </div>
              <div>
                <Label>Unit price</Label>
                <Input type="number" min="0" step="0.01" value={item.unit_price} onChange={event => patchItem(item.id, { unit_price: Math.max(0, Number(event.target.value) || 0) })} />
              </div>
              <div>
                <Label>Currency</Label>
                <Select value={item.currency} onValueChange={currency => patchItem(item.id, { currency })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {CURRENCIES.map(currency => <SelectItem key={currency} value={currency}>{currency}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Sort order</Label>
                <Input type="number" value={item.sort_order} onChange={event => patchItem(item.id, { sort_order: Number(event.target.value) || 0 })} />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => deleteItem(item)}>
                <Trash2 className="mr-1 h-4 w-4 text-destructive" />Delete
              </Button>
              <Button size="sm" onClick={() => saveItem(item)} disabled={!databaseReady || savingId === item.id}>
                <Save className="mr-1 h-4 w-4" />{savingId === item.id ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
