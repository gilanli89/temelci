import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { Bold, Italic, List, ListOrdered, Heading2, Heading3, Quote, Link as LinkIcon, Image as ImgIcon, Undo, Redo, Minus } from 'lucide-react';
import { uploadToBucket } from '@/lib/mediaUpload';
import { useRef } from 'react';
import { toast } from 'sonner';

interface Props {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function TipTapEditor({ value, onChange, placeholder = 'Write your article…' }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-primary underline' } }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: 'prose prose-neutral max-w-none min-h-[400px] p-4 focus:outline-none',
      },
    },
  });

  if (!editor) return null;

  const btn = (active: boolean, onClick: () => void, icon: React.ReactNode, title: string) => (
    <Button type="button" size="sm" variant={active ? 'secondary' : 'ghost'} onClick={onClick} title={title} className="h-8 w-8 p-0">
      {icon}
    </Button>
  );

  async function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadToBucket('media', file, 'posts');
      editor?.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      toast.error('Upload failed');
    }
    e.target.value = '';
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-background">
      <div className="flex flex-wrap items-center gap-1 border-b border-border p-2 bg-secondary/30 sticky top-0 z-10">
        {btn(editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), <Bold className="w-4 h-4" />, 'Bold')}
        {btn(editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), <Italic className="w-4 h-4" />, 'Italic')}
        <div className="w-px h-6 bg-border mx-1" />
        {btn(editor.isActive('heading', { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 className="w-4 h-4" />, 'H2')}
        {btn(editor.isActive('heading', { level: 3 }), () => editor.chain().focus().toggleHeading({ level: 3 }).run(), <Heading3 className="w-4 h-4" />, 'H3')}
        <div className="w-px h-6 bg-border mx-1" />
        {btn(editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), <List className="w-4 h-4" />, 'Bullet list')}
        {btn(editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered className="w-4 h-4" />, 'Numbered list')}
        {btn(editor.isActive('blockquote'), () => editor.chain().focus().toggleBlockquote().run(), <Quote className="w-4 h-4" />, 'Quote')}
        {btn(false, () => editor.chain().focus().setHorizontalRule().run(), <Minus className="w-4 h-4" />, 'Divider')}
        <div className="w-px h-6 bg-border mx-1" />
        {btn(editor.isActive('link'), () => {
          const url = prompt('URL:');
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }, <LinkIcon className="w-4 h-4" />, 'Link')}
        {btn(false, () => fileRef.current?.click(), <ImgIcon className="w-4 h-4" />, 'Image')}
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
        <div className="w-px h-6 bg-border mx-1" />
        {btn(false, () => editor.chain().focus().undo().run(), <Undo className="w-4 h-4" />, 'Undo')}
        {btn(false, () => editor.chain().focus().redo().run(), <Redo className="w-4 h-4" />, 'Redo')}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
