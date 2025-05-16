import { Request, Response } from "express";
import AthleteService from "./athlete.service";


class AthleteController {
  private _AthleteService: AthleteService;
  
  constructor({ athleteService } : {athleteService: AthleteService, }) {
      this._AthleteService = athleteService;
  }

  public getAllAthlete = async (req: Request, res: Response)  => {
      const query: any = req.query;
      const userId = req.user?._id
      const { result, errors } = await this._AthleteService.getAllAthlete({...query});

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

  public getSingleAthlete = async (req: Request, res: Response)  => {
    const {athleteId} = req.params;
    const userId = req.user?._id
    const { result, errors } = await this._AthleteService.getSingleAthlete({athlete: athleteId});

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
    const { result, errors } = await this._AthleteService.search({...query});

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

  public getAllPerformance = async (req: Request, res: Response)  => {
    const { limit, page} = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._AthleteService.getAllPerformance({page, limit});

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

  public getSinglePerformance = async (req: Request, res: Response)  => {
    const { performanceId } = req.params;
    const userId = req.user?._id
    const { result, errors } = await this._AthleteService.getSinglePerformance({performance: performanceId});

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