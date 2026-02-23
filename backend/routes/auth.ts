import express, { Request, Response } from 'express';
import asyncHandler from 'middleware/asyncHandler';
import EmailService from 'services/EmailService';
import UserService from 'services/UserService';
const router = express.Router();

router.post('/login', asyncHandler(async function (req: Request, res: Response) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "email is required" });
  const user = await UserService.getByEmail(email);

  if (user && user.email)
    await EmailService.sendEmail(email);
  return res.status(200).json({ message: 'An email has been sent if an account is associated with the provided email' });
}));

export default router;