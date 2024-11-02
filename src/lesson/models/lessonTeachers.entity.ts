import { DataTypes, Model } from "sequelize";
import sequelizeConnection from '../../database/index';

class lessonTeachers extends Model {
    public lesson_id!: number;
    public name!: number;
}

lessonTeachers.init({
    lesson_id: {
        type: DataTypes.INTEGER,
    },
    teacher_id: {
        type: DataTypes.INTEGER,
    }
},
{
    sequelize: sequelizeConnection,
    modelName: 'lessonTeachers',
    tableName: 'lesson_teachers',
    timestamps: false,
})

export default lessonTeachers