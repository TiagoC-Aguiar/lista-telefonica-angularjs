angular.module('listaTelefonica').directive('uiAccordions', function () {
  return {
    controller: function ($scope, $element, $attrs) {
      let accordions = [];

      this.registerAccordion = function (accordion) {
        console.log('teste');
        console.log(accordion.$id);
      };
    },
  };
});

angular.module('listaTelefonica').directive('uiAccordion', function () {
  return {
    templateUrl: 'view/accordion.html',
    transclude: true,
    scope: {
      title: '@',
    },
    require: '^uiAccordions',
    link: function (scope, element, attrs, ctrl) {
      scope.open = function () {
        ctrl.registerAccordion(scope);
        scope.isOpened = !scope.isOpened;
      };
    },
  };
});
