var app = (function () {
    var author = "";
    var blueprints = [];

    // Cambiar autor seleccionado
    var setAuthor = function (newAuthor) {
        author = newAuthor;
    };

    // Actualizar listado de planos por autor
    var updateBlueprints = function (authname) {
        apimock.getBlueprintsByAuthor(authname, function (data) {
            author = authname;
            blueprints = data.map(function (bp) {
                return { name: bp.name, points: bp.points.length, raw: bp };
            });

            // limpiar tabla
            $("#blueprintsTable tbody").empty();
            $("#authorName").text("Author: " + authname);

            // renderizar filas
            blueprints.map(function (bp) {
                $("#blueprintsTable tbody").append(
                    `<tr>
                        <td>${bp.name}</td>
                        <td>${bp.points}</td>
                        <td><button class="btn btn-info btn-sm" onclick="app.openBlueprint('${authname}','${bp.name}')">Dibujar</button></td>
                    </tr>`
                );
            });

            // calcular total
            let total = data.map(bp => bp.points.length)
                            .reduce((a,b) => a+b, 0);
            $("#totalPoints").text("Total user points: " + total);
        });
    };

    // Dibujar blueprint en canvas
    var openBlueprint = function (authname, bpname) {
        apimock.getBlueprintsByNameAndAuthor(authname, bpname, function (bp) {
            $("#currentBpName").text(bp.name);

            var canvas = document.getElementById("blueprintCanvas");
            var ctx = canvas.getContext("2d");

            // limpiar canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // dibujar los puntos como líneas
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
