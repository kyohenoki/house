import { createSignal } from 'solid-js'

// const menu = true
const menu = false

const [open, setOpen] = createSignal(menu)

export function Menu() {
  const change = () => setOpen((prev) => !prev)
  return (
    <div>
      <button type="button" class="cursor-pointer" onClick={change}>
        {open() ? 'close' : 'menu'}
      </button>
    </div>
  )
}

export function Komoku() {
  return (
    <>
      {open() && (
        <div class="absolute right-0 flex flex-col items-end border-[1.5px] border-[var(--be)] bg-[var(--haikei)] pl-3 pr-3 pt-2 text-[var(--bemo)]">
          <Aaa href="/me">私について</Aaa>
          <Aaa href="/kiroku">記録帳</Aaa>
          <Aaa href="/mada">これから</Aaa>
        </div>
      )}
    </>
  )
}

function Aaa({ href, className, children }: { href: string; className?: string; children: string }) {
  return (
    <div class="mb-2">
      <a href={href} class={`${className}`}>
        {children}
      </a>
    </div>
  )
}
