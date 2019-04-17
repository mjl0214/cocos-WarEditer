/*
 * @Description: 物品类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-17 14:24:20
 */


let Unit = require("Unit")
let UnitDef = require("UnitDef")

cc.Class({
    extends: Unit,

    properties: {
        unit_type : {
            default: UnitDef.TypeID.item,
            type : cc.Enum(UnitDef.TypeID), 
            tooltip : "UnitID",
            readonly : true,
            override : true,
        },
    },

    onEnter () {
        this._super();
    },

    onExit () {
        // console.log('Item onDestroy')
        this._super();
    },

    ctor () {

    },

    update (dt) {
        
    },
});