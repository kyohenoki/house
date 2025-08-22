import type { Metadata } from 'next'
import { Kyotsu } from './(home)/layout'

export const metadata: Metadata = {
  title: '何もない',
  description: 'ここには何もない'
}

export default function NotFound() {
  return (
    <Kyotsu>
      <div className="pt-0.5">
        <h1 className="text-[1.35rem]">ここには何もない</h1>
      </div>
    </Kyotsu>
  )
}
