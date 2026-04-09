import { MessageCircle } from 'lucide-react';
import { forwardRef } from 'react';

const WHATSAPP_NUMBER = '905338229445';

type WhatsAppButtonProps = {
  text: string;
  message?: string;
  variant?: 'default' | 'hero' | 'sticky' | 'outline';
  className?: string;
};

export const WhatsAppButton = forwardRef<HTMLAnchorElement, WhatsAppButtonProps>(
  ({ text, message = 'Hello, I would like to get information about dental treatments.', variant = 'default', className = '' }, ref) => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    if (variant === 'sticky') {
      return (
        <a ref={ref} href={url} target="_blank" rel="noopener noreferrer" className={`whatsapp-sticky ${className}`} aria-label="WhatsApp">
          <MessageCircle className="h-7 w-7" />
        </a>
      );
    }

    if (variant === 'outline') {
      return (
        <a ref={ref} href={url} target="_blank" rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-whatsapp-foreground transition-all duration-300 ${className}`}>
          <MessageCircle className="h-5 w-5" />
          {text}
        </a>
      );
    }

    if (variant === 'hero') {
      return (
        <a ref={ref} href={url} target="_blank" rel="noopener noreferrer"
          className={`btn-whatsapp text-base px-8 py-4 shadow-lg ${className}`}>
          <MessageCircle className="h-6 w-6" />
          {text}
        </a>
      );
    }

    return (
      <a ref={ref} href={url} target="_blank" rel="noopener noreferrer" className={`btn-whatsapp ${className}`}>
        <MessageCircle className="h-5 w-5" />
        {text}
      </a>
    );
  }
);

WhatsAppButton.displayName = 'WhatsAppButton';
