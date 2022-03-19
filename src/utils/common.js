export function formDataFormat(data) {
  const format = (obj, keys = []) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const formName = [...keys, key].map((k, i) => (i ? `[${k}]` : k)).join('');
      if (value instanceof Blob) {
        if (value instanceof File) {
          formData.append(formName, value, value.name);
        } else {
          formData.append(formName, value);
        }
      } else if (typeof value === 'object' && value !== null) {
        const obj = value[key];
        format(obj, [...keys, key]);
      } else if (value !== undefined) {
        formData.append(formName, String(value));
      }
    });
  };
  const formData = new FormData();
  format(data);
  return formData;
}

export function formUrlEncodedFormat(data) {
  const queryParams = new URLSearchParams();
  for (const key in data) {
    const value = data[key];
    if (Array.isArray(value)) {
      value.forEach((v) => queryParams.append(key, v));
    } else if (typeof value === 'object') {
      queryParams.append(key, JSON.stringify(value));
    } else {
      queryParams.append(key, String(value));
    }
  }
  return queryParams;
}

export function cloneJson(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function isDarkMode() {
  const mediaQuery = matchMedia('(prefers-color-scheme: dark)');
  return mediaQuery.matches;
}

export function isClass(value) {
  return Object.prototype.toString.call(value) === '[object Function]' && typeof value === 'function' && 'constructor' in value;
}

export function isArrayEmpty(value) {
  return Array.isArray(value) && JSON.stringify(value.filter(Boolean)) === '[]';
}

export function isObjectEmpty(value) {
  return typeof value === 'object' && value !== null && value.constructor === Object && JSON.stringify(value) === '{}';
}

export function isBlobEmpty(value) {
  return value instanceof Blob && (value.size === 0 || value.type === '');
}

export function isStringEmpty(value) {
  return typeof value === 'string' && /^\s*$/.test(value);
}

export function isNumberEmpty(value) {
  return typeof value === 'number' && isNaN(value);
}

export function isEmpty(value) {
  switch (true) {
    case value === undefined:
      return true;
    case isNumberEmpty(value):
      return true;
    case isStringEmpty(value):
      return true;
    case isArrayEmpty(value):
      return true;
    case isObjectEmpty(value):
      return true;
    case isBlobEmpty(value):
      return true;
    default:
      return false;
  }
}

export function isTextIncludes(data, text) {
  for (let index = 0; index < data.length; index++) {
    const value = data[index];
    if (value instanceof RegExp) {
      if (value.test(text))
        return true;
    } else {
      const reg = new RegExp(String(value));
      if (reg.test(text))
        return true;
    }
  }
  return false;
}

export function isTextExcludes(data, text) {
  for (let index = 0; index < data.length; index++) {
    const value = data[index];
    if (value instanceof RegExp) {
      if (value.test(text))
        return false;
    } else {
      const reg = new RegExp(String(value));
      if (reg.test(text))
        return false;
    }
  }
  return true;
}

class FileName {
  constructor(name) {
    this.data = [];
    const last = name.lastIndexOf('.')
    this.ext = last >= 0 ? name.substring(last) : ''
    this.name = name.replace(this.ext, '')
    let index = this.data.push(this.name[0])
    for (let i = 1; i < this.name.length; i++) {
      const str = this.name[i]
      switch (true) {
        case /\.|-|_|\s/.test(str):
          i++
          index = this.data.push(this.name[i])
          break
        case /[A-Z]/.test(str):
          index = this.data.push(str)
          break
        default:
          this.data[index - 1] += str
      }
    }
  }
  transformUpperHump() {
    return this.data.filter(s => s).map((s) => s[0].toUpperCase() + s.substring(1)).join('');
  }
  transformLowerHump() {
    return this.data.filter(s => s).map((s, i) => {
      if (i === 0) {
        return s[0].toLowerCase() + s.substring(1);
      }
      return s[0].toUpperCase() + s.substring(1);
    }).join('');
  }
  transformKebabCase() {
    return this.data.join('-');
  }
  transformSnakeCase() {
    return this.data.join('_');
  }
}

export function createFileName(value) {
  return new FileName(value)
}

export const defineTypeClone = (c) => JSON.parse(JSON.stringify(c))