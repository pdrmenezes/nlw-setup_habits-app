import { FastifyInstance } from "fastify";
import WebPush from "web-push";
import { z } from "zod";

const publicKey = "BGWj31xGaJ9yDsrrrpUcD_sKeDD14do422GafLzHkDSDzHBzeMOn_1i3XcgSzhgTumf5rEw3xRs-UVj0GMOz9qw";
const privateKey = "UiPkuh2mR1c391PCBlaTevChuNTvzBQJna8BxqtlsHM";

WebPush.setVapidDetails("http://localhost:3333", publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return {
      publicKey,
    };
  });

  app.post("/push/register", (request, reply) => {
    console.log(request.body);

    return reply.status(201).send();
  });

  app.post("/push/send", async (request, reply) => {
    console.log(request.body);
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });
    const { subscription } = sendPushBody.parse(request.body);
    WebPush.sendNotification(subscription, "Back-end talk");
    return reply.status(201).send();
  });
}
