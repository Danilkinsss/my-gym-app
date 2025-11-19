'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Workout } from '@prisma/client'
import { formatDateEU } from '@/lib/formatDate'

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchWorkouts = async () => {
      console.log('Frontend: Fetching workouts...')
      setError(null)

      try {
        const res = await fetch('/api/workouts', { method: 'GET' })
        console.log('Frontend: Response status:', res.status)

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}))
          throw new Error(
            errorData.error || `HTTP error! status: ${res.status}`
          )
        }

        const data = (await res.json()) as Workout[]
        console.log('Frontend: Received data:', data)

        if (isMounted) {
          setWorkouts(data)
        }
      } catch (err) {
        console.error('Frontend: Failed to fetch workouts:', err)
        if (isMounted) {
          setError(
            err instanceof Error ? err.message : 'Failed to fetch workouts'
          )
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchWorkouts()

    return () => {
      isMounted = false
    }
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
            <Link href="/workouts" className="text-blue-600 underline">
              ← View workouts
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const latestWorkout = workouts.at(-1)
  const startOfWeek = (() => {
    const now = new Date()
    const start = new Date(now)
    const weekday = start.getDay()
    const mondayOffset = (weekday + 6) % 7
    start.setDate(start.getDate() - mondayOffset)
    start.setHours(0, 0, 0, 0)
    return start
  })()
  const thisWeekWorkouts = workouts.filter(
    (workout) => new Date(workout.createdAt) >= startOfWeek
  ).length

  const data: { [key: string]: string } = {
    'Total Workouts': workouts.length.toString(),
    'This week': thisWeekWorkouts.toString(),
    'Latest Workout':
      latestWorkout != null
        ? `${latestWorkout.notes ?? 'Workout'} - ${formatDateEU(
            new Date(latestWorkout.createdAt)
          )}`
        : 'No workouts yet',
  }

  return (
    <div className="bg-orange-100 dark:bg-gray-900 min-h-screen p-6">
      <main className="h-auto flex flex-col gap-5 justify-self-center pt-5">
        <div className="flex flex-col p-9 bg-fuchsia-300/70 border-fuchsia-500/50 dark:bg-indigo-950 dark:border-violet-900 border-2 rounded-lg items-center text-center gap-4 w-full">
          <h1 className="font-semibold w-fit text-4xl px-4 ">My Gym App</h1>
          <p className=" w-fit text-xl font-mono">Tracking my activity</p>
        </div>

        <div className="w-full bg-rose-300/80 border-pink-500/50 dark:bg-pink-950 dark:border-pink-800  border-2 rounded-lg p-4 gap-2 flex flex-col">
          {/* <h1 className="font-thin w-fit text-xl">Content:</h1> */}
          <ul className="flex flex-col gap-2 px-2">
            {Object.entries(data).map(([naming, value]) => (
              <li key={naming} className="flex gap-4">
                <h2 className="font-extralight w-fit text-xl font-mono dark:text-gray-300">
                  {naming}:
                </h2>
                <h2 className="font-mono w-fit text-lg">{value}</h2>
              </li>
            ))}
          </ul>
        </div>

        <div className="pb-5 flex flex-col gap-5">
          <div className="flex justify-center">
            <nav className="self-center gap-6 flex flex-row w-full justify-center text-center">
              <Link
                href="/workouts/new"
                className="block p-4 bg-blue-500 border-gray-500/50 dark:bg-blue-900 border-2 dark:border-blue-700/50 hover:opacity-90 text-white  rounded w-full"
              >
                New Workout
              </Link>
              <Link
                href="/workouts"
                className="block p-4 bg-green-500 border-gray-500/50 dark:bg-green-900 border-2 dark:border-green-700/50 hover:opacity-90 text-white rounded w-full"
              >
                View Workouts
              </Link>
            </nav>
          </div>

          <div className="flex justify-center">
            <nav className="self-center gap-6 flex flex-row w-full">
              <Link
                href="/exercises"
                className="block p-4 bg-orange-500 border-orange-500/50 dark:bg-orange-900 border-2 dark:border-orange-700/40 hover:opacity-90 text-white  rounded w-full text-center"
              >
                View Exercises
              </Link>
            </nav>
          </div>
        </div>
      </main>
      <footer className="bg-blue-400"></footer>
    </div>
  )
}
