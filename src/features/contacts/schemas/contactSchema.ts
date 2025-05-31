import { z } from "zod";
import { US_STATES as usStates } from "@/constants/usStates";

export const contactSchema = z
  .object({
    isCompany: z.boolean(),
    contactInCaseOfDeath: z.boolean(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    company: z.string().optional(),
    initials: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    role: z.string().optional(),
    street: z.string().optional(),
    city: z.string().optional(),
    state: z
      .enum(usStates.map((s) => s.value) as [string, ...string[]])
      .optional(),
    zipCode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isCompany) {
      if (!data.company?.trim()) {
        ctx.addIssue({
          path: ["company"],
          code: z.ZodIssueCode.custom,
          message: "Company name is required for company contacts",
        });
      }
    } else {
      if (!data.firstName?.trim()) {
        ctx.addIssue({
          path: ["firstName"],
          code: z.ZodIssueCode.custom,
          message: "First name is required",
        });
      }
      if (!data.lastName?.trim()) {
        ctx.addIssue({
          path: ["lastName"],
          code: z.ZodIssueCode.custom,
          message: "Last name is required",
        });
      }
    }
  });

export type ContactFormValues = z.infer<typeof contactSchema>;
