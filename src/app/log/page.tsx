import Link from 'next/link'

export default function LogPage() {
  return (
    <div className="bg-orange-100 h-dvh flex justify-center items-center">
      <main className="h-auto flex flex-col gap-5 p-9 bg-violet-300 items-center text-center w-auto">
        <h1 className="font-semibold w-fit text-4xl">Log Page</h1>
        <Link href="/" className="text-blue-500 hover:text-blue-600">
          ← Home
        </Link>
      </main>
    </div>
  )
}
