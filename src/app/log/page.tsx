'use client'
import Link from 'next/link'
import { useState } from 'react'

interface Workout {
  exercise: string
  sets: number
  reps: number
  weight: number
  id: number
}

export default function LogPage() {
  const [exercise, setExercise] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')

  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [nextId, setNextId] = useState(0)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newWorkout: Workout = {
      exercise,
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseFloat(weight),
      id: nextId,
    }
    console.log(newWorkout)

    setWorkouts([...workouts, newWorkout])
    setNextId(nextId + 1)
    setExercise('')
    setSets('')
    setReps('')
    setWeight('')
  }

  function runAdd() {
    fetch('/api/workouts', { method: 'POST' })
      .then((res) => {
        console.log('Frontend: Response status:', res.status)
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        console.log('Frontend: Received data:', data)
      })
      .catch((err) => {
        console.error('Frontend: Failed to create a workout:', err)
      })
  }

  return (
    <div className="bg-orange-100 dark:bg-gray-900 min-h-screen flex justify-center items-center p-4">
      <main className="bg-teal-200/60 border-teal-500/40 h-auto flex flex-col gap-5 p-9 items-center sm:w-auto w-full mx-7 my-5 rounded-xl  dark:bg-teal-950 dark:border-teal-900 border-2">
        <h1 className="font-semibold w-fit text-4xl">Log Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold w-fit text-xl font-mono">
              Add exercise:
            </h2>
            <form
              onSubmit={handleSubmit}
              className=" flex flex-col gap-3 text-sm"
            >
              <label
                htmlFor="exercise"
                className="text-sm font-medium font-mono"
              >
                Exercise Name
              </label>
              <input
                type="text"
                placeholder="e.g. Bench press"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="w-full p-2 border-2 rounded bg-teal-200 dark:bg-teal-800 border-teal-600"
                required
              />

              <label htmlFor="sets" className="text-sm font-medium font-mono">
                Number of sets
              </label>
              <input
                type="number"
                placeholder="Ideally 2-5"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="w-full p-2 border-2 rounded bg-teal-200 dark:bg-teal-800 border-teal-600"
                min={1}
                required
              />

              <label htmlFor="reps" className="text-sm font-medium font-mono">
                Number of reps
              </label>
              <input
                type="number"
                placeholder="Ideally 5-20"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full p-2 border-2 rounded bg-teal-200 dark:bg-teal-800 border-teal-600"
                min={0}
                required
              />

              <label htmlFor="reps" className="text-sm font-medium font-mono">
                Weight in kg
              </label>
              <input
                type="number"
                placeholder="No PR maxes"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 border-2 rounded bg-teal-200 dark:bg-teal-800 border-teal-600"
                min={0}
                required
              />
              <button
                type="submit"
                className="bg-teal-300/70 border-teal-500/30 border-2 h-fit py-2 text-white rounded hover:opacity-90 cursor-pointer"
                onClick={() => {
                  console.log('adding a new one')
                  runAdd()
                }}
              >
                Add
              </button>
            </form>
          </div>
          <div className="w-full flex flex-col gap-4">
            <h2 className="font-medium font-mono w-fit text-xl">Workouts:</h2>
            <div className="bg-teal-500 p-4 rounded-md">
              {workouts.length !== 0 ? (
                <ul className="flex flex-col gap-2">
                  {workouts.map((w) => (
                    <li
                      key={w.id}
                      className="flex flex-row place-items-end gap-4 justify-between"
                    >
                      <div className="flex flex-col gap-2">
                        <p className="font-light">{'"' + w.exercise + '"'}</p>
                        <p>
                          {w.sets} × {w.reps} reps of {w.weight}kg
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="bg-red-400 h-fit p-2 text-white rounded hover:opacity-90 cursor-pointer"
                        onClick={() => {
                          console.log(w.id)
                          setWorkouts([
                            ...workouts.filter(
                              (workout) => workout.id !== w.id
                            ),
                          ])
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
        <Link href="/" className="text-gray-400 hover:text-gray-400/70">
          ← Home
        </Link>
      </main>
    </div>
  )
}
