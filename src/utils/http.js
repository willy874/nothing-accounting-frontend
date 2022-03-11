function httpInterfaces(method, url, options) {
  return fetch(url, options)
}

httpInterfaces.get = function (url, options) {}

httpInterfaces.post = function (url, options) {}

httpInterfaces.put = function (url, options) {}

httpInterfaces.patch = function (url, options) {}

httpInterfaces.delete = function (url, options) {}

export const http = httpInterfaces