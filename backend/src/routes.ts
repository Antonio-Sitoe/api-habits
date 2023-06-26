import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import dayjs from "dayjs";
export async function AppRoutes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const createHabitObject = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6)),
    });
    const { title, weekDays } = createHabitObject.parse(request.body);

    await prisma.habit.create({
      data: {
        title,
        created_at: dayjs().startOf("day").toDate(),
        weekDays: {
          create: weekDays.map((weekDay) => {
            return {
              week_day: String(weekDay),
            };
          }),
        },
      },
    });
  });
  app.get("/day", async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date(),
    });

    const { date } = getDayParams.parse(request.query);
    const parseDay = dayjs(date).startOf("day");
    const weekDay = parseDay.get("day");

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date, // a data do habito e menor ou igual
        },
        weekDays: {
          some: {
            week_day: String(weekDay),
          },
        },
      },
    });

    const day = await prisma.day.findUnique({
      where: {
        date: parseDay.toDate(),
      },
      include: {
        dayHabits: true,
      },
    });
    const completedHabits = day?.dayHabits.map((dayHabit) => {
      return dayHabit.habit_id;
    });
    return {
      possibleHabits,
      completedHabits,
    };
  });
}
