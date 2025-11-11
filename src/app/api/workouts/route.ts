import { PrismaClient, Set } from '../../../generated/prisma'

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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const newWorkout = await prisma.workout.create({
      data: {
        notes: body.name !== '' ? body.name : 'New workout',
        sets: {
          create: body.sets.map((set: Set) => ({
            exerciseId: set.id,
            reps: set.reps,
            weight: set.weight,
          })),
        },
      },
    })
    // const newWorkout = await prisma.workout.create({
    //   data: {
    //     notes: body.name !== '' ? body.name : 'New workout',
    //     sets: {
    //       create: [
    //         {
    //           exerciseId: 1,
    //           reps: 12,
    //           weight: 12,
    //         },
    //         {
    //           exerciseId: 2,
    //           reps: 12,
    //           weight: 12,
    //         },
    //       ],
    //     },
    //   },
    // })
    return Response.json(newWorkout)
  } catch (error) {
    console.error('Error creating a workout:', error)
    return Response.json(
      { error: 'Failed to create a workout' },
      { status: 500 }
    )
  }
}
