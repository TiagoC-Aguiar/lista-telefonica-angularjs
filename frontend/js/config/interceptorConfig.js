angular.module('listaTelefonica').config(function ($httpProvider) {
  $httpProvider.interceptors.push('timestampInterceptor');
});
