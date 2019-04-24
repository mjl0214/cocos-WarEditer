/*
 * @Description: 触发器消息
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-17 15:13:04
 * @LastEditTime: 2019-04-23 14:09:24
 */


var TriggerMsg = module.exports;

TriggerMsg.getSystemMsg = function()
{
    var msg = {
        event_type : -1,
        unit_id : -1,
    }
    return msg;
};

TriggerMsg.getSkillMsg = function()
{
    var msg = {
        event_type : -1,
        unit_id : -1,
        skill_id : -1, 
        target_ids : [],
        skill_level : 1,
    }
    return msg;
};
