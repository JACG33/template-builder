/**
 * Funcion para tranformar texto de camelCase a lowercase y separar con guion medio (-).
 * @param {String} text Texto a transformar.
 * @example borderRadius => border-radius.
 * @returns Texto transformado
 */
export const joinAndLower = (text) =>
  text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .join("-")
    .toLocaleLowerCase();
