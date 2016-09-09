/**
 * Created by xu on 2016/9/6.
 */
var QRScanner = Vue.component('qrScanner', {
    template: '#qr-template',
    data() {
        return {
            vedio: '',
            canvas: '',
            context: '',
            stopScan: null,
            errorMes: '',
            result: ''
        }
    },
    ready() {
        window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        this.vedio = document.getElementById('qr-vedio');
        this.canvas = document.getElementById('qr-canvas');
        this.context = this.canvas.getContext('2d');

        // Call the getUserMedia method with our callback functions
        if (navigator.getUserMedia) {
            var _that = this;
            var videoSource = [];
            navigator.mediaDevices.enumerateDevices().then((function (sourceInfos) {
                var i;
                for (i = 0; i != sourceInfos.length; ++i) {
                    var sourceInfo = sourceInfos[i];
                    if (sourceInfo.kind === 'videoinput' && sourceInfo.label.indexOf('back') != -1) {
                        videoSource.push(sourceInfo.deviceId);
                    }
                }
                var successCallback = function(stream){
                    _that.vedio.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
                    window.localMediaStream = stream;
                    _that.vedio.addEventListener("loadstart", function () {
                        _that.vedio.play();
                    }, false);
                    _that.stopScan = setInterval(_that.scan, 500);
				}

                navigator.getUserMedia({video: {
                    optional: [{sourceId: videoSource[0]}]
                }}, successCallback, function(e){
                   console.log(e);
                });
            }));

        } else {
            this.errorMes = 'Native web camera streaming (getUserMedia) not supported in this browser.';
        }

        qrcode.callback = function (data) {
            this.result = data;
            alert('catch');
            if (window.localMediaStream) {
                window.localMediaStream.stop();
            }
            if (this.stopScan) {
                clearInterval(this.stopScan);
            }
        };

    },
    methods: {
        scan: function () {
            if (window.localMediaStream) {
                this.context.drawImage(this.vedio, 0, 0,100,100);
            }
            try {
                qrcode.decode();
            } catch (e) {
                console.log('decode has error');
            }
        }
    }
})  


var demo = new Vue({
  el: '#qr      '
})