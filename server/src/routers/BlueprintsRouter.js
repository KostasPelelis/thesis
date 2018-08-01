// @ flow

import blueprints from "../data/blueprints";
console.log(blueprints);
import { Router } from "express";

export type Blueprint = {
  name: string,
  content: string
};

export default class BlueprintsRouter {
  // these fields must be type annotated, or Flow will complain!
  router: Router;
  path: string;

  // take the mount path as the constructor argument
  constructor(path: string = "/api/v1/blueprints") {
    // instantiate the express.Router
    this.router = Router();
    this.path = path;
    // glue it all together
    this.init();
  }

  /**
   * Return all items in the inventory
   */
  getAll(req: $Request, res: $Response): void {
    res.status(200).json(blueprints);
  }

  getById(req: $Request, res: $Response): any {
    const id = parseInt(req.params.id, 10);
    const blueprint = blueprints.find((item: any) => item.id === id);
    if (blueprint) {
      res.status(200).json({
        blueprint: blueprint
      });
    } else {
      res.status(404).json({});
    }
  }

  addBlueprint(req: $Request, res: $Response): void {
    const received: Produce | boolean = parseProduce(req.body);
    const newProduce = received ? req.body : null;
  }
  /**
   * Attach route handlers to their endpoints.
   */
  init(): void {
    this.router.get("/", this.getAll);
    this.router.get("/:id", this.getById);
  }
}
