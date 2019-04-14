/*
 * @Description: 游戏逻辑
 * @Author: mengjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-14 20:52:59
 */


let Listener = require("Listener")
let EventDef = require("EventDef")
let ActionDef = require("ActionDef")

let EventType = EventDef.EventType;

module.exports = {

    init()
    {

    },

    gameBegin()
    {
        var event_type = EventType[EventType.game_begin]
        Listener.dispatch(event_type, {event_type : event_type,});
    },

    update(dt)
    {
        gs.unitMgr.update(dt);
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

    /*
        skillId cc.Integer
        targets [cc.Integer]
    */
    useSkill(skillId, holderId, targets)
    {
        var target_units = [];
        for (let index = 0; index < targets.length; index++) {
            const targetId = targets[index];
            var target = gs.actorMgr.getActorById(targetId);
            if (target) {
                target_units.push({
                    actorId : targetId,
                    teamId : target.getTeamId(),
                });
            }
        }

        // console.log('skillId', skillId);

        var event_type = EventType[EventType.release_skill];

        Listener.dispatch(event_type, 
            {
                event_type : event_type,
                holder_id : holderId,
                skill_id : skillId, 
                targets : target_units,
            }
        );
    },
};
