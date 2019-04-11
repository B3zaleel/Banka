
describe('Routes: Manage Bank Accounts', () => {
  before((done) => {
    const models = app.get('models');
    const [users, accounts] = [models.users, models.accounts];
    const accountsNum = accounts.count();
    const testAccount = {
      id: accountsNum,
      accountNumber: 1122336699,
      createdOn: new Date(),
      owner: 2,
      type: 'savings',
      status: 'draft',
      balance: 20000.00,
      address1: '17 Queen\'s Cross street, Oshowo, Lagos.',
      address2: '13 Hubble Crescent, Olupeju, Lagos.',
    };
    const testAccount1 = {
      id: accountsNum + 1,
      accountNumber: 1345678901,
      createdOn: new Date(),
      owner: 2,
      type: 'savings',
      status: 'draft',
      balance: 20000.00,
      address1: '17 Queen\'s Cross street, Oshowo, Lagos.',
      address2: '13 Hubble Crescent, Olupeju, Lagos.',
    };
    accounts.add(testAccount);
    accounts.add(testAccount1);
    const testAdmin = {
      id: 15,
      firstName: 'Marco',
      lastName: 'Iniesta',
      email: 'maesta@qmail.com',
      sex: 'male',
      dateOfBirth: '7/9/1983',
      phoneNumber: 8063297845,
      password: 'MaRcOeStA_@##2350',
      type: 'staff',
      isAdmin: true,
    };
    users.add(testAdmin);
    done();
  });

  describe('Patch /api/v1/staff/:staffId/account/:accountNumber', () => {
    describe('status 401', () => {
      it('Throws an error when the admin/staff id does not exist', (done) => {
        request.patch('/api/v1/staff/50/account/1122336699')
          .send({
            status: 'dormant',
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'A staff with the id, 50, does not exist.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws an error when the account number does not exist', (done) => {
        request.patch('/api/v1/staff/15/account/5522336699')
          .send({
            status: 'dormant',
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'The given account, which is 5522336699, does not exist.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws an error when the new status is invalid', (done) => {
        request.patch('/api/v1/staff/15/account/1122336699')
          .send({
            status: 'eating',
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'eating is not a valid status type.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });
    });

    describe('status 200', () => {
      it('Returns the account number and its new status when the admin/staff id and account number are valid', (done) => {
        request.patch('/api/v1/staff/15/account/1122336699')
          .send({
            status: 'active',
          })
          .expect(200)
          .end((err, res) => {
            const expectedResult = {
              status: 200,
              data: {
                accountNumber: 1122336699,
                status: 'active',
              },
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });
    });
  });

  describe('Delete /api/v1/staff/:staffId/accounts/:accountNumber', () => {
    describe('status 401', () => {
      it('Throws error when the admin/staff id does not exist', (done) => {
        request.delete('/api/v1/staff/70/accounts/1122336699')
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'A staff with the id, 70, does not exist.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws error when the account number does not exist', (done) => {
        request.delete('/api/v1/staff/15/accounts/5522336699')
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'The given account number, which is 5522336699, does not exist.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });
    });

    describe('status 204', () => {
      it('Shows the account deleted message when the admin/staff id and account number exist', (done) => {
        request.delete('/api/v1/staff/15/accounts/1345678901')
          .expect(200)
          .end((err, res) => {
            const expectedResult = {
              status: 200,
              message: 'Account successfully deleted.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });
    });
  });
});
