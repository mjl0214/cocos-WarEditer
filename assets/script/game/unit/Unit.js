/*
 * @Description: Unit类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-25 13:53:50
 * Whenever you play the game of thrones, you either win or die. There is no middle ground
 */

let Ref = require("Ref")
let UnitDef = require("UnitDef")
let UnitMgr = require("UnitMgr")

cc.Class({
    extends: Ref,

    properties: {
        unit_id : {
            default: -1,
            type : cc.Integer, 
            tooltip : "UnitID",
            visible : false,
            serializable: false,
        },

        unit_type : {
            default: UnitDef.TypeID.unknown,
            type : cc.Enum(UnitDef.TypeID), 
            tooltip : "Unit类型",
        },

        unit_active : {
            default: false,
            // type : cc.Float, 
            tooltip : "是否是活跃的",
            visible : false,
        },

        unit_list : {
            default: [],
            type : [Ref], 
            tooltip : "Unit列表",
            visible : false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onEnter () {
        this.unit_active = true;
        UnitMgr.pushUnit(this);
    },

    onExit() {
        this.unit_active = false;
        UnitMgr.removeUnit(this);
    },

    ctor () {
        // UnitMgr.pushUnit(this);
    },

    setUnitId(id)
    {
        this.unit_id = id;
    },

    getUnitId()
    {
        return this.unit_id;
    },

    setUnitType(type)
    {
        this.unit_type = type;
    },

    getUnitType()
    {
        return this.unit_type;
    },

    isUnitActive()
    {
        return this.unit_active;
    },

    setUnitActive(active)
    {
        this.unit_active = active;
    },

    // 绑定unit
    bindUnit(ref)
    {
        this.unit_list.push(ref);
    },

    // 解除unit
    untyUnit(ref)
    {
        for (let index = 0; index < this.unit_list.length; index++) {
            const element = this.unit_list[index];
            if (element == ref) {
                this.unit_list.splice(index, 1);
                break;
            }
        }
    },

    update (dt) {
        
    },
});
