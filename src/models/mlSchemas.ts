import { z } from 'zod';

export const carPricePredictionSchema = z.object({
  carlength: z.number().max(205).min(140),
  carwidth: z.number().max(75).min(60),
  horsepower: z.number().max(200).min(50),
  brandavg: z.number().max(40000).min(5000),
  averagempg: z.number().max(60).min(12),
});

export const churnPredictionSchema = z.object({
  MonthlyCharges: z.number().max(120).min(18),
  TotalCharges: z.number().min(18),
  InternetService: z.enum(["Fiber optic","DSL","No"]),
  tenure: z.number().positive().max(140),
  Contract: z.enum(["Month-to-month","One year","Two year"]),
});