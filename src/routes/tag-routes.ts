import { NextFunction, Request, Response } from "express";
import RouterBase, { RouterInterface } from "../classes/router-base";

export default class TagRoutes extends RouterBase implements RouterInterface {
  /** @protected slug string */
  protected static readonly slug: string = "tags";

  /**
   * @constructor
   */
  constructor() {
    super(TagRoutes.slug);
  }

  /**
   * @protected
   */
  protected setupRoutes() {
    this.router.get("/", this.getItems);
    this.router.post("/", this.createItem);
    this.router.put("/", this.updateItem);
    this.router.delete("/", this.deleteItem);
  }

  public async getItems(req: Request, res: Response, next: NextFunction) {
    try {
      const tags = ["tag1", "tag2", "tag3"];
      return res.json({ tags });
    } catch (error) {
      next(error);
    }
  }

  public async createItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { tag } = req.body;
      console.log(`${tag} <-- Tag to create`);

      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  public async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { tag } = req.body;
      console.log(`${tag} <-- Tag to update`);

      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  }

  public async deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { tag } = req.body;
      console.log(`${tag} <-- Tag to delete`);

      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
