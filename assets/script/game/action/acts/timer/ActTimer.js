/*
 * @Description: In User Settings Edit
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-30 13:53:08
 * @LastEditTime: 2019-04-30 14:05:15
 */

let Timer = require("Timer")

cc.Class({
    extends: Timer,

    name : 'ActTimer',

    properties: {
        use_grade_time : {
            default : false,
            tooltip : "使用技能配置中的时间",
        },

        time_duration : {
            default: 0,
            type : cc.Float, 
            tooltip : "持续时间",
            override : true,
            visible() {
                return this.use_grade_time == false;
            },
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
