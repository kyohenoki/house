import { atom, useAtom } from 'jotai'

const menu = atom(false)

export default function Menu() {
  const [open, setOpen] = useAtom(menu)
  return (
    <div>
      <button
        className="cursor-pointer"
        onClick={() => {
          if (open) {
            setOpen(false)
          } else {
            setOpen(true)
          }
        }}
      >
        {open ? 'close' : 'menu'}
      </button>
    </div>
  )
}
