import { forwardRef, useState } from 'react';
import { QuoteModal } from './QuoteModal';

type QuoteButtonProps = {
  text?: string;
  variant?: 'default' | 'hero' | 'outline' | 'nav';
  className?: string;
  icon?: React.ReactNode;
};

export const QuoteButton = forwardRef<HTMLButtonElement, QuoteButtonProps>(
  ({ text = 'Get Free Quote', variant = 'default', className = '', icon }, ref) => {
    const [open, setOpen] = useState(false);

    const baseClasses = 'inline-flex items-center gap-2 font-semibold transition-all duration-300 cursor-pointer';
    const variantClasses = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-full text-sm shadow-sm',
      hero: 'bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-full text-base shadow-lg font-bold',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-full text-sm',
      nav: 'bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm hover:shadow-md',
    };

    return (
      <>
        <button
          ref={ref}
          onClick={() => setOpen(true)}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        >
          {icon || <span className="text-base leading-none">✦</span>}
          {text}
        </button>
        <QuoteModal isOpen={open} onClose={() => setOpen(false)} />
      </>
    );
  }
);

QuoteButton.displayName = 'QuoteButton';
