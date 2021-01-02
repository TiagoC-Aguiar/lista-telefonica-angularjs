angular.module('ui', []);
angular.module('ui').run(function ($templateCache) {
  $templateCache.put('view/accordion.html', '<div class="ui-accordion-title" ng-click="open()">{{title}}</div><div class="ui-accordion-content" ng-show="isOpened" ng-transclude></div>');
});
angular.module('ui').directive('uiAccordions', function () {
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

angular.module('ui').directive('uiAccordion', function () {
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
