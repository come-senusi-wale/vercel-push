import { Request, Response } from "express";
import TrialService from "./trial.service";
import { ICreateTrialRequest } from "../../../../shared/types/interfaces/requests/scouts/trial.request";

class TrialController {
  private _TrialService: TrialService;
  
  constructor({ trialService } : {trialService: TrialService, }) {
      this._TrialService = trialService;
  }

  public create = async (req: Request, res: Response)  => {
      const body: ICreateTrialRequest = req.body;
      const file = req.file;
      const userId = req.user?._id
      const { trial, errors } = await this._TrialService.create(body, file, userId);

  if (errors && errors.length > 0) return res.status(401).json({
      error: errors,
      code: 401,
      status: false
    });

    if (trial === null) return res.status(401).json({
      code: 401,
      status: false
    });

    return res.status(201).json({
      data: trial,
      code: 201,
      status: true
    });
  }

  public getAllTrial = async (req: Request, res: Response)  => {
    const query = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.getAllTrial({userId, ...query});

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

    const {page, limit, trialId}: any = req.query;
   
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.getSingleTrial({trial: trialId, userId, page, limit});

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

  public getApplicantOnTrial = async (req: Request, res: Response)  => {

    const {page, limit, trialId, status}: any = req.query;
   
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.getApplicantOnTrial({trial: trialId, userId, page, limit, status});

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

  public acceptApplicant = async (req: Request, res: Response)  => {
    const {trialId, athleteId} = req.body;
   
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.acceptApplicant({trial: trialId, athleteId: athleteId, userId});

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

  public rejectApplicant = async (req: Request, res: Response)  => {
    const {trialId, athleteId} = req.body;
   
    const userId = req.user?._id
    const { result, errors } = await this._TrialService.rejectApplicant({trial: trialId, athleteId: athleteId, userId});

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