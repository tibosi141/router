import Cookies from 'js-cookie'

const TokenKey = "Admin-Token"

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token: string) {
  return Cookies.set(TokenKey, token, { expires: 7 })
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getCookie (key: string) {
  return Cookies.get(key)
}

export function setCookie (key: string, value: string) {
  return Cookies.set(key, value, { expires: 7 })
}