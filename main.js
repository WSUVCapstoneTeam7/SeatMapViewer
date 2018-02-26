/*jshint esversion: 6 */
const fabCanvas = new fabric.Canvas('c');

fabCanvas.setWidth(window.innerWidth);
fabCanvas.setHeight(window.innerHeight);

var vm = new Vue({
    el: '#vue-app',
    data:{
        mapData:{},
    },
    methods:{
        
    },
    created(){
        // loads a canvas instance from the data store in seat-map.json
        $.getJSON( "./seat-map.json", function( data ) {
            fabCanvas.loadFromJSON(data);
            console.log("sup");
            fabCanvas.forEachObject(function(object){ 
                object.selectable = false; 
            });
        });

        
    }
});