/**
 * Funcion generadora de ID
 * @returns random id
 */
export const ramdomid = () => {

  const lettersUpper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  const lettersLower = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  let paramsToGenerate = []
  // paramsToGenerate.push(lettersUpper)
  // paramsToGenerate.push(lettersLower)
  paramsToGenerate.push(numbers)

  let passwordString = ""


  for (let i = 0; i < 8; i++) {
    // Rango de acuerdo al lenght del paramsToGenerate
    const randSelector = Math.ceil(Math.random() * paramsToGenerate.length - 1)

    // Seleccionar un index del paramsToGenerate
    const selectedParam = paramsToGenerate[randSelector]

    // Seleccionar un index del array obtenido anteriormente selectedParam
    const randSelector2 = Math.ceil(Math.random() * selectedParam.length - 1)

    // Seleccion un index del array con el randnumer obtenido anteriormente randSelector2
    const selectedParam2 = selectedParam[randSelector2]

    passwordString += `${selectedParam2}`
  }

  return passwordString

}