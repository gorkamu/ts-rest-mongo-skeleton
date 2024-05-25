import * as mongoose from "mongoose";
import { isEmpty } from "lodash";
import * as env from "../share/env";

mongoose.set("strictQuery", false);

export default class DB {
  /**  @private uri string */
  private readonly uri: string;

  /**
   * @constructor
   */
  constructor() {
    this.uri = env.DB_URL;

    console.log({ uri: this.uri });
  }

  /**
   * @public
   * @returns string
   */
  public getUri() {
    if (isEmpty(this.uri)) {
      throw new Error("Database DSN missing");
    }

    return this.uri;
  }

  /**
   * @public
   * @returns Promise<void>
   */
  public async connect(): Promise<void> {
    mongoose
      .connect(this.getUri())
      .then(() => {
        console.log(`Connected successfully to db`);
      })
      .catch((err: any) => {
        console.log(err);
        throw err;
      });
  }

  /**
   * @public
   * @returns Promise<void>
   */
  public async disconnect(): Promise<void> {
    process.on("exit", async () => {
      await this.handleDisconnect();
    });
    process.on("SIGINT", async () => {
      await this.handleDisconnect();
    });
    process.on("SIGTERM", async () => {
      await this.handleDisconnect();
    });
  }

  private async handleDisconnect(): Promise<void> {
    console.info(`Closing mongodb connection.`);
    mongoose.connection.close();
  }
}
