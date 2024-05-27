import * as mongoose from "mongoose";
import { IRepositoryRead, IRepositoryWrite } from "../interfaces/index";

export class RepositoryBase<T extends mongoose.Document>
  implements IRepositoryRead<T>, IRepositoryWrite<T>
{
  /** @param _model mongoose.Model<mongoose.Document> */
  private _model: mongoose.Model<mongoose.Document>;

  /** * @param schemaModel any */
  private _defaultSortParams: any;

  /**
   * @param schemaModel
   */
  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
    this._defaultSortParams = { sortBy: "createdAt", sortOrder: -1 };
  }

  /**
   * @param _id
   */
  public async findById(_id: string): Promise<any> {
    return this._model.findById(_id);
  }

  /**
   * @param cond
   * @param projection
   * @param options
   * @param sortParams
   */
  public async find(
    cond?: any,
    projection?: Object,
    options?: Object,
    sortParams: any = null
  ): Promise<any> {
    const qs = this._model.find(cond, projection, options).lean();
    if (sortParams) {
      qs.sort(sortParams);
    }

    return qs;
  }

  /**
   * @param _id
   * @param update
   */
  public async updateOne(_id: string, update?: Object): Promise<any> {
    const cond = { _id: new mongoose.Types.ObjectId(_id) };
    const options = { new: true }

    return this._model.updateOne(cond, update, options);
  }

  /**
   * @param item
   */
  public async create(item: T): Promise<T> {
    return await this._model.create(item) as Promise<T>;
  }

  /**
   * @param _id
   */
  public async delete(_id: string): Promise<any> {
    return this._model.deleteOne({ _id: new mongoose.Types.ObjectId(_id) });
  }
}
