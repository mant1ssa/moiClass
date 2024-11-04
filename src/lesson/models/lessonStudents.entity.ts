import { DataTypes, Model } from "sequelize";
import sequelize from '../../database/index';
import Lesson from "./lesson.entity";
import Student from "./student.entity";

class LessonStudents extends Model {
    public lesson_id!: number;
    public name!: number;
}

LessonStudents.init({
    lesson_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Lesson,
            key: 'id'
        }
    },
    student_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Student,
            key: 'id'
        }
    },
    visit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
{
    sequelize: sequelize,
    modelName: 'LessonStudents',
    tableName: 'lesson_students',
    timestamps: false,
})

// LessonStudents.belongsTo(Student, { foreignKey: 'student_id' });
// LessonStudents.belongsTo(Lesson, { foreignKey: 'lesson_id' });

export default LessonStudents