// @flow

import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import BlueprintsRouter from '../routers/BlueprintsRouter';
import type {$Request, $Response, express$Application} from 'express';

export default class Api {
  // annotate with the express $Application type
  express: express$Application;

  // create the express instance, attach app-level middleware, attach routers
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // register middlewares
  middleware(): void {
    this.express.use(morgan('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
  }

  // connect resource routers
  routes(): void {
    const blueprintsRouter = new BlueprintsRouter();
    this.express.use(blueprintsRouter.path, blueprintsRouter.router);
  }
}
