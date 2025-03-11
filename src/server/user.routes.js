const useLogin = async (data) => {
  let req = { body: data };

  return await Runner.exec(Validate.json, UserController.login)(req);
};

const useLogout = async (data) => {
  if (!data) return ErrorHandler.send(404, "Informações não repassadas!");

  let req = data;

  try {
    req = JSON.parse(data);
  } catch (err) {
    return ErrorHandler.send(404, "JSON inválido!");
  }

  return await Runner.exec(UserController.logout)(req);
};