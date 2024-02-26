// eslint-disable-next-line node/no-unpublished-require
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
};

describe('Videogame routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      throw new Error('Unable to connect to the database:', err);
    }),
  );
  beforeEach(() => Dog.sync({ force: true }).then(() => Dog.create(dog)));
  describe('GET /dogs', () => {
    it('should get 200', () => agent.get('/dogs').expect(200));
  });
});
