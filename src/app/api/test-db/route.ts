// app/api/test-db/route.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Simple query to test connection
    await prisma.$connect()
    const result = await prisma.$queryRaw`SELECT 1 as test`

    return Response.json({
      success: true,
      message: 'Database connected!',
      result,
    })
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
        name:
          error instanceof Error && 'name' in error
            ? error.name
            : 'UnknownError',
      },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}
