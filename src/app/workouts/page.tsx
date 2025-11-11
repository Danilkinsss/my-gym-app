'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Workout, Set, Exercise } from '@/generated/prisma'

// Define types locally (simpler than importing from Prisma)
// type Exercise = {
//   id: number
//   name: string
//   muscleGroup: string | null
//   description: string | null
// }

// type Set = {
//   id: number
//   reps: number
//   weight: number
//   exercise: Exercise
// }

// type Workout = {
//   id: number
//   notes: string | null
//   createdAt: string
//   sets: Set[]
// }

type WorkoutWithSets = Workout & {
  sets: (Set & {
    exercise: Exercise
  })[]
}

export default function WorkoutsPage() {
  const router = useRouter()
  const [workouts, setWorkouts] = useState<WorkoutWithSets[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // async function handleClick() {
  //   fetch('/api/workouts', { method: 'POST' })
  //     .then((res) => {
  //       console.log('Frontend: Response status:', res.status)
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`)
  //       }
  //       return res.json()
  //     })
  //     .then((data) => {
  //       console.log('Frontend: Received data:', data)
  //       window.location.href = `/workouts/${data.id}`
  //     })
  //     .catch((err) => {
  //       console.error('Frontend: Failed to create a workout:', err)
  //     })
  // }

  useEffect(() => {
    console.log('Frontend: Fetching workouts...')

    fetch('/api/workouts', { method: 'GET' })
      .then((res) => {
        console.log('Frontend: Response status:', res.status)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        console.log('Frontend: Received data:', data)
        setWorkouts(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Frontend: Failed to fetch workouts:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="bg-orange-100 dark:bg-gray-900 min-h-screen flex justify-center items-center">
        <div className="text-2xl">Loading workouts...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-orange-100 dark:bg-gray-900 min-h-screen flex justify-center items-center">
        <div className="text-red-500">
          <div className="text-2xl font-bold mb-2">Error Loading Workouts</div>
          <div className="text-sm">{error}</div>
          <div className="mt-4">
            <Link href="/" className="text-blue-600 underline">
              ← Go Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-orange-100 dark:bg-gray-900 min-h-screen flex justify-center items-center">
      <main className="my-2 h-auto flex flex-col gap-5 p-9 bg-violet-400/70 border-violet-600/50 items-center text-center w-auto rounded-xl  dark:bg-sky-950 dark:border-sky-900 border-2">
        <h1 className="font-semibold w-fit text-4xl">Workouts Page</h1>
        {workouts.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              No workouts yet. Start logging!
            </p>
            <Link href="/workouts/new" className="text-blue-600 underline">
              Log a workout →
            </Link>
          </div>
        ) : (
          <ul className="w-full space-y-4">
            {workouts.map((workout) => (
              <li
                key={workout.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <div className="mb-2">
                  <span className="font-bold">Workout #{workout.id}</span>
                  <span className="text-sm text-gray-500 ml-2">
                    {new Date(workout.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {workout.notes && (
                  <div className="text-sm text-gray-600 mb-2">
                    {workout.notes}
                  </div>
                )}

                {workout.sets.length > 0 && (
                  <div className="mt-2">
                    <div className="font-semibold text-sm mb-1">Exercises:</div>
                    <ul className="space-y-1 text-sm">
                      {workout.sets.map((set) => (
                        <li
                          key={set.id}
                          className="text-gray-700 dark:text-gray-300"
                        >
                          {set.exercise.name}: {set.reps} reps x {set.weight}kg
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    className="bg-teal-300/70 border-teal-500/30 border-2 h-fit py-2 text-white rounded hover:opacity-90 cursor-pointer
                      block p-4  dark:bg-green-900  dark:border-green-700/50   "
                    onClick={() => {
                      router.push('/workouts/' + workout.id)
                    }}
                  >
                    See
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col justify-center gap-2">
          <button
            type="submit"
            className="bg-teal-300/70 border-teal-500/30 border-2 h-fit py-2 text-white rounded hover:opacity-90 cursor-pointer
            block p-4  dark:bg-green-900  dark:border-green-700/50   "
            onClick={() => {
              router.push('/workouts/new')
            }}
          >
            New Workout
          </button>
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-400/70 self-center"
          >
            ← Home
          </Link>
        </div>
      </main>
    </div>
  )
}
