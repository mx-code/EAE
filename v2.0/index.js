import webRSA from './webRSA';
const rsa = new webRSA();
const encryptVal = rsa.encrypt('我在工作987zaq');
console.log(encryptVal);
const decryptVal = rsa.decrypt(encryptVal);
console.log(decryptVal);
