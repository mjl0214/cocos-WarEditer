/*
 * @Description: 事件处理类
 * @Author: megjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-14 20:57:59
 */


let EventDef = require("EventDef")
let ActionDef = require("ActionDef")

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