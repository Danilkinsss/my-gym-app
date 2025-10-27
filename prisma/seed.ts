//
//  #1
//
// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient()
// async function main() {
//   const exercise = await prisma.exercise.upsert({
//     create: {
//       name: 'Alice',
//       group: 'asd0',
//       description: '',
//     },
//   })
//   console.log({ exercise })
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

//
//  #2
//
// import { PrismaClient, Prisma } from '../src/generated/prisma'
// const prisma = new PrismaClient()

// const exerciseData: Prisma.ExerciseCreateInput[] = [
//   {
//     name: 'Leg push',
//     muscleGroup: 'Legs',
//     description:
//       'Machine exercise where we push the weight with out legs forwards.',
//   },
//   {
//     name: 'Biceps Curl',
//     muscleGroup: 'Pull',
//     description: 'Dumbbell exercise where we curl our hands.',
//   },
// ]

// export async function main() {
//   for (const e of exerciseData) {
//     await prisma.exercise.create({ data: e })
//   }
// }

// main()

//
//  #3
//

import { PrismaClient } from '../src/generated/prisma'

const prisma = new PrismaClient()

const exerciseData = [
  {
    name: 'Bench Press',
    muscleGroup: 'Chest',
    description: 'Barbell chest press',
  },
  { name: 'Squat', muscleGroup: 'Legs', description: 'Barbell back squat' },
  {
    name: 'Deadlift',
    muscleGroup: 'Back',
    description: 'Conventional deadlift',
  },
  {
    name: 'Overhead Press',
    muscleGroup: 'Shoulders',
    description: 'Standing barbell press',
  },
  { name: 'Pull-ups', muscleGroup: 'Back', description: 'Bodyweight pull-ups' },
  { name: 'Dips', muscleGroup: 'Chest', description: 'Parallel bar dips' },
  {
    name: 'Barbell Row',
    muscleGroup: 'Back',
    description: 'Bent-over barbell row',
  },
  { name: 'Leg Press', muscleGroup: 'Legs', description: 'Machine leg press' },
]

async function main() {
  console.log('🌱 Seeding database...')

  // Create exercises
  for (const exercise of exerciseData) {
    await prisma.exercise.create({
      data: exercise,
    })
  }

  console.log('✅ Created exercises')

  // Create a sample workout
  const workout = await prisma.workout.create({
    data: {
      notes: 'First workout session',
    },
  })

  console.log('✅ Created workout')

  // Create some sets for that workout
  const benchPress = await prisma.exercise.findFirst({
    where: { name: 'Bench Press' },
  })

  const squat = await prisma.exercise.findFirst({
    where: { name: 'Squat' },
  })

  if (benchPress) {
    await prisma.set.createMany({
      data: [
        {
          exerciseId: benchPress.id,
          workoutId: workout.id,
          reps: 10,
          weight: 60,
        },
        {
          exerciseId: benchPress.id,
          workoutId: workout.id,
          reps: 10,
          weight: 60,
        },
        {
          exerciseId: benchPress.id,
          workoutId: workout.id,
          reps: 8,
          weight: 60,
        },
      ],
    })
    console.log('✅ Created bench press sets')
  }

  if (squat) {
    await prisma.set.createMany({
      data: [
        { exerciseId: squat.id, workoutId: workout.id, reps: 12, weight: 80 },
        { exerciseId: squat.id, workoutId: workout.id, reps: 12, weight: 80 },
        { exerciseId: squat.id, workoutId: workout.id, reps: 10, weight: 80 },
      ],
    })
    console.log('✅ Created squat sets')
  }

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:')
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
