/*
 * @Description: 计时器可视化组件
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-24 09:07:24
 * @LastEditTime: 2019-04-24 09:14:26
 */

 let Timer = require("Timer")

cc.Class({
    extends: Timer,

    name : 'TimerUnit',

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    getTimerDesc()
    {
        return '时间间隔:[' + this.time_interval + '] ' + '持续时间:[' + this.time_duration + ']';
    },

    // update (dt) {},
});
