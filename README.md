### Movie Satisfaction App | `cmds`
Restore *node-modules* with:
```
npm install
```

La aplicación te permite registar una calificación a una determinada película.

La aplicación solicita 4 datos para realizar el registro.

Un `nombre`, un `email`, una `película` y su respectiva `puntuación`.

#### Las validaciones para estos datos son los siguientes

	1. Todos los datos son obligatorios.
	2. El nombre debe tener más de 2 letras.
	3. El email debe tener la estructura esperada de un email.
	4. La película sólo podrá ser elegida de entre las registradas.
	5. La puntuación será de 1 al 5.


#### Funciones Adicionales
	
	* La misma persona puede dejar múltiples calificaciones.
	* Los resultados pueden ser filtrados por calificación.
	* Las calificaciones pueden ser editadas.

#### Angular CMDS

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.11.

#### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

#### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

#### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


