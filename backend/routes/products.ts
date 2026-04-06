
import express from 'express';
import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import ProductService from '@/services/ProductService';
import { APIResponse } from '@/types/definitions';
import { isAdmin, isAuth } from '@/middleware/auth';
const router = express.Router();

router.get('/', asyncHandler(async function (_: Request, res: Response) {
  const products = await ProductService.getAll();
  return res.status(200).json({ message: "Successfully queried products", state: "success", status: 200, data: products } satisfies APIResponse)
}))

router.post('/', isAuth, isAdmin, asyncHandler(async function (req: Request, res: Response) {
  const { name, description, categoryId, brandId } = req.body;

  await ProductService.create(name, description, brandId, categoryId);
  return res.status(200).json({ message: "Successfully created product", state: "success", status: 200 } satisfies APIResponse)
}))

export default router;