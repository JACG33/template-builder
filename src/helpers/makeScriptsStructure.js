/**
 * Funcion para crear la estructura de los scripts.
 * @param {Object} opc Objecto de parametros. 
 * @param {Object} opc.script Objecto de listeners. 
 * @returns String de los scripts
 */
export const makeScriptsStructure = ({ script }) => {
  const keysTytpes = Object.keys(script);

  let scriptText = ``;

  keysTytpes.forEach((keyTytpe) => {
    if (keyTytpe == "click") {
      scriptText += `
      document.addEventListener("click", e => {
        const { target } = e
      `;
      let componentScriptsKeys = Object.keys(script[keyTytpe]);
      componentScriptsKeys.forEach((componentScriptsKey) => {
        scriptText += `${script[keyTytpe][componentScriptsKey]["click"]}`;
      });

      scriptText += `
      })
    `;
    }
  });

  return scriptText;
}