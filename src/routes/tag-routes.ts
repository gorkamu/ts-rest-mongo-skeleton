import { NextFunction, Request, Response } from "express";
import RouterBase, { RouterInterface } from "../classes/router-base";
import TagService from "../services/tag-service";
import { TagModelInterface, TagModelType } from "../models/tag";
import { OK } from "http-status";
import { get } from "lodash";

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
    this.router.get("/:id?", this.get);
    this.router.post("/", this.create);
    this.router.put("/", this.update);
    this.router.delete("/:id", this.delete);
  }

  /**
   * @public
   * @param req Request
   * @param res Response
   * @param next NextFunction
   * @returns Promise<any>
   */
  public async get(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const service = new TagService();
      const id = get(req, "params.id");
      const data: TagModelInterface[] = await service.get(id) as TagModelInterface[];

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
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const service: TagService = new TagService();
      const data: TagModelInterface = await service.create(
        req.body as TagModelType
      );

      return res.status(OK).json(data);
    } catch (error) {
      console.log({ error });
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
  public async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id: id, title, desc, priority } = req.body;
      const service = new TagService();
      const data = await service.update(id, { title, desc, priority});

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
  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = get(req, "params.id");
      if (!id) {
        throw new Error("No ID provided");
      }

      const service = new TagService();
      const data = await service.delete(id);

      return res.status(OK).json(data);
    } catch (error) {
      next(error);
    }
  }
}
