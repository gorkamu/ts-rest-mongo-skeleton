import mongoose from "mongoose";
import { Repository } from "../classes/repository";
import { TagModel, TagModelInterface } from "../models/tag";

export class TagRepository extends Repository<TagModelInterface> {
  constructor() {
    super(TagModel as unknown as mongoose.Model<mongoose.Document>);
  }
}
