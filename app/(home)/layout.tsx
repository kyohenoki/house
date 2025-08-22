import Link from 'next/link'

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Kyotsu>{children}</Kyotsu>
}

export function Kyotsu({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="px-5 py-4 w-full flex justify-center">
      <div className="max-w-3xl w-full flex">
        <div className="flex flex-col pr-7 select-none">
          <Kanban namae="house" link="/" className="text-[1.45rem]" />
          <Kanban namae="自己紹介" link="/tsuite" className="-ml-0.5 text-[1.35rem] text-stone-500 hover:text-orange-700" />
          <Kanban namae="記録帳" link="/kiroku" className="-ml-0.5 text-[1.35rem] text-stone-500 hover:text-green-700" />
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

export function Kanban({ namae, link, className }: { namae: string; link: string; className?: string }) {
  return (
    <Link href={link} className={`hover:text-blue-700 transition-colors duration-300 ease-in-out ${className}`}>
      {namae}
    </Link>
  )
}
