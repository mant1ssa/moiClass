import { z } from "zod";

export const createLessonDTO = z.object({
    name: z.string().min(1, 'Text is required').max(10)
})