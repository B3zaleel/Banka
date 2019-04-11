
module.exports = (bankaAPI) => {
  bankaAPI.get('/api/v1/', (req, res) => {
    const msgData = {
      status: 200,
      message: 'Hello and welcome to the Banka API.',
    };
    res.status(200).json(msgData);
  });
};