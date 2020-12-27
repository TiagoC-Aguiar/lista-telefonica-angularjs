angular.module("listaTelefonica").provider("serialGenerator", function (config) {
    let _length = 8;

    this.getLength = function () {
        return _length;
    };

    this.setLength = function (length) {
        _length = length
    };

    this.$get = function () {
        return {
            generate: function () {             
                let serial = "";
                while(serial.length < _length) {
                    serial += String.fromCharCode(Math.floor(Math.random() * 64) + 32);
                }
                return serial;
            }  
        };
    };
});
