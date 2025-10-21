'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function LogPage() {
  const [exercise, setExercise] = useState('')
  const [sets, setSets] = useState('')
  const [reps, setReps] = useState('')
  const [weight, setWeight] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ exercise, sets, reps, weight })
    alert('Workout logged!')
    setExercise('')
    setSets('')
    setReps('')
    setWeight('')
  }

  return (
    <div className="bg-violet-200 h-dvh flex justify-center items-center">
      <main className="h-auto flex flex-col gap-5 p-9 bg-orange-200 items-center text-center w-auto">
        <h1 className="font-semibold w-fit text-4xl">Log Page</h1>
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold w-fit text-xl">Add exercise:</h2>
          <form
            onSubmit={handleSubmit}
            className=" flex flex-row gap-4 place-items-end"
          >
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="Exercise name"
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="w-full p-2 border rounded bg-amber-200"
                required
              />
              <input
                type="number"
                placeholder="Number of sets"
                value={sets}
                onChange={(e) => setSets(e.target.value)}
                className="w-full p-2 border rounded bg-amber-200"
                required
              />
              <input
                type="number"
                placeholder="Number of reps"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-full p-2 border rounded bg-amber-200"
                required
              />
              <input
                type="number"
                placeholder="Weight in kg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full p-2 border rounded bg-amber-200"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-400 h-fit p-4 text-white rounded hover:bg-blue-500 cursor-pointer"
            >
              Add
            </button>
          </form>
        </div>
        <Link href="/" className="text-blue-500 hover:text-blue-600">
          ← Home
        </Link>
      </main>
    </div>
  )
}
