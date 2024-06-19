//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
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

import server from './src/app.mjs';
//import { conn } from './src/db.mjs';
import  con  from './src/db.mjs';
import { temperamentsToDB } from './src/handlers/temperaments.handler.mjs';

const {conn} = con

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3123, () => {
    (temperamentsToDB)()
    console.log("temperaments succes");
    console.log('server listening at http://localhost:3123/'); // eslint-disable-line no-console
  });
});
