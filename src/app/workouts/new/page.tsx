'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Exercise } from '@prisma/client'
interface TempSet {
  id?: number
  exercise?: string
  reps?: number
  weight?: number
}

interface Workout {
  name: string
  sets: TempSet[]
}

export default function NewWorkoutPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [newSet2, setNewSet2] = useState<TempSet>({
    id: 1,
  })

  const [workout, setWorkout] = useState<Workout>({
    name: '',
    sets: [],
  })

  useEffect(() => {
    console.log('workout', workout)
  }, [workout])

  const [optionExercises, setOptionExercises] = useState<Exercise[]>([])
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
        setOptionExercises(data)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Frontend: Failed to fetch workouts:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // TODO: add values check -> need to be numbers, and text not empty(use Zod?)
    e.preventDefault()

    setNewSet2({
      id: newSet2.id ? newSet2.id + 1 : 1,
      exercise: '',
      reps: 0,
      weight: 0,
      // TODO: resolve -> page.tsx:221 A component is changing an uncontrolled input to be controlled...
    })
    console.log('newSet2', newSet2)

    setWorkout({ ...workout, sets: [...workout.sets, newSet2] })
  }

  function handleSave() {
    fetch('/api/workouts', { method: 'POST', body: JSON.stringify(workout) })
      .then((res) => {
        console.log('Frontend: Response status:', res.status)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        console.log('Frontend: Created workout:', data)
        router.push(`/workouts/${data.id}`)
      })
      .catch((err) => {
        console.error('Frontend: Failed to create a workout:', err)
      })
  }

  // if (loading) {
  //   return (
  //     <div className="bg-orange-100 dark:bg-gray-900 min-h-screen flex justify-center items-center">
  //       <div className="text-2xl">Loading workouts...</div>
  //     </div>
  //   )
  // }

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
    <div className="bg-orange-100 dark:bg-gray-900 min-h-screen flex justify-center items-center p-4">
      <main className="bg-teal-200/60 border-teal-500/40 h-auto flex flex-col gap-5 p-9  sm:w-auto w-full mx-7 my-5 rounded-xl  dark:bg-teal-950 dark:border-teal-900 border-2">
        <h1 className="font-semibold w-fit text-4xl self-center">
          New Workout Page
        </h1>
        <div className="flex flex-col gap-3 w-[50%]">
          <h2 className="font-semibold w-fit text-xl font-mono">
            Workout name:
          </h2>
          <form
            onSubmit={(e) => e.preventDefault()}
            className=" flex flex-col gap-3 text-sm"
          >
            <input
              type="text"
              placeholder="e.g. Legs session"
              value={workout.name}
              onChange={(e) => setWorkout({ ...workout, name: e.target.value })}
              className="w-full p-2 border-2 rounded bg-teal-200 dark:bg-teal-800 border-teal-600"
              required
              // TODO: make at either required(without the name we can't save) OR let it be empty(we will add a default name in the next stages)
            />
          </form>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold w-fit text-xl font-mono">
              Add exercise:
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 text-sm"
            >
              <label
                htmlFor="exercise"
                className="text-sm font-medium font-mono"
              >
                Choose an exercise
              </label>

              <select
                name="exercise"
                id="pet-select"
                value={newSet2.exercise}
                onChange={(e) =>
                  setNewSet2({ ...newSet2, exercise: e.target.value })
                }
                required
              >
                <option value="">
                  {optionExercises.length === 0
                    ? '...Exercises are loading...'
                    : '--Please choose an option--'}
                </option>
                {optionExercises.map((optionExercise) => (
                  <option key={optionExercise.id} value={optionExercise.name}>
                    {optionExercise.name}
                  </option>
                ))}
              </select>

              <label htmlFor="reps" className="text-sm font-medium font-mono">
                Number of reps
              </label>
              <input
                type="number"
                placeholder="Ideally 5-20"
                // value={reps}
                // onChange={(e) => setReps(e.target.value)}
                value={newSet2.reps}
                onChange={(e) =>
                  setNewSet2({ ...newSet2, reps: parseInt(e.target.value) })
                }
                // TODO: resolve ->
                // page.tsx:221 A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info:
                className="w-full p-2 border-2 rounded bg-teal-200 dark:bg-teal-800 border-teal-600"
                min={0}
                required
              />

              <label htmlFor="reps" className="text-sm font-medium font-mono">
                Weight in kg
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="No PR maxes"
                // value={weight}
                // onChange={(e) => setWeight(e.target.value)}
                value={newSet2.weight}
                onChange={(e) =>
                  setNewSet2({ ...newSet2, weight: parseFloat(e.target.value) })
                }
                className="w-full p-2 border-2 rounded bg-teal-200 dark:bg-teal-800 border-teal-600"
                min={0}
                required
              />
              <button
                type="submit"
                className="bg-teal-300/70 border-teal-500/30 border-2 h-fit py-2 text-white rounded hover:opacity-90 cursor-pointer"
              >
                Add
              </button>
            </form>
          </div>
          <div className="w-full flex flex-col gap-4">
            <h2 className="font-medium font-mono w-fit text-xl">
              Workout sets:
            </h2>
            <div className="bg-teal-500 p-4 rounded-md">
              {workout?.sets.length !== 0 ? (
                <ul className="flex flex-col gap-2">
                  {workout.sets.map((s) => (
                    <li
                      key={s.id}
                      className="flex flex-row place-items-end gap-4 justify-between"
                    >
                      <div className="flex flex-col gap-2">
                        <p className="font-light">{'"' + s.exercise + '"'}</p>
                        <p>
                          {s.weight}kg×{s.reps}
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="bg-red-400 h-fit p-2 text-white rounded hover:opacity-90 cursor-pointer"
                        onClick={() => {
                          console.log(s.id)
                          setWorkout({
                            ...workout,
                            sets: [
                              ...workout.sets.filter((set) => set.id !== s.id),
                            ],
                          })
                        }}
                      >
                        🗑️
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-white ">Nothing here yet</p>
              )}
            </div>
          </div>
        </div>
        <button
          // type="submit"
          className="bg-teal-300/70 border-teal-500/30 border-2 h-fit py-2 text-white rounded hover:opacity-90 cursor-pointer"
          onClick={handleSave}
        >
          Save
        </button>
        <Link
          href="/"
          className="text-gray-400 hover:text-gray-400/70 self-center"
        >
          ← Home
        </Link>
      </main>
    </div>
  )
}
