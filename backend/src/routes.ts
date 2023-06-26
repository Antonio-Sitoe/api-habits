import { FastifyInstance } from "fastify";
import { prisma } from "./lib/prisma";
import { z } from "zod";
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

  app.patch("/habits/:id/toogle", async (request) => {
    const toogleHabitParams = z.object({
      id: z.string().uuid(),
    });

    const { id } = toogleHabitParams.parse(request.params);
    const today = dayjs().startOf("day").toDate();

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    });

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      });
    }
    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id,
        },
      },
    });
    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id,
        },
      });
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id,
        },
      });
    }
    console.log("today", { day });
  });

  app.get("/summary", async (req, res) => {
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id,
        D.date,
        (
          SELECT
            cast(count(*) as float)
          FROM day_habit DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HWD
          JOIN habits H
            on H.id = HWD.habit_id
          WHERE
            HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `;

    return summary;
  });
}
