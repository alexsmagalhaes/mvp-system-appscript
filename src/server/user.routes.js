const useLogin = async (data) => {
  let req = { body: data };

  return await Runner.exec(Validate.json, UserController.login)(req);
};

const useLogout = async (data) => {
  let req = { body: data };

  return await Runner.exec(Validate.json, UserController.logout)(req);
};

const useGetSession = async (data) => {
  let req = { body: data };

  return await Runner.exec(
    Validate.json,
    AuthGuard.verify,
    UserController.getSession
  )(req);
};
