/* eslint-disable no-use-before-define */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-arrow-callback */
angular.module('listaTelefonica').controller('listaTelefonicaCtrl', function ($scope, contatos, operadoras, serialGenerator, $filter) {
  $scope.app = $filter('upper')('Lista Telefônica');
  $scope.contatos = contatos.data;
  $scope.operadoras = operadoras.data;

  const init = function () {
    calcularImpostos($scope.contatos);
    generateSerial($scope.contatos);
  };

  const calcularImpostos = function (contatos) {
    contatos.forEach(function (contato) {
      contato.operadora.precoComImposto = calcularImposto(contato.operadora.preco);
    });
  };

  const generateSerial = (scopeContatos) => {
    scopeContatos.forEach((item) => {
      item.serial = serialGenerator.generate();
    });
  };

  // eslint-disable-next-line arrow-body-style
  $scope.verificarContatoSelecionado = function (contatos) {
    // eslint-disable-next-line arrow-body-style
    $scope.hasContatoSelecionado = contatos.some((contato) => {
      return contato.selecionado === true;
    });
  };

  $scope.apagarContatos = (scopeContatos) => {
    // eslint-disable-next-line arrow-body-style
    $scope.contatos = scopeContatos.filter((contato) => {
      return !contato.selecionado;
    });
    $scope.verificarContatoSelecionado($scope.contatos);
  };

  $scope.ordenarPor = function (campo) {
    $scope.criterioOrdenacao = campo;
    $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
  };

  const calcularImposto = function (preco) {
    const imposto = 1.2;
    return preco * imposto;
  };

  init();
});
