import { Router } from "express";
import * as fs from "fs";
import { RouterBaseInterface } from "../classes/router-base";

export default class ApiRouterClass {
  /** * @protected _router Router */
  private readonly _router: Router;

  /**
   * @constructor
   */
  constructor() {
    this._router = Router();
  }

  /**
   * @protected
   * @param directory string
   */
  protected async loadRoutes(directory: string) {
    const files: string[] = await fs.promises.readdir(directory);

    for (const file of files) {
      if (
        file !== "index.ts" &&
        (file.endsWith(".ts") || file.endsWith(".js"))
      ) {
        try {
          const module = await import(`./${file}`);
          const _class = module.default;
          console.log({ _class });
          const routerClass: RouterBaseInterface = new _class();

          if (routerClass && typeof routerClass.getRouter === "function") {
            const _slug: string = routerClass.getSlug();
            const _routes: Router = routerClass.getRouter();

            this._router.use(`/${_slug}`, _routes);
          } else {
            console.warn(
              `Skipping "${file}": Missing getSlug() method or default export`
            );
          }
        } catch (error) {
          console.error(`Error loading routes from "${file}": ${error}`);
        }
      }
    }
  }

  /**
   * @public
   * @returns Promise<Router>
   */
  public async getRoutes(): Promise<Router> {
    this.loadRoutes(__dirname);
    return this._router;
  }
}
