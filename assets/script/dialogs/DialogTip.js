let DialogBase = require("DialogBase")
let DialogMgr = require("DialogMgr")
let DialogDef = require("DialogDef")

cc.Class({
    extends: DialogBase,

    properties: {
        showLabel : {
            default: null,
            type : cc.Label, 
            tooltip : "显示文字",
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._delay = 3.0;
    },

    start () {
        // console.log('start');
    },

    onEnter(params)
    {
        // console.log('tip onEnter');
        this._delay = 3.0;
        this.setDialogZIndex(5000);
        this.showLabel.string = '我是提示,' + '第[' + (DialogMgr.getDialogAmount() + 1) + ']个对话框';
    },

    onLeave()
    {
        // console.log('tip onLeave');
    },

    update (dt) {
        if (this._state == 1) {
            this._delay -= dt;
        }
        
        if (this._delay <= 0 && this._state == 1) {
            this.closeDialog();
        }
    },
});
