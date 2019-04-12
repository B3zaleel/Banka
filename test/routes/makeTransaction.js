
describe('Routes: Make Transaction', () => {
  const initDetails = {
    cashierId: 0,
    accountNumber0: 7777777777,
    accountNumber1: 7777777777,
  };
  before((done) => {
    const models = app.get('models');
    const [users, accounts] = [models.users, models.accounts];
    const testClient = {
      id: users.count,
      firstName: 'Marcos',
      lastName: 'Herrera',
      email: 'marcera@qmail.com',
      password: 'MarC|HerRerA_@#1997',
      type: 'client',
      isAdmin: false,
      isLoggedIn: false,
    };
    const testCashier = {
      id: users.count,
      firstName: 'Mary',
      lastName: 'Susaeta',
      email: 'maeta@qmail.com',
      password: 'Mary|SusAetA_@#1997',
      type: 'staff',
      isAdmin: false,
      isLoggedIn: false,
    };

    const testAccount0 = {
      id: accounts.count(),
      accountNumber: 8963257411,
      createdOn: new Date(),
      owner: testClient.id,
      type: 'savings',
      status: 'active',
      balance: 20000.00,
    };
    accounts.add(testAccount0);
    const testAccount1 = {
      id: accounts.count(),
      accountNumber: 1478963255,
      createdOn: new Date(),
      owner: testClient.id,
      type: 'savings',
      status: 'dormant',
      balance: 20000.00,
    };
    accounts.add(testAccount1);
    users.add(testClient);
    users.add(testCashier);
    initDetails.cashierId = testCashier.id;
    initDetails.accountNumber0 = testAccount0.accountNumber;
    initDetails.accountNumber1 = testAccount1.accountNumber;
    done();
  });

  describe('Post /api/v1/transactions/:accountNumber/:transactionType', () => {
    describe('status 401', () => {
      it('Throws an error when the account number does not exist.', (done) => {
        request.post(`/api/v1/cashier/${initDetails.cashierId}/transactions/8000074110/debit`)
          .send({
            amount: 5000.00,
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'An account with the account number, 8000074110, does not exist.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws an error when the transaction type is wrong.', (done) => {
        request.post(`/api/v1/cashier/${initDetails.cashierId}/transactions/${initDetails.accountNumber0}/chicken`)
          .send({
            amount: 5000.00,
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'chicken is not a valid transaction type.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws an error when the funds are insufficient.', (done) => {
        request.post(`/api/v1/cashier/${initDetails.cashierId}/transactions/${initDetails.accountNumber0}/debit`)
          .send({
            amount: 50000,
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'Inadequate funds.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });

      it('Throws an error when the account is inactive.', (done) => {
        request.post(`/api/v1/cashier/${initDetails.cashierId}/transactions/${initDetails.accountNumber1}/debit`)
          .send({
            amount: 5000,
          })
          .expect(401)
          .end((err, res) => {
            const expectedResult = {
              status: 401,
              error: 'This account cannot perform any transactions at the moment since it is inactive.',
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });
    });

    describe('status 200', () => {
      it('Shows the major transaction information when the transaction details are correct.', (done) => {
        request.post(`/api/v1/cashier/${initDetails.cashierId}/transactions/${initDetails.accountNumber0}/debit`)
          .send({
            amount: 5000.00,
          })
          .expect(200)
          .end((err, res) => {
            const expectedResult = {
              status: 200,
              data: {
                transactionId: 0,
                accountNumber: initDetails.accountNumber0,
                amount: 5000.00,
                cashier: initDetails.cashierId,
                transactionType: 'debit',
                accountBalance: '15000',
              },
            };
            expect(res.body).to.eql(expectedResult);
            done(err);
          });
      });
    });
  });
});
