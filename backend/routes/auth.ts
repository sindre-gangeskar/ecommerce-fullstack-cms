import express, { Request, Response } from 'express';
import asyncHandler from 'middleware/asyncHandler';
const router = express.Router();

router.post('/login', asyncHandler(async function (req: Request, res: Response) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "email is required" });
}));