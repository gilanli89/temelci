import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

interface Props {
  title: string;
  description: string;
  content: string;
  keyword: string;
  slug: string;
}

interface Check { label: string; ok: boolean; warn?: boolean; hint?: string; }

export function SeoScore({ title, description, content, keyword, slug }: Props) {
  const checks = useMemo<Check[]>(() => {
    const kw = keyword.trim().toLowerCase();
    const plain = content.replace(/<[^>]+>/g, ' ').toLowerCase();
    const words = plain.split(/\s+/).filter(Boolean).length;
    return [
      { label: 'SEO title 30–60 chars', ok: title.length >= 30 && title.length <= 60, warn: title.length > 0 && (title.length < 30 || title.length > 65), hint: `${title.length} chars` },
      { label: 'Meta description 120–160 chars', ok: description.length >= 120 && description.length <= 160, warn: description.length > 0, hint: `${description.length} chars` },
      { label: 'Focus keyword in title', ok: !!kw && title.toLowerCase().includes(kw) },
      { label: 'Focus keyword in description', ok: !!kw && description.toLowerCase().includes(kw) },
      { label: 'Focus keyword in URL slug', ok: !!kw && slug.toLowerCase().includes(kw.replace(/\s+/g, '-')) },
      { label: 'Focus keyword in body', ok: !!kw && plain.includes(kw) },
      { label: 'Content > 300 words', ok: words >= 300, warn: words >= 100, hint: `${words} words` },
      { label: 'Has at least one image', ok: /<img\s/i.test(content) },
      { label: 'Has at least one H2/H3', ok: /<h[23]\b/i.test(content) },
    ];
  }, [title, description, content, keyword, slug]);

  const passed = checks.filter(c => c.ok).length;
  const score = Math.round((passed / checks.length) * 100);
  const color = score >= 80 ? 'text-emerald-600' : score >= 50 ? 'text-amber-600' : 'text-destructive';

  return (
    <Card className="p-4 sticky top-4">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="font-semibold text-sm">SEO Score</h3>
        <span className={`text-3xl font-display font-bold ${color}`}>{score}</span>
      </div>
      <ul className="space-y-2 text-xs">
        {checks.map((c, i) => (
          <li key={i} className="flex items-start gap-2">
            {c.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              : c.warn ? <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              : <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />}
            <span className={c.ok ? 'text-muted-foreground line-through' : ''}>
              {c.label} {c.hint && <em className="not-italic text-muted-foreground">({c.hint})</em>}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export const slugify = (s: string) => s.toLowerCase().trim()
  .replace(/[şŞ]/g, 's').replace(/[çÇ]/g, 'c').replace(/[ğĞ]/g, 'g')
  .replace(/[üÜ]/g, 'u').replace(/[öÖ]/g, 'o').replace(/[ıİ]/g, 'i')
  .replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
