
describe('Routes: Sign Up', () => {
  describe('POST /api/v1/auth/signup', () => {
    describe('status 201', () => {
      it('Returns minor information about the newly registered user when the details are correct.', (done) => {
        request.post('/api/v1/auth/signup')
          .send({
            lastName: 'Dhoni',
            firstName: 'Jameson',
            email: 'moneyman@qmail.com',
            password: 'JanEdhOni_@#1993',
            confirmPassword: 'JanEdhOni_@#1993',
            sex: 'male',
            dateOfBirth: '7/9/1993',
            phoneNumber: 8063297845,
          })
          .expect(201)
          .end((err, res) => {
            const expectedResult = {
              status: 201,
              data: {
                token: '45erkjherht45495783',
                id: 1,
                firstName: 'Jameson',
                lastName: 'Dhoni',
                email: 'moneyman@qmail.com',
              },
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });
    });

    describe('status 401', () => {
      it('Throws an error when the user\'s password is too weak.', (done) => {
        request.post('/api/v1/auth/signup')
          .send({
            lastName: 'Dhoni',
            firstName: 'Jane',
            email: 'jhoni@qmail.com',
            password: 'password',
            confirmPassword: 'password',
            sex: 'female',
            dateOfBirth: '7/9/1993',
            phoneNumber: 8063297845,
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'The password is too weak. \r\n The password is too weak.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws an error when the passwords are not equal.', (done) => {
        request.post('/api/v1/auth/signup')
          .send({
            lastName: 'Dhoni',
            firstName: 'Janet',
            email: 'joni@qmail.com',
            password: 'JanEdhOni_@#1993__hoo',
            confirmPassword: 'JanEdhOni_@#1993',
            sex: 'female',
            dateOfBirth: '7/9/1993',
            phoneNumber: 8063297845,
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'The passwords are not equal.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws an error when the user is less than 16 years old.', (done) => {
        request.post('/api/v1/auth/signup')
          .send({
            lastName: 'Dhoni',
            firstName: 'James',
            email: 'jamedolla@qmail.com',
            password: 'JanEdhOni_@#1993',
            confirmPassword: 'JanEdhOni_@#1993',
            sex: 'male',
            dateOfBirth: '7/9/2012',
            phoneNumber: 8063297845,
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'The year must be at most 2003.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws an error when the user\'s sex is invalid.', (done) => {
        request.post('/api/v1/auth/signup')
          .send({
            lastName: 'Dhoni',
            firstName: 'Jack',
            email: 'jackymoney@qmail.com',
            password: 'JanEdhOni_@#1993',
            confirmPassword: 'JanEdhOni_@#1993',
            sex: 'chicken',
            dateOfBirth: '7/9/1993',
            phoneNumber: 8063297845,
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'chicken is not a valid sex.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });
    });
  });
});
