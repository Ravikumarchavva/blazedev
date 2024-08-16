import { z } from 'zod';

const carPricePredictionSchema = z.object({
  carlength: z.number().positive(),
  carwidth: z.number().positive(),
  wheelbase: z.number().positive(),
  citympg: z.number().positive(),
  highwaympg: z.number().positive(),
  enginesize: z.number().positive(),
  horsepower: z.number().positive(),
  curbweight: z.number().positive(),
});
