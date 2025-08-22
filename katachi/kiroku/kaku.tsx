'use client'

import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { type InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'

export function Editor() {
  const initialConfig: InitialConfigType = {
    namespace: 'Kaku',
    onError(error: Error) {
      throw error
    },
    theme: {
      paragraph: 'text-[1.15rem]'
    }
  }
  return (
    <div className="w-full">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="relative">
          <RichTextPlugin
            contentEditable={<ContentEditable className="outline-none" />}
            placeholder={<div className="absolute top-0 text-[1.15rem] text-stone-400 pointer-events-none">ここからはじまる</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <AutoFocusPlugin />
      </LexicalComposer>
    </div>
  )
}
