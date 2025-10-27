import Link from 'next/link'

export default function WorkoutsPage() {
  return (
    <div className="bg-orange-100 dark:bg-gray-900 min-h-screen flex justify-center items-center">
      <main className="h-auto flex flex-col gap-5 p-9 bg-violet-300 items-center text-center w-auto rounded-xl  dark:bg-sky-950 dark:border-sky-900 border-2">
        <h1 className="font-semibold w-fit text-4xl">Workouts Page</h1>
        <Link href="/" className="text-gray-300 hover:text-gray-400">
          ← Home
        </Link>
      </main>
    </div>
  )
}
