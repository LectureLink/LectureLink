import {
  PrismaClient,
  User,
  Professor,
  Student,
  Class,
  EngagementData,
  Session,
} from "@prisma/client";

const prisma = new PrismaClient();

/**
 * /////////////////////////////////////////////////////////////////////
 *
 * The functions in the following portion involves POST and GETS to db.
 *
 * //////////////////////////////////////////////////////////////////////
 */

/**
 * Adds a new class to the database.
 *
 * @param name string name of the course
 * @param professorUserId number representing the Id of the professor
 * @returns a Promise of a Class object
 */
export async function addClass(
  name: string,
  professorUserId: number
): Promise<Class> {
  const professor: Professor | null = await prisma.professor.findUnique({
    where: { userId: professorUserId },
  });

  if (!professor) {
    throw new Error(`The professor of id ${professorUserId} does not exist.`);
  }

  const newClass: Class = await prisma.class.create({
    data: {
      name: name,
      professorUserId: professorUserId,
    },
  });

  return newClass;
}

/**
 * Adds a given student to a given class.
 *
 * @param studentId number id of the student
 * @param classId number id of the class to be added
 * @returns a Promise of the Student object
 */
export async function addStudentToClass(
  studentId: number,
  classId: number
): Promise<Student> {
  const student: Student | null = await prisma.student.findUnique({
    where: { userId: studentId },
  });

  if (!student) {
    throw new Error(`The student of id ${studentId} does not exist.`);
  }

  const addClass: Class | null = await prisma.class.findUnique({
    where: { id: classId },
  });

  if (!addClass) {
    throw new Error(`The class of id ${classId} does not exist.`);
  }

  const studentWithClass: Student = await prisma.student.update({
    where: { userId: studentId },
    data: {
      classes: {
        connect: { id: classId },
      },
    },
  });

  return studentWithClass;
}

/**

Adds a engagement data to the database under a given student in a given session.
@param engagementLevel number value 0-100 representing level of engagement
@param studentId number id of the student
@param sessionId number id of the session
@returns a Promise of an EngagementData object
*/
export async function addEngagementData(
  engagementLevel: number,
  studentId: number,
  sessionId: number
): Promise<EngagementData> {
  const student: Student | null = await prisma.student.findUnique({
    where: { userId: studentId },
  });
  if (!student) {
    throw new Error(`The student of id ${studentId} does not exist.`);
  }

  const session: Session | null = await prisma.session.findUnique({
    where: { id: sessionId },
  });

  if (!session) {
    throw new Error(`The session of id ${sessionId} does not exist.`);
  }

  if (0 > engagementLevel || engagementLevel > 100) {
    throw new Error(
      `Engagement level inputted as ${engagementLevel} must be in the range 0-100.`
    );
  }

  const newEngagementData: EngagementData | null =
    await prisma.engagementData.create({
      data: {
        engagementLevel: engagementLevel,
        studentUserId: studentId,
        sessionId: sessionId,
      },
    });

  return newEngagementData;
}

/**
 * Adds a new session to the database for a given class.
 *
 * @param classId number id of the class
 * @returns a Promise of a Session object
 */
export async function addSession(classId: number): Promise<Session> {
  const currClass = await prisma.class.findUnique({
    where: { id: classId },
  });

  if (!currClass) {
    throw new Error(`The class of id ${classId} does not exist.`);
  }

  const newSession = await prisma.session.create({
    data: {
      class: {
        connect: { id: classId },
      },
    },
  });

  if (!newSession) {
    throw new Error("Session not created.");
  }

  return newSession;
}

/**
 * Gets all classes the a professor of a given id teaches.
 *
 * @param professorId number id of the professor
 * @returns promise of Class array
 */
export async function getClassesTaughtByProfessor(
  professorId: number
): Promise<Class[]> {
  const classes = await prisma.class.findMany({
    where: {
      professorUserId: professorId,
    },
  });
  return classes;
}

/**
 * Gets the class of a given class id.
 *
 * @param classId number id of the class
 * @returns the Class if it exists
 */
export async function getClassById(classId: number) {
  const classInfo = await prisma.class.findUnique({
    where: {
      id: classId,
    },
  });
  return classInfo;
}
