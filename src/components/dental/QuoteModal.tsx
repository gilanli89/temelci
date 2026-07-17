import { useEffect } from 'react';
import { X } from 'lucide-react';
import { XrayIntakeForm } from './XrayIntakeForm';

interface Props { isOpen: boolean; onClose: () => void; }

export const QuoteModal = ({ isOpen, onClose }: Props) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/65 backdrop-blur-sm" />
      <div className="relative max-h-[96vh] w-full overflow-y-auto rounded-t-3xl border bg-card shadow-2xl sm:max-w-md sm:rounded-3xl" onClick={event => event.stopPropagation()}>
        <button type="button" onClick={onClose} aria-label="Close" className="absolute end-4 top-4 z-10 rounded-full p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
          <X size={19} />
        </button>
        <XrayIntakeForm compact onComplete={onClose} />
      </div>
    </div>
  );
};
