import App from "./app";
import * as env from "./share/env";

const app = new App();

app
  .listen(env.APP_PORT, () => {
    console.log(`Server started at http://localhost:${env.APP_PORT}`);
  })
  .on("error", (err: any) => {
    console.error(err);
  });
