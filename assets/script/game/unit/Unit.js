/*
 * @Description: Unit类
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-15 14:16:49
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

        unit_list : {
            default: [],
            type : [Ref], 
            tooltip : "Unit列表",
            visible : false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        UnitMgr.pushUnit(this);
    },

    onDestroy() {
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

    getUnitType()
    {
        return this.unit_type;
    },

    bindUnit(ref)
    {
        this.unit_list.push(ref);
    },

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
