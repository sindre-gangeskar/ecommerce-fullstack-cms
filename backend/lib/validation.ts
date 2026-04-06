import { createAndThrowHttpError } from '@/helpers/utils';
import zod from 'zod';

export function validateEmail(email: string) {
  const emailSchema = zod.object({ email: zod.email({ error: "Please enter a valid email" }) });
  const result = emailSchema.safeParse({ email });
  if (result.success) return;
  
  createAndThrowHttpError({
    message: "Failed to validate email",
    state: "fail",
    status: 400,
    name: "EmailValidationError",
    data: zod.flattenError(result.error)
  });
}