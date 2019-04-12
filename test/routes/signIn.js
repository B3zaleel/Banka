
describe('Routes: Sign In', () => {
  beforeEach((done) => {
    const models = app.get('models');
    const [users] = [models.users];
    const testClient = {
      id: 2,
      firstName: 'Marcus',
      lastName: 'Wood',
      email: 'marcus@qmail.com',
      password: 'MooDymArcUs_@#1997',
      type: 'client',
      isAdmin: false,
      isLoggedIn: false,
    };
    users.add(testClient);
    done();
  });

  describe('POST /api/v1/auth/signin', () => {
    describe('status 200', () => {
      it('Returns minor details about a user when the password and email are correct', (done) => {
        request.post('/api/v1/auth/signin')
          .send({
            email: 'marcus@qmail.com',
            password: 'MooDymArcUs_@#1997',
          })
          .expect(200)
          .end((err, res) => {
            const expectedResult = {
              status: 200,
              data: {
                token: '45erkjherht45495783',
                id: 2,
                firstName: 'Marcus',
                lastName: 'Wood',
                email: 'marcus@qmail.com',
              },
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });
    });

    describe('status 401', () => {
      it('Throws error when the email is not registered or wrong', (done) => {
        request.post('/api/v1/auth/signin')
          .send({
            email: 'maryblake@rocketmail.com',
            password: '12345',
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'The given account does not exist.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws error when the password is wrong', (done) => {
        request.post('/api/v1/auth/signin')
          .send({
            email: 'marcus@qmail.com',
            password: '12345',
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'Incorrect password.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });
    });
  });
});
