/*jshint esversion: 6 */
const fabCanvas = new fabric.Canvas('c');

fabCanvas.setWidth(window.innerWidth);
fabCanvas.setHeight(window.innerHeight);

var vm = new Vue({
    el: '#vue-app',
    data: {
        mapData: {},
    },
    methods: {
        loadDataToFabCanvas(dataArray) {
            var element =(dataArray[1]);
            var price = element.price;
            if (price == null) {
                console.log("loadDataToFabCanvas: No price");
                fabCanvas.loadFromJSON(element);
                console.log(element);
            } else {
                console.log("loadDataToFabCanvas: GOT PRICE! YAY!");
                console.log(price);
            }
        }
    },
    created() {
        // loads a canvas instance from the data store in seat-map.json
        $.getJSON("./seat-map.json", function (dataArray) {
            console.log(dataArray);
            //vm.loadDataToFabCanvas(dataArray);
            var element =(dataArray[1]);
            var price = element.price;
            if (price == null) {
                console.log("loadDataToFabCanvas: No price");
                //fabCanvas.loadFromJSON(element);
                fabCanvas.add(element);
                console.log(element);
            } else {
                console.log("loadDataToFabCanvas: GOT PRICE! YAY!");
                console.log(price);
            }
            fabCanvas.forEachObject(function (object) {
                console.log("Object");
                console.log(object);
                object.lockMovementX = true;
                object.lockMovementY = true;
                object.lockRotation = true;
                object.selectable = true;
            });
        });


    }
});