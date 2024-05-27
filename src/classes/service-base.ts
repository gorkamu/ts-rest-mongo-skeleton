import {RepositoryBase} from "./repository-base";
import mongoose from "mongoose";

export default class ServiceBase
{
    /**
     * @param _entityName string
     */
    private readonly _entityName: string;

    /**
     * @param _repository RepositoryBase<any>
     */
    private readonly _repository: RepositoryBase<any>;

    /**
     * @constructor
     * @param entityName
     * @param repository RepositoryBase<any>
     */
    constructor(entityName: string, repository: RepositoryBase<any>) {
        this._entityName = entityName;
        this._repository = repository;
    }

    /**
     * @public
     * @param tag any
     * @returns
     */
    public async create(tag: any): Promise<any> {
        console.log(`[+] creating ${this._entityName}`, { tag });

        return this._repository.create(tag);
    }

    /**
     * @public
     * @param _id string
     * @returns Promise<any>
     */
    public async delete(_id: string): Promise<any> {
        console.log(`Deleting ${this._entityName} with ID: ${_id}`);

        return this._repository.delete(_id);
    }

    /**
     * @public
     * @param id string | null
     * @returns Promise<any[]>
     */
    public async get(id: string | null): Promise<any[]> {
        if (id) {
            console.log(`[+] getting ${this._entityName} with ID: ${id}`);
        } else {
            console.log(`[+] getting ${this._entityName}s`);
        }

        return id ? this._repository.findById(id) : this._repository.find();
    }

    /**
     * @public
     * @param id
     * @param update
     * @param options
     */
    public async update(
        id: string,
        update?: Object,
        options?: Object
    ): Promise<any> {

        const cond = { _id: new mongoose.Types.ObjectId(id) };

        return this._repository.findOneAndUpdate(cond, update, { new: true });
    }
}
