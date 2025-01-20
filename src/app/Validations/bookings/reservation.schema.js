import { z } from "zod";

export const reservationSchema = z.object({
    reservation_date: z.string().nonempty('You must pick a reservation date'),
    number_of_adults: z.number().nonnegative('Adults number cannot be less than 0'),
    pricing_id: z.string().nonempty('Please select a pricing option'),
    number_of_children: z.number().optional(),
    number_of_infants: z.number().optional(),
    additional_notes: z.string().optional()
});
