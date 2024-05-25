import express from "express";
import { Application } from "express";
import helmet from "helmet";
import compression from "compression";
import session from "express-session";
import * as env from "./share/env";
import ApiRouterClass from "./routes/index";
import http from "http";

export default class App {
  /** * @protected _app Application */
  protected readonly _app: Application;

  /**
   * @public
   */
  constructor() {
    this._app = express();
    this._setupMiddlewares();
    this._setupRoutes();
  }

  /**
   * @private
   * @returns void
   */
  private _setupMiddlewares() {
    this._app.use(helmet());
    this._app.use(compression());
    this._app.use(
      session({
        secret: env.SESSION_SECRET,
        cookie: {
          maxAge: 60000,
        },
        resave: false,
        saveUninitialized: false,
      })
    );
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
  }

  /**
   * @private
   * @returns Promise<void>
   */
  private async _setupRoutes(): Promise<void> {
    const apiRouter = new ApiRouterClass();
    const routes = await apiRouter.getRoutes();
    this._app.use("/api", routes);
  }

  /**
   * @public
   * @param port number
   * @param callback Function
   * @returns http.Server
   */
  public listen(port: number, callback: () => void): http.Server {
    return this._app.listen(port, callback);
  }
}
