import { z } from "zod";

export const inquireSchema = z.object({
    email: z.string().email('Invalid email address'),
    nationality: z.string().nonempty('Please select your nationality'),
    contact_number: z.string().nonempty('Please provide a contact number'),
    from_date: z.string().nonempty('Please select a start date'),
    to_date: z.string().nonempty('Please select an end date'),
    adult_count: z.number().min(1, 'At least one adult is required'),
    child_count: z.number().optional(),
    baby_count: z.number().optional(),
    additional_notes: z.string().optional()
});
