angular.module('listaTelefonica').controller('listaTelefonicaCtrl', ($scope, contatosAPI, operadorasAPI, serialGenerator) => {
  $scope.app = 'Lista Telefônica';
  $scope.contatos = [];
  $scope.operadoras = [];

  const carregarContatos = () => {
    contatosAPI.getContatos().then((response) => {
      const { data } = response;
      data.forEach((item) => {
        item.serial = serialGenerator.generate();
      });
      $scope.contatos = data;
    // eslint-disable-next-line no-unused-vars
    }).catch((error) => {
      $scope.error = 'Não foi possível carregar os dados!';
      // $scope.message = `Erro ao carregar contatos: ${error.data}`;
    });
  };

  const carregarOperadoras = () => {
    operadorasAPI.getOperadoras().then((response) => {
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

  // eslint-disable-next-line arrow-body-style
  $scope.estaSelecionado = () => {
    // eslint-disable-next-line arrow-body-style
    return $scope.contatos.some((contato) => {
      return contato.selecionado;
    });
  };
  $scope.apagarContatos = (contatos) => {
    // eslint-disable-next-line arrow-body-style
    $scope.contatos = contatos.filter((contato) => {
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
