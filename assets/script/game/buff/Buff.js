/*
 * @Description: Buff类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-29 12:44:06
 * You know nothing.Jon Snow
 */


let Timer = require("Timer")
let Item = require("Item")
let Action = require("Action")
let BuffMgr = require("BuffMgr")
let BuffDef = require("BuffDef")
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
        
        buff_id : {
            default: BuffDef.BuffID.unknown,
            type : cc.Enum(BuffDef.BuffID), 
            tooltip : "BuffID",
        },

        skill_id : {
            default: SkillDef.SkillID.unknown,
            type : cc.Enum(SkillDef.SkillID), 
            tooltip : "技能ID",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onEnter () {
        console.log('Buff onEnter')
        this._super();
        BuffMgr.pushBuff(this);

        // if (this.buff_timer) {
        //     this.buff_timer.onEnter();
        // }
    },

    onExit () {
        console.log('Buff onDestroy');
        this._super();
        BuffMgr.removeBuff(this);

        // if (this.buff_timer) {
        //     this.buff_timer.onExit();
        // }
    },

    start () {

    },

    init(buffid, msg, list)
    {
        // this.buff_msg = msg;
        this.skill_id = msg.skill_id;
        this.buff_hold = msg.unit_id;
        this.buff_id = buffid;

        // this.buff_timer = action.action_timer.clone();
        // this.buff_timer.setCallBack(this.onHandle.bind(this));

        // console.log(action);
        for (let index = 0; index < list.length; index++) {
            const data = list[index];
            var arri = new Attribute();
            arri.attribute = data.key;
            arri.value_type = data.value;
            this.attributes.push(arri);
        }
        // console.log(this.attributes)
    },

    getValue(key)
    {
        for (let index = 0; index < this.attributes.length; index++) {
            const arri = this.attributes[index];
            if (arri.attribute == key) {
                return arri.value_type;
            }
        }
        return 0;
    },

    // update (dt) {
    //     if (this.buff_timer && this.buff_timer.unit_active == false) {
    //         this.onExit();
    //     }
    // },
});
