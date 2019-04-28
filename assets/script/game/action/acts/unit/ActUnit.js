/*
 * @Description: 动作单位
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-28 09:52:57
 * @LastEditTime: 2019-04-28 14:27:33
 */

let ActDef = require("ActDef")
// let Timer = require("Timer")
let ActParameter = require("ActParameter")
let FormulaTool = require("FormulaTool")


let FormulaEnum = FormulaTool.FormulaEnum;

cc.Class({
    // extends: cc.Component,

    name : 'ActUnit',

    properties: {
        unit_type : {
            default: ActDef.UnitType.unit_none,
            type : cc.Enum(ActDef.UnitType),
            tooltip : "单位类型",
            // readonly : true,
            // override : true,
        },

        act_formula : {
            default: FormulaEnum.none_function,
            type : cc.Enum(FormulaEnum), 
            tooltip : "执行函数",
        },

        act_parameters : {
            default: [],
            type : [ActParameter],
            tooltip : "参数列表",
            // readonly : true,
            // override : true,
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
