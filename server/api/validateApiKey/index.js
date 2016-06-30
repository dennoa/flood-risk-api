const apiKey = require('../../components/apiKey');

function notAuthorized(res) {
  res.status(401).send();
}

module.exports = (req, res, next)=> {
  return apiKey.validate(req).then(next, ()=> {
    notAuthorized(res);
  });
};