/*
 * @Description: Buff类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-24 14:44:57
 */


let Timer = require("Timer")
let Item = require("Item")
let Action = require("Action")
let BuffMgr = require("BuffMgr")
let EventDef = require("EventDef")
let SkillDef = require('SkillDef')
let FormulaHandle = require("FormulaHandle")
let Attribute = require("Attribute")
let ActionDef = require("ActionDef")

let EventType = EventDef.EventType;

cc.Class({
    extends: Item,

    name : "Buff",

    properties: {
        attributes : {
            default: [],
            type : [Attribute], 
            tooltip : "属性列表",
        },

        buff_holdId : {
            default: -1,
            type : cc.Integer, 
            tooltip : "buff-持有者",
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
        // console.log('触发！！！', '[' + EventType[this.buff_msg.event_type] + "]", new Date());
        FormulaHandle.executeAction(this.buff_msg, this.buff_action);
        // console.log(ActionHandle);
    },

    init(msg, action, buff_hold)
    {
        this.buff_msg = msg;
        this.buff_action = action;
        this.buff_hold = buff_hold;
        this.buff_type = msg.skill_id;

        this.buff_timer = action.action_timer.clone();
        this.buff_timer.setCallBack(this.onHandle.bind(this));
    },

    update (dt) {
        if (this.buff_timer && this.buff_timer.unit_active == false) {
            this.onExit();
        }
    },
});
