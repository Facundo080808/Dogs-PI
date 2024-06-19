/* eslint-disable import/no-extraneous-dependencies */
import { expect } from 'chai';
import session from 'supertest-session';
import app from '../../src/app.mjs';
import { Dog, conn } from '../../src/db.mjs';

const agent = session(app);
const dog = {
  name: 'Pug',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });
});
