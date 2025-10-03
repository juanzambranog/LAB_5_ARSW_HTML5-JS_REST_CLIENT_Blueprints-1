var app = (function () {

    var useMock = true; // <- cambia a false para usar API real
    var api = useMock ? apimock : apiclient;

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
