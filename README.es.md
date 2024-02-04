# Spine Viewer

Spine Viewer es una aplicación web que te permite visualizar y reproducir sprites creados con Spine, una herramienta de animación 2D. Esta aplicación está desarrollada con React y Vite, y utiliza librerías como [PixiJS](https://github.com/pixijs/pixijs), [Pixi-Spine](https://github.com/pixijs/spine), [TailwindCSS](https://tailwindcss.com/) y [NextUI](https://nextui.org/docs/guide/introduction).

_Lea esto en otros idiomas: [English](README.md)._

## Características

- Carga y muestra archivos de sprites en formato .skel
- Controla las animaciones y modifica valores basicos
- Cambia el fondo de la ventana de visualización
- Soporta assets de Spine de la versión 3.8
- Compatible con la mayoría de los navegadores web modernos

## Prerrequisitos

Antes de poder ejecutar este proyecto, debes tener instalado Node.js en tu máquina. Este proyecto ha sido probado y desarrollado con Node.js versión v18.17.1, por lo que recomendamos usar al menos esa versión para evitar posibles problemas de compatibilidad.

Puedes descargar Node.js desde [el sitio web oficial de Node.js](https://nodejs.org/).

Para verificar la versión de Node.js que tienes instalada, puedes usar el siguiente comando en tu terminal:

```bash
node --version
```

## Instalación

Para instalar y ejecutar la aplicación en tu máquina local, sigue estos pasos:

- Clona este repositorio con el comando `git clone https://github.com/FrankoFPM/Spine-Viewer-Web.git`
- Entra en la carpeta del proyecto con el comando `cd Spine-Viewer-Web`
- Instala las dependencias con el comando `npm install`
- Inicia el servidor de desarrollo con el comando `npm run dev`
- Abre tu navegador y accede a la dirección `http://localhost:####`

## Uso

Para usar la aplicación, necesitas tener archivos de sprites en formato .skel, que son los que genera Spine al exportar las animaciones. Puedes obtener estos archivos de diferentes fuentes, como juegos, tutoriales o recursos gratuitos.

Para cargar un archivo de Spine, haz clic en el botón "Upload asset" y selecciona los archivos del Spine que quieras ver, luego en el botón "GO". La aplicación mostrará el spine en la ventana de visualización, y podrás controlar la animación con los controles laterales. También puedes cambiar el fondo del reproductor con el botón "Background", podras escoger un color o tu propia imagen.

Este proyecto tiene como objetivo la visualización de sprites. En particular, se centra en los sprites del juego [Azur Lane](https://azurlane.yo-star.com/#/) belong to [Yostar](https://yostar.store/), propiedad de Yostar. Cada usuario tiene la opción de proporcionar sus propios recursos si así lo desea. Esta aplicación no tiene fines comerciales y pretende ser una herramienta de visualización y aprendizaje.

> [!NOTE]
> Se deben seleccionar los 3 archivos del spine, deben tener el mismo nombre
> Las extenciones para los 3 archivos deben ser `.atlas`, `.skel` y `.png`

> [!IMPORTANT]
> Esta aplicación es un proyecto independiente y no oficial, que no tiene ninguna relación ni afiliación con [Yostar](https://yostar.store/), la empresa propietaria del juego Azur Lane.
> Todos los derechos de autor y marcas registradas de [Azur Lane](https://azurlane.yo-star.com/#/) belong to [Yostar](https://yostar.store/) pertenecen a [Yostar](https://yostar.store/) y sus respectivos creadores. Esta aplicación solo usa algunos nombres de personajes del juego con fines didácticos y de tributo, sin intención de violar los derechos de autor ni de obtener beneficios económicos.

## Contribución

Si te gusta esta aplicación y quieres contribuir a su desarrollo o mejora, puedes hacerlo de las siguientes formas:

- Reportar errores o sugerir nuevas funcionalidades a través de las issues de GitHub
- Enviar pull requests con tus propios cambios o mejoras al código
- Compartir la aplicación con otros usuarios que puedan estar interesados

- Para obtener más información sobre cómo obtener los assets, consulta la [Guía de Assets](contributing.es.md)

## Licencia

Esta aplicación está licenciada bajo la [GNU General Public License (GPL)](LICENSE), lo que significa que puedes usarla, modificarla y distribuirla libremente, siempre que cualquier trabajo derivado también esté licenciado bajo la GPL y des crédito al autor.
