import Fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./routes";

const app = Fastify();

/**
 * Método HTTP: Get, Post, Patch, Delete
 */

app.register(cors);
app.register(appRoutes);

app.listen({ port: 3333, host: "192.168.0.84" }).then((url) => {
  console.log(`Server running on ${url}`);
});
