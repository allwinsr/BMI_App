(function(){
var app = angular.module('standardApp', [ ]);
app.directive('standardCalculator', function(){
return {
restrict: 'A',
templateUrl: 'standard-calculator.html'
};
});
})();