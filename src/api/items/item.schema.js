import { z } from 'zod';

export class ItemSchema {
  constructor() {
    this.itemSchema = z.object({
      item_name: z.string({
        invalid_type_error: 'item_name must be a string',
        required_error: 'item_name is required'
      }).min(1, "item_name is required"),
      url_image: z.string({
        invalid_type_error: 'url_image must be a string',
      }).optional(),
      unit_value: z.number({
        invalid_type_error: 'unit_value must be a big integer',
        required_error: 'unit_value is required'
      }).int().positive("unit_value must be a valid number")
    });
  }

  validate(input) {
    return this.itemSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.itemSchema.partial().safeParse(input);
  }
}