const makeCall = async (req, res, func) => {
  try {
    const data = req.method === "GET" ? req.query : req.body;
    const ctx = {
      mongoDb: req.mongoDb,
    };

    data.params = req.params || {};

    data.file = req.file || {};

    const result = await func(data, ctx);

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
