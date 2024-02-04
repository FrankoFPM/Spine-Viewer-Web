## Chibi Assets

The packaged chibi files on Android can be found in the following two locations:

- Android/obb/com.YoStarEN.AzurLane/main.51006.com.YoStarEN.AzurLane.obb (you can extract this as a regular zip file by changing `.obb` to `.zip or .rar` and look for the 'char' directory, this file will contain all the application information)
- Android/data/com.YoStarEN.AzurLane/files/AssetBundles/char

To extract these files, we need to use the AssetStudio tool, which you can find in its GitHub repository.

Download the latest zip file of the version, extract it, run the .exe and go to `File > Load folder` and select the 'char' directories. Here we want to extract three things:

- The Texture2D type for the chibi
- The TextAsset .atlas corresponding to the chibi
- The TextAsset .skel corresponding to the chibi

Each Texture2D should have a corresponding .atlas and .skel. Therefore, you can use `Filter Type > TextAsset + Texture2D` to filter these, then select what you want to extract, right-click and select `Export selected assets`, then select a directory to extract them. This will save them in separate TextAssets and Texture2D directories.

If you install the app locally you should place the assets in the `public/assets/` folder

Please note that the .atlas and .skel extractions are appended with a .asset extension, which you will need to remove before using them. You can use the following code to make it faster, you must have python installed to run it

```python
import os

path = "The location of the folder to modify"

for filename in os.listdir(path):
    if filename.endswith(".asset"):
        os.rename(os.path.join(path, filename), os.path.join(path, filename[:-6]))
    else:
        continue

print("DONE!")
```
