/*
 * @Description: 时光鸡
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-22 15:57:30
 * @LastEditTime: 2019-04-24 13:55:21
 */

let Timer = require("Timer")
let Item = require("Item")
let Unit = require("Unit")
let UnitDef = require("UnitDef")
let Action = require("Action")
let BuffMgr = require("BuffMgr")
let EventDef = require("EventDef")
let SkillDef = require('SkillDef')
let FormulaHandle = require("FormulaHandle")

let EventType = EventDef.EventType;

cc.Class({
    extends: Unit,

    name : "TimeMachine",

    properties: {

        unit_type : {
            default: UnitDef.TypeID.timer,
            type : cc.Enum(UnitDef.TypeID), 
            tooltip : "Unit类型",
            readonly : true,
            override : true,
        },
        
        cache_action : {
            default: null,
            type : Action, 
            tooltip : "缓存-动作",
        },

        cache_timer : {
            default: null,
            type : Timer, 
            tooltip : "缓存-计时器",
        },

        cache_data : {
            default: null,
            type : cc.Object, 
            tooltip : "缓存-信息",
        },

        // buff_type : {
        //     default: SkillDef.SkillID.unknown,
        //     type : cc.Enum(SkillDef.SkillID),
        //     tooltip : "buff-类型",
        // },

        // buff_hold : {
        //     default: -1,
        //     type : cc.Integer, 
        //     tooltip : "buff-持有者",
        // },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onEnter () {
        console.log('machine onEnter')
        this._super();
        // BuffMgr.pushBuff(this);

        if (this.cache_timer) {
            this.cache_timer.onEnter();
        }
    },

    onExit () {
        console.log('machine onExit');
        this._super();
        // BuffMgr.removeBuff(this);

        if (this.cache_timer) {
            this.cache_timer.onExit();
        }
    },

    start () {

    },

    onHandle()
    {
        // console.log(this.buff_msg);
        console.log('触发', '[' + EventType[this.cache_data.event_type] + "]", new Date());
        FormulaHandle.executeAction(this.cache_data, this.cache_action);
        // console.log(ActionHandle);
    },

    init(data, action)
    {
        this.cache_data = data;
        this.cache_action = action;

        this.cache_timer = action.action_timer.clone();
        this.cache_timer.setCallBack(this.onHandle.bind(this));
    },

    update (dt) {
        if (this.cache_timer && this.cache_timer.unit_active == false) {
            this.onExit();
        }
    },
});
