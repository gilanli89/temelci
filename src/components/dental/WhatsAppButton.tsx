import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '905481234567';

type WhatsAppButtonProps = {
  text: string;
  message?: string;
  variant?: 'default' | 'hero' | 'sticky' | 'outline';
  className?: string;
};

export const WhatsAppButton = ({ text, message = 'Hello, I would like to get information about dental treatments.', variant = 'default', className = '' }: WhatsAppButtonProps) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  if (variant === 'sticky') {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className={`whatsapp-sticky ${className}`} aria-label="WhatsApp">
        <MessageCircle className="h-7 w-7" />
      </a>
    );
  }

  if (variant === 'outline') {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2 border-whatsapp text-whatsapp hover:bg-whatsapp hover:text-whatsapp-foreground transition-all duration-300 ${className}`}>
        <MessageCircle className="h-5 w-5" />
        {text}
      </a>
    );
  }

  if (variant === 'hero') {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer"
        className={`btn-whatsapp text-base px-8 py-4 shadow-lg ${className}`}>
        <MessageCircle className="h-6 w-6" />
        {text}
      </a>
    );
  }

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`btn-whatsapp ${className}`}>
      <MessageCircle className="h-5 w-5" />
      {text}
    </a>
  );
};
