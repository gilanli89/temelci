import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Baby,
  CircleDot,
  Crown,
  HeartPulse,
  Rows3,
  ShieldCheck,
  ShieldPlus,
  SmilePlus,
  Sparkles,
} from "lucide-react";

const includesAny = (value: string, terms: string[]) =>
  terms.some((term) => value.includes(term));

export function getTreatmentIcon(slug = "", title = ""): LucideIcon {
  const value = `${slug} ${title}`.toLowerCase();

  if (includesAny(value, ["implant", "all-on", "all on"])) return CircleDot;
  if (includesAny(value, ["crown", "bridge", "zircon", "kaplama", "kron"]))
    return Crown;
  if (includesAny(value, ["align", "orthodont", "braces", "tel"])) return Rows3;
  if (includesAny(value, ["root canal", "endodont", "kanal"])) return Activity;
  if (includesAny(value, ["gum", "periodont", "diş eti"])) return HeartPulse;
  if (includesAny(value, ["child", "pediatric", "çocuk"])) return Baby;
  if (includesAny(value, ["surgery", "extraction", "wisdom", "cerra", "çekim"]))
    return ShieldPlus;
  if (includesAny(value, ["prevent", "check-up", "cleaning", "hijyen"]))
    return ShieldCheck;
  if (includesAny(value, ["whiten", "bleach", "beyaz"])) return Sparkles;
  return SmilePlus;
}

type TreatmentIconPanelProps = {
  slug?: string;
  title?: string;
  compact?: boolean;
};

export function TreatmentIconPanel({
  slug,
  title,
  compact = false,
}: TreatmentIconPanelProps) {
  const Icon = getTreatmentIcon(slug, title);

  return (
    <div
      className={`relative isolate flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary ${
        compact ? "aspect-[4/3]" : "min-h-[340px]"
      }`}
      aria-hidden="true"
    >
      <div className="absolute -left-12 -top-12 h-44 w-44 rounded-full border border-primary/10" />
      <div className="absolute -bottom-16 -right-10 h-56 w-56 rounded-full border border-primary/10" />
      <div className="absolute inset-x-8 top-1/2 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div
        className={`relative flex items-center justify-center rounded-[2rem] border border-primary/15 bg-card/90 text-primary shadow-sm ${
          compact ? "h-24 w-24" : "h-36 w-36"
        }`}
      >
        <Icon className={compact ? "h-12 w-12" : "h-20 w-20"} strokeWidth={1.35} />
      </div>
    </div>
  );
}
