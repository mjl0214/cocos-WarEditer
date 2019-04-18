/*
 * @Description: 对话框管理器
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-15 08:38:25
 * @LastEditTime: 2019-04-19 00:48:46
 */

let DialogDef = require("DialogDef")
let PoolManager = require("PoolManager")

module.exports = {
    
    m_dialogs : new Array(),
    m_maskPool : new cc.NodePool(),
    m_masks : new Array(),
    m_maskIndex : 0,
    m_localZOrder : 0,
    m_maskPrefab : null,

    init()
    {
        // cc.loader.loadRes('prefab/DialogMask', cc.Prefab, (err, prefab) => {
        //     if (err) {
        //         cc.error(err);
        //     }
        //     else
        //     {
        //         // console.log(prefab);
        //         // var maskPrefab = cc.instantiate(prefab);
        //         // this.m_maskPool.put(maskPrefab);
        //         this.m_maskPrefab = prefab;
        //     }
            
        // });
    },

    showDialog(id, ani)
    {
        var dialog_name = DialogDef.DialogID[id];
        if (dialog_name == null) {
            console.error('对话框不存在 id =[' + id + ']');
            return;
        }

        var zIndex = this.m_dialogs.length;

        var dialogPrefab = PoolManager.getPerfab(dialog_name);
        dialogPrefab.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));

        // 分配mask
        var maskPrefab = this._addMask();
        maskPrefab.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));

        var dlgComp = dialogPrefab.getComponent('DialogBase');
        var maskComp = maskPrefab.getComponent('DialogMask');

        var maskId = this.m_maskIndex++;

        maskComp.setMask(dlgComp.getIsMask());
        maskComp.setInput(dlgComp.getIsInput());
        maskComp.setMaskId(maskId);

        dlgComp.setMaskId(maskId);

        this._getParent().addChild(maskPrefab, zIndex);
        this._getParent().addChild(dialogPrefab, zIndex);

        this.m_dialogs.push(dialogPrefab);

        if (ani) {
            this._playShowAni(dialogPrefab);
        }
        else
        {
            dlgComp.setState(1);
        }
    },

    closeDialog(dialog, ani)
    {
        if (ani) {
            this._playCloseAni(dialog);
        }
        else
        {
            this._closeDialog(dialog);
        }
    },

    closeAllDialog(ani)
    {
        for (let index = this.m_dialogs.length - 1; index >= 0; index--) {
            const dialogPrefab = this.m_dialogs[index];
            var dlgComp = dialogPrefab.getComponent('DialogBase');
            this.closeDialog(dlgComp, ani);
        }
    },

    getDialogAmount()
    {
        return this.m_dialogs.length;
    },

    _closeDialog(dialog)
    {
        var dialog_name = dialog.getDialogName();
        var maskId = dialog.getMaskId();
        dialog.setState(-1);
        PoolManager.recoveryPerfab(dialog_name, dialog.node);

        for (let index = 0; index < this.m_dialogs.length; index++) {
            const element = this.m_dialogs[index];
            if (dialog.node == element) {
                this.m_dialogs.splice(index, 1);
                break;
            }
        }

        this._subMask(maskId);

        // console.log(this.m_dialogs.length);
    },

    _getParent()
    {
        return cc.director.getScene();
    },

    _addMask()
    {
        let _prefab_ = this.m_maskPool.get();
        if (_prefab_ == null) {
            _prefab_ = cc.instantiate(this.m_maskPrefab);
        }
        this.m_masks.push(_prefab_);
        return _prefab_;
    },

    _subMask(maskId)
    {
        for (let index = 0; index < this.m_masks.length; index++) {
            const mask = this.m_masks[index];
            var maskComp = mask.getComponent('DialogMask');
            if (maskComp.getMaskId() == maskId) {
                this.m_maskPool.put(mask);
                this.m_masks.splice(index, 1);
                break;
            }
        }
    },

    _getMask(maskId)
    {
        for (let index = 0; index < this.m_masks.length; index++) {
            const mask = this.m_masks[index];
            var maskComp = mask.getComponent('DialogMask');
            if (maskComp.getMaskId() == maskId) {
                return mask;
            }
        }
        return null;
    },

    _playShowAni(dialogPrefab)
    {
        dialogPrefab.stopAllActions();

        var dlgComp = dialogPrefab.getComponent('DialogBase');
        dlgComp.setState(0);
        var orgScale = dialogPrefab.scale;
        dialogPrefab.scale = 0;
        var action = cc.sequence(cc.scaleTo(0.5, orgScale).easing(cc.easeBackOut()), cc.callFunc((target) => {
            dlgComp.setState(1);
        }));
        // action.easing(cc.easeBackOut());
        dialogPrefab.runAction(action);
    },

    _playCloseAni(dialog)
    {
        dialog.node.stopAllActions();
        dialog.setState(2);

        var orgScale = dialog.node.scale;

        var action = cc.sequence(cc.scaleTo(0.2, 0), cc.callFunc((target) => {
            dialog.node.scale = orgScale;
            this._closeDialog(dialog);
        }));

        dialog.node.runAction(action);
    },
};