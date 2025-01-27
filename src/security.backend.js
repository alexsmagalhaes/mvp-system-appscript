function generateJWT(payload, secret, options = {}) {
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };
  
    const iat = Math.floor(Date.now() / 1000);
  
    payload.iat = iat;
    if (options.expiresIn) {
      payload.exp = iat + options.expiresIn;
    }
  
    const base64Header = Utilities.base64EncodeWebSafe(JSON.stringify(header));
    const base64Payload = Utilities.base64EncodeWebSafe(JSON.stringify(payload));
  
    const toSign = `${base64Header}.${base64Payload}`;
  
    const signature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, toSign, secret);
    const base64Signature = Utilities.base64EncodeWebSafe(signature);
  
    const token = `${toSign}.${base64Signature}`
  
    Logger.log('Token gerado: ' + token);
  
    return token;
  }
  
  function verifyJWT(token, secret) {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token JWT inválido');
    }
  
    const [base64Header, base64Payload, base64Signature] = parts;
  
    const toSign = `${base64Header}.${base64Payload}`;
    const expectedSignature = Utilities.computeHmacSignature(Utilities.MacAlgorithm.HMAC_SHA_256, toSign, secret);
    const expectedBase64Signature = Utilities.base64EncodeWebSafe(expectedSignature);
  
    if (base64Signature !== expectedBase64Signature) {
      throw new Error('Assinatura inválida');
    }
  
    const payload = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(base64Payload)).getDataAsString());
  
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      throw new Error('Token expirado');
    }
  
    Logger.log(`Token JWT valido! Payload: ${JSON.stringify(payload)}`)
  
    return payload;
  }