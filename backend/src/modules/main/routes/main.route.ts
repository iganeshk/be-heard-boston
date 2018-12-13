import { Router } from 'express';

import { MainController } from '../index';

export class MainRoute {
  router: Router;

  constructor(router: Router) {
    this.router = router;
    this.initRoutes();
  }

  /**
   * init all routes
   */
  public initRoutes() {

    let controller = new MainController();

      this.router.route('/loadFile').get(controller.loadFile);
      this.router.route('/updateFile').post(controller.updateFile);
      this.router.route('/checkCode').post(controller.checkCode);
      this.router.route('/claimPrize').post(controller.claimPrize);

  }
}
