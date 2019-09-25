(function(){
var app = angular.module('BMICalculator', ['standardApp', 'metricApp', 'statusTable', 'pascalprecht.translate']);

app.config(function($translateProvider) {
  $translateProvider.translations('en', {
    TITLE: 'Welcome!',
    MESSAGE: 'This app supports your language!',
	APPNAME: 'BMI Calculator',
	TAGLINE: 'Input height and weight, Get your BMI',
	WEIGHT: 'Weight',
	HEIGHT: 'Height',
	CALCULATE: 'Calculate',
	FEET: 'Feet',
	INCH: 'Inch',
	INMETERS: 'in meters',
	INKGS: 'in kgs',
	INFEETANDINCHES: 'in feet and inches',
	INPOUNDS: 'in pounds',
	STATUS:'Status',
	BMIRANGE : 'BMI Range',
	UNDERWEIGHT: 'Underweight',
	NORMAL: 'Normal',
	OVERWEIGHT: 'Overweight',
	OBESE: 'Obese',
	BELOW: 'Below',
	ABOVE : 'Above',
	AND : 'and',
	SELECTMODE : 'Select Mode',
	SELECTLANGUAGE: 'Select your language',
	STANDARD: 'Standard',
	METRIC: 'Metric',
	BMI: 'Body Mass Index',
	INFO: 'Info',
	WEIGHTRANGE: 'According to your height, your weight should be between',
	KGS : 'kgs',
	KGM : 'kg/m',
	POUNDS: 'pounds',
	ENGLISH: 'English',
	TAMIL: 'Tamil',
	VIEWSTATUS: 'View Status',
	MODALTITLE:	'Status and BMI Range'	
  });
$translateProvider.translations('ta', {
    TITLE: 'வணக்கம்!',
    MESSAGE: 'உங்கள் மொழியில் இந்தப் பயன்பாட்டை காணலாம் !',
	APPNAME: 'உடல் நிறை குறியீட்டெண் கணிப்பான்',
	TAGLINE: 'உயரத்தையும் எடையையும் உள்ளிடுங்கள், உடல் நிறை குறியீட்டெண்ணை கணக்கிடுங்கள் ',
	WEIGHT: 'எடை',
	HEIGHT: 'உயரம்',
	CALCULATE: 'கணக்கிடு',
	FEET: 'அடி',
	INCH: 'அங்குலம்',
	INMETERS: 'மீட்டரில் ',
	INKGS: 'கிலோவில்  ',
	INFEETANDINCHES: 'அடி மற்றும் அங்குலத்தில் ',
	INPOUNDS: 'பவுண்டுகளில்  ',
	STATUS: 'நிலை',
	BMIRANGE : 'உடல் நிறை குறியீட்டெண் வரம்பு ',
	UNDERWEIGHT: 'குறைவான எடை',
	NORMAL: 'இயல்பான எடை ',
	OVERWEIGHT: 'அதிக எடை',
	OBESE: 'உடல் பருமன்',
	BELOW: '-க்கு கீழே',
	ABOVE : '-க்கு மேல்',
	AND : 'மற்றும்',
	SELECTMODE : 'பயன்முறை',
	SELECTLANGUAGE: 'உங்கள் மொழியை தேர்ந்தெடுக்கவும் ',
	STANDARD: 'திட்ட அலகு',
	METRIC: 'மெட்ரிக்',
	BMI: 'உடல் நிறை குறியீட்டெண் ',
	INFO: 'தகவல்',
	WEIGHTRANGE: 'உங்கள் உயரத்தின் படி, உங்கள் எடை  இதற்கிடையே  இருக்க வேண்டும்',
	KGS : 'கிலோ',
	KGM : 'கி/மீ',
	POUNDS: 'பவுண்டுகள்',
	ENGLISH: 'ஆங்கிலம்',
	TAMIL: 'தமிழ் ',
	VIEWSTATUS: 'நிலையைக் காண',
	MODALTITLE:	'நிலையும் அதற்கான உடல் நிறை குறியீட்டெண் வரம்பும்'	
  });

  $translateProvider.preferredLanguage('en');
});

app.service('CalculateService', function() {  
	this.feetToMeter = 0.3048;
	this.inchToMeter = 0.0254;
	this.meterToInch = 39.3701;
	this.inchToFeet = 12;
	this.poundToKilo = 0.453592;
	this.convertToMetricHeight = function(feet, inch) { return ((feet * this.feetToMeter) + (inch * this.inchToMeter)) };     
    this.convertMeterToFeet = function(meters) { return Math.floor(meters / this.feetToMeter) };      
	this.convertMeterToInch = function(meters) { return (meters * this.meterToInch) % this.inchToFeet };       
	this.convertPoundToKilograms = function(pound) { return pound * this.poundToKilo };       
	this.convertKilogramsToPounds = function(kilograms) { return kilograms / this.poundToKilo }; 
});  
   

app.controller('BMIController', function($scope, $translate, CalculateService){	  
	$scope.language = 'en';
	$scope.languages = {
    "en": "English",
    "ta": "Tamil"};	
	$scope.updateLanguage = function() {
    $translate.use($scope.language);
	};
	$scope.weight = 0;
	$scope.height = 0;
	$scope.bmi = 0;
	$scope.bmiColor = "Black";
	$scope.bmiStatus = "";
	$scope.tab = 1;
	$scope.selectTab = function(setTab){
		$scope.tab = setTab;
	}
	$scope.isSelected = function(checkTab){
		return $scope.tab === checkTab;
	}
	$scope.heightFeet = 0;
	$scope.heightInch = 0;
	$scope.weightPound = 0;	
	$scope.convertFeetAndInchesToMeters = function(feet,inch){		
		if(feet != undefined && inch != undefined){
		$scope.height = CalculateService.convertToMetricHeight(feet, inch);  			
	}		
	else if(feet != undefined && inch == undefined){
		$scope.height = CalculateService.convertToMetricHeight(feet, 0);  			
	}		
	else if(feet == undefined && inch != undefined){
		$scope.height = CalculateService.convertToMetricHeight(0, inch);  			
	}	
	else{
		$scope.height = 0;
		$scope.bmi = 0;  
	}
	}
	$scope.convertPoundsToKilograms = function(pound){
		if(pound != undefined){
		$scope.weight = CalculateService.convertPoundToKilograms(pound);
	}
	else{
		$scope.weight = 0;		
		$scope.bmi = 0;
	}
	}
	$scope.convertMetersToFeetAndInches = function(meters){
		if(meters != undefined){			
		$scope.heightFeet = CalculateService.convertMeterToFeet(meters);
		$scope.heightInch =  CalculateService.convertMeterToInch(meters);;
	}
	else{
		$scope.heightFeet = 0;
		$scope.heightInch = 0;
		$scope.bmi = 0;
	}
	}
	$scope.convertKilogramsToPounds = function(kilograms){
		if(kilograms != undefined){
		$scope.weightPound = CalculateService.convertKilogramsToPounds(kilograms);
	}
	else{
		$scope.bmi = 0;
		$scope.weightPound = 0;
	}
	}
	$scope.calculateBMI = function(weight, height){
		$scope.bmi = 0;
		if(height !== 0 && weight !== 0 && weight !== undefined && height !== undefined){
		$scope.bmi = weight / (height * height); 
		if(!isNaN($scope.bmi)){
			if ($scope.bmi < 18.5)
            {
                $scope.bmiColor = "Red";
                $scope.bmiStatus = "Underweight";
            }
            else if ($scope.bmi >= 18.5 && $scope.bmi < 25.0)
            {
                $scope.bmiColor = "Green"; 
                $scope.bmiStatus = "Normal";
            }
            else if ($scope.bmi >= 25.0 && $scope.bmi < 29.9)
            {
                $scope.bmiColor = "DarkCyan";
                $scope.bmiStatus = "Overweight";
            }
            else
            {
                $scope.bmiColor = "DarkRed";
                $scope.bmiStatus = "Obesity";
            }				
			$scope.minWeight = 18.5 * ( height*height);
			$scope.minWeightPounds = $scope.minWeight / 0.453592;
			$scope.maxWeight = 25.0 * ( height*height);
			$scope.maxWeightPounds = $scope.maxWeight / 0.453592;
			}
			else{
			$scope.bmi = 0; 
			}
		}				
	} 	
	$scope.showModal = false;
    $scope.toggleModal = function(){		
        $scope.showModal = !$scope.showModal;
    }
});

app.directive('validNumber', function() {
      return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          if(!ngModelCtrl) {
            return; 
          }

          ngModelCtrl.$parsers.push(function(val) {
            if (angular.isUndefined(val)) {
                var val = '';
            }
            var clean = val.replace(/[^0-9\.]/g, '');
            var decimalCheck = clean.split('.');

            if(!angular.isUndefined(decimalCheck[1])) {
                decimalCheck[1] = decimalCheck[1].slice(0,2);
                clean =decimalCheck[0] + '.' + decimalCheck[1];
            }

            if (val !== clean) {
              ngModelCtrl.$setViewValue(clean);
              ngModelCtrl.$render();
            }
            return clean;
          });

          element.bind('keypress', function(event) {
            if(event.keyCode === 32) {
              event.preventDefault();
            }
          });
        }
      };
    });
	app.directive('ngMin', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMin, function(){
                if (ctrl.$isDirty) ctrl.$setViewValue(ctrl.$viewValue);
            });

            var isEmpty = function (value) {
               return angular.isUndefined(value) || value === "" || value === null;
            }

            var minValidator = function(value) {
              var min = scope.$eval(attr.ngMin) || 0;
              if (!isEmpty(value) && value < min) {
                ctrl.$setValidity('ngMin', false);
                return undefined;
              } else {
                ctrl.$setValidity('ngMin', true);
                return value;
              }
            };

            ctrl.$parsers.push(minValidator);
            ctrl.$formatters.push(minValidator);
        }
    };
});

app.directive('ngMax', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elem, attr, ctrl) {
            scope.$watch(attr.ngMax, function(){
                if (ctrl.$isDirty) ctrl.$setViewValue(ctrl.$viewValue);
            });
            var maxValidator = function(value) {
              var max = scope.$eval(attr.ngMax) || Infinity;
              if (!isEmpty(value) && value > max) {
                ctrl.$setValidity('ngMax', false);
                return undefined;
              } else {
                ctrl.$setValidity('ngMax', true);
                return value;
              }
            };

            ctrl.$parsers.push(maxValidator);
            ctrl.$formatters.push(maxValidator);
        }
    };
});

app.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ title | translate }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)			  
            $(element).modal('show');
          else		
			$(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
})();