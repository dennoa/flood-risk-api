module.exports = (res, promise) => {
  return promise
    .then(json => (!!json) ? res.status(200).json(json) : res.status(204).send())
    .catch(errors => (typeof errors === 'string') ? res.status(500).send({ error: errors }) : res.status(400).json(errors));
};