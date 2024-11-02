import { DataTypes, Model } from "sequelize";
import sequelizeConnection from '../../database/index';

class lessonStudents extends Model {
    public lesson_id!: number;
    public name!: number;
}

lessonStudents.init({
    lesson_id: {
        type: DataTypes.INTEGER,
    },
    student_id: {
        type: DataTypes.INTEGER,
    },
    visit: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},
{
    sequelize: sequelizeConnection,
    modelName: 'lessonStudents',
    tableName: 'lesson_students',
    timestamps: false,
})

export default lessonStudents