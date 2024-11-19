import { z } from 'zod';

export class UserSchema {
  constructor() {
    this.userSchema = z.object({
      username: z.string({
        invalid_type_error: 'username must be a string',
        required_error: 'username is required'
      }),
      password: z.string({
        invalid_type_error: 'password must be a string',
        required_error: 'password is required'
      })
    });
  }

  validate(input) {
    return this.userSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.userSchema.partial().safeParse(input);
  }
}