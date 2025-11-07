'use client'

import { Workout, Set, Exercise } from '@/generated/prisma'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

type WorkoutWithSets = Workout & {
  sets: (Set & {
    exercise: Exercise
  })[]
}

export default function WorkoutDetails() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [workout, setWorkout] = useState<WorkoutWithSets | null>(null)

  const { workoutId } = useParams<{ workoutId: string }>()

  const router = useRouter()
  const [renameField, setRenameField] = useState<string | null | undefined>(
    workout?.notes
  )
  const [openRenameField, setOpenRenameField] = useState(false)

  useEffect(() => {
    if (!workoutId) return
    console.log('Frontend: Fetching a workout...', workoutId)
    fetch(`/api/workouts/${workoutId}`, { method: 'GET' })
      .then((res) => {
        console.log('Frontend: Response status:', res.status)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        console.log('Frontend: Received data:', data)
        setRenameField(data.notes)
        setWorkout(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Frontend: Failed to fetch a workout:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [workoutId])

  if (loading) {
    return (
      <div className="bg-orange-100 dark:bg-gray-900 min-h-screen flex justify-center items-center">
        <div className="text-2xl">Loading workout...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-orange-100 dark:bg-gray-900 min-h-screen flex justify-center items-center">
        <div className="text-red-500">
          <div className="text-2xl font-bold mb-2">Error Loading Workout</div>
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

  // If workoutId needs to be shown, and workout is fetched, display data if available

  const hadleDelete = () => {
    console.log('Frontend: Deleting a workout...', workoutId)
    setLoading(true)
    fetch(`/api/workouts/${workoutId}`, { method: 'DELETE' })
      .then((res) => {
        console.log('Frontend: Response status:', res.status)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        console.log('Frontend: Deleted data:', data)
        router.push('/workouts')
      })
      .catch((err) => {
        console.error('Frontend: Failed to delete workout:', err)
        setError(err.message)
        setLoading(false)
      })
  }
  const handleRename = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Frontend: Renaming the workout...', workoutId)
    setLoading(true)
    fetch(`/api/workouts/${workoutId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ notes: renameField || '' }),
    })
      .then((res) => {
        console.log('Frontend: Response status:', res.status)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        console.log('Frontend: Renamed data:', data)
        setWorkout(data)
        setOpenRenameField(false)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Frontend: Failed to rename workout:', err)
        setError(err.message)
        setLoading(false)
      })
  }

  return (
    <div className="bg-orange-100 dark:bg-gray-900 min-h-screen flex justify-center items-center">
      {workout ? (
        <div
          key={workout.id}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-col gap-2"
        >
          <div className="mb-2">
            <span className="font-bold">Workout #{workout.id}</span>
            <span className="text-sm text-gray-500 ml-2">
              {new Date(workout.createdAt).toLocaleDateString()}
            </span>
          </div>

          {!openRenameField ? (
            <div>
              {workout.notes && (
                <div className="text-sm text-gray-600">{workout.notes}</div>
              )}
              <button
                className="underline text-sm text-gray-500 cursor-pointer"
                onClick={() => {
                  setOpenRenameField(true)
                }}
              >
                Rename
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleRename}
              className="flex flex-col gap-3 text-sm"
            >
              <input
                type="string"
                placeholder="New name"
                value={renameField ? renameField : ''}
                onChange={(e) => setRenameField(e.target.value)}
                className="w-full p-2 border-2 rounded bg-teal-200 dark:bg-teal-800 border-teal-600"
                required
              />
              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  className="bg-rose-300/70 border-rose-500/30 border-2 h-fit py-2 text-white rounded hover:opacity-90 cursor-pointer"
                  onClick={() => {
                    setOpenRenameField(false)
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-300/70 border-teal-500/30 border-2 h-fit py-2 text-white rounded hover:opacity-90 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          )}

          {workout.sets.length > 0 && (
            <div className="mt-2">
              <div className="font-semibold text-sm mb-1">Exercises:</div>
              <ul className="space-y-1 text-sm">
                {workout.sets.map((set) => (
                  <li key={set.id} className="text-gray-700 dark:text-gray-300">
                    {set.exercise.name}: {set.reps} reps x {set.weight}kg
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex gap-2">
            <div className="flex justify-center">
              <button
                className="bg-rose-300/70 border-rose-500/30 border-2 h-fit py-2 text-white rounded hover:opacity-90 cursor-pointer
            block p-4  dark:bg-red-900  dark:border-red-700/50   "
                onClick={hadleDelete}
              >
                Delete
              </button>
            </div>

            <div className="flex justify-center">
              <button
                className="bg-teal-300/70 border-teal-500/30 border-2 h-fit py-2 text-white rounded hover:opacity-90 cursor-pointer
              block p-4  dark:bg-green-900  dark:border-green-700/50   "
                onClick={() => {
                  router.push('/workouts')
                }}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>No such workout</p>
          <div className="pb-5 flex justify-center">
            <button
              type="submit"
              className="bg-teal-300/70 border-teal-500/30 border-2 h-fit py-2 text-white rounded hover:opacity-90 cursor-pointer
            block p-4  dark:bg-green-900  dark:border-green-700/50   "
              onClick={() => {
                router.push('/workouts/new')
              }}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
