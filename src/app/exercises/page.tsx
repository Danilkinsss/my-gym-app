'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { Exercise } from '@prisma/client'

export default function ExercisesPage() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [newExercise, setNewExercise] = useState<string>('')
  const [openNewExerciseField, setOpenNewExerciseField] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Frontend: Adding an exercise...', newExercise)
    setIsAdding(true)
    setError(null)

    try {
      const res = await fetch(`/api/exercises`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExercise),
      })

      console.log('Frontend: Response status:', res.status)

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log('Frontend: Added data:', data)
      setExercises((prev) => [...prev, data])
      setNewExercise('')
      setOpenNewExerciseField(false)
      setError(null)
    } catch (err) {
      console.error('Frontend: Failed to add an exercise:', err)
      setError(err instanceof Error ? err.message : 'Failed to add an exercise')
    } finally {
      setIsAdding(false)
    }
  }

  const handleDelete = async (e: React.FormEvent, exerciseId: number) => {
    e.preventDefault()
    console.log('Frontend: Deleting an exercise...', exerciseId)
    setDeletingId(exerciseId)
    setError(null)

    try {
      const res = await fetch(`/api/exercises`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exerciseId),
      })

      console.log('Frontend: Response status:', res.status)

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP error! status: ${res.status}`)
      }

      const data = await res.json()
      console.log('Frontend: Deleted data:', data)
      setExercises((prev) =>
        prev.filter((exercise) => exercise.id !== exerciseId)
      )
      setError(null)
    } catch (err) {
      console.error('Frontend: Failed to delete an exercise:', err)
      setError(
        err instanceof Error ? err.message : 'Failed to delete an exercise'
      )
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    console.log('Frontend: Fetching exercises...')

    fetch('/api/exercises', { method: 'GET' })
      .then((res) => {
        console.log('Frontend: Response status:', res.status)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        console.log('Frontend: Received data:', data)
        setExercises(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Frontend: Failed to fetch exercises:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="bg-orange-100 dark:bg-gray-900 min-h-screen flex justify-center items-center">
        <div className="text-2xl">Loading exercises...</div>
      </div>
    )
  }

  return (
    <div className="bg-orange-100 dark:bg-gray-900 min-h-screen flex justify-center items-center">
      <main className="my-2 h-auto flex flex-col gap-5 p-9 bg-violet-400/70 border-violet-600/50 w-auto rounded-xl  dark:bg-sky-950 dark:border-sky-900 border-2">
        <h1 className="font-semibold w-fit text-4xl">Exercises Page</h1>
        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border-2 border-red-400 dark:border-red-700 rounded-lg p-3 text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}
        {exercises.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              No exercises yet. Create your first exercise!
            </p>
          </div>
        ) : (
          <ul className="w-full space-y-4">
            {exercises.map((exercise) => (
              <li
                key={exercise.id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow flex flex-row  justify-between"
              >
                <div className="w-fit">
                  {exercise.name && (
                    <div className="text-sm font-bold text-gray-600 mb-2">
                      {exercise.name}
                    </div>
                  )}

                  {exercise.muscleGroup && (
                    <div className="text-sm text-gray-600 mb-2">
                      {exercise.muscleGroup}
                    </div>
                  )}
                </div>

                <div className="w-fit">
                  <button
                    type="button"
                    className="underline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={(e) => {
                      handleDelete(e, exercise.id)
                    }}
                    disabled={deletingId === exercise.id}
                  >
                    {deletingId === exercise.id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col justify-center gap-2">
          {!openNewExerciseField ? (
            <button
              type="button"
              className="bg-teal-300/70 border-teal-500/30 border-2 h-fit py-2 text-white rounded hover:opacity-90 cursor-pointer
            block p-4  dark:bg-green-900  dark:border-green-700/50"
              onClick={() => {
                setOpenNewExerciseField(true)
              }}
            >
              Create
            </button>
          ) : (
            <form onSubmit={handleAdd} className="flex flex-col gap-3 text-sm">
              <input
                type="text"
                placeholder="Exercise name"
                value={newExercise}
                onChange={(e) => {
                  setNewExercise(e.target.value)
                  setError(null)
                }}
                className="w-full p-2 border-2 rounded bg-teal-200 dark:bg-teal-800 border-teal-600"
                required
                disabled={isAdding}
              />
              <div className="flex gap-2 justify-center">
                <button
                  type="button"
                  className="bg-rose-300/70 border-rose-500/30 border-2 h-fit py-2 text-white rounded hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    setOpenNewExerciseField(false)
                    setNewExercise('')
                    setError(null)
                  }}
                  disabled={isAdding}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-teal-300/70 border-teal-500/30 border-2 h-fit py-2 text-white rounded hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isAdding}
                >
                  {isAdding ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          )}

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
