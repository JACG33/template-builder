# Template Builder

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