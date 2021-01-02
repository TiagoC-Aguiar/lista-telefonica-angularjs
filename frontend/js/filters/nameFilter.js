angular.module('listaTelefonica').filter('name', function () {
  return function (input) {
    const listaNomes = input.split(' ');
    const listaNomesFormatada = listaNomes.map(function (nome) {
      if(/^d([o|a|e]s?)$/i.test(nome)) {
        return nome.toLowerCase();
      }
      return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
    });
    return listaNomesFormatada.join(' ');
  };
});
