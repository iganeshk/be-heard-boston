import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import * as cors from 'cors';

import { MainRoute, CONFIGURATIONS, PROD_ENV, DEV_ENV } from './modules/main';

/**
 * The server.
 *    static app: any;

 * @class Server
 */
export class Server {
  public app: express.Application;

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   * @return {ng.auto.IInjectorService} Returns the newly created injector for this app.
   */
  public static bootstrap(): Server {
    return new Server();
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this.app = express();
    this.config();
    this.routes();
  }

  /**
   * Configure application
   *
   * @class Server
   * @method config
   */
  public config() {

    CONFIGURATIONS.environment = process.env.NODE_ENV === 'production' ? PROD_ENV : DEV_ENV;

    this.app.use(cors({ origin: CONFIGURATIONS.environment.frontendURL }));
    this.app.use(express.static(path.join(__dirname, 'public')));
    // this.app.use(bodyParser.json());
    this.app.use(bodyParser.json({ limit: '250mb' }));
    this.app.use(bodyParser.urlencoded({ extended: true }));


    /**
     * mount cookie parser middleware
     */
    this.app.use(cookieParser('SECRET_GOES_HERE'));

    // catch 404 and forward to error handler
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      err.status = 404;
      next(err);
    });

    // catch 404 and forward to error handler
    this.app.use(function (err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
      var error = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    this.errorHandler();
  }

  /**
   * Handle error.
   * TODO:high:Mohsin: error handling not working properly also build proper understanding
   * @class Server
   * @method errorHandler
   * @return void
   */
  private errorHandler() {
    this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.log('Error handler: -------------------------------------', err);

      return res.status(err.status || 500).send({
        message: err.message || err.name || err
      });
    });
  }

  /**
   * Create and return Router.
   *
   * @class Server
   * @method config
   * @return void
   */
  private routes() {
    let router: express.Router;
    router = express.Router();

    new MainRoute(router);
    this.app.use('/api/v1/', router);
  }
}
