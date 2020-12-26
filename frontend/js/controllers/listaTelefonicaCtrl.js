angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, $http) {
    $scope.app = "Lista Telefônica";
    $scope.contatos = [];
    $scope.operadoras = [];

    let carregarContatos = function () {
        $http.get("http://localhost:3001/contatos").then(function (response) {
            $scope.contatos = response.data;
        }).catch(function (error) {
            $scope.message = "Erro ao carregar contatos: " + error.data;
        });
    };

    let carregarOperadoras = function () {
        $http.get("http://localhost:3001/operadoras").then(function (response) {
            $scope.operadoras = response.data;
        });
    };

    $scope.adicionarContato = function (contato) {
        contato.data = new Date();
        $http.post("http://localhost:3001/contatos", contato).then(function (repsonse) {
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
        });
        carregarContatos();
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