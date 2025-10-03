### Escuela Colombiana de Ingeniería
### Arquiecturas de Software

---

### Juan David Zambrano Gonzalez

---

## Construción de un cliente 'grueso' con un API REST, HTML5, Javascript y CSS3. Parte I.

### Trabajo individual o en parejas. A quienes tuvieron malos resultados en el parcial anterior se les recomienda hacerlo individualmente.

![](img/mock.png)

* Al oprimir 'Get blueprints', consulta los planos del usuario dado en el formulario. Por ahora, si la consulta genera un error, sencillamente no se mostrará nada.
* Al hacer una consulta exitosa, se debe mostrar un mensaje que incluya el nombre del autor, y una tabla con: el nombre de cada plano de autor, el número de puntos del mismo, y un botón para abrirlo. Al final, se debe mostrar el total de puntos de todos los planos (suponga, por ejemplo, que la aplicación tienen un modelo de pago que requiere dicha información).
* Al seleccionar uno de los planos, se debe mostrar el dibujo del mismo. Por ahora, el dibujo será simplemente una secuencia de segmentos de recta realizada en el mismo orden en el que vengan los puntos.


## Ajustes Backend

1. Trabaje sobre la base del proyecto anterior (en el que se hizo el API REST).

    ### **Añadimos el proyecto anterior (LAB_4_ARSW_-SpringBoot_REST_API_Blueprints_Part2)**


    ![alt text](/img/image.png)

----

2. Incluya dentro de las dependencias de Maven los 'webjars' de jQuery y Bootstrap (esto permite tener localmente dichas librerías de JavaScript al momento de construír el proyecto):

    ```xml
    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>webjars-locator</artifactId>
    </dependency>

    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>bootstrap</artifactId>
        <version>3.3.7</version>
    </dependency>

    <dependency>
        <groupId>org.webjars</groupId>
        <artifactId>jquery</artifactId>
        <version>3.1.0</version>
    </dependency>                

    ```


    ### **Añadimos la dependencias correspondientes**

    ![alt text](/img/image-1.png)

---

## Front-End - Vistas

1. Cree el directorio donde residirá la aplicación JavaScript. Como se está usando SpringBoot, la ruta para poner en el mismo contenido estático (páginas Web estáticas, aplicaciones HTML5/JS, etc) es:  

    ```
    src/main/resources/static
    ```

    ### **Creamos el directorio donde estara nuestro front-end y sus archivos**

    ![alt text](/img/image-2.png)

---

