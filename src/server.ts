import App from "./app";
import DB from "./classes/db";
import * as env from "./share/env";

(async () => {
  const db = new DB();
  try {
    await db.connect();
    const app = new App();

    app
      .listen(env.APP_PORT, () => {
        console.log(`Server started at http://localhost:${env.APP_PORT}`);
      })
      .on("error", (err: any) => {
        console.error(err);
      });
  } catch (err: any) {
    console.error(err);
  }
})();
