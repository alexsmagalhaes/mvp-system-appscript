const Validate = {
  json(req, res, next) {
    if (!req.body) {
      return ErrorHandler.send(404, "Informações não repassadas!");
    }

    try {
      req.body = JSON.parse(req.body);
    } catch (err) {
      return ErrorHandler.send(400, "JSON inválido!");
    }

    return next();
  },
};
