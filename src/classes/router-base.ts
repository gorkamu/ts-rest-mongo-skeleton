import { NextFunction, Router, Request, Response } from "express";

export interface RouterBaseInterface {
  getRouter(): Router;
  getSlug(): string;
}

export interface RouterInterface {
  getItems(req: Request, res: Response, next: NextFunction): Promise<any>;
  createItem(req: Request, res: Response, next: NextFunction): Promise<any>;
  updateItem(req: Request, res: Response, next: NextFunction): Promise<any>;
  deleteItem(req: Request, res: Response, next: NextFunction): Promise<any>;
}

export default class RouterBase implements RouterBaseInterface {
  /** @protected _slug string */
  private readonly _slug: string;

  /** @protected router Router */
  protected router: Router;

  /**
   * @param slug  string
   * @constructor
   */
  constructor(slug: string) {
    this._slug = slug;
    this.router = Router();
    this.setupRoutes();
  }

  /**
   * @public
   * @returns Router
   */
  public getRouter(): Router {
    return this.router;
  }

  /**
   * @public
   * @returns string
   */
  public getSlug(): string {
    return this._slug;
  }

  /**
   * @protected
   */
  protected setupRoutes() {
    throw new Error("Method not implemented.");
  }
}
