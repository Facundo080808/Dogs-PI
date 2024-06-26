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
            unique: true,
            allowNull:false
        }
    },{timestamps: false})
}