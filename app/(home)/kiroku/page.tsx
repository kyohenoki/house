import type { Metadata } from 'next'
import { Kanban } from '../layout'

export const metadata: Metadata = {
  title: '記録帳',
  description: '色々書きたい'
}

export default function Kiroku() {
  return (
    <div className="pt-0.5">
      <h1 className="text-[1.35rem]">記録帳</h1>
      <div className="w-full my-2 border-b-1 border-stone-200" />
      <Kanban namae="記録を書く" link="/kiroku/kaku" className="text-[1.35rem] text-lime-700 hover:text-teal-700" />
    </div>
  )
}
