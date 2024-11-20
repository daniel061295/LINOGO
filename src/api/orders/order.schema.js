import { z } from 'zod';

export class OrderSchema {
  constructor() {
    this.orderSchema = z.object({
      order_name: z.string({
        invalid_type_error: 'order_name must be a string',
        required_error: 'order_name is required'
      }).min(1, "order_name is required"),
      order_address: z.string({
        invalid_type_error: 'order_address must be a string',
        required_error: 'order_address is required'
      }).min(1, "order_address is required"),
      order_phone_number: z.number({
        invalid_type_error: 'order_phone_number must be a big integer',
        required_error: 'order_phone_number is required'
      }).int().min(1000000, "order_phone_number must have at least 7 digits"),
      order_cedula: z.number({
        invalid_type_error: 'order_cedula must be a big integer',
        required_error: 'order_cedula is required'
      }).int().positive("order_cedula must be a valid number"),
      order_city: z.string({
        invalid_type_error: 'order_city must be a string',
        required_error: 'order_city is required'
      }).min(1, "order_city is required"),
      order_status: z.enum(
        ["En proceso", "Enviado", "Por reclamar", "Entregado", "Devuelto"]
      ),
      order_guide_number: z.number({
        invalid_type_error: 'order_guide_number must be a big integer',
        required_error: 'order_guide_number is required'
      }).int().positive("order_guide_number must be a valid number"),
      order_products: z.array(
        z.object({
          type: z.enum(["Item", "Combo"], "Type must be 'Item' or 'Combo'"),
          reference: z.string().regex(/^[a-f\d]{24}$/i, "Invalid ID"),
        })
      ).nonempty('Order must have at least one product'),
      order_value: z.number({
        invalid_type_error: 'order_value must be a big integer',
        required_error: 'order_value is required'
      }).int()
    });
  }

  validate(input) {
    return this.orderSchema.safeParse(input);
  }

  validatePartial(input) {
    return this.orderSchema.partial().safeParse(input);
  }
}
