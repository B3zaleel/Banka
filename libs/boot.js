
module.exports = (bankaAPI) => {

  if (bankaAPI.get('env') !== 'test') {
    const port = process.env.PORT || bankaAPI.get('defaultPort');
    bankaAPI.listen(port, () => {
      console.log(`Banka API has started listening at port:${port}`);
    });
  } else {
    const port = process.env.PORT || bankaAPI.get('testPort');
    bankaAPI.listen(port, () => {
      console.log(`Banka API has started listening at port:${port}`);
    });
  }
};
