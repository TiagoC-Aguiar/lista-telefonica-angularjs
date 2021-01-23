/* eslint-disable prefer-arrow-callback */
angular.module('listaTelefonica').controller('listaTelefonicaCtrl', function ($scope, contatos, operadoras, serialGenerator) {
  $scope.app = 'Lista Telefônica';
  $scope.contatos = contatos.data;
  $scope.operadoras = operadoras.data;
  
  var init = function () {
    calcularImpostos($scope.contatos);
    generateSerial($scope.contatos);
  }

  var calcularImpostos = function (contatos) {
    contatos.forEach(function(contato) {
      contato.operadora.precoComImposto = calcularImposto(contato.operadora.preco);
    });
  }

  const generateSerial = (scopeContatos) => {
    scopeContatos.forEach((item) => {
      item.serial = serialGenerator.generate();
    });
  };

  // eslint-disable-next-line arrow-body-style
  $scope.estaSelecionado = () => {
    // eslint-disable-next-line arrow-body-style
    return $scope.contatos.some((contato) => {
      return contato.selecionado;
    });
  };
  $scope.apagarContatos = (scopeContatos) => {
    // eslint-disable-next-line arrow-body-style
    $scope.contatos = scopeContatos.filter((contato) => {
      return !contato.selecionado;
    });
  };

  $scope.ordenarPor = function (campo) {
    $scope.criterioOrdenacao = campo;
    $scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
  };

  var counter = 1;

  var calcularImposto = function (preco) {    
    console.log(counter++);
    const imposto = 1.2;
    return preco * imposto;
  }

  init();

});
