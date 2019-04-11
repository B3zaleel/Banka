
module.exports = (bankaAPI) => {
  const models = bankaAPI.get('models');
  const [users] = [models.users];

  bankaAPI.post('/api/v1/auth/signin', (req, res) => {
    const [email, password] = [
      req.body.email, req.body.password,
    ];

    if (users.hasEmail(email)) {
      const passwordCorrect = users.hasCorrectPassword(email, password);
      if (passwordCorrect) {
        const userData = users.getUserData(email, password);
        const successResult = {
          status: 200,
          data: {
            token: '45erkjherht45495783',
            id: userData.id,
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
          },
        };
        res.status(200).json(successResult);
      } else {
        const errorResult = {
          status: 401,
          error: 'Incorrect password.',
        };
        res.status(401).json(errorResult);
      }
    } else {
      const errorResult = {
        status: 401,
        error: 'The given account does not exist.',
      };
      res.status(401).json(errorResult);
    }
  });
};
