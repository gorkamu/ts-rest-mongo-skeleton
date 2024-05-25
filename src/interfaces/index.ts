export interface BaseModelInterface {}
export interface IRepositoryRead<T> {
  findById(_id: string): Promise<any>;
  findOne(cond?: Object): Promise<any>;
  find(cond?: Object, projection?: Object, options?: Object): Promise<any>;
}
export interface IRepositoryWrite<T> {
  create(item: T): Promise<any>;
  updateOne(cond?: Object, update?: Object, options?: Object): Promise<any>;
  delete(_id: string): Promise<any>;
  findOneAndUpdate(
    cond?: Object,
    update?: Object,
    options?: Object
  ): Promise<any>;
}
