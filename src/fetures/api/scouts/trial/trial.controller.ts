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
}

export default TrialController;