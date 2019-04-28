/*
 * @Description: In User Settings Edit
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-28 11:18:50
 * @LastEditTime: 2019-04-28 12:32:15
 */

let Act = require("Act")
let Condition = require("Condition")

cc.Class({
    // extends: cc.Component,

    name : 'IfCondition',

    properties: {
        act_conditions : {
            default: [],
            type : [Condition], 
            tooltip : "条件",
        },

        act_actions : {
            default: [],
            type : [Act], 
            tooltip : "动作",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
