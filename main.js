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
        $.getJSON("./seat-map.json", function (data) {
            console.log(data);
            //vm.loadDataToFabCanvas(dataArray);
            //var element =(data[1]);
            //var price = element.price;
            /*if (price == null) {
                console.log("loadDataToFabCanvas: No price");
                //fabCanvas.loadFromJSON(element);
                fabCanvas.add(element);
                console.log(element);
            } else {
                console.log("loadDataToFabCanvas: GOT PRICE! YAY!");
                console.log(price);
            }*/
            fabCanvas.loadFromJSON(data);
            /*fabCanvas.forEachObject(function (object) {
                console.log("Object");
                console.log(object);
                object.lockMovementX = true;
                object.lockMovementY = true;
                object.lockRotation = true;
                object.selectable = true;
            });*/
            var groups = fabCanvas.getObjects();
            console.log(groups);
            groups.forEach((section) => {
                console.log(section);
                var sectionObjects = Array.from(section.getObjects());
                sectionObjects.forEach((object) => {
                    //CNF: Disable scaling!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                    object.hasControls = false;
                    object.hasBorders = false;
                    object.lockMovementX = true;
                    object.lockMovementY = true;
                    object.lockRotation = true;
                    object.selectable = true;
                    if (section.sectionType == "generalArea") {
                        console.log("generalArea");
                        if (object.type == "rect") {
                            console.log("Object rect");
                        }
                    }
                })
            })
            /*// ungroup objects in group
            var groupItems = [];
            var ungroup = function (group) {
                // console.log("in ungroup()");
                groupItems = group._objects;
                group._restoreObjectsState();
                

                fabCanvas.remove(group);
                for (var i = 0; i < groupItems.length; i++) {
                    fabCanvas.add(groupItems[i]);
                    items[i].dirty = true;
                    fabCanvas.item(fabCanvas.size()-1).hasControls = false;
                }
                // if you have disabled render on addition
                fabCanvas.renderAll();
            };*/
        });
    }
});