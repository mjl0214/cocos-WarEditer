/*
 * @Description: 事件处理类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-15 14:41:35
 */


let EventDef = require("EventDef")
let ActionDef = require("ActionDef")
let ActorMgr = require("ActorMgr")
let UnitMgr = require("UnitMgr")
let UnitDef = require("UnitDef")

module.exports = {

    // 是否触发成功
    isEventHold(msg, event)
    {
        var result = this._isEventHold(msg, event);

        if (result) {
            console.log(result, '{事件}', event.event_desc);
        }
        else
        {
            console.error(result, '{事件}', event.event_desc);
        }
        
        return result;
    },

    
    // 是否触发成功
    _isEventHold(msg, event)
    {
        // event_type : event_type,
        //     unit_id : unitId,
        //     skill_id : skillId, 
        //     target_ids : targets,

        // console.log(msg, event)

        var unit = UnitMgr.getUnitById(msg.unit_id);
        var unit_type = UnitDef.TypeID.unknown;
        if (unit) {
            unit_type = unit.getUnitType();
        }

        console.log('UnitDef.TypeID', UnitDef.TypeID[unit_type]);

        var isHold = true;
        if (event.unit_type == EventDef.UnitType.any_unit) {
            isHold = isHold && true;
        }
        else
        {
            isHold = isHold && false;
            // todo just other
        }

        if (isHold == false) {
            return false;
        }

        if (event.event_type == msg.event_type) {
            isHold = isHold && true;
        }
        else
        {
            isHold = isHold && false;
        }

        return isHold;
    },
}