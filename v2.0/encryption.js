/*
 * v2.0
 * @Author: xia_wenxing, 90111 
 * @Date: 2019-06-19 15:55:49 
 * @Last Modified time: 2019-06-19 15:55:49 
 */

// "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM%~!*()-_'."

// 字母 数字 ( ) . ! ~ * ' - _ 是必需的

// function getRandom (args = '') {
//   let val = args.split('').sort((item) => (Math.random() * 10 - 5 > 0 ? 1 : -1));
//   const result = [];
//   val.forEach((item) => {
//     const code = item.charCodeAt();
//     result.push(code < 100 ? '0' + code : code);
//   });
//   return result.join('');
// }

// en: 总字符长度 72
// 最大值: 126
// 最小值: 33
// 3个数字代表一个字符
const sourceStr =
  '049046121098099120042122081102101040073117041085072037087050119116110088100057084095109115097113111033108054104080118103048055052112051105106107114053056068078066090126070069089075086045071039074083079082065077067076';

let options = {
  key: sourceStr,
  len: 9
};

function toArr (args, len = 3) {
  const arr = [];
  let str = '',
    index = 0;
  do {
    str = args.substr(index, len);
    if (!str) {
      break;
    }
    arr.push(str);
    index += len;
  } while (str);

  return arr;
}

class EAE {
  constructor (args) {
    args && this.init(args);
  }
  // 加密
  encrypt = (args) => {
    const { key } = options;
    if (!key) {
      return false;
    }

    const matchArr = toArr(key, 3),
      params = encodeURIComponent(Date.now() + JSON.stringify({ val: args })); // Date.now() 长度: 13

    const result = [];

    params.split('').forEach((item) => {
      const code = item.charCodeAt(),
        index = matchArr.findIndex((insideItem) => +insideItem === code);

      const first = Number.parseInt(index / options.len),
        second = index % options.len;

      result.push(`${first}${second}`);
    });

    return result.join('');
  };

  decrypt = (args) => {
    const { key } = options;
    if (!key) {
      return false;
    }
    if (!args) {
      return args;
    }

    const matchArr = toArr(key, 3),
      sourceArr = toArr(args, 2),
      collectArr = [];

    sourceArr.forEach((item) => {
      const first = item.substr(0, 1),
        second = item.substr(1, 1),
        getCurrent = matchArr[+first * options.len + +second];

      collectArr.push(String.fromCharCode(+getCurrent));
    });
    const str = decodeURIComponent(collectArr.join('')),
      obj = JSON.parse(str.replace(/.{13}/, '')); // str.substr(13,str.length)
    return obj.val;
  };

  init = (args = {}) => {
    const { len } = args;
    args.len = [
      8,
      9
    ].includes(len)
      ? len
      : 9;
    options = args;

    const { encrypt, decrypt } = this;
    return {
      encrypt,
      decrypt
    };
  };
}

export default EAE;
