const mongoose=require('mongoose');
const menuItemSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    taste:{
        type:String,
        require:true,
        enum: ['sweet','spicy','sour'],
    },
    is_drink:{
        type:Boolean,
        default:false,
    },
ingredients:{
    type :[String],
    default:[],
},
num_sales:{
    type:Number,
    default:0,
},

});
const MenueItem=mongoose.model('menu',menuItemSchema);
module.exports=MenueItem;