const randomKeyGenerator = require('crypto');


const secretKey = randomKeyGenerator.randomBytes(32).toString('hex');

console.log('Сгенерированный секретный ключ:', secretKey); 