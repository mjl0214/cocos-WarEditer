/*
 * @Description: 动作类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-24 13:48:09
 */


let Condition = require("Condition")
let Implement = require("Implement")
let FormulaTool = require("FormulaTool")
let Timer = require("Timer")

let FormulaEnum = FormulaTool.FormulaEnum;

cc.Class({
    // extends: cc.Component,

    name : 'Action',

    properties: {
        action_conditions : {
            default: [],
            type : [Condition], 
            tooltip : "动作-条件列表",
        },

        action_formula : {
            default: FormulaEnum.none_function,
            type : cc.Enum(FormulaEnum), 
            tooltip : "动作-执行函数",
        },

        action_implements : {
            default: [],
            type : [Implement], 
            tooltip : "动作-参数列表",
        },

        action_timer : {
            default: null,
            type : Timer, 
            tooltip : "动作-计时器",
        },

        action_trigger_actorId : {
            default: -1,
            type : cc.Integer, 
            tooltip : "动作-触发者ID",
            visible : false,
        },
    },

    ctor () {

    },

    // update (dt) {},
});
