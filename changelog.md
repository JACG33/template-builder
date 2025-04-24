# Template Builder

## Version 0.0.21 24-ABR-2025
+ Se corrigio el problema de que al cargar el componente NavBar UI mas de una ves la UI desaparecia, con ayuda de __AI__ puede mejorar la funcionalidad, aunque el resultado ocacionó que los __scripts__ del componente esten separados en diferentes etiquetas __script__.
+ Se añadio una nueva funcion en el __helpers__ __makeScriptsStructure__.

## Version 0.0.205 24-MAR-2025
+ Correcciones.

## Version 0.0.20 21-MAR-2025
+ Migracion a la version 19 de React.
+ Migracion a la version 4 de TailwindCss.
+ Correcion de estilos css.

## Version 0.0.18 22-ENE-2025
+ Regresamos nuevamente a __TailwindCss__, en su momento quite la dependencia de esta libreria ya que generaba conflictos con los estilos de la plantilla que se esta haciendo, pero ahora las plantillas se hacen dentro de un __iframe__ por lo que los estilos de __TailwindCss__ no enterfieren con la plantilla.
+ Se eliminaron algunos componentes y se modificaron otros.

## Version 0.0.172 14-AGO-2024
+ Se cambio los estilos de un componente para mejorar la experiencia visual.

## Version 0.0.170 13-AGO-2024
+ Se cambio de ubicacion los comoponentes de layouts a la carpeta components/wrapper-components, ya que este no era un layout.
+ Se agrego un nuevo estado al Contex de DragDrop para evaluar cuando se esta haciendo drag de un componente, esto es para renderizar dos casos si este estado es true se renderiza un div con el componente y 3 divs internos que indican en que lugar se colocara el componente con el que se esta haciendo draggin, de lo contrario solo se renderiza el componente, en la version anterior el funcionamieto era como el true del estado, pero lo cambio ya que al exportar el __HTML__ lo hace con todos estos indicadores, ahora el __HTML__ estara un poco más limpio.
+ Se hicieron otras modificaciones.

## Version 0.0.156 09-AGO-2024
+ Se cambio de ubicacion los componentes templatesui a items-to-render-in-builder-area.
+ Se cambio de ubicacion los componentes addcomponent, sidebarelementsitems a sidebar-elegible-items.
+ Se corrigio un bug del editor de texto añadido en la version 0.0.155.
+ Se hicieron otras modificaciones.

## Version 0.0.155 09-AGO-2024
+ Se cambio de ubicacion los stylizers a la carpeta components.
+ Ahora se puede editar el texto de los componentes.
+ Posiblemente en la siguiente version se haga un cambio/restructuraion del proyecto, ya que la funcionalidades agragadas hasta ahora han hecho que sea un poco más complejo la forma en la que se incorpora el codigo.
+ Se hicieron otras modificaciones.

## Version 0.0.145 02-AGO-2024
+ Se corrigio un bug en los __scripts__ de los componentes prediseñados que algunos no funcionaban correctamente.
+ Ya no es enecesario cargar las clases css de los componentes prediseñados.
+ Se hicieron otras modificaciones.

## Version 0.0.140 05-JUN-2024
+ Ahora los scripts de los __components UI__ se deben separa por __eventListener__ con el objetivo de no tener multiples delegaciones de eventos, pero actualmente no funciona del todo bien ya que al importar un componente mas de una vez solo se ejecutan las acciones para el primer componente.
+ Se añadio una nueva funcionalidad al __BuilderArea__ para implementar la nueva funcionalidad de los __scripts__.
+ Ahora los __components UI__ no tendran un randomid, se cambio por un dataId que en el __contex DragDropProvider__ se cambiara por un randomid, ya que al cargar todos componetes el randomid no es dinamico se mantiene con el id generado al cargar el componente.
+ Se añadio un nuevo __stylizer__ y se modificaron otros.
+ Se hicieron otras modificaciones.

