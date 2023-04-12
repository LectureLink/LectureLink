import {
  PrismaClient,
  User,
  Professor,
  Student,
  Class,
  EngagementData,
} from "@prisma/client";

const prisma = new PrismaClient();

/**
 * /////////////////////////////////////////////////////////////////////
 *
 * The functions in the following portion involve adding to the database.
 *
 * //////////////////////////////////////////////////////////////////////
 */

/**
 * Adds a new user as a professor to the database.
 *
 * @param email string email of the professor
 * @returns a Promise of a Professor object
 */
async function addProfessor(email: string): Promise<Professor> {
  const newUser: User = await prisma.user.create({
    data: {
      email: email,
      professor: {
        create: {},
      },
    },
  });

  const newProfessor: Professor | null = await prisma.professor.findUnique({
    where: { userId: newUser.id },
  });

  if (!newProfessor) {
    throw new Error("Professor user not created.");
  }

  return newProfessor;
}

/**
 * Adds a new user as a student to the database.
 *
 * @param email string email of the student
 * @returns a Promise of a Student object
 */
async function addStudent(email: string): Promise<Student> {
  const newUser: User = await prisma.user.create({
    data: {
      email: email,
      student: {
        create: {},
      },
    },
  });

  const newStudent: Student | null = await prisma.student.findUnique({
    where: { userId: newUser.id },
  });

  if (!newStudent) {
    throw new Error("Professor user not created.");
  }

  return newStudent;
}

/**
 * Adds a new class to the database.
 *
 * @param name string name of the course
 * @param professorUserId number representing the Id of the professor
 * @returns a Promise of a Class object
 */
async function addClass(name: string, professorUserId: number): Promise<Class> {
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
async function addStudentToClass(
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
 * Adds a engagement data to the database under a given student in a given class.
 *
 * @param engagementLevel number value 0-100 representing level of engagement
 * @param studentId number id of the student
 * @param classId number id of the class
 * @returns a Promise of an EngagementData object
 */
async function addEngagementData(
  engagementLevel: number,
  studentId: number,
  classId: number
): Promise<EngagementData> {
  const student: Student | null = await prisma.student.findUnique({
    where: { userId: studentId },
  });

  if (!student) {
    throw new Error(`The student of id ${studentId} does not exist.`);
  }

  const currClass: Class | null = await prisma.class.findUnique({
    where: { id: classId },
  });

  if (!currClass) {
    throw new Error(`The class of id ${classId} does not exist.`);
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
        classId: classId,
      },
    });

  return newEngagementData;
}
