angular.module("listaTelefonica").filter("name", function () {
    return function (input) {
        let listaNomes = input.split(' ');
        let listaNomesFormatada = listaNomes.map(function (nome) {
            if(/d[o|a|e]s?/i.test(nome)) {
                return nome.toLowerCase();
            }
            return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
        });
        return listaNomesFormatada.join(' ');
    };
});
