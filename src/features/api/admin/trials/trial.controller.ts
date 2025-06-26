import { Request, Response } from "express";
import TrialService from "./trial.service";


class TrialController {
  private _TrialService: TrialService;
  
  constructor({ trialService } : {trialService: TrialService, }) {
      this._TrialService = trialService;
  }

    public getAllTrial = async (req: Request, res: Response)  => {
        const query: any = req.query;
        const userId = req.user?._id
        const { result, errors } = await this._TrialService.getAllTrial({...query});

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

  public getSingleTrial = async (req: Request, res: Response)  => {
    const {trialId} = req.params;
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.getSingleTrial({trial: trialId});

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

  public getAllTrialByStatus = async (req: Request, res: Response)  => {
    const query: any = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.getAllTrialByStatus({...query});

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
    const { result, errors } = await this._TrialService.search({...query});

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

  public totalTrial = async (req: Request, res: Response)  => {
    const query: any = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.totalTrial();

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

  public totalLiveTrial = async (req: Request, res: Response)  => {
    const query: any = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.totalLiveTrial();

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

  public totalTrialCreatedForThisMonth = async (req: Request, res: Response)  => {
    const query: any = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.totalTrialCreatedForThisMonth();

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

  public lastMonthPercentCrate = async (req: Request, res: Response)  => {
    const query: any = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.lastMonthPercentCrate();

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

  public totalTrialCreatePerMonth = async (req: Request, res: Response)  => {
    const query: any = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.totalTrialCreatePerMonth();

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

  public totalApplicationToday = async (req: Request, res: Response)  => {
    const query: any = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.totalApplicationToday();

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

  public totalApplication = async (req: Request, res: Response)  => {
    const query: any = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.totalApplication();

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

  public lastMonthPercentApplied = async (req: Request, res: Response)  => {
    const query: any = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.lastMonthPercentApplied();

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

export default TrialController;