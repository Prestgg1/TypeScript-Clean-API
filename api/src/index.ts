import "reflect-metadata";
import { RegisterRoutes } from "./routes";
import swaggerUi from "swagger-ui-express";
import type { Response as ExResponse, Request as ExRequest, Response } from "express";
import express, { json, urlencoded } from "express";

export const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../build/swagger.json"), {
      customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.min.css",
      customJs: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-standalone-preset.min.js"
      ]
    })
  );
});
app.get("/swagger.json", async (_req: ExRequest, res: ExResponse) => {
  return res.json(await import("../build/swagger.json"));
});
app.get("/", (_, res: Response) => {

  return res.send(`<h1>Salamlar, ASKORG saytı hazırlanır.</h1>`);
});
