/*
 * @Description: 动作类可视化组件
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-23 14:52:16
 * @LastEditTime: 2019-04-24 16:11:27
 */



let ConditionUnit = require("ConditionUnit")
let Implement = require("Implement")
let FormulaTool = require("FormulaTool")
let TimerUnit = require("TimerUnit")
let Action = require("Action")

let FormulaEnum = FormulaTool.FormulaEnum;

cc.Class({
    extends: Action,

    name : 'ActionUnit',

    properties: {

        action_conditions : {
            default: [],
            type : [ConditionUnit], 
            tooltip : "动作-条件列表",
            override : true,
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

        action_timer : {
            default: null,
            type : TimerUnit, 
            tooltip : "动作-计时器",
            override : true,
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
        for (let index = 0; index < this.action_conditions.length; index++) {
            const condition = this.action_conditions[index];
            condDesc += '         条件[' + (index) + '] : ' + condition.getConditionDesc() + '\n'; 
        }

        if (this.action_conditions.length <= 0) {
            condDesc += '         无\n';
        }

        var implDesc = '      参数:\n';
        for (let index = 0; index < this.action_implements.length; index++) {
            const implement = this.action_implements[index];
            implDesc += '         参数[' + (index) + '] : ' + implement.getImplementDesc() + '\n'; 
        }

        if (this.action_implements.length <= 0) {
            implDesc += '         无\n';
        }

        var timerDesc = '      计时器:\n';
        if (this.action_timer) {
            timerDesc += '         ';
            timerDesc += this.action_timer.getTimerDesc();
        }

        this.action_desc += condDesc;
        this.action_desc += ('      函数:\n        ' + this.formula_desc + '\n');
        this.action_desc += implDesc;
        this.action_desc += timerDesc;

        return this.action_desc;
    },

    _setFormulaDesc()
    {
        if (this.action_formula == FormulaEnum.none_function) {
            this.formula_desc = '不使用函数';
        }
        else if (this.action_formula == FormulaEnum.attack_damage_function01) {
            this.formula_desc = '简单伤害计算函数(攻击-护甲)'
                + '(参数列表:'
                + '[damage_source]'
                + ' [damage_value]'
                + ')';
        }
        else if (this.action_formula == FormulaEnum.attack_damage_function02) {
            this.formula_desc = '伤害计算函数'
                + '(参数列表:'
                + '[damage_source]'
                + ' [damage_value]'
                + ')';
        }
        else if (this.action_formula == FormulaEnum.buff_function) {
            this.formula_desc = 'buff加持函数'
                + '(参数列表:'
                + '[AttributeType]'
                + ')';
        }
    },

    // update (dt) {},
});
