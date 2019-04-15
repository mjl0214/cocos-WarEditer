/*
 * @Description: 动作类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-15 10:11:56
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
            tooltip : "动作-执行函数",
            notify() {
                this._setFormulaDesc();
            },
        },

        formula_desc : {
            default: '',
            tooltip : "执行函数描述",
            multiline : true,
            readonly : true,
            visible() {
                this._setFormulaDesc();
                return true;
            },
            serializable: false,
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

    _setFormulaDesc()
    {
        if (this.formula == FormulaEnum.none_function) {
            this.formula_desc = '不使用函数';
        }
        else if (this.formula == FormulaEnum.damage_function01) {
            this.formula_desc = '普通伤害计算函数\n'
                + '   参数列表:\n'
                + '     [damage_source]\n'
                + '     [damage_value]\n'
                + '';
        }
    },

    // update (dt) {},
});
