
describe('Routes: Index', () => {
  describe('GET /api/v1/', () => {
    it('Returns the API Welcome message.', (done) => {
      request.get('/api/v1/')
        .expect(200)
        .end((err, res) => {
          const expected = {
            status: 200,
            message: 'Hello and welcome to the Banka API.',
          };
          expect(res.body).to.eql(expected);
          done(err);
        });
    });
  });
});
