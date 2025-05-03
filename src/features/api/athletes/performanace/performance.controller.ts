import { Request, Response } from "express";
import PerformanceService from "./performance.service";
import { IPerformanceRequest } from "../../../../shared/types/interfaces/requests/athletes/performance.request";


class PerformanceController {
    private _PerformanceService: PerformanceService;
    
    constructor({ performanceService } : {performanceService: PerformanceService, }) {
        this._PerformanceService = performanceService;
    }

    public postPerformance = async (req: Request, res: Response)  => {
        const body: IPerformanceRequest = req.body;
        const file = req.file;
        const userId = req.user?._id
    
        const { result, errors } = await this._PerformanceService.postPerformance({performance: body, userId, file});

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
      const query: any = req.query;
      const userId = req.user?._id
  
      const { result, errors } = await this._PerformanceService.getAllPerformance({...query});

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

    public getAllUrPerformance = async (req: Request, res: Response)  => {
        const query: any = req.query;
        const userId = req.user?._id
    
        const { result, errors } = await this._PerformanceService.getAllUrPerformance({...query, userId});
  
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

    public getUrSingleTrial = async (req: Request, res: Response)  => {

      const {performanceId}: any = req.params;
      const userId = req.user?._id

      const { result, errors } = await this._PerformanceService.getSinglePerformance({performance: performanceId});

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



export default PerformanceController;