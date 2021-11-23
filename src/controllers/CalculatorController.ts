import express, { Request, Response, NextFunction } from 'express';
import Middlewares from '../middlewares/Middlewares';
import Helpers from '../helpers/Helpers';
import { IModels } from '../models';
import { CalculatorService } from '../services/CalculatorService';

class CalculatorController extends Middlewares {
  public router: express.Router;
  private service: CalculatorService;

  constructor(helpers: Helpers, models: IModels, service: CalculatorService) {
    super(helpers, models);
    this.router = express.Router();
    this.service = service;
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/:operation', [
      this.validateJWT,
      this.calculator,
    ]);
  }

  private calculator = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { params: { operation }, body: { array } } = req;
    if (operation !== 'sum' && operation !== 'sub') {
      return next({ status: 400, message: 'Invalid operation' });
    }
    const result = await this.service.calculator(operation, array);
    return res.status(200).json(result);
  }

}

export default CalculatorController;
