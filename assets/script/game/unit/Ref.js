/*
 * @Description: 基类(用于Unit中不能引用自身)
 * @Author: megjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 22:56:28
 * @LastEditTime: 2019-04-12 23:25:51
 */

let ref_index = 0;

cc.Class({
    // extends: cc.Component,

    name : "Ref",

    properties: {
        ref_id : {
            default: -1,
            type : cc.Integer, 
            tooltip : "RefID",
            visible : false,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    ctor ()
    {
        this.ref_id = ref_index++;
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