## Version 0.0.137 03-JUN-2024
+ Ahora se pueden añadir nuevos selectores.
+ Se añadio un nuevo __stylizer__ y se modificaron otros.
+ Se añadio un nuevo icono al index de la carpeta __svg__.
+ Ahora por defecto se cargan todas las clases css de un componente, quizas deba regresar a como estaba antes del cambio.
+ Se movio a un archivo la funcionalidad __cleanText__, a la carpeta __helpers__ con el nombre __cleanLettersOfText.js__.
+ Se hicieron otras modificaciones.

## Version 0.0.135 03-JUN-2024
+ Se añadio una nueva funcionalidad, ahora se puede elegir entre los diferentes selectores css de un componente.
+ Se modificaron los componentes de la carpeta __templatesui__ para ajustarse a la nueva funcionalidad.
+ Se migro la funcionalidad el __Contex BreackPoint__ al __Contex EditorProvider__.
+ Se hicieron otras modificaciones.

## Version 0.0.130 30-MAY-2024
+ Se modifico el __SideBarElementsRendered__ para representar mejor los componentes y sus sub componentes (solo de nivel 1).
+ Se ajusto el __DragDropProvider__ para mejorar el drag and drop considerando los nuevos __ComponentsUI__.
+ Se hicieron otras modificaciones.

## Version 0.0.127 28-MAY-2024
+ Se agregaron nuevos __stylizers__.
+ Se hicieron otras modificaciones.

## Version 0.0.125 28-MAY-2024
+ Se corrigio la funcionalidad __JavaScript__ para la __UI__ prediseñada, ya no muestra error de redeclaracion de variables.
+ Se hicieron otras modificaciones.

## Version 0.0.122 27-MAY-2024
+ Se han agregado mas funcionalidades para la implementacion de __UI__ prediseñadas.
+ Se agrego un botton __previewmode__ para esta en un modo de previsulizacion pero aun no funciona del todo bien, el objetivo es cancelar la actulizacion de estados evintando el re-renderizado del __BuilderArea__.
+ Se añdio funcionalida __JavaScript__ para la __UI__ prediseñada, pero no funciona del todo bien, antes de crear el portal para rendirizar en el __iframe__ se elimina la etiqueta script y se crea una nuvea y se añade al portal, pero quizas se guarda en memoria la declaracion previa de algunas variables y en la consola de muestra un erro al intentar redeclarar las variables.
+ Se hicieron otras modificaciones.

## Version 0.0.120 24-MAY-2024
+ Se Modifico en __Contex DragDropProvider__ ahora el organizar los elementos es mas dinamico, y se corrigieron bugs al ordenar elementos.
+ Se quitaron/remplazaron paramatros de los componentes de la carpeta templateui para ajustarse a la nueva funcionalidad del drag and drop, no se comento en la version anterior pero estocambios tambien se aplicarion en el BuilderArea.
+ Se extrajeron los estilos base/placeholder de los componentes de la carpeta templateui y se colocaron en el archivo __baseStyles.js__ para reutilizarlos en otros componentes.
+ Se estan agreagando componentes prediseñados, hasta ahora solo esta disponible un NavBar.
  + Los estilos y componentes se ordenan en un __JSON__ con la siguiente descripcion:

  ```js
  // Estos seran los estilos del ParentElement.
  const placeholderUi = {
    ...VerticalNavStyles,
    display: "flex",
    gap: "10px",
    alignItems: "center",
    justifyContent: "space-evenly",
  }
  // Estos seran los SubElements.
  // Cada Objeto tendra un name que hace referencia al nombre del Componente JSX.
  // type describre el tipo de elemento a renderizar.
  // styles son los estilos que tendra el SubElement, estos "instancias" unos estilos base.
  // subs seran los SubElements de uno de estos SubElements.
  const subElements = [
    {
      name: "Button",
      type: "button",
      styles:{...ButtonStyles}
    },
    {
      name: "Button",
      type: "button",
      styles:{...ButtonStyles}
    },
    {
      name: "Div",
      type: "div",
      styles: {
        ...DivStyles,
        display: "flex",
        gap: "10px",
        alignItems: "center"
      },
      subs: [
        {
          name: "Button",
          type: "button",
          styles:{...ButtonStyles}
        },
        {
          name: "Button",
          type: "button",
          styles:{...ButtonStyles}
        },
      ]
    },
  ]

  ```
