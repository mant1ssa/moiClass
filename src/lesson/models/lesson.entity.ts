import { DataTypes, Model } from "sequelize";
import sequelize from '../../database/index';
import LessonStudents from "./lessonStudents.entity";
// import Teacher from "./teacher.entity";
// import LessonTeachers from "./lessonTeachers.entity";
// import Student from "./student.entity";
// import LessonStudents from "./lessonStudents.entity";

class Lesson extends Model {
    public id!: number;
    public date!: Date;
    public title!: string;
    public status!: number;
}

Lesson.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    }
}, {
    sequelize: sequelize,
    modelName: 'Lesson',
    tableName: 'lessons',
    timestamps: false,
});

// Lesson.hasMany(LessonStudents, { foreignKey: 'lesson_id' });

export default Lesson;