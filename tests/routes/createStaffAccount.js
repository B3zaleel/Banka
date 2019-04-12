
describe('Routes: Create Staff Account', () => {
  before((done) => {
    const models = app.get('models');
    const [users] = [models.users];
    const testAdmin = {
      id: 12,
      firstName: 'Antonella',
      lastName: 'Moreno',
      email: 'a_moreno@qmail.com',
      sex: 'female',
      dateOfBirth: '7/9/1981',
      phoneNumber: 8063297845,
      password: 'aNtOmOrEnO_@##2019',
      type: 'staff',
      isAdmin: true,
    };
    users.add(testAdmin);
    done();
  });

  describe('Post /api/v1/admin/:adminId/createAccount', () => {
    describe('status 401', () => {
      it('Throws an error when the admin id is invalid', (done) => {
        request.post('/api/v1/admin/80/createAccount')
          .send({
            email: 'lilyrose_1987@qmail.com',
            firstName: 'Lily',
            lastName: 'Rose',
            password: 'LiLyRoSe@19.87:3.2',
            confirmPassword: 'LiLyRoSe@19.87:3.2',
            isAdmin: false,
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'An admin with the id, 80, does not exist.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws an error when the password is too weak', (done) => {
        request.post('/api/v1/admin/12/createAccount')
          .send({
            email: 'lilyrose_1987@qmail.com',
            firstName: 'Lily',
            lastName: 'Rose',
            password: 'password',
            confirmPassword: 'LiLyRoSe@19.87:3.2',
            isAdmin: false,
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'The password is too weak.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws an error when the passwords are not equal', (done) => {
        request.post('/api/v1/admin/12/createAccount')
          .send({
            email: 'lilyrose_1987@qmail.com',
            firstName: 'Lily',
            lastName: 'Rose',
            password: 'LiLyRoSe@19.87:3.2',
            confirmPassword: 'SiLLyRoSe@19.87:3.2',
            isAdmin: false,
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
    });

    describe('status 200', () => {
      it('Returns minor user information when the given details are valid.', (done) => {
        request.post('/api/v1/admin/12/createAccount')
          .send({
            email: 'lilyrose_1987@qmail.com',
            firstName: 'Lily',
            lastName: 'Rose',
            password: 'LiLyRoSe@19.87:3.2',
            confirmPassword: 'LiLyRoSe@19.87:3.2',
            isAdmin: false,
          })
          .expect(200)
          .end((err, res) => {
            const expectedResult = {
              status: 200,
              data: {
                token: '45erkjherht45495783',
                firstName: 'Lily',
                lastName: 'Rose',
                email: 'lilyrose_1987@qmail.com',
              },
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });
    });
  });
});
