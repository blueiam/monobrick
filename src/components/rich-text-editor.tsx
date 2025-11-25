'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { useEffect } from 'react';

type RichTextEditorProps = {
  content: string;
  onChange: (html: string) => void;
};

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Underline,
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg max-w-none focus:outline-none min-h-[250px] text-stone-900 prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-ul:list-disc prose-ol:list-decimal prose-li:my-1',
      },
    },
  });

  useEffect(() => {
    if (editor) {
      const currentContent = editor.getHTML();
      // Only update if content actually changed (avoid infinite loops)
      if (content !== currentContent && content !== '<p></p>') {
        editor.commands.setContent(content || '');
      }
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const toggleHeading = (level: 1 | 2 | 3) => {
    if (editor.isActive('heading', { level })) {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level }).run();
    }
  };

  const isActive = (name: string, options?: any) => {
    return editor.isActive(name, options);
  };

  return (
    <div className="rounded-lg border border-white/10 bg-white/5">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 p-3">
        {/* Headings */}
        <div className="flex items-center gap-1 border-r border-white/10 pr-2">
          <button
            type="button"
            onClick={() => toggleHeading(1)}
            className={`rounded px-3 py-1.5 text-sm font-semibold transition ${
              isActive('heading', { level: 1 })
                ? 'bg-amber-500 text-white'
                : 'bg-stone-700/50 text-stone-300 hover:bg-stone-700'
            }`}
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => toggleHeading(2)}
            className={`rounded px-3 py-1.5 text-sm font-semibold transition ${
              isActive('heading', { level: 2 })
                ? 'bg-amber-500 text-white'
                : 'bg-stone-700/50 text-stone-300 hover:bg-stone-700'
            }`}
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => toggleHeading(3)}
            className={`rounded px-3 py-1.5 text-sm font-semibold transition ${
              isActive('heading', { level: 3 })
                ? 'bg-amber-500 text-white'
                : 'bg-stone-700/50 text-stone-300 hover:bg-stone-700'
            }`}
            title="Heading 3"
          >
            H3
          </button>
        </div>

        {/* Text Style */}
        <div className="flex items-center gap-1 border-r border-white/10 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={`rounded px-3 py-1.5 text-sm font-semibold transition ${
              isActive('bold')
                ? 'bg-amber-500 text-white'
                : 'bg-stone-700/50 text-stone-300 hover:bg-stone-700'
            }`}
            title="Bold"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={`rounded px-3 py-1.5 text-sm font-semibold transition ${
              isActive('italic')
                ? 'bg-amber-500 text-white'
                : 'bg-stone-700/50 text-stone-300 hover:bg-stone-700'
            }`}
            title="Italic"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`rounded px-3 py-1.5 text-sm font-semibold transition ${
              isActive('underline')
                ? 'bg-amber-500 text-white'
                : 'bg-stone-700/50 text-stone-300 hover:bg-stone-700'
            }`}
            title="Underline"
          >
            <u>U</u>
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={`rounded px-3 py-1.5 text-sm font-semibold transition ${
              isActive('strike')
                ? 'bg-amber-500 text-white'
                : 'bg-stone-700/50 text-stone-300 hover:bg-stone-700'
            }`}
            title="Strike-through"
          >
            <s>S</s>
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r border-white/10 pr-2">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`rounded px-3 py-1.5 text-sm font-semibold transition ${
              isActive('bulletList')
                ? 'bg-amber-500 text-white'
                : 'bg-stone-700/50 text-stone-300 hover:bg-stone-700'
            }`}
            title="Bullet List"
          >
            •
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`rounded px-3 py-1.5 text-sm font-semibold transition ${
              isActive('orderedList')
                ? 'bg-amber-500 text-white'
                : 'bg-stone-700/50 text-stone-300 hover:bg-stone-700'
            }`}
            title="Ordered List"
          >
            1.
          </button>
        </div>

        {/* Clear Formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
          className="rounded px-3 py-1.5 text-sm font-semibold bg-stone-700/50 text-stone-300 transition hover:bg-stone-700"
          title="Clear Formatting"
        >
          Clear
        </button>
      </div>

      {/* Editor Content */}
      <div className="min-h-[300px] bg-white rounded-b-lg">
        <div className="p-4">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}

