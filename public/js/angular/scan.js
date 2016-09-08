(function(){
	'use strict';

	angular.module('qrScanner', ["ng"]).directive('qrScanner', ['$interval', '$window', function($interval, $window){
		return {
			restrict : 'E',
			scope : {
				ngSuccess : '&ngSuccess',
				ngError : '&ngError',
				ngVideoError : '&ngVideoError'
			},
			link : function(scope, element, attrs){

				window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
				navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

				var height = attrs.height || 320;
				var width = attrs.width || 240;

				var video = $window.document.createElement('video');
				video.setAttribute('autoplay', '');
				video.setAttribute('width', width);
				video.setAttribute('height', height);
				//video.setAttribute('style', '-moz-transform:rotateY(-180deg);-webkit-transform:rotateY(-180deg);transform:rotateY(-180deg);');
				var canvas = $window.document.createElement('canvas');
				canvas.setAttribute('id', 'qr-canvas');
				canvas.setAttribute('width', width);
				canvas.setAttribute('height', height);
				canvas.setAttribute('style', 'display:none;');

				angular.element(element).append(video);
				angular.element(element).append(canvas);
				var context = canvas.getContext('2d');
				var stopScan;

				var scan = function(){
					if($window.localMediaStream){
						context.drawImage(video, 0, 0, 100, 100);
						try{
							qrcode.decode();
						} catch (e) {
							scope.ngError({error : e});
						}
					}
				}

				var successCallback = function(stream){
					video.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
					$window.localMediaStream = stream;

					scope.video = video;
					video.addEventListener("loadstart", function(){
						video.play();
					}, false);
					stopScan = $interval(scan, 500);
				}

				// Call the getUserMedia method with our callback functions
				if(navigator.getUserMedia){
					var videoSource = [];
					navigator.mediaDevices.enumerateDevices().then((function(sourceInfos){
						var i;
						for(i = 0; i != sourceInfos.length; ++i){
							var sourceInfo = sourceInfos[i];
							if(sourceInfo.kind === 'videoinput' && sourceInfo.label.indexOf('back') != -1){
								videoSource.push(sourceInfo.deviceId);
							}
						}

						navigator.getUserMedia({video: {
							optional: [{sourceId: videoSource[0]}]
						}}, successCallback, function(e){
							scope.ngVideoError({error : e});
						});


					}));

				} else {
					scope.ngVideoError({error : 'Native web camera streaming (getUserMedia) not supported in this browser.'});
				}

				qrcode.callback = function(data){
					scope.ngSuccess({data : data});
				};

				element.bind('$destroy', function(){
					if($window.localMediaStream){
						$window.localMediaStream.stop();
					}
					if(stopScan){
						$interval.cancel(stopScan);
					}
				});


			}
		}
	}]);
})();