angular.module('listaTelefonica').directive('uiAccordions', function () {
  return {
    controller: function ($scope, $element, $attrs) {
      const accordions = [];

      this.registerAccordion = function (accordion) {
        accordions.push(accordion);
      };

      this.closeAll = function (keep) {
        accordions.forEach(function (accordion) {
          if(accordion.$id !== keep.$id) {
            accordion.isOpened = false;
          }
        });
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
      ctrl.registerAccordion(scope);
      scope.open = function () {
        ctrl.closeAll(scope);
        scope.isOpened = !scope.isOpened;
      };
    },
  };
});
