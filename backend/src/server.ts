import fastify from "fastify";
import Cors from "@fastify/cors";
import { PrismaClient } from "@prisma/client";

const app = fastify();
const prisma = new PrismaClient();
app.register(Cors);

app.get("/", async () => {
  const habits = await prisma.habit.findMany();
  return habits;
});

const start = async () => {
  try {
    await app.listen({ port: 3333 });
    console.log("Server running on port " + 3333);
  } catch (err) {
    app.log.error(err);
    // process.exit(1);
  }
};
start();
