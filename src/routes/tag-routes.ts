import { NextFunction, Request, Response } from "express";
import RouterBase, { RouterInterface } from "../classes/router-base";
import TagService from "../services/tag-service";
import { TagModelInterface, TagModelType } from "../models/tag";
import { OK } from "http-status";

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

  /**
   * @public
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @returns Promise<any>
   */
  public async getItems(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const service = new TagService();
      const data: TagModelInterface[] = await service.getTags();

      return res.status(OK).json(data);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @public
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @returns Promise<any>
   */
  public async createItem(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const service: TagService = new TagService();
      const data: TagModelInterface = await service.createTag(
        req.body as TagModelType
      );

      return res.status(OK).json(data);
    } catch (error) {
      console.log({ error });
      next(error);
    }
  }

  public async updateItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, desc, priority } = req.body;

      const service = new TagService();
      const data = await service.findOneAndUpdate(
        { title },
        { priority, desc },
        { new: true }
      );
      console.log({ data });

      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  }

  public async deleteItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, desc, priority } = req.body;

      const service = new TagService();
      const data = await service.deleteTag(title);
      console.log({ data });

      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
