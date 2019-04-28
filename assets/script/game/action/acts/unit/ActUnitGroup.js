/*
 * @Description: 动作位组
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-28 09:52:57
 * @LastEditTime: 2019-04-28 16:26:26
 */

let Condition = require("Condition")
let Act = require("Act")
let ActRegion = require("ActRegion")

cc.Class({
    // extends: cc.Component,

    name : 'ActUnitGroup',

    properties: {

        use_region : {
            default : false,
            tooltip : "是否使用区域",
        },

        act_region : {
            default : null,
            type : ActRegion,
            tooltip : "使用区域",
            visible() {
                return this.use_region;
            },
        },

        pick_conditions : {
            default: [],
            type : [Condition], 
            tooltip : "挑选单位条件",
        },

        loop_actions : {
            default: [],
            type : [Act], 
            tooltip : "每个挑选的单位动作",
        },

        // act_timer : {
        //     default: null,
        //     type : Timer, 
        //     tooltip : "计时器",
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
