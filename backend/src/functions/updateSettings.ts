import { PrismaClient, Class } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Updates the cooldown minutes and passive check-in of a given class.
 *
 * @param classId number representing of the class to be updated
 * @param cooldownMinutes number representing the cooldown minutes
 * @param passiveCheckIn boolean representing whether or not passive checkin is enabled
 * @returns a Class object of the updated class.
 */
async function updateSettings(
  classId: number,
  cooldownMinutes: number,
  passiveCheckIn: boolean
): Promise<Class> {
  const updatedClass = await prisma.class.update({
    where: { id: classId },
    data: {
      cooldownMinutes,
      passiveCheckIn,
    },
  });

  return updatedClass;
}
