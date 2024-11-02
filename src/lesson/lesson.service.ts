import lessons from '../mocks';
import { ILesson } from './lesson.types';
import Lesson from './models/lesson.entity';
import Student from './models/student.entity';
import Teacher from './models/teacher.entity';

export default class LessonService {
    static async getAllLessons() {
        let lessons;
        try{
            lessons = await Lesson.findAll({
                attributes: ['id', 'date', 'title', 'status'],
                include: [
                    {
                        model: Student,
                        attributes: ['id', 'name'],
                        through: {
                            attributes: ['visit'],
                        },
                    },
                    {
                        model: Teacher,
                        attributes: ['id', 'name'],
                        through: {
                            attributes: [],
                        },
                    },
                ],
            });
        } catch(e) {
            console.log(e)
        }

        return lessons
    }

    createLesson(lesson: ILesson): ILesson {
        return lesson
    }

}