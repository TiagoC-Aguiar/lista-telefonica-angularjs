angular.module('listaTelefonica').controller('listaTelefonicaCtrl', ($scope, contatosAPI, operadorasAPI, serialGenerator) => {
  $scope.app = 'Lista Telefônica';
  $scope.contatos = [];
  $scope.operadoras = [];

  const carregarContatos = () => {
    contatosAPI.getContatos().then(function (response) {
      $scope.contatos = response.data;
    }).catch(function (error) {
      $scope.message = "Erro ao carregar contatos: " + error.data;
    });
  };

  let carregarOperadoras = function () {
    operadorasAPI.getOperadoras().then(function (response) {
      $scope.operadoras = response.data;
    });
  };

  $scope.adicionarContato = function (contato) {
    contato.serial = serialGenerator.generate();
    contato.data = new Date();
    contatosAPI.saveContato(contato).then(function (response) {
      delete $scope.contato;
      $scope.contatoForm.$setPristine();
      carregarContatos();
    });
  };
  $scope.estaSelecionado = function () {
    return $scope.contatos.some(function (contato) {
      return contato.selecionado;
    });
  };
  $scope.apagarContatos = function (contatos) {
    $scope.contatos = contatos.filter(function (contato) {
      return !contato.selecionado;
    });
  };
  $scope.ordenarPor = function (campo) {
    $scope.criterioOrdenacao = campo;
    $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
  };

  carregarContatos();
  carregarOperadoras();
});
