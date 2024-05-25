import * as mongoose from "mongoose";
import { IRepositoryRead, IRepositoryWrite } from "../interfaces/index";

export class Repository<T extends mongoose.Document>
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
   */
  public async findOne(cond?: Object): Promise<any> {
    return this._model.findOne(cond).lean();
  }

  /**
   * @param cond
   */
  public async findOneHydrated(cond?: Object): Promise<any> {
    return this._model.findOne(cond);
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
   * @param cond
   */
  public async countDocuments(cond?: Object): Promise<any> {
    return this._model.countDocuments(cond);
  }

  /**
   * @param cond
   * @param update
   * @param options
   */
  public async findOneAndUpdate(
    cond?: Object,
    update?: Object,
    options?: Object
  ): Promise<any> {
    return this._model.findOneAndUpdate(cond, update, options);
  }

  /**
   * @param cond
   * @param update
   * @param options
   */
  public async updateOne(
    cond?: Object,
    update?: Object,
    options?: Object
  ): Promise<any> {
    return this._model.updateOne(cond, update, options);
  }

  /**
   * @param item
   */
  public async create(item: T): Promise<T> {
    try {
      return this._model.create(item) as Promise<T>;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param _id
   */
  public async delete(_id: string): Promise<any> {
    return this._model.deleteOne({ _id: new mongoose.Types.ObjectId(_id) });
  }

  /**
   * @param cond
   */
  public async deleteMany(cond?: Object): Promise<any> {
    return this._model.deleteMany(cond);
  }
}
