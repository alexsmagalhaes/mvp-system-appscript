const AuthGuard = {
  verify(req, res, next) {
    const { token } = req.body;

    if (!token) {
      return ErrorHandler.send(404, "Token não enviado!");
    }

    try {
      const session = TokenService.verifyJWT(token, JWT_SECRET);

      if (!session || session.expiresAt <= Date.now()) {
        return ErrorHandler.send(401, "Não autorizado");
      }

      const user = UserModel.findById(session.id);
      if (!user) {
        return ErrorHandler.send(401, "Usuário não encontrado!");
      }

      next();
    } catch (err) {
      ErrorHandler.send(400, "Erro ao verificar autenticação");
    }
  },
};
