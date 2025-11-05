import { PrismaClient } from '../../../../generated/prisma'

const prisma = new PrismaClient()

export async function GET(
  request: Request,
  { params }: { params: Promise<{ workoutId: string }> }
) {
  const { workoutId: workoutIdParam } = await params
  console.log('\n\n\n🌳 params.workoutId:', workoutIdParam)

  const workoutId = Number.parseInt(workoutIdParam, 10)
  if (Number.isNaN(workoutId)) {
    return Response.json({ error: 'Invalid workoutId' }, { status: 400 })
  }

  console.log('\n\n\n🌳 workoutId from params:', workoutId)

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
    console.log('\n\n\n🍂 workout:', workout)

    return Response.json(workout)
  } catch (error) {
    console.error('Error fetching workout:', error)
    return Response.json({ error: 'Failed to fetch workout' }, { status: 500 })
  }
}
