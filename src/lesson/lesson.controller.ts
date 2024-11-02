import { Request, Response, Router } from "express";
import LessonService from "./lesson.service";
import { middle } from "../middlware";
import { createLessonDTO } from "./lesson.dto";

const router = Router();

const lessonService = new LessonService();

router.get('/', (req: Request, res: Response) => {
    const lesson = lessonService.getAllLessons();
    res.status(200).send(lesson);
})

router.post('/', (req: Request, res: Response) => {

    const validation = createLessonDTO.safeParse(req.body);
    if(!validation.success) {
         res.status(400).json({ message: validation.error.errors[0] })
    }

    const newLesson = lessonService.createLesson(req.body)

    res.status(201).json(newLesson)
})

export const lessonRouter: Router = router