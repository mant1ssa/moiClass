import { DataTypes, Model } from "sequelize";
import sequelize from '../../database/index';
import Lesson from "./lesson.entity";
import Teacher from "./teacher.entity";

class LessonTeachers extends Model {
    public lesson_id!: number;
    public teacher_id!: number;
}

LessonTeachers.init({
    lesson_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Lesson,
            key: 'id',
        },
        primaryKey: true,
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Teacher,
            key: 'id',
        },
        primaryKey: true,
    }
}, {
    sequelize: sequelize,
    modelName: 'LessonTeachers',
    tableName: 'lesson_teachers',
    timestamps: false,
});

export default LessonTeachers;
