import { PrismaClient, Set } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  console.log('=== STARTING WORKOUT FETCH ===')
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL)
  console.log(
    'DATABASE_URL starts with:',
    process.env.DATABASE_URL?.substring(0, 20)
  )

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

    console.log('Successfully fetched workouts:', workouts.length)
    return Response.json(workouts)
  } catch (error) {
    console.error('Error fetching workouts:', error)

    console.error('=== ERROR FETCHING WORKOUTS ===')
    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
    }
    console.error('Full error:', error)
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
