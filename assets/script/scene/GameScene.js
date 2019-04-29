let PoolManager = require("PoolManager")
let PoolDef = require("PoolDef")
let SkillDef = require('SkillDef')
let NameDef = require("NameDef")

let DialogMgr = require('DialogMgr')
let DialogDef = require("DialogDef")

cc.Class({
    extends: cc.Component,

    properties: {
        mapLayer : cc.Node,
        playerLayer : cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.initMap();
        this._heroList = new Array();
    },


    start () {
        this.initMap();
        gs.gameLogic.gameBegin();

        // console.log(window.curl_rand())
        // console.log(window.curl_rand())
        // console.log(window.curl_rand())
        // console.log(window.curl_rand())
        // console.log(window.curl_rand())
    },

    initMap()
    {

        var width = 80;
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                // console.log(PoolDef[PoolDef.map_grid])
                var grid = PoolManager.getPerfab(PoolDef[PoolDef.map_grid]);
                this.mapLayer.addChild(grid);

                grid.setPosition(cc.v2(640 - x * width + width / 2 - 400, 640 - y * width + width / 2 - 400));
            }
        }
    },

    onButtonClick()
    {
        var actor = gs.gameLogic.getActorUnit(this._heroList[0]);
        var actor2 = gs.gameLogic.getActorUnit(this._heroList[1]);

        var actorId = actor.getUnitId();
        // gs.gameLogic.castSkill(SkillDef.SkillID.attack_normal, actor.getUnitId(), [actor2.getUnitId()]);
        gs.gameLogic.castSkill(SkillDef.SkillID.blade_storm, actor2.getUnitId(), [actor.getUnitId()]);
        gs.gameLogic.castSkill(SkillDef.SkillID.blade_storm, actor.getUnitId(), [actor2.getUnitId()]);
    },

    onClickOpen()
    {
        DialogMgr.showDialog(DialogDef.DialogID.dialog_book);
    },

    onClickToTest()
    {
        cc.director.loadScene('TestScene');
    },

    onClickCreate()
    {
        if (this._heroList.length > 0) {
            return;
        }
        // console.log(NameDef[NameDef.great_master])
        // return;

        var hero1 = PoolManager.getPerfab(NameDef[NameDef.great_master]);
        var hero2 = PoolManager.getPerfab(NameDef[NameDef.blade_master]);

        this.playerLayer.addChild(hero1);
        this.playerLayer.addChild(hero2);

        hero1.setPosition(cc.v2(-100, 0));
        hero2.setPosition(cc.v2(100, 0));
        var actor2 = gs.gameLogic.getActorUnit(hero2);
        actor2.setVal('x', 2);
        actor2.setVal('y', 2);

        this._heroList.push(hero1);
        this._heroList.push(hero2);
    },

    update (dt) {
        gs.gameLogic.update(dt);
    },
});
