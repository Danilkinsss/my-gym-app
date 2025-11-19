import { prisma } from '../../../../lib/prisma'

export async function GET() {
  try {
    const exercises = await prisma.exercise.findMany()

    return Response.json(exercises)
  } catch (error) {
    console.error('Error fetching exercises:', error)
    return Response.json(
      { error: 'Failed to fetch exercises' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newWorkout = await prisma.exercise.create({
      data: {
        name: body,
      },
    })

    return Response.json(newWorkout)
  } catch (error) {
    console.error('Error creating an exercise:', error)
    return Response.json(
      { error: 'Failed to create an exercise' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const exerciseId = await request.json()
    if (typeof exerciseId !== 'number' || Number.isNaN(exerciseId)) {
      return Response.json({ error: 'Invalid exerciseId' }, { status: 400 })
    }
    const deletedExercise = await prisma.exercise.delete({
      where: {
        id: exerciseId,
      },
    })

    return Response.json(deletedExercise)
  } catch (error) {
    console.error('Error deleting an exercise:', error)
    return Response.json(
      { error: 'Failed to delete an exercise' },
      { status: 500 }
    )
  }
}
