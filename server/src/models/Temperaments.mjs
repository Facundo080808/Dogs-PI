import { DataTypes } from 'sequelize';

export default (sequelize)=>{
   return sequelize.define('temperaments' ,{
        id :{
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false
        },
        name :{
            type: DataTypes.STRING,
            allowNull: false
        }
    },{timestamps: false})
}