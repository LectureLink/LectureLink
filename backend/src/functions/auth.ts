import { PrismaClient, User, Student, Professor } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

/**
 * Creates a new professor account.
 *
 * @param email string for professor's email
 * @param password string for professor's password
 * @returns Professor object
 */
async function createProfessor(
  email: string,
  password: string
): Promise<Professor> {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  const professor = await prisma.professor.create({
    data: {
      userId: user.id,
    },
  });
  return professor;
}

/**
 * Creates a new student account.
 *
 * @param email string representing student's email
 * @param password string representing student's password
 * @returns Student object
 */
async function createStudent(
  email: string,
  password: string
): Promise<Student> {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });

  const student = await prisma.student.create({
    data: {
      userId: user.id,
    },
  });
  return student;
}

/**
 * Verifies if a given email and password can login a user.
 *
 * @param email string of the inputed email
 * @param password string of the inputed password
 * @returns the User object or null if login failed
 */
async function verifyLogin(
  email: string,
  password: string
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!user) {
    return null;
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return null;
  }
  return user;
}

/**
 * Determines if a student is permitted to join a session depending on whether
 * or not the student is enrolled in the class.
 *
 * @param studentId number representing the id of the student
 * @param sessionId number representing the id of the session
 * @returns boolean of whether or not the student is permitted to join the session.
 */
async function isStudentInSessionClass(
  studentId: number,
  sessionId: number
): Promise<boolean> {
  const count: number = await prisma.session.count({
    where: {
      id: sessionId,
      class: { studentsAttending: { some: { userId: studentId } } },
    },
  });

  return count > 0;
}
