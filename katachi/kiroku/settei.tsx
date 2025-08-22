'use client'

import { atom, useAtom } from 'jotai'
import Link from 'next/link'

export const setteio = atom(false)

export function Settei() {
  const [open, setOpen] = useAtom(setteio)
  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (open) {
            setOpen(false)
          } else {
            setOpen(true)
          }
        }}
        className="cursor-pointer text-[1.35rem] hover:text-sky-700 transition-colors duration-300 ease-in-out"
      >
        設定
      </button>
    </div>
  )
}

export function Setteikomoku() {
  const [open] = useAtom(setteio)
  if (open) {
    return (
      <div className="relative w-full flex justify-end">
        <div className="absolute ext-right text-[1.05rem] text-stone-500">
          <Link href="/kiroku/kaku/mitame">見た目の確認</Link>
        </div>
      </div>
    )
  }
}
