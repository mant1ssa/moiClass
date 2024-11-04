import { Request, Response, Router } from "express";
import LessonService from "./lesson.service";

const router = Router();

const lessonService = new LessonService();

router.get('/', async (req: Request, res: Response) => {
    const lesson = await lessonService.getAllLessons(req, res);
    res.status(200).send(lesson);
})


export const lessonRouter: Router = router