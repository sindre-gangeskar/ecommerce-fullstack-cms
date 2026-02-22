import express, { Response, Request } from 'express';
import BrandService from 'services/BrandService';
const router = express.Router();
router.get('/', async function (_: Request, res: Response) {
  const brands = await BrandService.getAll();
  return res.status(200).json({ message: brands.length > 0 ? 'Brands successfully retrieved' : 'No brand records in database', ...(brands ? {data: brands} : null) })
})

export default router;