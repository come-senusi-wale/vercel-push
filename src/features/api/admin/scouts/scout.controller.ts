import { Request, Response } from "express";
import ScoutService from "./scout.service";
import { IChangeStatusRequest } from "../../../../shared/types/interfaces/requests/athletes/auth.request";


class AthleteController {
  private _ScoutService: ScoutService;
  
  constructor({ scoutService } : {scoutService: ScoutService, }) {
      this._ScoutService = scoutService;
  }

    public getAllScout = async (req: Request, res: Response)  => {
        const query: any = req.query;
        const userId = req.user?._id
        const { result, errors } = await this._ScoutService.getAllScout({...query});

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });

        if (result === null) return res.status(401).json({
            code: 401,
            status: false
        });

        return res.status(201).json({
            data: result,
            code: 201,
            status: true
        });
    }

  public getSingleScout = async (req: Request, res: Response)  => {
    const {scoutId} = req.params;
    const userId = req.user?._id
    const { result, errors } = await this._ScoutService.getSingleScout({scout: scoutId});

    if (errors && errors.length > 0) return res.status(401).json({
      error: errors,
      code: 401,
      status: false
    });

    if (result === null) return res.status(401).json({
      code: 401,
      status: false
    });

    return res.status(201).json({
      data: result,
      code: 201,
      status: true
    });
  }

  public getAllScoutByStatus = async (req: Request, res: Response)  => {
    const query: any = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._ScoutService.getAllScoutByStatus({...query});

    if (errors && errors.length > 0) return res.status(401).json({
        error: errors,
        code: 401,
        status: false
    });

    if (result === null) return res.status(401).json({
        code: 401,
        status: false
    });

    return res.status(201).json({
        data: result,
        code: 201,
        status: true
    });
}

  public search = async (req: Request, res: Response)  => {
    const query: any = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._ScoutService.search({...query});

    if (errors && errors.length > 0) return res.status(401).json({
      error: errors,
      code: 401,
      status: false
    });

    if (result === null) return res.status(401).json({
      code: 401,
      status: false
    });

    return res.status(201).json({
      data: result,
      code: 201,
      status: true
    });
  }

  public totalScouts = async (req: Request, res: Response)  => {
    const query: any = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._ScoutService.totalScouts();

    if (errors && errors.length > 0) return res.status(401).json({
      error: errors,
      code: 401,
      status: false
    });

    if (result === null) return res.status(401).json({
      code: 401,
      status: false
    });

    return res.status(201).json({
      data: result,
      code: 201,
      status: true
    });
  }

  public lastMonthPercentReg = async (req: Request, res: Response)  => {
    const query: any = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._ScoutService.lastMonthPercentReg();

    if (errors && errors.length > 0) return res.status(401).json({
      error: errors,
      code: 401,
      status: false
    });

    if (result === null) return res.status(401).json({
      code: 401,
      status: false
    });

    return res.status(201).json({
      data: result,
      code: 201,
      status: true
    });
  }

  public totalRegPerMonth = async (req: Request, res: Response)  => {
    const query: any = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._ScoutService.totalRegPerMonth();

    if (errors && errors.length > 0) return res.status(401).json({
      error: errors,
      code: 401,
      status: false
    });

    if (result === null) return res.status(401).json({
      code: 401,
      status: false
    });

    return res.status(201).json({
      data: result,
      code: 201,
      status: true
    });
  }

  public changeStatus = async ({body }: { body: IChangeStatusRequest }, res: Response)  => {
    const {user, status}  = body;

    const { result, errors } = await this._ScoutService.changeStatus({user, status});

    if (errors && errors.length > 0) return res.status(401).json({
      error: errors,
      code: 401,
      status: false
    });

    if (result === null) return res.status(401).json({
      code: 401,
      status: false
    });

    return res.status(201).json({
      data: result,
      code: 201,
      status: true
    });
  }
}

export default AthleteController;