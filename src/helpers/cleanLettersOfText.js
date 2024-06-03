/**
 * Funcion que quita letras de un texto
 * @param {Object} opc Objeto de opciones. 
 * @param {String} opc.text Texto a limpiar. 
 * @param {Array} opc.letters Array de letrar a eliminar. 
 * @returns Texto limpiado.
 */
export const cleanLettersOfText = ({ text = "", letters = [] }) => {
  let clean = ""
  letters.forEach(letter => { if (text.includes(letter)) clean = text.replaceAll(letter, "") })
  return clean
}