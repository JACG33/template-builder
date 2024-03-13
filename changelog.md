# Template Builder

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