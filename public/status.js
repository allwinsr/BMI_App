(function(){
	var app = angular.module('statusTable', [ ]);
app.directive('statusTable', function(){
return {
restrict: 'A',
templateUrl: 'status-table.html'
};
});
})();