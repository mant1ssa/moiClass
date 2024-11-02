import lessons from '../mocks';
import { ILesson } from './lesson.types';

export default class LessonService {
    getAllLessons() {
        return lessons;
    }

    createLesson(lesson: ILesson): ILesson {
        return lesson
    }
}