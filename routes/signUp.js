
module.exports = (bankaAPI) => {
  const models = bankaAPI.get('models');
  const [users] = [models.users];

  bankaAPI.post('/api/v1/auth/signup', (req, res) => {
    const [lastName, firstName,
      email, password, confirmPassword,
      sex,
      phoneNumber,
    ] = [
      req.body.lastName, req.body.firstName,
      req.body.email, req.body.password, req.body.confirmPassword,
      req.body.sex,
      req.body.phoneNumber,
    ];
    const dobParts = req.body.dateOfBirth.split(/[/-]/);
    const dateOfBirth = new Date(`${dobParts[1]}/${dobParts[0]}/${dobParts[2]}`);

    if (users.hasEmail(email) === false) {
      const userDetails = {
        firstName,
        lastName,
        email,
        dateOfBirth,
        sex,
        phoneNumber,
        password,
        confirmPassword,
      };
      // validate user details.
      const validationResult = users.validateUser(userDetails);
      if (validationResult.valid) {
        const newUser = {
          token: '45erkjherht45495783',
          id: users.count,
          email,
          firstName,
          lastName,
          password,
          type: 'client',
          isAdmin: false,
          sex,
          dateOfBirth,
          phoneNumber,
        };
        users.add(newUser);
        const successResult = {
          status: 201,
          data: {
            token: newUser.token,
            id: newUser.id,
            firstName,
            lastName,
            email,
          },
        };
        res.status(201).json(successResult);
      } else {
        const errorResult = {
          status: 401,
          error: validationResult.reason,
        };
        res.status(401).json(errorResult);
      }
    } else {
      const errorResult = {
        status: 401,
        error: 'The given email is already being used.',
      };
      res.status(401).json(errorResult);
    }
  });
};
