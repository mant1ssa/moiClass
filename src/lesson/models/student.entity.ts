import { DataTypes, Model } from "sequelize";
import sequelize from '../../database/index';
import LessonStudents from "./lessonStudents.entity";
// import Lesson from "./lesson.entity";
// import LessonStudents from "./lessonStudents.entity";

class Student extends Model {
    public id!: number;
    public name!: string;
}

Student.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    sequelize: sequelize,
    modelName: 'Student',
    tableName: 'students',
    timestamps: false,
})

// Student.hasMany(LessonStudents, { foreignKey: 'student_id' });

export default Student