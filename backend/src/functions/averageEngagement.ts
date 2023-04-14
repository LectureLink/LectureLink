import { PrismaClient, Session, EngagementData } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Calculates the average engagement level from a certain session.
 *
 * @param sessionId number id representing a session
 * @returns a number of the average engagement level for that session
 */
async function getAverageEngagementLevel(sessionId: number): Promise<number> {
  const session: Session | null = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  if (!session) {
    throw new Error(`Session with id ${sessionId} not found`);
  }

  const engagementData: EngagementData[] = await prisma.engagementData.findMany(
    {
      where: { sessionId: sessionId },
    }
  );

  if (!engagementData || engagementData.length === 0) {
    return 0;
  }

  const totalEngagementLevel = engagementData.reduce(
    (sum, { engagementLevel }) => sum + engagementLevel,
    0
  );
  const averageEngagementLevel = totalEngagementLevel / engagementData.length;

  return averageEngagementLevel;
}
