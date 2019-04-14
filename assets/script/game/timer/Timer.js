/*
 * @Description: 定时器
 * @Author: mengjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-14 22:07:06
 */

let Unit = require("Unit")

cc.Class({
    extends: Unit,

    name : "Timer",

    properties: {
        time_duration : {
            default: -1,
            type : cc.Float, 
            tooltip : "持续时间",
        },

        time_interval : {
            default: 0,
            type : cc.Float, 
            tooltip : "间隔",
        },

        timer_active : {
            default: false,
            // type : cc.Float, 
            tooltip : "是否是活跃的",
            visible : false,
        },

        time_delay : {
            default: cc.Float,
            // type : cc.Float, 
            tooltip : "延迟",
            visible : false,
        },

        timer_current : {
            default: cc.Float,
            // type : cc.Float, 
            tooltip : "当前",
            visible : false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    ctor () {

    },

    onLoad () {
        this._super();
    },

    start () {

    },

    begin(duration, interval, callback)
    {
        this.timer_active = true;
        this.timer_current = 0;
        this.time_delay = 0;

        this.time_duration = duration;
        this.time_interval = interval;
        this._callback = callback;
    },

    rebegin()
    {
        this.timer_active = true;
        this.timer_current = 0;
        this.time_delay = 0;
    },

    update (dt) {
        if (this.timer_active == false) {
            return;
        }
        this.timer_current += dt;
        this.time_delay += dt;

        if (this.time_delay >= this.time_interval && this.time_interval > -1) {
            this.time_delay = 0;
            if (this._callback) {
                this._callback()
            }
        }

        if (this.timer_current >= this.time_duration && this.time_duration > -1) {
            this.timer_active = false;
        }
        
    },
});
