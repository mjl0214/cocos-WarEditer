/*
 * @Description: 事件可视化组件
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-23 15:09:37
 * @LastEditTime: 2019-04-24 16:06:08
 */



let EventDef = require("EventDef")
let ActionDef = require("ActionDef")
// let Condition = require("Condition")
let Event = require("Event")
let EventType = EventDef.EventType;

cc.Class({
    extends: Event,

    name : 'EventUnit',

    properties: {
        event_desc : {
            default : '',
            tooltip : "事件描述",
            // multiline : true,
            readonly : true,
            // serializable: false,
        },

    },

    ctor () {

    },

    getJson()
    {
        var data = {
            'unit_type' : this.unit_type,
            'event_type' : this.event_type,
        }
        return data;
    },

    _getUnitDesc()
    {
        // unknown : 0,        // 未知
        // any : 1,            // 任意单位
        // friend : 2,         // 友方
        // enemy : 3,          // 敌方
        var desc = '未知单位';
        switch (this.unit_type) {
            case EventDef.UnitType.unknown:
                desc = '未知单位';
                break;
            case EventDef.UnitType.any_unit:
                desc = '任意单位';
                break;
            // case EventDef.UnitType.friend_unit:
            //     desc = '友方单位';
            //     break;
            // case EventDef.UnitType.enemy_unit:
            //     desc = '敌方单位';
            //     break;
            case EventDef.UnitType.timer_unit:
                desc = '计时器单位';
                break;  
            case EventDef.UnitType.system_unit:
                desc = '系统事件';
                break;  

            default:
                break;
        }
        return desc;
    },

    _getActionDesc()
    {

    //     unknown : 0,                    // 未知
    // cast_skill : 1,              // 释放技能
    // pickup_item : 2,                // 拾取物品
    // giveup_item : 3,                // 丢弃物品
    // enter_region : 4,               // 进入区域
    // leave_region : 5,               // 离开区域

        var desc = '未知事件';
        switch (this.event_type) {
            case EventType.unknown:
                desc = '未知事件';
                break;
            case EventType.cast_skill:
                desc = '释放技能';
                break;
            case EventType.pickup_item:
                desc = '拾取物品';
                break;
            case EventType.giveup_item:
                desc = '丢弃物品';
                break;
            case EventType.enter_region:
                desc = '进入区域';
                break;
            case EventType.leave_region:
                desc = '离开区域';
                break;  
            case EventType.attribute_change:
                desc = '属性变化';
                break;   
            case EventType.once_timer:
                desc = '一次性定时器';
                break;  
            case EventType.every_timer:
                desc = '周期性定时器';
                break;
            case EventType.unit_create:
                desc = '单位被创建出来';
                break;
            case EventType.game_begin:
                desc = '游戏开始';
                break;
            case EventType.game_end:
                desc = '游戏结束';
                break; 
            case EventType.game_pause:
                desc = '游戏暂停';
                break; 
            case EventType.game_resume:
                desc = '游戏继续';
                break;      
            default:
                break;
        }
        return desc;
    },

    _setEventDesc()
    {
        var unitDesc = this._getUnitDesc();
        var actionDesc = this._getActionDesc();
        this.event_desc =  "[" + unitDesc +  "]" + actionDesc;
    },

    getEventDesc()
    {
        return this.event_desc;
    },

    // update (dt) {},
});
