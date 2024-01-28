# Spine Viewer

Spine Viewer is a web application that allows you to visualize and play sprites created with Spine, a 2D animation tool. This application is developed with React and Vite, and uses libraries such as [PixiJS](https://github.com/pixijs/pixijs), [Pixi-Spine](https://github.com/pixijs/spine), [TailwindCSS](https://tailwindcss.com/) and [NextUI](https://nextui.org/docs/guide/introduction).

_Read this in other languages: [Español](README.es.md)._

## Features

- Load and display Spine files in .skel format
- Control the animations and modify basic values
- Change the background of the visualization window
- Supports Spine assets of version 3.8
- Compatible with most modern web browsers

## Installation

To install and run the application on your local machine, follow these steps:

- Clone this repository with the command `git clone https://github.com/FrankoFPM/Spine-Viewer-Web.git`
- Enter the project folder with the command `cd Spine-Viewer-Web`
- Install the dependencies with the command `npm install`
- Start the development server with the command `npm run dev`
- Open your browser and access the address `http://localhost:####`

## Usage

To use the application, you need to have spine files in .skel format, which are generated by Spine when exporting the animations. You can get these files from different sources, such as games, tutorials or free resources.

To load a spine file, click on the "Upload asset" button and select the files of the spine you want to see, then on the "GO" button. The application will display the spine in the visualization window, and you can control the animation with the side controls. You can also change the background of the player with the "Background" button, you can choose a color or your own image.

This project aims to visualize sprites. In particular, it focuses on the sprites of the game Azur Lane, owned by Yostar. This repository does not contain any asset of the game, and each user must provide their own. This application has no commercial purposes, and only intends to be a visualization and learning tool.

> [!NOTE]
> You must select the 3 files of the sprite, they must have the same name
> The extensions for the 3 files must be `.atlas`, `.skel` and `.png`

> [!IMPORTANT]
> This application is an independent and unofficial project, which has
> no relationship or affiliation with Yostar, the company that owns the game Azur Lane.
> All copyrights and trademarks of Azur Lane belong to Yostar and their
> respective creators. This application only uses some names of characters from the game
> for educational and tribute purposes, without intending to violate the copyrights or
> obtain economic benefits.

## Contribution

If you like this application and want to contribute to its development or improvement, you can do it in the following ways:

- Report errors or suggest new features through GitHub issues
- Send pull requests with your own changes or improvements to the code
- Share the application with other users who may be interested

## License

This application is licensed under the [GNU General Public License (GPL)](LICENSE), which means that you can use it, modify it and distribute it freely, as long as any derived work is also licensed under the GPL and gives credit to the author.
