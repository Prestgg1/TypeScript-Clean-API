import "reflect-metadata";
import { RegisterRoutes } from "./routes";
import swaggerUi from "swagger-ui-express";
import type { Response as ExResponse, Request as ExRequest, Response } from "express";
import express, { json, urlencoded } from "express";
import swaggerDocument from "../build/swagger.json";
import { apiReference } from "@scalar/express-api-reference";

export const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.get("/swagger.json", (_req: ExRequest, res: ExResponse) => {
  return res.json(swaggerDocument);
});

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
app.use("/scalar", apiReference({
  content: swaggerDocument,
}));


app.get("/", (_, res: Response) => {

  return res.send(`<h1>Salamlar, ASKORG saytı hazırlanır.</h1>`);
});
