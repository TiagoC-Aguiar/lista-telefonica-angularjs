// eslint-disable-next-line arrow-body-style
angular.module('listaTelefonica').directive('uiAlert', () => {
  return {
    templateUrl: 'view/alert.html',
    raplace: true,
    testrict: 'AE',
    scope: {
      title: '@',
    },
    transclude: true,
  };
});
