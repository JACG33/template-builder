# Template Builder

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