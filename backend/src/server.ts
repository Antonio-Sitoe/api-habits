import fastify from "fastify";
import Cors from "@fastify/cors";
import { AppRoutes } from "./routes";

const app = fastify();
app.register(Cors);
app.register(AppRoutes);

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
