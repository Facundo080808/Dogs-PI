//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- 
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//const server = require('./src/app.mjs');
import server from "./src/app.mjs"
import { temperamentsToDB } from "./src/handlers/temperaments.handler.mjs";
//const { conn } = require('./src/db.js');
import con from "./src/db.mjs"
// Syncing all the models at once.
const {conn} = con;
conn.sync({ force: true }).then(() => {
  server.listen(4321, () => {
    (temperamentsToDB)()
    console.log("temperaments succes");
    console.log('http://localhost:4321/'); // eslint-disable-line no-console
  });
});
