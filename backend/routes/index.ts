import { APIResponse } from '@/types/definitions';
import { Request, Response, NextFunction } from 'express'
import express from 'express'
var router = express.Router();

/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction ) {
  res.status(200).json({state: "success", status: 200,  message: "Index API endpoint" } satisfies APIResponse);
});

export default router;
