
describe('Routes: Create Bank Account', () => {
  before((done) => {
    const models = app.get('models');
    const [users] = [models.users];
    const testUser = {
      id: 10,
      firstName: 'Josephine',
      lastName: 'Pierce',
      email: 'jpierce@qmail.com',
      sex: 'female',
      dateOfBirth: '7/3/1975',
      phoneNumber: 8066697845,
      password: 'JosEphInePieRce_@##2350',
      type: 'client',
      isAdmin: false,
    };
    users.add(testUser);
    done();
  });

  describe('Post /api/v1/user/:userId/accounts', () => {
    describe('status 401', () => {
      it('Throws an error when the client id does not exist', (done) => {
        request.post('/api/v1/user/89/accounts')
          .send({
            state: 'Lagos',
            branch: '27 Qanter Lane, Kasoa',
            type: 'current',
            idType: 'International Passport',
            idNumber: 8732467213,
            idExpiryDate: '16/07/2022',
            openingBalance: 35000.00,
            address1: '17 Qanter Lane, Kasoa, Lagos',
            address2: '5 Rosemary Drive, Adenta, Lagos',
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'A client with the id, 89, does not exist.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws an error when the account type is invalid', (done) => {
        request.post('/api/v1/user/10/accounts')
          .send({
            state: 'Lagos',
            branch: '27 Qanter Lane, Kasoa',
            type: 'stadia',
            idType: 'International Passport',
            idNumber: 8732467213,
            idExpiryDate: '16/07/2022',
            openingBalance: 35000.00,
            address1: '17 Qanter Lane, Kasoa, Lagos',
            address2: '5 Rosemary Drive, Adenta, Lagos',
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'stadia is not a valid account type.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws an error when the user\'s external validation id is below the minimum expiry date', (done) => {
        request.post('/api/v1/user/10/accounts')
          .send({
            state: 'Lagos',
            branch: '27 Qanter Lane, Kasoa',
            type: 'current',
            idType: 'International Passport',
            idNumber: 8732467213,
            idExpiryDate: '13/05/2019',
            openingBalance: 35000.00,
            address1: '17 Qanter Lane, Kasoa, Lagos',
            address2: '5 Rosemary Drive, Adenta, Lagos',
          })
          .expect(401)
          .end((err, res) => {
            const minYear = new Date().getFullYear() + 1;
            const expectedResult = {
              status: 401,
              error: `The year must be at least ${minYear}.`,
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws an error when the user\'s opening balance is below the minimum required', (done) => {
        request.post('/api/v1/user/10/accounts')
          .send({
            state: 'Lagos',
            branch: '27 Qanter Lane, Kasoa',
            type: 'current',
            idType: 'International Passport',
            idNumber: 8732467213,
            idExpiryDate: '16/07/2022',
            openingBalance: 30.00,
            address1: '17 Qanter Lane, Kasoa, Lagos',
            address2: '5 Rosemary Drive, Adenta, Lagos',
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: '30 is below the minimum opening balance.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });
    });

    describe('status 201', () => {
      it('Returns information about the account when the prerequisites have been met', (done) => {
        request.post('/api/v1/user/10/accounts')
          .send({
            state: 'Lagos',
            branch: '27 Qanter Lane, Kasoa',
            type: 'current',
            idType: 'International Passport',
            idNumber: 8732467213,
            idExpiryDate: '16/07/2022',
            openingBalance: 35000.00,
            address1: '17 Qanter Lane, Kasoa, Lagos',
            address2: '5 Rosemary Drive, Adenta, Lagos',
          })
          .expect(201)
          .end((err, res) => {
            const expectedResult = {
              status: 201,
              data: {
                firstName: 'Josephine',
                lastName: 'Pierce',
                email: 'jpierce@qmail.com',
                type: 'current',
                openingBalance: 35000.00,
                status: 'draft',
              },
            };
            expect(typeof res.body.data.accountNumber).to.eql('number');
            expect(res.body.data.firstName).to.eql(expectedResult.data.firstName);
            expect(res.body.data.lastName).to.eql(expectedResult.data.lastName);
            expect(res.body.data.email).to.eql(expectedResult.data.email);
            expect(res.body.data.type).to.eql(expectedResult.data.type);
            expect(res.body.data.openingBalance).to.eql(expectedResult.data.openingBalance);
            expect(res.body.data.status).to.eql(expectedResult.data.status);
            done(err);
          });
      });
    });
  });
});
