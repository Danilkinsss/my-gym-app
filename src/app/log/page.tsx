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

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <main className="bg-orange-100 h-auto flex flex-col gap-5 p-9 items-center sm:w-auto w-full mx-7 my-5 rounded-xl border-orange-200 border-4">
        <h1 className="font-semibold w-fit text-4xl">Log Page</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold w-fit text-xl">Add exercise:</h2>
            <form onSubmit={handleSubmit} className=" flex flex-col gap-3 ">
              <label htmlFor="exercise" className="text-sm font-medium">
                Exercise Name
              </label>
              <input
                type="text"
                placeholder="e.g. Bench press"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="w-full p-2 border rounded bg-amber-200"
                required
              />

              <label htmlFor="sets" className="text-sm font-medium">
                Number of sets
              </label>
              <input
                type="number"
                placeholder="Ideally 2-5"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="w-full p-2 border rounded bg-amber-200"
                min={1}
                required
              />

              <label htmlFor="reps" className="text-sm font-medium">
                Number of reps
              </label>
              <input
                type="number"
                placeholder="Ideally 5-20"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full p-2 border rounded bg-amber-200"
                min={0}
                required
              />

              <label htmlFor="reps" className="text-sm font-medium">
                Weight in kg
              </label>
              <input
                type="number"
                placeholder="No PR maxes"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 border rounded bg-amber-200"
                min={0}
                required
              />
              <button
                type="submit"
                className="bg-orange-300 h-fit py-2 text-white rounded hover:opacity-90 cursor-pointer "
              >
                Add
              </button>
            </form>
          </div>
          <div className="w-full flex flex-col gap-4">
            <h2 className="font-semibold w-fit text-xl">Workouts:</h2>
            <div className="bg-orange-200 p-4 rounded-md">
              {workouts.length !== 0 ? (
                <ul>
                  {workouts.map((w) => (
                    <li key={w.id}>
                      <strong>{w.exercise}</strong>
                      <p>
                        {w.sets} × {w.reps} reps of {w.weight}kgs
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nothing here yet</p>
              )}
            </div>
          </div>
        </div>
        <Link href="/" className="text-blue-500 hover:text-blue-600">
          ← Home
        </Link>
      </main>
    </div>
  )
}
