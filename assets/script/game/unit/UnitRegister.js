/*
 * @Description: 预制体注册类(挂到节点上用于初始化需要的预制体,预制体节点上要挂上 SkillUnit 组件)
 * @Author: megjl
 * @LastEditors: megjl
 * @Date: 2019-04-12 08:51:20
 * @LastEditTime: 2019-04-14 21:52:01
 */

let PoolManager = require("PoolManager")
let UnitDef = require("UnitDef")

cc.Class({
    extends: cc.Component,

    properties: {
        autoDestroy : {
            // ATTRIBUTES:
            default: true,
            // type: cc.Boolean,
            tooltip : '是否自动销毁',
            // serializable: true, 
        },

        loadLog : {
            // ATTRIBUTES:
            default: false,
            // type: cc.Boolean,
            tooltip : '加载技能日志',
            // serializable: true, 
        },

        unitType : {
            default: UnitDef.TypeID.unknown,
            type : cc.Enum(UnitDef.TypeID), 
            tooltip : "单位类型",
        },

        prefabList : {
            // ATTRIBUTES:
            default: [],
            type: [cc.Prefab],
            tooltip : 'Unit列表',
            // serializable: true, 
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._poolNameList = new Array();
        this._initComponetName();
        this._register();
    },

    start () {
        // 使用的时候，去预制体的SkillComponent脚本中，查看节点池的名字！
    },

    onDestroy()
    {
        if (this.autoDestroy == true) {
            this._unregister();
        }
        else
        {
            this._warn_('预制体还没有被销毁');
        }
    },

    _initComponetName()
    {
        this._componetName = 'unknown';
        // console.log('this.unitType', this.unitType);
        if (this.unitType == UnitDef.TypeID.skill) {
            this._componetName = 'SkillUnit';
        }
        else if (this.unitType == UnitDef.TypeID.trigger) {
            this._componetName = 'TriggerUnit';
        }
    },

    // 向PoolManager中注册预制体
    _register()
    {
        console.log('UnitRegister Enter', UnitDef.TypeID[this.unitType], this.prefabList.length);

        this._poolNameList.length = 0;
        var poolName = null;
        for (let index = 0; index < this.prefabList.length; index++) {
            const prefab = this.prefabList[index];
            if (prefab == undefined || prefab == null) {
                console.error('[' + index + ']预制体不存在');
                this._poolNameList.push('');
                continue;
            }
            var poolUnit = prefab.data.getComponent(this._componetName);

            if (poolUnit == null || poolUnit == undefined) {
                console.error('[' + index + ']预制体没有挂' + this._componetName + ' 脚本');
                this._poolNameList.push('');
                continue;
            }

            poolName = poolUnit.getPoolName();
            if (poolName == null || poolName == undefined) {
                console.error('[' + index + ']预制体没有节点池名字');
                this._poolNameList.push('');
                continue;
            }

            // console.log('poolName', poolName)

            var idx = this._poolNameList.indexOf(poolName);
            if (idx == -1) {
                PoolManager.initPool(poolName, prefab, poolUnit.poolNum);

                this._initialization(poolName);

                var collect = PoolManager.getCollect(poolName);
                this._log_('load[' + poolName + ']', collect);
            } else {
                console.error('[' + index + ']Unit[' + poolName + ']与之前的Unit[' + idx + ']重名');
            }
            this._poolNameList.push(poolName);
        }
    },

    _initialization(poolName)
    {
        var prefab = PoolManager.getPerfab(poolName);
        this.node.addChild(prefab);
    },

    // 向PoolManager中注销预制体
    _unregister ()
    {
        console.log('SkillRegister Leave', UnitDef.TypeID[this.unitType]);

        var poolName = '';
        for (let index = 0; index < this.prefabList.length; index++) {
            const prefab = this.prefabList[index];
            var poolUnit = prefab.data.getComponent(this._componetName);
            if (poolUnit) {
                poolName = poolUnit.getPoolName();
                PoolManager.clearPool(poolName);
                var collect = PoolManager.getCollect(poolName);
                this._log_('clear[' + poolName + ']', collect);
            }
        }
    },

    _log_:function(message, ...p)
    {
        if (this.loadLog == true) {
            console.log(message, ...p);
        }
    },

    _error_:function(message, ...p)
    {
        if (this.loadLog == true) {
            console.error(message, ...p);
        }
    },

    _warn_:function(message, ...p)
    {
        if (this.loadLog == true) {
            console.warn(message, ...p);
        }
    },

    // update (dt) {},
});
