
apiclient = (function () {

    // Obtener planos por autor
    var getBlueprintsByAuthor = function (authname, callback) {
        $.get("http://localhost:8080/blueprints/"+ authname, function (data) {
            callback(data);
        }).fail(function () {
            console.error("Error getting blueprints for author: " + authname);
            callback([]);
        });
    };

    // Obtener un plano específico por autor y nombre
    var getBlueprintsByNameAndAuthor = function (authname, bpname, callback) {
        $.get("http://localhost:8080/blueprints/" + authname + "/" + bpname, function (data) {
            callback(data);
        }).fail(function () {
            console.error("Error getting blueprint " + bpname + " for author: " + authname);
            callback(null);
        });
    };

    return {
        getBlueprintsByAuthor: getBlueprintsByAuthor,
        getBlueprintsByNameAndAuthor: getBlueprintsByNameAndAuthor
    };

})();
