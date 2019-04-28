/*
 * @Description: 动作基类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-28 10:13:40
 * @LastEditTime: 2019-04-28 12:48:04
 */

let ActDef = require("ActDef")
let Act = require("Act")
let ActUnitGroup = require("ActUnitGroup")
let ActCondition = require("ActCondition")

cc.Class({
    extends: Act,
    name : 'ActBase',

    properties: {
        // act_type : {
        //     default: ActDef.ActType.none,
        //     type : cc.Enum(ActDef.ActType),
        //     tooltip : "动作类型类型:\n unit 单位\n unit_group 单位组\n condition 条件\n",
        //     // readonly : true,
        //     // override : true,
        // },

        // act_unit : {
        //     default : null,
        //     type : ActUnit,
        //     tooltip : "单位",
        //     visible() {
        //         return this.act_type == ActDef.ActType.unit;
        //     },
        // },

        act_unit_group : {
            default : null,
            type : ActUnitGroup,
            tooltip : "单位组",
            visible() {
                return this.act_type == ActDef.ActType.unit_group;
            },
        },

        act_condition : {
            default : null,
            type : ActCondition,
            tooltip : "条件",
            visible() {
                return this.act_type == ActDef.ActType.condition;
            },
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
