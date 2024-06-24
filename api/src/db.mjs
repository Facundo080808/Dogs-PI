import DogModel from './models/Dog.mjs';
import TempModel from './models/Temperaments.mjs';
import dotenv from "dotenv"
//require('dotenv').config();
import { Sequelize} from 'sequelize';
//import fs from 'fs';
//import path from 'path';
dotenv.config();
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

DogModel(sequelize );
TempModel(sequelize);
const { dogs,temperaments } = sequelize.models;


dogs.belongsToMany(temperaments,{through:"dogs_temperaments"});
temperaments.belongsToMany(dogs,{through:"dogs_temperaments"});
export default {
  ...sequelize.models,
  conn: sequelize,      
};






































//const basename = path.basename(__filename);

//const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
/////////////////////////////////////////////////////
//fs.readdirSync(path.join(__dirname, '/models'))
//  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//  .forEach((file) => {
//    modelDefiners.push(require(path.join(__dirname, '/models', file)));
//  });
///////////////////////////////////////////////////
// Injectamos la conexion (sequelize) a todos los modelos
/////////////////////////////////////////////////
//modelDefiners.forEach(model => model(sequelize));
//////////////////////////////////////////////////
// Capitalizamos los nombres de los modelos ie: product => Product
//////////////////////////////////////////////////
//let entries = Object.entries(sequelize.models);
//let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
//sequelize.models = Object.fromEntries(capsEntries);
//////////////////////////////////////////////////////
// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

























/*
///require('dotenv').config();
import dotenv from "dotenv"
import { Sequelize } from "sequelize";
//const { Sequelize } = require('sequelize');
import fs from "fs"
//const fs = require('fs');
import path from "path";
//const path = require('path');
dotenv.config();
const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Dog } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

export default {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
*/