import { atom, useAtom, useAtomValue } from 'jotai'

// const menu = atom(true)
const menu = atom(false)

export function Menu() {
  const [open, setOpen] = useAtom(menu)
  return (
    <div>
      <button type="button" className="cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        {open ? 'close' : 'menu'}
      </button>
    </div>
  )
}

export function Komoku() {
  const open = useAtomValue(menu)
  if (open) {
    return (
      <div className="absolute right-0 flex flex-col items-end rounded-bl-2xl border-[2px] border-[var(--be)] bg-[var(--haikei)] pb-1 pl-3 pr-3 pt-3 text-[var(--bemo)]">
        <Aaa href="/me">私について</Aaa>
        <Aaa href="/kiroku">記録帳</Aaa>
        <Aaa href="/mada">これから</Aaa>
      </div>
    )
  }
}

function Aaa({ href, className, children }: { href: string; className?: string; children: string }) {
  return (
    <div className="mb-2">
      <a href={href} className={`${className}`}>
        {children}
      </a>
    </div>
  )
}
