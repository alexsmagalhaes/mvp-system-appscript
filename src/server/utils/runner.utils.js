const Runner = {
  exec(...middlewares) {
    return async function (req, res) {
      let index = 0;

      async function next() {
        if (index < middlewares.length) {
          const result = await middlewares[index++](req, res, next);

          if (result !== undefined) {
            return result;
          }

          return next();
        }
      }

      return await next();
    };
  },
};
