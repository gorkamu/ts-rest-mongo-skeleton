import * as mongoose from "mongoose";
import { BaseModelInterface } from "../interfaces";

export type TagModelType = {
  title: string;
  desc: string;
  priority?: number;
};

export interface TagModelInterface
  extends mongoose.Document,
    BaseModelInterface {
  title: string;
  desc: string;
  priority?: number;
}

const tagSchema = new mongoose.Schema<
  TagModelInterface,
  mongoose.Model<TagModelInterface>
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      max: 10,
    },
  },
  { versionKey: false, timestamps: true }
);

export const TagModel = mongoose.model<
  TagModelInterface,
  mongoose.Model<TagModelInterface>
>("Tag", tagSchema, "tags");
