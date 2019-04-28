/*
 * @Description: In User Settings Edit
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-28 11:04:11
 * @LastEditTime: 2019-04-28 12:00:37
 */

// let ActBase= require("ActBase")
let Event = require("Event")
let Condition = require("Condition")
let IfCondition = require("IfCondition")
let ElseCondition = require("ElseCondition")

cc.Class({
    // extends: cc.Component,

    name : 'ActCondition',

    properties: {
        if_conditions : {
            default: null,
            type : IfCondition, 
            tooltip : "if条件",
        },

        else_conditions : {
            default: [],
            type : [ElseCondition],
            tooltip : "else条件",
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
