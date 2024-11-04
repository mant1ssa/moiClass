import { DataTypes, Model } from "sequelize";
import sequelize from '../../database/index';
import Lesson from "./lesson.entity";
import LessonTeachers from "./lessonTeachers.entity";

class Teacher extends Model {
    public id!: number;
    public name!: string;
}

Teacher.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Teacher',
    tableName: 'teachers',
    timestamps: false,
});


export default Teacher;
