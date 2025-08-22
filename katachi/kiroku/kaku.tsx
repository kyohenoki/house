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

export function Editor() {
  const editorConfig: InitialConfigType = {
    namespace: 'Kaku',
    onError(error: Error) {
      throw error
    },
    theme: {
      paragraph: 'paragraph',
      strong: 'strong',
      heading: {
        h1: 'h1'
      }
    },
    nodes: [HeadingNode, QuoteNode, ListNode, ListItemNode, CodeNode, LinkNode, AutoLinkNode, MarkNode]
  }
  return (
    <div className="w-full">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="relative text-stone-700">
          <RichTextPlugin
            contentEditable={<ContentEditable className="outline-none" />}
            placeholder={<div className="absolute top-0 text-[1.15rem] text-stone-400 pointer-events-none">ここからはじまる</div>}
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
