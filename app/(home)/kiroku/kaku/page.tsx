import type { Metadata } from 'next'
import { Editor } from '@/katachi/kiroku/kaku'
import { Settei, Setteikomoku } from '@/katachi/kiroku/settei'

export const metadata: Metadata = {
  title: '記録を書く',
  description: '今日も残す'
}

export default function Kiroku() {
  return (
    <div className="pt-0.5 w-full flex flex-col relative">
      <div className="w-full flex justify-between">
        <h1 className="text-[1.35rem]">記録を書く</h1>
        <Settei />
      </div>
      <div className="w-full my-2 border-b-1 border-stone-200" />
      <div className="relative z-10">
        <Setteikomoku />
      </div>
      <div className="relative z-0">
        <Editor />
      </div>
    </div>
  )
}
