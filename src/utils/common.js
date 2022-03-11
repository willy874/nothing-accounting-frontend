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
  if (value === undefined)
    return true;
  if (value === null)
    return true;
  if (isNumberEmpty(value))
    return true;
  if (isStringEmpty(value))
    return true;
  if (isArrayEmpty(value))
    return true;
  if (isObjectEmpty(value))
    return true;
  if (isBlobEmpty(value))
    return true;
  return false;
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