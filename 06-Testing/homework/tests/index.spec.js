const session = require('supertest-session');
const app = require('../index.js'); // Importo el archivo de entrada del server de express.

const agent = session(app);

describe('Test de APIS', () => {
  describe('GET /', () => {
    it('responds with 200', () => agent.get('/').expect(200));
    it('responds with and object with message `hola`', () =>
        agent.get('/').then((res) => {
          expect(res.body.message).toEqual('hola');
        }));
  });

  describe('GET /test', () => {
    it('responds with 200', () => agent.get('/test').expect(200));
    it('responds with and object with message `test`', () =>
      agent.get('/test').then((res) => {
        expect(res.body.message).toEqual('test');
      }));
  });

  describe('POST /sum', () => {
    it('responds with 200', () => agent.post('/sum').expect(200));
    it('responds with the sum of 2 and 3', () =>
      agent.post('/sum')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(5);
        })
    );
    it('responds with the sum of 7 and 4', () =>
      agent.post('/sum')
        .send({a: 7, b: 4})
        .then((res) => {
          expect(res.body.result).toEqual(11);
        })
    );
  });

  describe('POST /producto', () => {
    it('responds with 200', () => agent.post('/product').expect(200));
    it('responds with the product of 2 and 3', () =>
      agent.post('/product')
        .send({a: 2, b: 3})
        .then((res) => {
          expect(res.body.result).toEqual(6);
        })
    );
  });

  describe('POST /sumArray', () => {
    it('responds with 200', () => agent.post('/sumArray')
    .send({array: [2,5,7,10,11,15,20], num: 13}).expect(200));
    it('responds with true si la suma de los array', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 13})
        .then((res) => {
          expect(res.body.result).toEqual(true);

      }));

      it('responds with false si la suma de los array', () =>
      agent.post('/sumArray')
        .send({array: [2,5,7,10,11,15,20], num: 1})
        .then((res) => {
          expect(res.body.result).toEqual(false);

      }));
  });

  describe('POST /numString ', ()=>{
    it('responder con codigo de estado 200', ()=> agent.post('/numString').send({str : 'hola'}).expect(200));

    it('responder con codigo de estado 200', async () => {
      const res = await agent.post('/numString').send({str : 'hola'});
      expect(res.statusCode).toBe(200);
    });


    it(`Responder con 4 si enviamos 'hola'.`, ()=> 
      agent.post('/numString')
      .send({str : 'hola'})
      .then((res)=> {
        expect(res.body.result).toEqual(4);
      }));
    it('Responder con un status 400 (bad request) si el string es un número.',()=>{
      agent.post('/numString')
      .send({str : 5})
      .then((res)=>{
        expect(res.statusCode).toEqual(400);
      })
    });
    it('Responder con un status 400 (bad request) si el string esta vacio.',()=>{
      agent.post('/numString')
      .send({str: ''})
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      })
    })

  });

  describe('POST /pluck  ', ()=>{ 

    //it('responder con codigo de estado 200', ()=> agent.post('/pluck').send({array : [],key : 's'}).expect(200));

    it('Responder con un status 400 (bad request) si array no es un arreglo.', ()=> agent.post('/pluck').send({array : 'array'}).expect(400));
    it('Responder con un status 400 (bad request) si el string propiedad está vacio.', ()=> agent.post('/pluck').send({key : ''}).expect(400));


    it('Responder con al funcionalidad del pluck.', ()=> 
      agent.post('/pluck')
      .send({
          array :[{name : 'NetTuts', niche : 'Web Development'}, {name : 'WPTuts', niche : 'WordPress'}, {name : 'PSDTuts', niche : 'PhotoShop'}, {name : 'AeTuts', niche : 'After Effects'}],
          key : 'niche'
        })
        .then((res) => {
          expect(res.body.result).toEqual(['Web Development','WordPress','PhotoShop','After Effects']);
        })
      );

    it('Responder con al funcionalidad del pluck.', async () => {
        const res = await agent.post('/pluck')
        .send({
          array :[{name : 'NetTuts', niche : 'Web Development'}, {name : 'WPTuts', niche : 'WordPress'}, {name : 'PSDTuts', niche : 'PhotoShop'}, {name : 'AeTuts', niche : 'After Effects'}],
          key : 'niche'
        });
        expect(res.body.result).toStrictEqual(['Web Development','WordPress','PhotoShop','After Effects']);
      }
      
      );


  });


});

