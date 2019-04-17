/*
 * @Description: Buff类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-17 16:45:10
 */


let Timer = require("Timer")
let Item = require("Item")
let Action = require("Action")
let BuffMgr = require("BuffMgr")
let EventDef = require("EventDef")
let ActionHandle = require("ActionHandle")

let EventType = EventDef.EventType;

cc.Class({
    extends: Item,

    name : "Buff",

    properties: {
        buff_action : {
            default: null,
            type : Action, 
            tooltip : "buff-动作",
        },

        buff_timer : {
            default: null,
            type : Timer, 
            tooltip : "buff-计时器",
        },

        buff_msg : {
            default: null,
            // type : Timer, 
            tooltip : "buff-信息",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onEnter () {
        // console.log('Buff onLoad')
        this._super();
        BuffMgr.pushBuff(this);

        if (this.buff_timer) {
            this.buff_timer.onEnter();
        }
    },

    onExit () {
        console.log('Buff onDestroy');
        this._super();
        BuffMgr.removeBuff(this);

        if (this.buff_timer) {
            this.buff_timer.onExit();
        }
    },

    start () {

    },

    onHandle()
    {
        // console.log(this.buff_msg);
        console.log('触发！！！', '[' + EventType[this.buff_msg.event_type] + "]", new Date());
        ActionHandle.excuteAction(this.buff_msg, this.buff_action);
    },

    init(msg, action)
    {
        this.buff_msg = msg;
        this.buff_action = action;

        this.buff_timer = action.action_timer.clone();
        this.buff_timer.setCallBack(this.onHandle.bind(this));
    },

    update (dt) {
        if (this.buff_timer && this.buff_timer.unit_active == false) {
            this.onExit();
        }
    },
});
