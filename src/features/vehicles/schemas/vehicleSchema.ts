import { z } from "zod";
import { US_STATES as usStates } from "@/constants/usStates";

export const vehicleSchema = z
  .object({
    name: z.string().min(1, "Vehicle name is required"),
    make: z.string().optional(),
    model: z.string().optional(),
    year: z
      .string()
      .refine(
        (val) => {
          if (!val) return true;
          const num = Number(val);
          return !isNaN(num) && num >= 1900 && num <= new Date().getFullYear();
        },
        {
          message: `Year must be between 1900 and ${new Date().getFullYear()}`,
        }
      )
      .optional(),
    vin: z.string().optional(),
    plateNumber: z.string().optional(),
    plateState: z
      .enum(usStates.map((s) => s.value) as [string, ...string[]], {
        errorMap: () => ({ message: "Select a valid US state" }),
      })
      .optional(),
    ownershipType: z
      .enum(["Own outright", "Lease", "Loan", "Other"])
      .optional(),
    purchasePrice: z
      .number({ invalid_type_error: "Must be a number" })
      .min(0, "Purchase price cannot be negative")
      .optional(),
    purchaseDate: z.string().optional(),
    value: z
      .number({ invalid_type_error: "Must be a number" })
      .min(0, "Valuation cannot be negative")
      .optional(),
    valueDate: z.string().optional(),
    valueSource: z.string().optional(),
    owners: z
      .array(z.object({ gid: z.string() }))
      .min(1, "At least one owner is required"),
  })
  .superRefine((data, ctx) => {
    const hasPrice = data.purchasePrice != null;
    const hasDate = !!data.purchaseDate;

    if ((hasPrice && !hasDate) || (!hasPrice && hasDate)) {
      ctx.addIssue({
        path: ["purchaseDate"],
        code: z.ZodIssueCode.custom,
        message: "Purchase price and date must both be set or both be empty",
      });
      ctx.addIssue({
        path: ["purchasePrice"],
        code: z.ZodIssueCode.custom,
        message: "Purchase price and date must both be set or both be empty",
      });
    }

    const hasValue = data.value != null;
    const hasValDate = !!data.valueDate;

    if ((hasValue && !hasValDate) || (!hasValue && hasValDate)) {
      ctx.addIssue({
        path: ["value"],
        code: z.ZodIssueCode.custom,
        message:
          "Valuation and Valuation date must both be set or both be empty",
      });
      ctx.addIssue({
        path: ["valueDate"],
        code: z.ZodIssueCode.custom,
        message:
          "Valuation and Valuation date must both be set or both be empty",
      });
    }

    if (data.valueSource && (!hasValue || !hasValDate)) {
      ctx.addIssue({
        path: ["valueSource"],
        code: z.ZodIssueCode.custom,
        message: "Valuation source is only allowed if value and date are set",
      });
    }

    const today = new Date().toISOString().split("T")[0];

    if (data.purchaseDate && data.purchaseDate > today) {
      ctx.addIssue({
        path: ["purchaseDate"],
        code: z.ZodIssueCode.custom,
        message: "Purchase date cannot be in the future",
      });
    }

    if (data.valueDate && data.valueDate > today) {
      ctx.addIssue({
        path: ["valueDate"],
        code: z.ZodIssueCode.custom,
        message: "Valuation date cannot be in the future",
      });
    }

    if (data.purchaseDate && data.year) {
      const purchaseYear = Number(data.purchaseDate.split("-")[0]);
      if (purchaseYear < Number(data.year)) {
        ctx.addIssue({
          path: ["purchaseDate"],
          code: z.ZodIssueCode.custom,
          message: `Purchase date cannot be earlier than vehicle year (${data.year})`,
        });
      }
    }
  });

export type VehicleFormValues = z.infer<typeof vehicleSchema>;
