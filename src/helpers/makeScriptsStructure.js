/**
 * Funcion para crear la estructura de los scripts.
 * @param {Object} opc Objecto de parametros. 
 * @param {Object} opc.script Objecto de listeners. 
 * @returns String de los scripts
 */
export const makeScriptsStructureGrouped = ({ script }) => {
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

/**
 * Funcion para crear la estructura de los scripts.
 * @param {Object} opc Objecto de parametros. 
 * @param {string} opc.type Tipo de Evento. 
 * @param {string} opc.login Logica del Evento. 
 * @returns String con la logica del Evento
 */
export const makeScriptsStructure = ({ type, logic }) => {

  let scriptText = ``;

  if (type == "click") {
    scriptText += `
      document.addEventListener("click", e => {
        const { target } = e

        ${logic}

      })`;
  }

  return scriptText;
}