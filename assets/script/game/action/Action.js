/*
 * @Description: 动作类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-14 23:39:44
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
        conditions : {
            default: [],
            type : [Condition], 
            tooltip : "动作-条件列表",
        },

        formula : {
            default: FormulaEnum.none_function,
            type : cc.Enum(FormulaEnum), 
            tooltip : "执行函数",
        },

        implements : {
            default: [],
            type : [Implement], 
            tooltip : "动作-参数列表",
        },

        timer : {
            default: null,
            type : Timer, 
            tooltip : "动作-计时器",
        },

        action_desc : {
            default : '',
            tooltip : "动作描述",
            multiline : true,
            readonly : true,
            visible : false,
            serializable: false,
        },
    },

    ctor () {

    },

    getActionDesc()
    {
        this.action_desc = '';

        var condDesc = '\n      条件:\n';
        for (let index = 0; index < this.conditions.length; index++) {
            const condition = this.conditions[index];
            condDesc += '         条件[' + (index) + '] : ' + condition.getConditionDesc() + '\n'; 
        }

        if (this.conditions.length <= 0) {
            condDesc += '         无';
        }

        var implDesc = '      执行:\n';
        for (let index = 0; index < this.implements.length; index++) {
            const implement = this.implements[index];
            implDesc += '         动作[' + (index) + '] : ' + implement.getImplementDesc() + '\n'; 
        }

        if (this.implements.length <= 0) {
            implDesc += '         无';
        }

        this.action_desc += condDesc;
        this.action_desc += implDesc;

        return this.action_desc;
    },

    // update (dt) {},
});
