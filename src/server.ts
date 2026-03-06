import "reflect-metadata";
import { app } from "./index";

export default app;

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () =>
    console.log(`Server listening at http://localhost:${port}`)
  );
}