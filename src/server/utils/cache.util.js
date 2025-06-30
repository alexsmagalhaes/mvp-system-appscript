const CacheManager = {
  store(userId, key, value, expirationInHours = TOKEN_EXPIRATION_HOURS) {
    const cache = CacheService.getScriptCache();
    const expirationInSeconds = expirationInHours * 3600;
    const userKey = `${userId}_${key}`;

    if (typeof value === "object") {
      value = JSON.stringify(value);
    }

    cache.put(userKey, value, expirationInSeconds);
    Logger.log(
      `Valor armazenado no cache para o usuário "${userId}" com a chave "${key}" por ${expirationInHours} horas.`
    );
  },

  retrieve(userId, key) {
    const cache = CacheService.getScriptCache();
    const userKey = `${userId}_${key}`;
    let value = cache.get(userKey);

    if (value && (value.startsWith("{") || value.startsWith("["))) {
      try {
        value = JSON.parse(value);
      } catch (e) {
        Logger.log("Erro ao converter valor JSON do cache.");
      }
    }

    if (value) {
      Logger.log(
        `Valor recuperado do cache para o usuário "${userId}" com a chave "${key}": ${JSON.stringify(
          value
        )}`
      );
    } else {
      Logger.log(
        `Valor não encontrado no cache para o usuário "${userId}" com a chave "${key}"`
      );
    }

    return value;
  },

  delete(userId, key) {
    const cache = CacheService.getScriptCache();
    const userKey = `${userId}_${key}`;
    cache.remove(userKey);
    Logger.log(
      `Valor com a chave "${key}" removido do cache para o usuário "${userId}"!`
    );
  },
};
