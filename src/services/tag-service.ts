import { TagRepository } from "../repositories/tag-repository";
import ServiceBase from "../classes/service-base";

export default class TagService extends ServiceBase {
  /**
   * @constructor
   */
  constructor() {
    super("tag", new TagRepository());
  }
}