+ Se hicieron otras modificaciones.

## Version 0.0.117 22-MAY-2024
+ Se hicieron otras modificaciones.

## Version 0.0.116 21-MAY-2024
+ Se reestructuran diferentes componentes y contextos para implementar, __UI__ prediseñadas.
+ Se hicieron otras modificaciones.

## Version 0.0.115 20-MAY-2024
+ Se modifico el __Contex DragDropProvider__ para mejorar la funcionalidad al cambiar de lugar ParententComponents y SubComponents.
+ Se hicieron otras modificaciones.

## Version 0.0.110 19-MAY-2024
+ Correccion de bug al exportar la plantilla.
+ Se hicieron otras modificaciones.

## Version 0.0.110 19-MAY-2024
+ Se agrego nueva dependencia __dnd kit__, con el fin de delegar la funcionalidad del __drag and drop__, ya que las implementaciones de forma __vanilla__ no estaban funcionando nuy bien.
+ Se modifico el __Componente BaseElement__ para adapatarlo a la nueva dependencia.
+ Se modifico el __Componente MoldeElement__ para adapatarlo a la nueva dependencia.
+ Se modifico el __Contex DragDropProvider__ para adapatarlo a la nueva dependencia.
+ Se hicieron otras modificaciones.

## Version 0.0.105 13-MAY-2024
+ Nueva Funcionalidad agreaga al editor de estilos, ahora en la nueva seccion __Styles Of Component__ se pueden eliminar los estilos del componente.
+ Ahora se puede eliminar el background y el color del texto.
+ Se hicieron otras modificaciones.

## Version 0.0.103 09-MAY-2024
+ Remplazo de la dependencia __React Syntax Highlighter__ por __Highlight.js__, para misminuir el peso del componente DialogExpor al realizar build.
+ Se hicieron otras modificaciones.

## Version 0.0.102 09-MAY-2024
+ Correcion de bugs generados en la version __0.0.100 08-MAY-2024__.
+ Se hicieron otras modificaciones.

## Version 0.0.100 08-MAY-2024
+ Ahora la seleccion __Media Query__ o __BreackPoint__ funciona al cambiar los estilos, al exportar se muestran los estilos y las mediaquerys correspondientes al breackpoint actual.
+ Se moficicaron los componentes de la carpeta __templatesui__ se les agrego un nuevo parametro para identificar la jerarquia del componente.
+ Ahora no es necesario presionar la tecla __ctrl__ para cambiar de lugar los componentes.
+ Ahora en la seccion __Rendered Components__ del componente __SideBarElementsRendered__, al hacer hover sobre un item se resalta el componente del __BuilderArea__, para saber que elemento se va a modificar, en una siguiente version se mejorara esta funcion.
+ Se hicieron otras modificaciones.

## Version 0.0.98 25-ABR-2024
+ Se cambio el comoponente __BuilderArea.jsx__ se añadio un __\<iframe>__ para poder interactuar con los breackpoints.
+ Se hicieron otras modificaciones.

## Version 0.0.95 23-ABR-2024
+ Se modifico el selector de breackpoint
+ Se hicieron otras modificaciones.

## Version 0.0.95 18-ABR-2024
+ Se agrego la opcion de breackpoint/mediaquery (sin funcionalidad significativa).
+ Se hicieron otras modificaciones.

## Version 0.0.91 17-ABR-2024
+ Migrando algunos estilos a vailla.
+ Se hicieron otras modificaciones.

