import { PrismaClient } from '../../../generated/prisma'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const workouts = await prisma.workout.findMany({
      include: {
        sets: {
          include: {
            exercise: true,
          },
        },
      },
    })

    return Response.json(workouts)
  } catch (error) {
    console.error('Error fetching workouts:', error)
    return Response.json({ error: 'Failed to fetch workouts' }, { status: 500 })
  }
}
