/*
 * @Description: In User Settings Edit
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-28 16:19:40
 * @LastEditTime: 2019-04-28 16:31:54
 */

let ActDef = require("ActDef")

cc.Class({
    // extends: cc.Component,

    name : 'ActRegion',

    properties: {
        center_x : {
            default: ActDef.LocationType.nothing,
            type : cc.Enum(ActDef.LocationType), 
            tooltip : "中心x",
        },

        center_y : {
            default: ActDef.LocationType.nothing,
            type : cc.Enum(ActDef.LocationType), 
            tooltip : "中心y",
        },

        region_radius : {
            default: 0,
            type : cc.Integer, 
            tooltip : "半径",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
