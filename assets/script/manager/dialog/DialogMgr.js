/*
 * @Description: 对话框管理器
 * @Author: mengjl
 * @LastEditors: mengjl
 * @Date: 2019-04-15 08:38:25
 * @LastEditTime: 2019-04-25 10:14:05
 */

let DialogDef = require("DialogDef")
let PoolManager = require("PoolManager")

module.exports = {
    
    m_dialogs : new Array(),
    m_maskPool : new cc.NodePool(),
    m_masks : new Array(),
    m_maskIndex : 0,
    m_baseZIndex : 1000,
    m_maxZIndex : 0,        // 当前最大ZIndex
    m_maskPrefab : null,
    m_dialogIndex : 0,

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

    showDialog(id, params)
    {
        var dialog_name = DialogDef.DialogID[id];
        if (dialog_name == null) {
            console.error('对话框不存在 id =[' + id + ']');
            return;
        }

        var _dialog = this.getDialog(id);
        if (_dialog && _dialog.single == true) {
            this.closeDialog(_dialog);
        }

        // 自动分配ZIndex
        this.m_dialogIndex++;
        var zIndex = this.m_baseZIndex + this.m_dialogIndex;

        var dialogPrefab = PoolManager.getPerfab(dialog_name);
        if (dialogPrefab == null) {
            console.error('预制体未注册 id =[' + dialog_name + ']');
            return;
        }
        dialogPrefab.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
        var dlgComp = dialogPrefab.getComponent('DialogBase');

        // 分配mask
        var maskPrefab = this._addMask();
        maskPrefab.setPosition(cc.v2(cc.winSize.width / 2, cc.winSize.height / 2));
        var maskComp = maskPrefab.getComponent('DialogMask');

        var maskId = this.m_maskIndex++;

        maskComp.setMask(dlgComp.getIsMask());
        maskComp.setInput(dlgComp.getIsInput());
        maskComp.setMaskId(maskId);

        dlgComp.setMaskId(maskId);

        this._getParent().addChild(maskPrefab, zIndex);
        this._getParent().addChild(dialogPrefab, zIndex);
        // console.log('zIndex', zIndex);
        
        dlgComp.onEnter(params);

        this.m_dialogs.push(dialogPrefab);

        dlgComp.playOpenAni();

        this._autoMaxZIndex();
    },

    /**
     * @description: 
     * @param dialog(class or number)
     * @return: 
     */
    closeDialog(dialog)
    {
        var _dialog = dialog;
        // console.log(typeof dialog);
        if (typeof dialog == 'number') {
            _dialog = this.getDialog(dialog);
        }

        _dialog.playCloseAni();
    },

    closeAllDialog()
    {
        // console.log(this.m_dialogs);
        for (let index = this.m_dialogs.length - 1; index >= 0; index--) {
            const dialogPrefab = this.m_dialogs[index];
            var dlgComp = dialogPrefab.getComponent('DialogBase');
            this.closeDialog(dlgComp);
        }
    },

    getDialogAmount()
    {
        return this.m_dialogs.length;
    },

    getDialog(id)
    {
        for (let index = this.m_dialogs.length - 1; index >= 0; index--) {
            const dialogPrefab = this.m_dialogs[index];
            var dlgComp = dialogPrefab.getComponent('DialogBase');
            // console.log(dlgComp.dialog_id);
            if (dlgComp.dialog_id == id) {
                return dlgComp;
            }
        }
        return null;
    },

    setDialogZIndex(dialog, zIndex)
    {
        dialog.node.zIndex = zIndex;
        this._autoMaxZIndex();

        var maskPrefab = this._getMask(dialog.getMaskId());
        // console.log(maskPrefab);
        if (maskPrefab) {
            var maskComp = maskPrefab.getComponent('DialogMask');
            maskComp.node.zIndex = zIndex;
            // console.log(maskComp.node.zIndex);
        }
        
        // console.log('dialog.node.zIndex', dialog.node.zIndex)
    },

    _closeDialog(dialog)
    {
        var dialog_name = dialog.getDialogName();
        var maskId = dialog.getMaskId();
        dialog.onLeave();
        PoolManager.recoveryPerfab(dialog_name, dialog.node);

        for (let index = 0; index < this.m_dialogs.length; index++) {
            const element = this.m_dialogs[index];
            if (dialog.node == element) {
                this.m_dialogs.splice(index, 1);
                break;
            }
        }

        this._subMask(maskId);

        this._autoMaxZIndex();

        // console.log(this.m_dialogs.length);
    },

    _autoMaxZIndex()
    {
        this.m_maxZIndex = this.m_baseZIndex;
        for (let index = 0; index < this.m_dialogs.length; index++) {
            const element = this.m_dialogs[index];
            if (element.zIndex > this.m_maxZIndex) {
                this.m_maxZIndex = element.zIndex;
            }
        }

        if (this.m_dialogs.length <= 0) {
            this.m_dialogIndex = 0;
        }

        // console.log('this.m_maxZIndex', this.m_maxZIndex);
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
};