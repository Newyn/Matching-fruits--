##classes (FR)

Le dossier classes contient, comme son nom l'indique, l'ensemble des classes Javascript de l'application. <br/><br />
Ci-dessous se trouve un bref résumé des fonctionnalités pour chacune d'entre elles

###events.js

<p align="justify">
  Fichier qui gère les évènements de l'application. <br />
  Par exemple, on retrouve la gestion du redimensionnement de l'application par rapport à la taille de la fenêtre ainsi que celle des différents Event Listeners et des transitions CSS.
</p>

###game.js

<p align="justify">
  Classe principale de l'application gérant la logique du jeu. <br />
  Un nombre important de fonctions essentielles s'y trouve telles que la création de la parti, l'algorithme de génération de la carte et l'ensemble des contraintes liées au jeu (position, destruction, création et chute des fruits, ...).
</p>

###indexedDb.js

<p align="justify">
  Fichier qui gère le stockage de données côté clients. <br />
  On y trouve notamment des fonctions permettant d'ajouter, de sélectionner et de supprimer plusieurs types d'objets utilisés au sein de l'application tels que les scores, les options ou les niveaux. 
  Pour plus d'informations, vous pouvez aller consulter <a href="https://developer.mozilla.org/fr/docs/IndexedDB">Mozilla Developer Network - IndexedDB</a>.
</p>

###menu.js

<p align="justify">
  Classe liée à la construction du menu ainsi qu'au fonction activée par les évènements réalisées sur les onglets et boutons du menu.
</p>

###timer.js

<p align="justify">
  Classe qui gère le chronomètre utilisé durant les modes "Niveaux" et "Contre-la-montre".
</p>

###utils.js

<p align="justify">
  Fichier qui contient les fonctions dites "Utilitaires" de l'application. <br />
  Par exemple, on retrouve les fonctions permettant d'animer les fruits ou de créer et de récupérer des éléments DOM.
</p>

<hr />

##classes (EN)

The folder classes contains, as indicated in the name, all the Javascript classes of the application. <br /><br />
Below is a brief summary of features for each one.

###events.js

<p align="justify">
  File that manages the events of the application. <br />
  For example, there are the management resizing the application in relation to the size of the window as well as the various Event Listeners and CSS transitions.
</p>

###game.js

<p align="justify">
  Main class of the application managing the logic of the game. <br />
  A significant number of essential functions in it such as the creation of the party, the generation algorithm of the map and all the constraints related to game (position, destruction, creation and fruit fall, ...).
</p>

###indexedDb.js

<p align="justify">
  File that manages the client-side data storage. <br />
  It includes functions to add, select and delete multiple types of objects used in the application, such as scores, options or levels.
  For more information, please refer to <a href="https://developer.mozilla.org/en-US/docs/IndexedDB">Mozilla Developer Network - IndexedDB</a>.
</p>

###menu.js

<p align="justify">
  Class related to the construction and the function menu activated by events performed on the tabs and menu buttons.
</p>

###timer.js

<p align="justify">
  Class that handles the timer modes used during the "Levels" and "Time-trial" mode.
</p>

###utils.js

<p align="justify">
  File that contains the functions called "Utils" for the application. <br />
  For example, there are functions to animate or fruits to create and retrieve DOM elements.
</p>
