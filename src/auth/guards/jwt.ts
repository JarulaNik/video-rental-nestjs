const randomKeyGenerator = require('crypto');

// Генерация секретного ключа 
const secretKey = randomKeyGenerator.randomBytes(32).toString('hex');

console.log('Сгенерированный секретный ключ:', secretKey); 