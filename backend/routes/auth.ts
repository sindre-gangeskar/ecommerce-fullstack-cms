import { baseUrl, domain, frontendUrl, nodeEnv } from '@/helpers/envVariables';
import { signToken } from '@/helpers/jwt';
import { validateEmail } from '@/lib/validation';
import LoginTokenService from '@/services/LoginTokenService';
import { APIResponse, UserJWTPayload } from '@/types/definitions';
import express, { Request, Response } from 'express';
import asyncHandler from 'middleware/asyncHandler';
import EmailService from 'services/EmailService';
import UserService from 'services/UserService';

const router = express.Router();

router.post('/login', asyncHandler(async function (req: Request, res: Response) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ state: "fail", status: 400, message: "email is required" } satisfies APIResponse);
  
  validateEmail(email);
  
  const user = await UserService.getByEmail(email);
  if (user) {
    const { token, path } = await LoginTokenService.createLoginToken(user.id);
    const url = `${baseUrl}/auth/verify?path=${path}&token=${token}`;
    await EmailService.sendEmail(email, url);
  }
  return res.status(200).json({
    state: "success",
    status: 200,
    message: 'An email has been sent if an account is associated with the provided email'
  } satisfies APIResponse);
}));
router.get('/verify', asyncHandler(async function (req: Request, res: Response) {
  const path = req.query.path as string;
  const token = req.query.token as string;

  if (!path || !token)
    return res.status(404).json({ state: "fail", status: 404, message: 'Resource not found' } satisfies APIResponse);

  const verifiedUser = await LoginTokenService.verifyLoginTokenAndGetUser(path, token);
  if (!verifiedUser)
    return res.status(404).json({ state: "fail", status: 404, message: 'Invalid login link' } satisfies APIResponse);

  const payload: UserJWTPayload = { id: verifiedUser.id, email: verifiedUser.email, role: verifiedUser?.role?.name! }
  const jwtToken = signToken(payload);

  res.cookie('token', jwtToken, { domain: domain, ...(nodeEnv === "production" ? { secure: true } : null), sameSite: 'strict', httpOnly: true, maxAge: Date.now() + 1000 * 60 * 60 });
  return res.status(200).redirect(frontendUrl);
}))

export default router;