## Version 0.0.90 08-ABR-2024
+ Se quito la libreria __TailwindCss__ para utilizar estilos css __vanilla__, la razon es porque __TailwindCss__ tiene unos formateadores css, que al exportar el codigo de la platilla generada, el aspecto no es el mismo que el de la plantilla, por ejemplo el __border__ de los __buttons__ __TailwindCss__ los quita, pero al exportar estos aparecen.
+ Se hicieron otras modificaciones.

## Version 0.0.87 08-ABR-2024
+ Se corrigio un __bug__ que al momento de querer ordenar o cambiar de lugar un componente no se podia con el primer elemento, solo se aplicaba a partir del segundo componente.
+ Se hicieron otras modificaciones.

## Version 0.0.85 07-ABR-2024
+ Ahora los componentes de la carpeta __sidebarelemtensitems__ comparten un componete base para evitar el tener repetir logica que se puede encapsular en un componente i reutilizarlo.
+ Se hicieron otras modificaciones.

## Version 0.0.82 05-ABR-2024
+ Ahora el editor de estilos esta disponible sin la necesidad de seleccionar un componente.
+ Las ventanas/modales de los botones del __sidebar__ izquierdo esta separado en un componente __LeftSideContainer__.
+ Se hicieron otras modificaciones.

## Version 0.0.80 05-ABR-2024
+ Se cambio la __IU__ del layout:
  + Ahora en el __sidebar__ izquierdo mostrara botones que al clicarlos desplegara/mostra modales.
  + El editor de estilos ahora se mostrara en el __sidebar__ derecho, aunque actulamente si no se ha seleccionado un elemento para editar solo esta reservado el espacio, al seleccionar uno se muestra el editor.
  + Se iran migrando los los __svgs__ a un nuevo componente donde estaran todos los __svg__.
+ Se hicieron otras modificaciones.

## Version 0.0.73 05-ABR-2024
+ Se agregaron cambios.

## Version 0.0.72 04-ABR-2024
+ Se agrego nuevo componente Loader para el fallback del Suspence

## Version 0.0.72 04-ABR-2024
+ Se agregaron nuevos "stylizers":
  + Transitions.
  + StateStyle: Sera para elegir el tipo de estado de un componente por ahora solo :hover.
+ Se hicieron otras modificaciones.

## Version 0.0.70 02-ABR-2024
+ Se moficaron algunas __tools__ del editor de estilos.
+ Se agregaron nuevos "stylizers":
  + TextWrap.
  + TextColor.
  + TextAlign.
  + Border.
  + FontSize.
  + SideOptions.
+ Se agrego la funcionalidad __copiar__ al boton del modal exportar.
+ Se hicieron otras modificaciones.

## Version 0.0.65 28-MAR-2024
+ Se moficaron algunas __tools__ del editor de estilos:
  + El Width y el Height ahora pueden establecer un valor automatico.
  + El Margin puede establecer un valor automatico.
  + Nuevo componente __WrapperDropDow.jsx__ para encapsular/agrupar algunos componentes por tipo.
  + Los componenetes __SpacingComponent.jsx__ y __SizeComponent.jsx__ se les ha cambiado la logica/programacion interna.
  + Posiblemente surjan futuros cambios para el componeter __EditorTools.jsx__ en general de acuerdo a nuevas funciones.
+ Se hicieron otras modificaciones.

## Version 0.0.60 27-MAR-2024
+ Se agredo una nueva depevendencia __react-syntax-highlighter__ para resaltado de codigo, para el nuevo componente de "exportar" el template hecho.
+ Se cambio la forma de identificar los estilos del/los componentes de numeros a clases css, ahora se insertan los estilos dentro de un etiqueta __\<style>__ lo que servira al momento de querer exportar el __Html__, __CSS__ y __JavaScrip__ (proximamente).
+ La configuracion o estructura actual quizas cambie en el/los siguientes cambios.
+ Se hicieron otras modificaciones.

