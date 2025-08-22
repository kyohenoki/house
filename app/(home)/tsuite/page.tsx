import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '自己紹介',
  description: '紹介します'
}

export default function Tsuite() {
  return (
    <div className="pt-0.5">
      <h1 className="text-[1.35rem]">自己紹介</h1>
    </div>
  )
}
