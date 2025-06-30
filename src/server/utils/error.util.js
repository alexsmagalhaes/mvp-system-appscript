const ErrorHandler = {
  send(status, errorMessage, payload) {
    const error = {
      status: Number.parseInt(status),
      errors: [errorMessage],
    };

    if (payload) {
      Object.assign(error, payload);
    }

    throw JSON.stringify(error);
  },
};
