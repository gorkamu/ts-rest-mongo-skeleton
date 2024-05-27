import mongoose from "mongoose";
import { RepositoryBase } from "../classes/repository-base";
import { TagModel, TagModelInterface } from "../models/tag";

export class TagRepository extends RepositoryBase<TagModelInterface> {
  constructor() {
    super(TagModel as unknown as mongoose.Model<mongoose.Document>);
  }
}
