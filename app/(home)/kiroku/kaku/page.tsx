import type { Metadata } from 'next'
import { Editor } from '@/katachi/kiroku/kaku'

export const metadata: Metadata = {
  title: '記録を書く',
  description: '今日も残す'
}

export default function Kiroku() {
  return (
    <div className="pt-0.5 w-full flex flex-col">
      <h1 className="text-[1.35rem]">記録を書く</h1>
      <Editor />
    </div>
  )
}
