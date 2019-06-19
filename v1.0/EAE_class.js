/*
 * @Author: xia_wenxing, mx-code@foxmail.com 
 * @Date: 2019-06-18 14:09:22 
 * @Last Modified time: 2019-06-18 14:09:22 
 */

// "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM%~!@#$^&*()-=_+[]{};',./<>?\\| "

class EAE {
  constructor (args) {
    this.options = {};
    args && this.init(args);
  }
  encrypt (args) {
    const { options } = this;

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

  decrypt (args) {
    const { options } = this;
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

  init (args) {
    if (!args || typeof args !== 'object' || !args.key) {
      console.warn('Non-standard parameters');
      return false;
    }
    this.options = args;
    const { decrypt, encrypt } = this;
    return {
      decrypt,
      encrypt
    };
  }
}
export default EAE;