2. Cree, en el directorio anterior, la página index.html, sólo con lo básico: título, campo para la captura del autor, botón de 'Get blueprints', campo <div> donde se mostrará el nombre del autor seleccionado, [la tabla HTML](https://www.w3schools.com/html/html_tables.asp) donde se mostrará el listado de planos (con sólo los encabezados), y un campo <div> donde se mostrará el total de puntos de los planos del autor. Recuerde asociarle identificadores a dichos componentes para facilitar su búsqueda mediante selectores.

    ### **Agregamos el archivo index.html con lo basico para la funcionalidad solicitada**

    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <title>Blueprints</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="/webjars/jquery/jquery.min.js"></script>
        <script src="/webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css" />
        <script src="js/apimock.js"></script>
        <script src="js/apiclient.js"></script>
        <script src="js/app.js"></script>
    </head>
    <body class="container">
        <h1>Blueprints</h1>
        <div class="form-group">
            <label for="author">Author:</label>
            <input type="text" id="author" class="form-control" placeholder="Ingrese el numbre del autor">
        </div>
        <button id="getBlueprints" class="btn btn-primary">Get blueprints</button>
        <h3 id="authorName"></h3>
        <table id="blueprintsTable" class="table table-striped mt-3">
            <thead>
                <tr>
                    <th>Blueprint Name</th>
                    <th>Points</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
        <div id="totalPoints" class="mt-3"></div>
        <div id="currentBlueprint" class="mt-3">
            <h3>Current blueprint: <span id="currentBpName"></span></h3>
            <canvas id="blueprintCanvas" width="500" height="500" style="border:1px solid #000;"></canvas>
        </div>
        <script>
            $("#getBlueprints").click(function () {
                var authorName = $("#author").val();
                app.updateBlueprints(authorName);
            });
        </script>
    </body>
    </html>

---

3. En el elemento \<head\> de la página, agregue las referencia a las librerías de jQuery, Bootstrap y a la hoja de estilos de Bootstrap. 
    ```html
    <head>
        <title>Blueprints</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <script src="/webjars/jquery/jquery.min.js"></script>
        <script src="/webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet"
          href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css" />
    </head>
    ```

    ### **Agregamos la referencias necesarias**

    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <title>Blueprints</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="/webjars/jquery/jquery.min.js"></script>
        <script src="/webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css" />
        <script src="js/apimock.js"></script>
        <script src="js/apiclient.js"></script>
        <script src="js/app.js"></script>
    </head>

---


4. Suba la aplicación (mvn spring-boot:run), y rectifique:
    1. Que la página sea accesible desde:
    ```
    http://localhost:8080/index.html
    ```
    ### **Corremos la aplicacion con (mvn spring-boot:run) y en el puerto 8080**

    ![alt text](/img/image-4.png)
    ![alt text](/img/image-3.png)

    2. Al abrir la consola de desarrollador del navegador, NO deben aparecer mensajes de error 404 (es decir, que las librerías de JavaScript se cargaron correctamente).

    ### **Abrimos la consola del navegador para verificar que se cargaron las librerias correctamente**

    ![alt text](/img/image-5.png)

---

## Front-End - Lógica

1. Ahora, va a crear un Módulo JavaScript que, a manera de controlador, mantenga los estados y ofrezca las operaciones requeridas por la vista. Para esto tenga en cuenta el [patrón Módulo de JavaScript](https://toddmotto.com/mastering-the-module-pattern/), y cree un módulo en la ruta static/js/app.js .

### **Creamos el archivo app.js  en la ruta solicitada y para su funcionalidad tenemos en cuenta [patrón Módulo de JavaScript](https://toddmotto.com/mastering-the-module-pattern/)**

![alt text](/img/image-6.png)


```js
    var app = (function () {

    //var api = apimock;   // usar datos quemados
    var api = apiclient; // usar API real

    var author = "";
    var blueprints = [];

    var setAuthor = function (newAuthor) {
        author = newAuthor;
    };

    // Actualizar listado de planos por autor
    var updateBlueprints = function (authname) {
        api.getBlueprintsByAuthor(authname, function (data) {
            author = authname;
            blueprints = data.map(function (bp) {
                return { name: bp.name, points: bp.points.length, raw: bp };
            });

            $("#blueprintsTable tbody").empty();
            $("#authorName").text("Author: " + authname);

            blueprints.map(function (bp) {
                $("#blueprintsTable tbody").append(
                    `<tr>
                        <td>${bp.name}</td>
                        <td>${bp.points}</td>
                        <td><button class="btn btn-info btn-sm" onclick="app.openBlueprint('${authname}','${bp.name}')">Dibujar</button></td>
                    </tr>`
                );
            });

            let total = data.map(bp => bp.points.length)
                            .reduce((a,b) => a+b, 0);
            $("#totalPoints").text("Total user points: " + total);
        });
    };

    // Dibujar blueprint en canvas
    var openBlueprint = function (authname, bpname) {
        api.getBlueprintsByNameAndAuthor(authname, bpname, function (bp) {
            $("#currentBpName").text(bp.name);

            var canvas = document.getElementById("blueprintCanvas");
            var ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (bp.points.length > 0) {
                ctx.beginPath();
                ctx.moveTo(bp.points[0].x, bp.points[0].y);
                for (var i = 1; i < bp.points.length; i++) {
                    ctx.lineTo(bp.points[i].x, bp.points[i].y);
                }
                ctx.stroke();
            }
        });
    };

    return {
        setAuthor: setAuthor,
        updateBlueprints: updateBlueprints,
        openBlueprint: openBlueprint
    };
})();

```

---

2. Copie el módulo provisto (apimock.js) en la misma ruta del módulo antes creado. En éste agréguele más planos (con más puntos) a los autores 'quemados' en el código.

    ### **Copiamos el archivo apimock.js en la ruta solicitada y creamos otro autor con planos que tienen mas puntos**

    ![alt text](/img/image-7.png)
    ![alt text](/img/image-8.png)

---

3. Agregue la importación de los dos nuevos módulos a la página HTML (después de las importaciones de las librerías de jQuery y Bootstrap):
    ```html
    <script src="js/apimock.js"></script>
    <script src="js/app.js"></script>
    ```
    ### **Importamos los modulos nuevos en la pagina HTML**

    ```html
    <head>
        <title>Blueprints</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <script src="/webjars/jquery/jquery.min.js"></script>
        <script src="/webjars/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <link rel="stylesheet" href="/webjars/bootstrap/3.3.7/css/bootstrap.min.css" />

        <script src="js/apimock.js"></script>
        <script src="js/apiclient.js"></script>
        <script src="js/app.js"></script>
    </head>

    ```

---

3. Haga que el módulo antes creado mantenga de forma privada:
    * El nombre del autor seleccionado.
    * El listado de nombre y tamaño de los planos del autor seleccionado. Es decir, una lista objetos, donde cada objeto tendrá dos propiedades: nombre de plano, y número de puntos del plano.

    Junto con una operación pública que permita cambiar el nombre del autor actualmente seleccionado.


4. Agregue al módulo 'app.js' una operación pública que permita actualizar el listado de los planos, a partir del nombre de su autor (dado como parámetro). Para hacer esto, dicha operación debe invocar la operación 'getBlueprintsByAuthor' del módulo 'apimock' provisto, enviándole como _callback_ una función que:

    * Tome el listado de los planos, y le aplique una función 'map' que convierta sus elementos a objetos con sólo el nombre y el número de puntos.

    * Sobre el listado resultante, haga otro 'map', que tome cada uno de estos elementos, y a través de jQuery agregue un elemento \<tr\> (con los respectvos \<td\>) a la tabla creada en el punto 4. Tenga en cuenta los [selectores de jQuery](https://www.w3schools.com/JQuery/jquery_ref_selectors.asp) y [los tutoriales disponibles en línea](https://www.tutorialrepublic.com/codelab.php?topic=faq&file=jquery-append-and-remove-table-row-dynamically). Por ahora no agregue botones a las filas generadas.

    * Sobre cualquiera de los dos listados (el original, o el transformado mediante 'map'), aplique un 'reduce' que calcule el número de puntos. Con este valor, use jQuery para actualizar el campo correspondiente dentro del DOM.

    ### **Creamos la operacion solicitado invocando 'getBlueprintsByAuthor'**

    ```js
        var updateBlueprints = function (authname) {
        api.getBlueprintsByAuthor(authname, function (data) {
            author = authname;
            blueprints = data.map(function (bp) {
                return { name: bp.name, points: bp.points.length, raw: bp };
            });

            $("#blueprintsTable tbody").empty();
            $("#authorName").text("Author: " + authname);

            blueprints.map(function (bp) {
                $("#blueprintsTable tbody").append(
                    `<tr>
                        <td>${bp.name}</td>
                        <td>${bp.points}</td>
                        <td><button class="btn btn-info btn-sm" onclick="app.openBlueprint('${authname}','${bp.name}')">Dibujar</button></td>
                    </tr>`
                );
            });

            let total = data.map(bp => bp.points.length)
                            .reduce((a,b) => a+b, 0);
            $("#totalPoints").text("Total user points: " + total);
        });
    };
    ```
--- 

5. Asocie la operación antes creada (la de app.js) al evento 'on-click' del botón de consulta de la página.

    ### **Asociamos la operacion anterio con un evento on-click**
    ```js
    <td><button class="btn btn-info btn-sm" onclick="app.openBlueprint('${authname}','${bp.name}')">Dibujar</button></td>

    ```
---
6. Verifique el funcionamiento de la aplicación. Inicie el servidor, abra la aplicación HTML5/JavaScript, y rectifique que al ingresar un usuario existente, se cargue el listado del mismo.

    ### **Iniciamos la aplicacion y verificamos la funcionalidad de listar los planos de un autor por su nombre en este caso con 'juan'**

    ![alt text](/img/image-15.png)

## Para la próxima semana

8. A la página, agregue un [elemento de tipo Canvas](https://www.w3schools.com/html/html5_canvas.asp), con su respectivo identificador. Haga que sus dimensiones no sean demasiado grandes para dejar espacio para los otros componentes, pero lo suficiente para poder 'dibujar' los planos.

    ### **Agregamos el canvas con un tamaño adecuado para la pagina y para poder dibujar los planos**

    ```html
        <div id="currentBlueprint" class="mt-3">
            <h3>Current blueprint: <span id="currentBpName"></span></h3>
            <canvas id="blueprintCanvas" width="500" height="500" style="border:1px solid #000;"></canvas>
        </div>
    
    
    ```
    ![alt text](/img/image-14.png)

---

9. Al módulo app.js agregue una operación que, dado el nombre de un autor, y el nombre de uno de sus planos dados como parámetros, haciendo uso del método getBlueprintsByNameAndAuthor de apimock.js y de una función _callback_:
    * Consulte los puntos del plano correspondiente, y con los mismos dibuje consectivamente segmentos de recta, haciendo uso [de los elementos HTML5 (Canvas, 2DContext, etc) disponibles](https://www.w3schools.com/html/tryit.asp?filename=tryhtml5_canvas_tut_path)* Actualice con jQuery el campo <div> donde se muestra el nombre del plano que se está dibujando (si dicho campo no existe, agruéguelo al DOM).

    ### **Agregamos la funcionalidad de dibujo por medio del metodo getBlueprintsByNameAndAuthor**
    ```js
    // Dibujar blueprint en canvas
    var openBlueprint = function (authname, bpname) {
        api.getBlueprintsByNameAndAuthor(authname, bpname, function (bp) {
            $("#currentBpName").text(bp.name);

            var canvas = document.getElementById("blueprintCanvas");
            var ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (bp.points.length > 0) {
                ctx.beginPath();
                ctx.moveTo(bp.points[0].x, bp.points[0].y);
                for (var i = 1; i < bp.points.length; i++) {
                    ctx.lineTo(bp.points[i].x, bp.points[i].y);
                }
                ctx.stroke();
            }
        });
    };

    ```
    ![alt text](/img/image-10.png)


10. Verifique que la aplicación ahora, además de mostrar el listado de los planos de un autor, permita seleccionar uno de éstos y graficarlo. Para esto, haga que en las filas generadas para el punto 5 incluyan en la última columna un botón con su evento de clic asociado a la operación hecha anteriormente (enviándo como parámetro los nombres correspondientes).

    ### **Agregamos la funcionalidad de dibujar usando canvas**
    ```js
    // Dibujar blueprint en canvas
    var openBlueprint = function (authname, bpname) {
        api.getBlueprintsByNameAndAuthor(authname, bpname, function (bp) {
            $("#currentBpName").text(bp.name);

            var canvas = document.getElementById("blueprintCanvas");
            var ctx = canvas.getContext("2d");

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (bp.points.length > 0) {
                ctx.beginPath();
                ctx.moveTo(bp.points[0].x, bp.points[0].y);
                for (var i = 1; i < bp.points.length; i++) {
                    ctx.lineTo(bp.points[i].x, bp.points[i].y);
                }
                ctx.stroke();
            }
        });
    };

    ```
    ### **Probamos con el autor 'juan' que es el que mas puntos tiene**
    ![alt text](/img/image-11.png)
---

11. Verifique que la aplicación ahora permita: consultar los planos de un auto y graficar aquel que se seleccione.

    ### **Se implementa la consulta de planos por autor y la opcion de graficar el deseado**

    ![alt text](/img/image-13.png)

12. Una vez funcione la aplicación (sólo front-end), haga un módulo (llámelo 'apiclient') que tenga las mismas operaciones del 'apimock', pero que para las mismas use datos reales consultados del API REST. Para lo anterior revise [cómo hacer peticiones GET con jQuery](https://api.jquery.com/jquery.get/), y cómo se maneja el esquema de _callbacks_ en este contexto.


    ### **Consultamos en la pagina para verificar el funcionamiento de apiclient usando autores de la API REST**
    ![alt text](/img/image-9.png)
    ![alt text](/img/image-10.png)

13. Modifique el código de app.js de manera que sea posible cambiar entre el 'apimock' y el 'apiclient' con sólo una línea de código.

    ### **Modificamos el codigo para cambiar de api con solo una linea como lo solicitado**

    ### **En en HTML ponemos las rutas tanto de apimock como de apiclient para que en app.js solo sea elegir cual cargar en la pagina**

    ```html
        <script src="js/apimock.js"></script>
        <script src="js/apiclient.js"></script>
        <script src="js/app.js"></script>
    ```
    ### **Y en app.js usamos una bandera global en donde 'true' carga el apimock y false el apiclient (API real)**
    ```js
    var useMock = true; // <- cambia a false para usar API real
    var api = useMock ? apimock : apiclient;
    ```




14. Revise la [documentación y ejemplos de los estilos de Bootstrap](https://v4-alpha.getbootstrap.com/examples/) (ya incluidos en el ejercicio), agregue los elementos necesarios a la página para que sea más vistosa, y más cercana al mock dado al inicio del enunciado.