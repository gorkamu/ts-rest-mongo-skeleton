import { TagModelInterface, TagModelType } from "../models/tag";
import { TagRepository } from "../repositories/tag-repository";

export default class TagService {
  /** @param _tagRepository TagRepository */
  private readonly _tagRepository: TagRepository;

  /**
   * @constructor
   */
  constructor() {
    this._tagRepository = new TagRepository();
  }

  /**
   * @public
   * @param tag TagModelType
   * @returns
   */
  public async createTag(tag: TagModelType): Promise<TagModelInterface> {
    console.log("[+] creating tag", { tag });

    return this._tagRepository.create(tag as TagModelInterface);
  }

  /**
   * @public
   * @returns Promise<TagModelInterface[]>
   */
  public async getTags(): Promise<TagModelInterface[]> {
    console.log("[+] getting tags");

    return this._tagRepository.find();
  }

  /**
   * @public
   * @param id
   * @returns
   */
  public async getTagById(id: any) {
    console.log(`[+] getting tag with ID: ${id}`);

    return this._tagRepository.findById(id);
  }

  /**
   * @public
   * @param cond
   * @param update
   * @param options
   */
  public async findOneAndUpdate(
    cond?: Object,
    update?: Object,
    options?: Object
  ): Promise<any> {
    console.log(`Updating tag with condition: ${cond}`);

    return this._tagRepository.findOneAndUpdate(cond, update, options);
  }

  /**
   * @public
   * @param _id string
   * @returns Promise<any>
   */
  public async deleteTag(_id: string): Promise<any> {
    console.log(`Deleting tag with ID: ${_id}`);

    return this._tagRepository.delete(_id);
  }
}
