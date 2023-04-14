const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Gets the average comprehension level of a class within a certain timespan.
 *
 * @param timespan number representing span of time (seconds) to collect data from
 * @param sessionId number representing the ID of the session
 * @param classSize number representing the size of the class
 * @returns the average score or -1 if less than 50% of the class responded
 */
async function getComprehensionLevel(
  timespan: number,
  sessionId: number,
  classSize: number
): Promise<Number> {
  if (typeof timespan !== "number") {
    throw new Error("Timespan must be a number.");
  }
  if (timespan < 0) {
    throw new Error("Timespan cannot be negative.");
  }

  const startTime = new Date(Date.now() - timespan * 1000);
  const endTime = new Date();

  const data = await prisma.engagementData.findMany({
    where: {
      sessionId,
      timestamp: {
        gte: startTime,
        lte: endTime,
      },
    },
  });

  if (data.length < classSize / 2) {
    return -1;
  }

  const average =
    data.reduce((acc: number, data: any) => acc + data.engagementLevel, 0) /
    data.length;

  return average;
}
