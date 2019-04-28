/*
 * @Description: In User Settings Edit
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-28 12:28:51
 * @LastEditTime: 2019-04-28 14:13:16
 */


let ActDef = require("ActDef")
let ActUnit = require("ActUnit")
let Timer = require("Timer")
// let ActUnitGroup = require("ActUnitGroup")
// let ActCondition = require("ActCondition")

cc.Class({
    
    name : 'Act',

    properties: {
        act_type : {
            default: ActDef.ActType.none,
            type : cc.Enum(ActDef.ActType),
            tooltip : "动作类型类型:\n unit 单位\n unit_group 单位组\n condition 条件\n custom_script 自定义脚本\n",
            // readonly : true,
            // override : true,
        },

        act_unit : {
            default : null,
            type : ActUnit,
            tooltip : "单位",
            visible() {
                return this.act_type == ActDef.ActType.unit;
            },
        },

        act_timer : {
            default: null,
            type : Timer, 
            tooltip : "计时器",
        },

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
