import { APIResponse } from '@/types/definitions';
import express, { Response, Request } from 'express';
import { isAuth } from 'middleware/auth';
import BrandService from 'services/BrandService';
const router = express.Router();

router.get('/', isAuth, async function (_: Request, res: Response) {
  const brands = await BrandService.getAll();
  return res.status(200).json({
    state: "success",
    status: 200,
    message: brands && brands.length > 0 ? 'Brands successfully retrieved' : 'No brand records in database',
    ...(brands ? { data: brands } : null)
  } satisfies APIResponse)
})

export default router;