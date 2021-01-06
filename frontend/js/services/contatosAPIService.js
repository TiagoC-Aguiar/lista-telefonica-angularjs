angular.module('listaTelefonica').factory('contatosAPI', function ($http, config) {
  const _getContatos = function () {
    return $http.get(config.baseUrl + '/contatos');
  };

  const _getContato = function (id) {
    return $http.get(config.baseUrl + '/contatos/' + id);
  };

  const _saveContato = function (contato) {
    return $http.post(config.baseUrl + '/contatos', contato);
  };

  return {
    getContatos: _getContatos,
    getContato: _getContato,
    saveContato: _saveContato,
  };
});
