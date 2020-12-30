/* eslint-disable no-param-reassign */
/* eslint-disable arrow-body-style */
angular.module('listaTelefonica').directive('uiDate', () => {
  return {
    require: 'ngModel',
    link: (scope, element, attibutes, controller) => {
      const formatedDate = (date) => {
        const slashStandardDate = [2, 5];
        slashStandardDate.forEach((item) => {
          if(date.length > item) {
            date = `${date.substring(0, item)}/${date.substring(item, 9)}`;
          }
        });
        return date;
      };

      const formatDate = (date) => {
        date = date.replace(/[^0-9]+/g, '');
        date = formatedDate(date);
        return date;
      };

      element.bind('keyup', () => {
        controller.$setViewValue(formatDate(controller.$viewValue));
        controller.$render();
      });
    },
  };
});
