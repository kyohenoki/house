'use client'

import '@/katachi/kiroku/mitame.css'

import { CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import { ListItemNode, ListNode } from '@lexical/list'
import { MarkNode } from '@lexical/mark'
import { TRANSFORMERS } from '@lexical/markdown'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { type InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import type { EditorThemeClasses } from 'lexical'

const kakutheme: EditorThemeClasses = {
  paragraph: 'paragraph',
  heading: {
    h1: 'header h1',
    h2: 'header h2',
    h3: 'header h3',
    h4: 'header h4',
    h5: 'header h5',
    h6: 'header h6'
  }
}

export function Editor() {
  const editorConfig: InitialConfigType = {
    namespace: 'Kaku',
    onError(error: Error) {
      throw error
    },
    theme: kakutheme,
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode, LinkNode, AutoLinkNode, MarkNode]
  }
  return (
    <div className="w-full">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="relative text-stone-700">
          <RichTextPlugin
            contentEditable={<ContentEditable className="outline-none" />}
            placeholder={<div className="absolute top-0 text-[1.05rem] text-stone-400 pointer-events-none">ここからはじまる</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <AutoFocusPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </LexicalComposer>
    </div>
  )
}
