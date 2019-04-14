/*
 * @Description: 物品类
 * @Author: mengjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-12 23:18:30
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

    onLoad () {
        this._super();
    },

    ctor () {

    },

    update (dt) {
        
    },
});