import request from 'supertest-as-promised';
import API from '../api';

const app = new API().express;

describe('Blueprint API', () => {
  describe('GET /api/v1/blueprints - get all blueprints', () => {
    // properties expected on an obj in the response
    let expectedProps = [
      'name',
      'id',
      'createdAt',
      'lastUpdated',
      "permission",
      'owner',
      'content'
    ];
    it('should return JSON array', () => {
      return request(app).get('/api/v1/blueprints')
      .expect(200)
      .then(res => {
        // check that it sends back an array
        expect(res.body).toBeInstanceOf(Array);
      });
    });
    it('should return objs w/ correct props', () => {
      return request(app).get('/api/v1/blueprints')
      .expect(200)
      .then(res => {
        // check for the expected properties
        let sampleKeys = Object.keys(res.body[0]);
        expectedProps.forEach((key) => {
          expect(sampleKeys.includes(key)).toBe(true);
        });
      });
    });
    it('shouldn\'t return objs w/ extra props', () => {
      return request(app).get('/api/v1/blueprints')
      .expect(200)
      .then(res => {
        // check for only expected properties
        let extraProps = Object.keys(res.body[0]).filter((key) => {
          return !expectedProps.includes(key);
        });
        expect(extraProps.length).toBe(0);
      });
    });
  });
});

describe('GET /api/v1/blueprints/:id - get blueprint by id', () => {
  it('should return an obj of type Produce', () => {
    return request(app).get('/api/v1/blueprints/1')
    .expect(200)
    .then((res) => {
      let reqKeys = [
        'name',
        'id',
        'createdAt',
        'lastUpdated',
        "permission",
        'owner',
        'content'
      ];
      const {item} = res.body;
      // check it has correct keys
      reqKeys.forEach((key) => {
        expect(Object.keys(item)).toContain(key);
      });
      // check type of each field
      expect(typeof item.id).toBe('number');
      expect(typeof item.name).toBe('string');
    });
  });
  it('should 404 on a request for a nonexistant id', () => {
    return Promise.all([
      request(app).get('/api/v1/blueprints/-32')
      .expect(404),
      request(app).get('/api/v1/blueprints/99999')
      .expect(404)
    ]);
  });
});

describe('POST /api/v1/blueprints - create new item', () => {
  let blueprint = {
    name: 'Test Blueprint',
    content: "{\"key\":1,\"key2\":\"val\"}",
  };
  it('should accept and add a valid new item', () => {
    return request(app).post('/api/v1/blueprints')
    .send(peach)
    .then((blueprint) => {
      expect(res.body.status).toBe(200);
      return request(app).get('/api/v1/blueprints');
    })
    .then((res) => {
      let newBlueprints = res.body.find(blueprint => blueprint.name === 'Test Blueprint');
      expect(res.status).toBe(200);
    });
  });
});
