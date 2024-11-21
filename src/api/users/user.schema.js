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
      }),
      email: z.string({
        invalid_type_error: 'email must be a string',
        required_error: 'email is required'
      }).email({ message: 'email must be a a valid email address' }),
    });
  }

  validate(input) {
    return this.userSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.userSchema.partial().safeParse(input);
  }
}

export class LoginUserSchema {
  constructor() {
    this.loginUserSchema = z.object({
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
    return this.loginUserSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.loginUserSchema.partial().safeParse(input);
  }
}