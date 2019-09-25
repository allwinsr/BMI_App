(function(){
	var app = angular.module('metricApp', [ ]);
app.directive('metricCalculator', function(){
return {
restrict: 'A',
templateUrl: 'metric-calculator.html'
};
});
})();