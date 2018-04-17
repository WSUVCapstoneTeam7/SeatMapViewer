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
            var element = (dataArray[1]);
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
        $.getJSON("./seat-map.json", function (data) {
            console.log(data);
            fabCanvas.loadFromJSON(data);
            var groups = Array.from(fabCanvas.getObjects());
            console.log(groups);
            groups.forEach((section) => {
                //console.log(section);
                section._restoreObjectsState();
                var sectionObjects = Array.from(section.getObjects());
                fabCanvas.remove(section);
                sectionObjects.forEach((object) => {
                    //CNF: Object is selectable but not editable besides purchasing.
                    console.log("Object")
                    console.log(object);
                    object.lockScalingX = object.lockScalingY = true;
                    object.lockMovementX = object.lockMovementY = true;
                    object.lockRotation = true;
                    object.selectable = object.hasControls = false;
                    object.dirty = true;
                    if (object.price != undefined) {
                        object.selectable = true;
                    }
                    fabCanvas.add(object);
                    fabCanvas.renderAll();
                })
            })
            /*// ungroup objects in group
            var groupItems = [];
            var ungroup = function (group) {
                // console.log("in ungroup()");
                groupItems = group._objects;
                group._restoreObjectsState();

                for (var n = 0; n < 10; n++) {
                    fabCanvas.remove(group);
                    for (var i = 0; i < groupItems.length; i++) {
                        fabCanvas.add(groupItems[i]);
                        items[i].dirty = true;
                        fabCanvas.item(fabCanvas.size() - 1).hasControls = false;
                    }
                    // if you have disabled render on addition
                    fabCanvas.renderAll();
                }
            };*/
        });
    }
});