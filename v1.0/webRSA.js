/*
 * @Author: xia_wenxing, mx-code@foxmail.com 
 * @Date: 2019-06-18 13:42:32 
 * @Last Modified time: 2019-06-18 13:42:32 
 */

let options = {};
// "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM%~!*()-_'.";

/**
 * 加密
 *
 * @param  args: string/object/array
 * @returns string
 */
function encrypt (args) {
  if (!options.key) {
    console.warn('init error');
    return false;
  }

  const value = JSON.stringify({ value: args }),
    str = encodeURIComponent(value);

  const arr = str.split(''),
    result = [];

  arr.forEach((item) => {
    const index = options.key.indexOf(item),
      a = Number.parseInt(index / 9),
      b = index % 9;

    result.push(
      ...[
        a,
        b
      ]
    );
  });
  return result.join('');
}

/**
 * 解密
 *
 * @param  args string
 * @returns
 */
function decrypt (args) {
  if (!options.key) {
    console.warn('init error');
    return false;
  }

  const arr = [];
  let index = 0,
    reg = '';
  do {
    reg = args.substr(index, 2);

    if (index > 10000 || !reg) {
      break;
    }
    arr.push(reg);
    index += 2;
  } while (reg);

  const result = [];
  arr.forEach((item) => {
    const fIdx = +item.substr(0, 1),
      sIdx = +item.substr(1, 1);

    result.push(options.key[fIdx * 9 + sIdx]);
  });

  let params = JSON.parse(decodeURIComponent(result.join('')));

  return params.value;
}

/**
 * 初始化
 *
 * @param {*} args
 * key*: string
 * @returns
 */
function init (args) {
  if (!args || typeof args !== 'object' || !args.key) {
    console.warn('Non-standard parameters');
    return false;
  }

  options = args;

  return {
    encrypt,
    decrypt
  };
}

export default init;
export { encrypt, decrypt, init };
