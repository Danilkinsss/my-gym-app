import { prisma } from '../../../../../lib/prisma'

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

export async function POST(
  request: Request,
  { params }: { params: Promise<{ workoutId: string }> }
) {
  const { workoutId: workoutIdParam } = await params
  const workoutId = Number.parseInt(workoutIdParam, 10)
  if (Number.isNaN(workoutId)) {
    return Response.json({ error: 'Invalid workoutId' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const workout = await prisma.workout.update({
      where: {
        id: workoutId,
      },
      data: {
        notes: body.notes || null,
      },
      include: {
        sets: {
          include: {
            exercise: true,
          },
        },
      },
    })

    console.log('\n✏️ Workout UPDATED Successfully:', workout)

    return Response.json(workout)
  } catch (error) {
    console.error('Error updating a workout:', error)
    return Response.json(
      { error: 'Failed to update a workout' },
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
