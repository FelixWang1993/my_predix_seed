define(['angular', './sample-module'], function(angular, sampleModule,dropzone) {
		    'use strict';
		    return sampleModule.controller('HistoryFileCtrl', ['$scope','$http', function($scope,$http,$stateParams) {
		    	 var updateLatheStatus = function(){
		    	 	$http.get('/api/blob/v1/blob').success(function(data){
                    $scope.bimages=data;
              });
		    	 };

		    	 setInterval(function(){
            $scope.$apply(updateLatheStatus);
        },300000);

        updateLatheStatus();
        $scope.deleteFile=function(bimage){
        	alert(bimage+" delete clicked");
        	$http({
        		method:"DELETE",
        		url:"/api/blob/v1/blob"+bimage
        	}).success(function(){
        		alert('Successfully deleted file: ' + bimage);
        	}).error(function(){
        		alert('Error deleting file: ' + bimage);
                console.log(request.responseText);
                location.reload();
        	}).then(function(){
				$scope.bimages.remove(bimage);
        	});
        }
		    }]);
		});