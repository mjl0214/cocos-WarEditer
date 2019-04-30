
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._path = [];
        this._pathIndex = 0;
        this._updateTime = 0;
        // this._scale = 1 / 1;
        this._speed = 100;
        this._updateInterval = 1 / 30;
        this._rotation = 0;
        this._position = cc.v2(0, cc.winSize.height);
        this._designSize = cc.v2(1080, 1920);
        this._updateSpeed = 1;

        this._state = -1;    // -1未使用 0暂停 1运行中 2运行结束
    },

    start () {
    },

    runPath(path, speed)
    {
        // updateRate = 1 / cc.game.getFrameRate();
        // console.log(path);
        // this._path = window.clone(path);
        this._path = path;
        this._pathIndex = 0;
        this._updateTime = 0;
        this._speed = speed;
        this._updateInterval = 7 / speed;
        
        this._state = 1;    // -1未使用 0暂停 1运行中 2运行结束
        // this._interrupt = 0;
    },

    onRemove()
    {
        this._state = 2;
        this._position = cc.v2(0, cc.winSize.height);
        // 不能清空path,path是指针
        // this._path.length = 0;
    },

    forceStop()
    {
        this._state = -1;
        this._position = cc.v2(0, cc.winSize.height);
    },

    getState()
    {// -1未使用 0暂停 1运行中 2运行结束
        return this._state;
    },

    setState(state)
    {// -1未使用 0暂停 1运行中 2运行结束
        this._state = state;
    },

    setUpdateSpeed(speed)
    {
        this._updateSpeed = speed;
    },

    getInfo()
    {
        return {pos : this._position, rot : this._rotation, };
    },

    update (dt) {
        if (this._path == undefined || this._path.length <= 0) {
            return;
        }

        if (this._state != 1) {
            return;
        }

        this._updateTime += dt * this._updateSpeed;

        var _ui = this._updateInterval;

        if (this._updateTime < _ui && this._pathIndex > 0) {
            var pos = this._path[this._pathIndex];
            var front = this._path[this._pathIndex - 1];
            if (front) {
                this._position.x += (pos.x - front.x) * dt / _ui;
                this._position.y += (pos.y - front.y) * dt / _ui;
            }
        }
        else
        {
            this._updateTime = 0;

            var pos = this._path[this._pathIndex];
            this._position.x = pos.x - this._designSize.x / 2; 
            this._position.y = pos.y - this._designSize.y / 2;
            this._rotation = 180 + pos.angle;
            
            this._pathIndex++;
        }

        if (this._pathIndex >= this._path.length) {
            this.onRemove();
        }
    },
});
