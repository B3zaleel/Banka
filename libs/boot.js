
module.exports = (bankaAPI) => {

  if (bankaAPI.get('env') !== 'test') {
    bankaAPI.listen(bankaAPI.get('port'), () => {
      console.log(`banka API has started at localhost:${bankaAPI.get('port')}`);
    });
  } else {
    bankaAPI.listen(bankaAPI.get('testPort'), () => {
      console.log(`banka API has started at localhost:${bankaAPI.get('testPort')}`);
    });
  }
};
