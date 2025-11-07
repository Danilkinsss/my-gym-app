import { PrismaClient } from '../../../../generated/prisma'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: Promise<{ workoutId: string }> }
) {
  const { workoutId: workoutIdParam } = await params

  const workoutId = Number.parseInt(workoutIdParam, 10)
  if (Number.isNaN(workoutId)) {
    return Response.json({ error: 'Invalid workoutId' }, { status: 400 })
  }

  try {
    const workout = await prisma.workout.findUnique({
      include: {
        sets: {
          include: {
            exercise: true,
          },
        },
      },
      where: {
        id: workoutId,
      },
    })
    console.log('\n🍂 Workout FOUND Successfully:', workout)

    return Response.json(workout)
  } catch (error) {
    console.error('Error fetching a workout:', error)
    return Response.json(
      { error: 'Failed to fetch a workout' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ workoutId: string }> }
) {
  const { workoutId: workoutIdParam } = await params

  const workoutId = Number.parseInt(workoutIdParam, 10)
  if (Number.isNaN(workoutId)) {
    return Response.json({ error: 'Invalid workoutId' }, { status: 400 })
  }

  try {
    const workout = await prisma.workout.delete({
      where: {
        id: workoutId,
      },
    })

    console.log('\n❌ Workouts DELETED Successfully:', workout)

    return Response.json(workout)
  } catch (error) {
    console.error('Error deleting a workout:', error)
    return Response.json(
      { error: 'Failed to delete a workout' },
      { status: 500 }
    )
  }
}
