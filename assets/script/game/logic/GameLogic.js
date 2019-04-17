/*
 * @Description: 游戏逻辑
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-17 16:17:23
 */


let Listener = require("Listener")
let EventDef = require("EventDef")
let ActionDef = require("ActionDef")
let Unit = require("Unit")
let UnitDef = require("UnitDef")
let TriggerMsg = require("TriggerMsg")

let EventType = EventDef.EventType;

module.exports = {

    m_systemUnit : null,

    init()
    {
        this.initSystemUnit();
    },

    initSystemUnit()
    {
        this.m_systemUnit = new Unit();
        this.m_systemUnit.setUnitType(UnitDef.TypeID.system);
        this.m_systemUnit.onEnter();
    },

    update(dt)
    {
        gs.unitMgr.update(dt);
        gs.timerMgr.update(dt);
    },

    getActorUnit(actorNode)
    {
        if (actorNode == null) {
            return null;
        }
        return actorNode.getComponent("ActorUnit");
    },

    getSkillUnit(skillNode)
    {
        if (skillNode == null) {
            return null;
        }
        return skillNode.getComponent("SkillUnit");
    },

    gameBegin()
    {
        var event_type = EventType.game_begin;

        var msg = TriggerMsg.getMsg();
        msg.event_type = event_type;
        msg.unit_id = this.m_systemUnit.getUnitId();
        
        Listener.dispatch(EventType[event_type], msg);
    },

    /*
        skillId cc.Integer
        targets [cc.Integer]
    */
    castSkill(skillId, unitId, targets)
    {
        var event_type = EventType.cast_skill;

        var msg = TriggerMsg.getMsg();
        msg.event_type = event_type;
        msg.unit_id = unitId;
        msg.skill_id = skillId;
        msg.target_ids = targets;

        // console.log(msg);
        Listener.dispatch(EventType[event_type], msg);
    },
};
