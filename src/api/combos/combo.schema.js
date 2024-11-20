import { z } from 'zod';

export class ComboSchema {
  constructor() {
    this.comboSchema = z.object({
      combo_name: z.string({
        invalid_type_error: 'combo_name must be a string',
        required_error: 'combo_name is required'
      }),
      combo_description: z.string({
        invalid_type_error: 'combo_description must be a string',
        required_error: 'combo_description is required'
      }),
      combo_items: z.string().regex(/^[a-f\d]{24}$/i, "Invalid ID").array({
        invalid_type_error: 'combo_items must be a array',
        required_error: 'combo_items is required'
      }),
      combo_value: z.number({
        invalid_type_error: 'combo_value must be a big integer',
        required_error: 'combo_value is required'
      }).int().positive("combo_value must be a valid number")
    });
  }

  validate(input) {
    return this.comboSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.comboSchema.partial().safeParse(input);
  }
}