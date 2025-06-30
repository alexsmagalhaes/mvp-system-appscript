const UserController = {
  login(req, res) {
    if (!req.body || typeof req.body !== "object") {
      return ErrorHandler.send(400, "Preencha todos os campos");
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return ErrorHandler.send(400, "Preencha todos os campos");
    }

    const users = UserModel.getAll();

    const user = users.find(
      (row) => row.email === email && row.password === password
    );

    // ele gera erro se usar somente numeros na senha
    if (!user) {
      return ErrorHandler.send(400, "Credenciais inválidas");
    }

    const { id, name, role } = user;

    const expiresIn = 3600 * 1000 * TOKEN_EXPIRATION_HOURS;
    const expiresAt = expiresIn + Date.now();

    const userSession = {
      id,
      name,
      email,
      role,
      timestamp: Date.now(),
      expiresAt,
    };

    const token = TokenService.generateJWT(userSession, JWT_SECRET, {
      expiresIn,
    });

    const updatedUser = UserModel.update(id, {
      "access-token": token,
      "expires-at": expiresAt,
    });

    if (!updatedUser) {
      return ErrorHandler.send(400, "Erro ao atualizar usuário com o token");
    }

    return {
      status: 200,
      data: {
        id,
        role,
        name,
        email,
        token,
      },
      success: ["Logado com sucesso!"],
    };
  },

  logout(req, res) {
    if (!req.body || typeof req.body !== "object") {
      return ErrorHandler.send(400, "Preencha todos os campos");
    }

    const { token } = req.body;
    if (!token) return ErrorHandler.send(400, "Preencha todos os campos");

    const { id } = TokenService.verifyJWT(token, JWT_SECRET);
    if (!id) ErrorHandler.send(400, "Token invalido!");

    const user = UserModel.findById(id);
    if (user["access-token"] !== token)
      return ErrorHandler.send(400, "Logout já realizado!");

    UserModel.update(id, {
      "access-token": "",
      "expires-at": "",
    });

    return {
      status: 200,
      data: {
        id,
        timestamp: Date.now(),
      },
      success: ["Logout bem sucedido!"],
    };
  },

  getSession(req, res) {
    return req.session;
  },
};
