import { Request, Response } from "express";
import TrialService from "./trial.service";


class TrialController {
    private _TrialService: TrialService;
    
    constructor({ trialService } : {trialService: TrialService, }) {
        this._TrialService = trialService;
    }

    public allPaginatedTrial = async (req: Request, res: Response)  => {
        const query: any = req.query;
    
        const { trials, errors } = await this._TrialService.allPaginatedTrial({page: parseFloat(query.page), limit: parseFloat(query.limit)});

    if (errors && errors.length > 0) return res.status(401).json({
        error: errors,
        code: 401,
        status: false
      });
  
      if (trials === null) return res.status(401).json({
        code: 401,
        status: false
      });
  
      return res.status(201).json({
        data: trials,
        code: 201,
        status: true
      });
    }

    public singleTrial = async (req: Request, res: Response)  => {
        const param: any = req.params;
    
        const { trial, errors } = await this._TrialService.singleTrial({trialId: param.trialId});

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

    public searchTrial = async (req: Request, res: Response)  => {
        console.log("query")
        const query: any = req.query;

        console.log("query", query)
    
        const { result, errors } = await this._TrialService.searchTrial(query);

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