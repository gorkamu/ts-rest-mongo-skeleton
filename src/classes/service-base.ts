import {RepositoryBase} from "./repository-base";

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
     * @param id string
     * @returns Promise<any>
     */
    public async delete(id: string): Promise<any> {
        console.log(`Deleting ${this._entityName} with ID: ${id}`);

        return this._repository.delete(id);
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
     */
    public async update( id: string, update?: Object
    ): Promise<any> {
        console.log(`Deleting ${this._entityName} with ID: ${id}`);
        return this._repository.updateOne(id, update);
    }
}
