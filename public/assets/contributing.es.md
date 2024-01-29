## Assets Chibi

Los archivos chibi empaquetados en Android se pueden encontrar en las siguientes dos ubicaciones:

- Android/obb/com.YoStarEN.AzurLane/main.51006.com.YoStarEN.AzurLane.obb (puedes extraer esto como un archivo zip regular cambiando `.obb` por `.zip o .rar` y buscar el directorio 'char', este archivo contendra toda la informacion de la aplicacion)
- Android/data/com.YoStarEN.AzurLane/files/AssetBundles/char

Para extraer estos archivos, necesitamos usar la herramienta [AssetStudio](https://github.com/Perfare/AssetStudio), que puedes encontrar en su repositorio de GitHub.

Descarga el último archivo zip de la versión, extráelo, ejecuta el .exe y ve a `File > Load folder` y selecciona los directorios 'char'. Aquí queremos extraer tres cosas:

- El tipo Texture2D para el chibi
- El TextAsset .atlas correspondiente al chibi
- El TextAsset .skel correspondiente al chibi

Cada Texture2D debería tener un .atlas y un .skel correspondiente. Por lo tanto, puedes usar `Filter Type > TextAsset + Texture2D` para filtrar estos, luego selecciona lo que quieres extraer, haz clic derecho y selecciona `Export selected assets`, luego selecciona un directorio para extraerlos. Esto los guardará en directorios separados de TextAssets y Texture2D.

Si instalas la app localmente deberas colocar los assets en la carpeta `public/assets/`

Ten en cuenta que he encontrado que las extracciones .atlas y .skel se anexan con una extensión .asset, que deberás eliminar antes usarlas. Puedes usar el siguiente codigo para hacer mas rapido, debes tener instalado python para ejecutarlo

```python
import os

path = "La ubicacion de la carpeta a modificar"

for filename in os.listdir(path):
    if filename.endswith(".asset"):
        os.rename(os.path.join(path, filename), os.path.join(path, filename[:-6]))
    else:
        continue

print("DONE!")
```
