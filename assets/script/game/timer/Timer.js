/*
 * @Description: 定时器
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-29 13:54:08
 */

let Unit = require("Unit")
let UnitDef = require("UnitDef")
let TimerMgr = require("TimerMgr")

cc.Class({
    extends: Unit,

    name : "Timer",

    properties: {
        unit_type : {
            default: UnitDef.TypeID.timer,
            type : cc.Enum(UnitDef.TypeID), 
            tooltip : "Unit类型",
            readonly : true,
            override : true,
        },

        time_interval : {
            default: 0,
            type : cc.Float, 
            tooltip : "间隔",
        },

        time_duration : {
            default: 0,
            type : cc.Float, 
            tooltip : "持续时间",
        },

        time_delay : {
            default: 0,
            type : cc.Float, 
            tooltip : "延迟",
            visible : false,
        },

        timer_current : {
            default: 0,
            type : cc.Float, 
            tooltip : "当前",
            visible : false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    ctor () {
        /*
        * 说明
        * interval >= 0 (call at first)
        * interval > 0  duration > 0 (call every interval)
        * interval -1  duration > 0 (call at end)
        */
    },

    onEnter () {
        this._super();
        TimerMgr.pushTimer(this);

        // console.log('timer onEnter', new Date());
        if (this.time_interval >= 0) {
            this.doCall();
        }
    },

    onExit () {
        this._super();
        TimerMgr.removeTimer(this);
    },

    start () {

    },

    setCallBack(callback)
    {
        this._callback = callback;
    },

    clone()
    {
        var timer = new (this.constructor);
        timer.time_duration = this.time_duration;
        timer.time_interval = this.time_interval;
        // if (this.time_interval > 0) {
        //     timer.time_delay = this.time_interval;
        // }
        
        return timer;
    },

    begin(duration, interval, callback)
    {
        this.unit_active = true;
        this.timer_current = 0;
        this.time_delay = 0;

        this.time_duration = duration;
        this.time_interval = interval;
        this._callback = callback;
    },

    rebegin()
    {
        this.unit_active = true;
        this.timer_current = 0;
        this.time_delay = 0;
    },

    doCall()
    {
        console.log('doCall！！！', new Date());
        if (this._callback) {
            this._callback()
        }
    },

    update (dt) {
        if (this.unit_active == false) {
            return;
        }
        this.timer_current += dt;
        this.time_delay += dt;

        if (this.time_delay >= this.time_interval && this.time_interval > 0) {
            this.time_delay = 0;
            this.doCall();
        }

        if (this.timer_current >= this.time_duration && this.time_duration >= 0) {
            if (this.time_interval > 0 || this.time_interval == -1) {
                this.doCall();
            }
            this.unit_active = false;
        }
        
    },
});
