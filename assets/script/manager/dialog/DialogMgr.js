/*************************************************
Copyright:(c)
Author:mengjl
Date:2019-3-31
Description:对话框
**************************************************/

module.exports = {
    
    m_dialogs : new Array(),
    m_maskPool : new cc.NodePool(),
    m_maskPrefab : null,
    m_maskCount : 0,

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

    _getParent()
    {
        return cc.director.getScene();
    },

    _addMask()
    {
        if (this.m_maskCount == 0) {
            let _prefab_ = this.m_maskPool.get();
            if (_prefab_) {
               this._getParent().addChild(_prefab_);
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