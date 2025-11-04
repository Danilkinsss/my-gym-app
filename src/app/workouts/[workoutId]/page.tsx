export default async function WorkoutDetails({
  params,
}: {
  params: Promise<{ workoutId: string }>
}) {
  //   useEffect(() => {
  //     console.log('Frontend: Fetching workouts...')

  //     fetch('/api/workouts', { method: 'GET' })
  //       .then((res) => {
  //         console.log('Frontend: Response status:', res.status)
  //         if (!res.ok) {
  //           throw new Error(`HTTP error! status: ${res.status}`)
  //         }
  //         return res.json()
  //       })
  //       .then((data) => {
  //         console.log('Frontend: Received data:', data)
  //         setWorkouts(data)
  //         setLoading(false)
  //       })
  //       .catch((err) => {
  //         console.error('Frontend: Failed to fetch workouts:', err)
  //         setError(err.message)
  //         setLoading(false)
  //       })
  //   }, [])

  const workoutId = (await params).workoutId
  return <h1>Hello: {workoutId}</h1>
}
