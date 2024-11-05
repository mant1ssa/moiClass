import { Request, Response } from "express";
import { plainToClass } from 'class-transformer';
import { LessonsGetDTO } from './lesson.dto';
import { validate } from 'class-validator';
import { Op, QueryTypes } from 'sequelize';
import sequelize from "../database";

export default class LessonService {
    async getAllLessons(req: Request, res: Response) {
        try {
            const queryDto = plainToClass(LessonsGetDTO, req.query);

            // Провалидиирую что нам прислал клиент
            const errors = await validate(queryDto);
            if (errors.length > 0) {
                return res.status(400).json({
                    message: "Validation error",
                    errors: errors.map((error) => ({
                        field: error.property,
                        issues: error.constraints,
                    })),
                });
            }

            const whereClauses: string[] = [];  // Массив будет по каждому полю строки запроса собирать условие (если есть)
            const replacements: any = [];       // Массив собирающий подстановочные значения (на места ?)

            // Тут проверяю дату, надо будет поменять тип string на Date позже
            if (queryDto.date !== undefined) {
                const dates = queryDto.date.split(',');
                if (dates.length === 1) {
                    whereClauses.push('l.date = ?');
                    replacements.push(dates[0])
                } else if (dates.length === 2) {
                    whereClauses.push('l.date BETWEEN ? AND ?');
                    replacements.push(dates[0], dates[1]);
                }
            }

            if (queryDto.status !== undefined) {
                whereClauses.push('l.status = ?');
                replacements.push(queryDto.status);
            }

            // Получили массив ИД учителей
            if (queryDto.teacherIds !== undefined && queryDto.teacherIds && queryDto.teacherIds.length > 0) {
                const ids = queryDto.teacherIds.map(id => parseInt(id.trim()));
                whereClauses.push('lt.teacher_id IN (?)');
                replacements.push(ids);
            }

            // Смотрю, получил 1 или два значения
            if (queryDto.studentsCount !== undefined) {
                if(queryDto.studentsCount.length === 1) {
                    whereClauses.push('(SELECT COUNT(*) FROM lesson_students ls WHERE ls.lesson_id = l.id AND ls.visit = true) = ?');
                    replacements.push(parseInt(queryDto.studentsCount[0]));
                } else {
                    whereClauses.push('(SELECT COUNT(*) FROM lesson_students ls WHERE ls.lesson_id = l.id AND ls.visit = true) BETWEEN ? AND ?');
                    replacements.push(parseInt(queryDto.studentsCount[0]), parseInt(queryDto.studentsCount[1]));
                }
            }

            // Собираем в норм вид получившиеся фильтры
            let whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
            whereClause += ' ORDER BY l.id'

            // Пагинация
            const limit = Number(queryDto.lessonsPerPage);
            const offset = (queryDto.page - 1) * limit;

            // Понимаю что это не ОРМ, когда дойду до личной беседы с тимлидом то я смогу ему пояснить ход этой работы)
            const sql = `
                SELECT l.id, l.date, l.title, l.status,
                    (SELECT COUNT(*) FROM lesson_students ls WHERE ls.lesson_id = l.id AND ls.visit = true) AS visitCount,
                    s.id AS student_id,
                    s.name AS student_name,
                    t.id AS teacher_id,
                    t.name AS teacher_name
                FROM (
                    SELECT DISTINCT l.id
                    FROM lessons l
                    ${whereClause} 
                    LIMIT ? OFFSET ?
                ) AS LimitedLessons
                JOIN lessons l ON LimitedLessons.id = l.id
                LEFT JOIN lesson_students ls ON l.id = ls.lesson_id
                LEFT JOIN students s ON ls.student_id = s.id
                LEFT JOIN lesson_teachers lt ON l.id = lt.lesson_id
                LEFT JOIN teachers t ON lt.teacher_id = t.id
                ORDER BY l.id;
            `;

        replacements.push(limit, offset);

        const [results] = await sequelize.query(sql, {
            replacements,
            type: QueryTypes.RAW,
            plain: false
        });

        // Внизу некрасиво но эффективно группирую переформирую результат сырого запроса
        const formattedLessons = results.reduce((acc: any, lesson: any) => {
            // Ищем существующий урок в массиве
            let existingLesson = acc.find((l: any) => l.id === lesson.id);
        
            // Если урока еще нет, создаем его и добавляем в массив
            if (!existingLesson) {
                existingLesson = {
                    id: lesson.id,
                    date: lesson.date,
                    title: lesson.title,
                    status: lesson.status,
                    visitCount: lesson.visitCount,
                    students: [],
                    teachers: []
                };
                acc.push(existingLesson);
            }
        
            // Добавляем студента, если его еще нет в списке студентов
            if (lesson.student_id && !existingLesson.students.find((s: any) => s.id === lesson.student_id)) {
                existingLesson.students.push({
                    id: lesson.student_id,
                    name: lesson.student_name,
                    visit: true
                });
            }
        
            // Добавляем учителя, если его еще нет в списке учителей
            if (lesson.teacher_id && !existingLesson.teachers.find((t: any) => t.id === lesson.teacher_id)) {
                existingLesson.teachers.push({
                    id: lesson.teacher_id,
                    name: lesson.teacher_name
                });
            }
        
            return acc;
        
        }, []);
        

        return formattedLessons

        } catch (e) {
            console.error("Error:", e);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}
