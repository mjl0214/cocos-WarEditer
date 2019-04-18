/*
 * @Description: 对话框管理器
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-15 08:38:25
 * @LastEditTime: 2019-04-18 18:01:19
 */

let DialogDef = require("DialogDef")
let PoolManager = require("PoolManager")

module.exports = {
    
    m_dialogs : new Array(),
    m_maskPool : new cc.NodePool(),
    m_maskPrefab : null,
    m_maskCount : 0,

    m_localZOrder : 0,

    init()
    {
        cc.loader.loadRes('prefab/DialogMask', cc.Prefab, (err, prefab) => {
            if (err) {
                cc.error(err);
            }
            else
            {
                // console.log(prefab);
                var maskPrefab = cc.instantiate(prefab);
                this.m_maskPool.put(maskPrefab);
            }
            
        });
    },

    showDialog(id)
    {
        var dialog_name = DialogDef.DialogID[id];
        if (dialog_name == null) {
            console.error('对话框不存在 id =[' + id + ']');
            return;
        }

        this._addMask();

        var prefab = PoolManager.getPerfab(dialog_name);
        prefab.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
        this._getParent().addChild(prefab, this.m_localZOrder++);

        this.m_dialogs.push(prefab);
    },

    closeDialog(dialog)
    {
        this._subMask();
        
        var dialog_name = dialog.getDialogName();
        PoolManager.recoveryPerfab(dialog_name, dialog.node);

        for (let index = 0; index < this.m_dialogs.length; index++) {
            const element = this.m_dialogs[index];
            if (dialog.node == element) {
                this.m_dialogs.splice(index, 1);
                break;
            }
        }

        // console.log(this.m_dialogs.length);
    },

    _getParent()
    {
        return cc.director.getScene();
    },

    _addMask()
    {
        if (this.m_maskCount == 0) {
            let _prefab_ = this.m_maskPool.get();
            if (_prefab_) {
               this._getParent().addChild(_prefab_, this.m_localZOrder++);
               this.m_maskPrefab = _prefab_;
            }
        }
        this.m_maskCount++;
    },

    _subMask()
    {
        this.m_maskCount--;
        if (this.m_maskCount <= 0) {
            this.m_maskPool.put(this.m_maskPrefab);
            this.m_maskPrefab = null;
        }
    },

    add(dialog)
    {
        this._addMask();
    },

    sub(dialog)
    {
        this._subMask();
    },
};