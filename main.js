 /*jshint esversion: 6 */
 const fabCanvas = new fabric.Canvas('c');
 
 fabCanvas.setWidth(window.innerWidth);
 fabCanvas.setHeight(window.innerHeight);
 
//CNF: All this is new to this branch
Vue.component('buy-form',{
    template: '#buy-form',
    data(){
        return{
            price: 0,
            showBuySeatForm: false,
            bought: false,
        };
    },
    methods:{
        buySeat(){
            console.log("buySeat!");
            alert("Bought seat!");  //TODO: Just for now.
            // set toggle the seating forms visibility since the seating section has been created.
            this.showBuySeatForm = false;
            //TODO: CHANGE COLORS! 
        },
        cancel(){
            console.log("canceled!")
            this.showBuySeatForm = false;
        }
    },
    // function that launches when Forms component is created
    // signal listeners must be initialized on component creation
    created(){
        //this.showBuySeatForm = vm.showBuySeatForm;
        // a "bus stop" signal listener for toggling the visibility of the add seating form.
        bus.$on('sigBuySeatFormOn', (object, price)=>{
            this.price = price;
            this.showBuySeatForm = true;
            console.log("sigBuySeatFormOn");
        });
        // a bus listener for toggling the visibility of both forms when 
        // the delete seating signal is received.
        bus.$on('sigBuySeatFormOff',()=>{
            this.showBuySeatForm = false;
        });
    } 
});
//CNF: End of new additions.

var bus = new Vue();

 var vm = new Vue({
     el: '#vue-app',
     data:{
         mapData:{},
     },
     methods:{
         menuPopperUpper(object) {
             console.log("MenuPopperUpper");
             //this.showBuySeatForm = true;
             bus.$emit('sigBuySeatFormOn', object, 1000);   //TODO: price and color of original object
             /*if (object.fill != "gray") { //"Gray", as in the cultural perception of what is colorless enough.
                 object.selectable = false;
             }*/
         }
     },
     created(){
         // loads a canvas instance from the data store in seat-map.json
         $.getJSON( "./seat-map.json", function( data ) {
             fabCanvas.loadFromJSON(data);
             console.log("sup");
             fabCanvas.forEachObject(function(object){ 
                object.lockMovementX = true;
                object.lockMovementY = true;
                object.lockRotation = true;
                object.selectable = true; 

                //Info on 'selected' from https://github.com/kangax/fabric.js/wiki/Working-with-events
                object.on('selected', function (opt) {
                    console.log("Seats selected");
                    vm.menuPopperUpper(object);
                    console.log("opt and object");
                    console.log(opt);
                    console.log(object);
                    //alert("You are awesome!");
                });
             });
         });
     }
});