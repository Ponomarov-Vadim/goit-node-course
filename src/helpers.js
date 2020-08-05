const makeCall = async (req, res, func) => {
  try {
    const data = req.method === "GET" ? req.query : req.body;
    data.params = req.params;

    const result = await func(data, { mongoDb: req.mongoDb });
    const { status, ...request } = result;
    res.status(status).send(request);
  } catch (err) {
    console.log(err);
    const { status = 500, message = "Bad request" } = err;
    res.status(status);
    res.send(message);
  }
};

const isEqual = (a, b) => a === b;

const throwErr = (status, message) => {
  throw { status, message };
};

module.exports = { makeCall, isEqual, throwErr };