## Version 0.0.50 22-MAR-2024
+ Se cambiarion algunos componentes de la seccion __EditorTools.jsx__, algunas de la modificaciones permiten elgir el tipo medidad, asi como cambiar las medidas del top, right, bottom y left de algunos componentes.
+ Se hicieron otras modificaciones.

## Version 0.0.45 21-MAR-2024
+ Se "mejoró" la funcionalidad de ordernar/cambiar de lugar los componentes que estan en el __Builder Area__ u otro componente.
+ Se cambiaron algunos __useState()__ por __useRef()__
+ Se hicieron otras modificaciones.

## Version 0.0.38 15-MAR-2024
+ Se agrego las funcionalidad de ordernar/cambiar de lugar los componentes que estan en el __Builder Area__.
+ Se agregaron nuevos ajustes de estilos css:
  + Witdh.
  + Height.
  + Display.
+ Se agrego funcionalidad al __sidebar__ derecho al seleccionar cualquiera de lo componentes se despliegan/muestran las opciones de edicion de estilos css.
+ Se hicieron otras modificaciones.

## Version 0.0.32
+ Se agrego una nueva carpeta __sidebarelementsitems__ para organizar los items que se renderizan en el __sidebar__ izquierdo.
+ Se agrego un nuevo componente __SideBarElementsItems.jsx__ para contener los componentes de la nueva carpeta creada y renderizarlos en el __sidebar__ izquierdo.
+ Se hicieron otras modificaciones.

## Version 0.0.30
+ Se corrigio el fallo de los estilos cambiando la logica de __useState()__ a __useref()__.
+ Se agrego una nueva funcionalidad al EditorProvider para eliminar del __useState()__ la configuracion de un componente eliminado.
+ Se hicieron otras modificaciones.

## Version 0.0.25
+ Se agrego la funcionalidad de poder migrar un componente a otro. 
+ Ahora se debe corregir un fallo al renderizar los estilos del componente migrado, que se encuentrar en el __EditorProvide__ ya al realizar cambios algunos de guardan en arreglos y no puden renderizarse correctamente.
+ Se quito el __useState()__ del componente BaseElemente.jsx y se remplazo por un __useref()__.

## Version 0.0.22
+ Se agrego la funcionalidad de poder anidar elementos dentro de otros ya sea desde el sidebar de componentes o del __Builder Area__, aun no tiene soporte para migrar un componente que esta dentro de un componente a otro.
+ Se agrego y modifico funciones del Contexto DragDropProvider.
+ Se hicieron otras modificaciones.

## Version 0.0.2
+ Se agrego un nuevo componente en la carpeta templatesui/BaseElemnt.jsx, con le fin de reducir la duplicidad de codigo y funcion como un wrapper.
+ Se modificarons los componentes de la carpeta templateui para hacer uso del nuevo componete.
+ Se hicieron otras modificaciones.

## Version 0.0.15
+ Se agregaron dos nuevos contextos para controlar mejor la configuracion de la edicion de los elementos, y que elementos se arrastras al area de __build__.
  + DragDropProvider.
  + EditorProvide.
+ Se separo el componete __EditorTools__ en varios componentes:
  + EditorToolsHeader.
  + stylizers (carpeta de componentes).
+ Se agregaron nuevos componentes en la carpeta __templatesui__.
+ Se agrego un archivo de constantes en la carpeta __constants__.
+ Se hicieron otras modificaciones.

## Version 0.0.1
+ Primer commit: Con este proyecto intento desarrollar un creador de plantillas __HTML__ con el fin poder exportarla, las funciones actualmente son casi nulas, solo tiene un "Componente" NavBar, que al arrastrarlo al BuilderArea coloca una etiqueta __\<nav>__ con estilos especificas, al hacer click en el "Componente" se muestra en la izquierda un panel de estilos a modificar por ahora solo se puede editar el padding y eliminar el "Componente". 