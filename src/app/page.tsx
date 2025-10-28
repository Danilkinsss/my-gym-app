import Link from 'next/link'

export default function Home() {
  const categoriezedExercises: { [key: string]: string[] } = {
    Legs: ['Hip abdusction', 'Hip adduction'],
    Push: ['Pushups', 'Push presses'],
    Pull: ['Pullups', 'Pull downs'],
  }

  return (
    <div className="bg-orange-100 dark:bg-gray-900 min-h-screen">
      {/* dark:bg-gray-900 */}
      <main className="h-auto flex flex-col gap-5 justify-self-center pt-5">
        <div className="flex flex-col p-9 bg-fuchsia-300/70 border-fuchsia-500/50 dark:bg-indigo-950 dark:border-violet-900 border-2 rounded-lg items-center text-center gap-4 w-fit">
          {/* <div className="flex flex-col p-9 bg-violet-300 dark:bg-gray-800 border-violet-900 border-2 rounded-lg items-center text-center gap-4 w-fit"> */}
          <h1 className="font-semibold w-fit text-4xl px-4 ">My Gym App</h1>
          <p className=" w-fit text-xl font-mono">Tracking my activity</p>
        </div>
        <div className="w-full bg-rose-300/80 border-pink-500/50 dark:bg-pink-950 dark:border-pink-800  border-2 rounded-lg p-4 gap-2 flex flex-col">
          <h1 className="font-thin w-fit text-xl">Exercises:</h1>
          <ul className="flex flex-col gap-2 px-6">
            {Object.entries(categoriezedExercises).map(
              ([category, exercises]) => (
                <li key={category}>
                  <h2 className="font-extralight w-fit text-xl font-mono dark:text-gray-300">
                    {category}
                  </h2>
                  <ul>
                    {exercises.map((exer: string) => (
                      <li
                        key={exer}
                        className="font-mono w-fit text-lg list-disc list-inside"
                      >
                        {exer}
                      </li>
                    ))}
                  </ul>
                </li>
              )
            )}
          </ul>
        </div>

        {/* <div className="w-fit self-center gap-6 flex flex-row">
          <button className="bg-blue-400 hover:bg-blue-500 cursor-pointer p-3 rounded-md font-extrabold">
            Log Workout
          </button>
          <button className="bg-orange-400 hover:bg-orange-500 cursor-pointer p-3 rounded-md font-extrabold">
            View Workouts
          </button>
        </div> */}

        <div className="pb-5 flex justify-center">
          <nav className="self-center gap-6 flex flex-row">
            <Link
              href="/log"
              className="block p-4 bg-blue-500 border-gray-500/50 dark:bg-blue-900 border-2 dark:border-blue-700/50 hover:opacity-90 text-white  rounded"
            >
              Log Workout
            </Link>
            <Link
              href="/workouts"
              className="block p-4 bg-green-500 border-gray-500/50 dark:bg-green-900 border-2 dark:border-green-700/50 hover:opacity-90 text-white rounded"
            >
              View Workouts
            </Link>
          </nav>
        </div>
      </main>
      <footer className="bg-blue-400"></footer>
    </div>
  )
}
