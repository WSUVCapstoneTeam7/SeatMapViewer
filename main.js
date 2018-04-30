 /*jshint esversion: 6 */
 const fabCanvas = new fabric.Canvas('c');
 
 fabCanvas.setWidth(window.innerWidth);
 fabCanvas.setHeight(window.innerHeight);

 fabCanvas.on('object:selected', function(e){
    if(e.target.type=="circle") {
        bus.$emit('sigAddSeatPopup', [e.target.oCoords.mt.x, e.target.oCoords.mt.y, e.target.width, e.target.price]);
    }
});

fabCanvas.on('mouse:down', function(opt) {
  if(!fabCanvas.getActiveObject()){
        $(".popup").remove();
    }
});

function buySeating() {
    bus.$emit('sigBuySeating',[]);
};

function cancelBuying() {
    $(".popup").remove();
}

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
        addSeatPopupMenu(x,y,w, price) {
            $(".popup").remove();
            var btnLeft = x;
            var btnTop = y - 25;
            var widthadjust=w/2;
            btnLeft = widthadjust+btnLeft-25;
            var popup = "<ul id='popup' class='popup' style='position:absolute;top:"+btnTop+"px;left:"+btnLeft+"px;cursor:pointer;'>" +
                            '<h3 type="price", class="price", id="price"">Price: $'+price+'</h3>' +
                            '<button class="btn" type="button", onclick="buySeating()">Buy</button>' +
                            '<button class="btn" type="button", onclick="cancelBuying()">Cancel</button>' +
                        "</ul>";
            $(".canvas-container").append(popup);
        },
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
        bus.$on('sigAddSeatPopup', (args)=>{
            this.addSeatPopupMenu(args[0], args[1], args[2], args[3]);
        });
        bus.$on('sigBuySeating', (args)=>{
            this.buySeat();
        })
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
             bus.$emit('sigBuySeatFormOn', object, object.price);   //TODO: price and color of original object
             /*if (object.fill != "gray") { //"Gray", as in the cultural perception of what is colorless enough.
                 object.selectable = false;
             }*/
         }
     },
     created(){
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
                    //CNF: Disable any text objects.
                    if(object.get('type') ==='text' || object.get('type') ==='i-text') {
                        //object.selectable = false; 
                        object.editable = false;
                    }
                    if (object.price != undefined) {
                        object.selectable = true;
                        //Info on 'selected' from https://github.com/kangax/fabric.js/wiki/Working-with-events
                        object.on('selected', function (opt) {
                            vm.menuPopperUpper(object);
                        });
                    }
                    fabCanvas.add(object);
                    fabCanvas.renderAll();
                })
            })
        });
    }
});