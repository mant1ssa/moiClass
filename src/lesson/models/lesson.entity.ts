import { DataTypes, Model } from "sequelize";
import sequelizeConnection from '../../database/index';
import Teacher from "./teacher.entity";
import lessonTeachers from "./lessonTeachers.entity";
import Student from "./student.entity";
import lessonStudents from "./lessonStudents.entity";

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
},
{
    sequelize: sequelizeConnection,
    modelName: 'Lesson',
    tableName: 'lessons',
    timestamps: false,
})

Lesson.belongsToMany(Teacher, { through: lessonTeachers, foreignKey: 'lesson_id' });
Lesson.belongsToMany(Student, { through: lessonStudents, foreignKey: 'lesson_id' });

export default Lesson