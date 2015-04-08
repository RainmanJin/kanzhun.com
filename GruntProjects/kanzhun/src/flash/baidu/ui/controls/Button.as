package baidu.ui.controls {
    import flash.display.DisplayObject;
    import flash.display.MovieClip;
    import flash.events.MouseEvent;
    import flash.events.TimerEvent;
    import flash.utils.Timer;

    import baidu.ui.core.BUI;
    import baidu.ui.core.Invalidation;
    import baidu.ui.events.BUIEvent;    	

    /**
     * 当按钮的 autoRepeat属性为true时，按下按钮时，会不断派发此事件。
     * @see #autoRepeat
     * @see #style:repeatDelay
     * @see #style:repeatInterval
     */
    [Event(name="buttonDown", type="baidu.ui.events.BUIEvent")]

    /**
     * 皮肤，可以是DisplayObject的子类名，或者DisplayObject的子类本身，或者 DisplayObject 显示对象的实例。默认值为"Button_Skin"。
     */
    [Style(name="skin", type="Class")]

    /**
     * 按住按钮多久之后启动重复。
     */
    [Style(name="repeatDelay", type="Number")]

    /**
     * 重复的间隔。
     */
    [Style(name="repeatInterval", type="Number")]

    /**
     * 按钮。
     * <li>本按钮支持8种状态。可以被禁用，也可以被选中。</li>
     * <li>支持状态锁定功能。</li>
     * <li>支持自动重复功能。</li>
     * @author yaowei
     */
    public class Button extends BUI {

        /**
         * 帧字典。
         * 提供了按钮的状态到帧的映射。帧可以是数字，也可以是字符串。
         */
        public static const frameDict:Object = {
			up:1,/*可以是数字，也可以是字符串*/ over:2, down:3, disabled:4, selectedUp:5, selectedOver:6, selectedDown:7, selectedDisabled:8
		};

        /**
         * 默认皮肤。
         */
        public static var defaultStyles:Object = {
			skin:"Button_Skin",/*皮肤*/ repeatDelay:500,/*按住按钮多久之后启动重复*/ repeatInterval:50/*重复的间隔*/
		};

        /**
         * 构造函数。
         */
        public function Button() {
            super();
			
            buttonMode = true;
            mouseChildren = false;
            useHandCursor = false;
			
            _mouseState = "up";
            _enabled = true;
            _selected = false;
            _mouseStateLocked = false;
            _autoRepeat = false;
            setupMouseEvents();
			
            pressTimer = new Timer(1, 0);
            pressTimer.addEventListener(TimerEvent.TIMER, buttonDown, false, 0, true);
        }

        /**
         * 获取类样式。
         */
        override public function get classStyles():Object {
            return BUI.mergeStyles(super.classStyles, defaultStyles);
        }

        /**
         * 获取/设置鼠标状态。
         */
        public function get mouseState():String {
            return _mouseState;
        }

        public function set mouseState(value:String):void {
            if (_mouseStateLocked) { 
                unlockedMouseState = value; 
                return; 
            }
            if (value == _mouseState) { 
                return; 
            }
            _mouseState = value;
            invalidate(Invalidation.STATE);
        }

        /**
         * 设置是否需要锁定鼠标状态。
         * 当为true时，鼠标的行为不会再造成按钮外观的变化，和禁用按钮的区别：按钮的其他行为仍然正常工作，如点击事件。
         */
        public function set mouseStateLocked(value:Boolean):void {
            _mouseStateLocked = value;
            if (value == false) { 
                mouseState = unlockedMouseState; 
            }
			else { 
                unlockedMouseState = mouseState; 
            }
        }

        /**
         * 获取/设置禁用状态。
         */
        override public function get enabled():Boolean {
            return super.enabled;
        }

        override public function set enabled(value:Boolean):void {
            super.enabled = value;
            mouseEnabled = value;
        }

        /**
         * 获取/设置选中状态。
         */
        public function get selected():Boolean {
            return _selected;
        }

        public function set selected(value:Boolean):void {
            if (value == _selected) { 
                return; 
            }
            _selected = value;
            invalidate(Invalidation.STATE);
        }

        /**
         * 获取/设置自动重复开关的状态。
         * 当为true时，按住按钮不放，会连续触发BUI.BUTTON_DOWN事件。
         * 促发的时机和频率可以通过设置样式来控制。
         */
        public function get autoRepeat():Boolean {
            return _autoRepeat;
        }

        public function set autoRepeat(value:Boolean):void {
            _autoRepeat = value;
        }

        /**
         * @private
         * 按钮的背景。
         */
        protected var background:DisplayObject;

        /**
         * @private
         * 鼠标的状态。"up","over","down"
         */
        protected var _mouseState:String;

        /**
         * @private
         * 选中状态。
         */
        protected var _selected:Boolean;

        /**
         * @private
         * 鼠标状态锁定开关。
         */
        private var _mouseStateLocked:Boolean;

        /**
         * @private
         * 用于记录鼠标状态锁定时，变化的鼠标状态值。
         */
        private var unlockedMouseState:String;

        /**
         * @private
         * 自动重复的开关。
         */
        protected var _autoRepeat:Boolean;

        /**
         * @private
         * 重复派发事件的计时器。
         */
        protected var pressTimer:Timer;

        /**
         * @private
         * 依照失效标志位，重新绘制。
         */
        override protected function draw():void {
            if (isInvalid(Invalidation.STYLES, Invalidation.STATE)) {
                drawBackground();
                invalidate(Invalidation.SIZE, false);
            }
            if (isInvalid(Invalidation.SIZE)) {
                drawLayout();
            }
            super.draw();
        }

        /**
         * @private
         * 重绘尺寸和布局。
         */
        protected function drawLayout():void {
            background.width = _width;
            background.height = _height;
        }

        /**
         * @private
         * 绘制皮肤。
         */
        protected function drawBackground():void {
            var old:MovieClip = background as MovieClip;
            background = getSkinInstance(getStyleValue("skin")) as MovieClip;
            addChildAt(background, 0);
            if (old != null && old != background && contains(old)) { 
                removeChild(old); 
            }
            
            //如果尺寸没有定义，那么使用尺寸的宽度。这段代码只会生效一次。
            //会了满足某些时候，想让皮肤来决定按钮尺寸的需求。
            if(isNaN(_width)) {
                _width = background.width;
            }
            if(isNaN(_height)) {
                _height = background.height;
            }
            
            var frameName:String = (enabled) ? mouseState : "disabled";
            if (selected) { 
                frameName = "selected" + frameName.substr(0, 1).toUpperCase() + frameName.substr(1); 
            }
            (background as MovieClip).gotoAndStop(frameDict[frameName]);
        }

        /**
         * @private
         * 设置鼠标事件。
         */
        protected function setupMouseEvents():void {
            addEventListener(MouseEvent.ROLL_OVER, mouseEventHandler, false, 0, true);
            addEventListener(MouseEvent.MOUSE_DOWN, mouseEventHandler, false, 0, true);
            addEventListener(MouseEvent.MOUSE_UP, mouseEventHandler, false, 0, true);
            addEventListener(MouseEvent.ROLL_OUT, mouseEventHandler, false, 0, true);
        }

        /**
         * @private
         * 鼠标事件的处理函数。
         */
        protected function mouseEventHandler(event:MouseEvent):void {
            if (event.type == MouseEvent.MOUSE_DOWN) {
                mouseState = "down";
                startPress();
            } else if (event.type == MouseEvent.ROLL_OVER || event.type == MouseEvent.MOUSE_UP) {
                mouseState = "over";
                endPress();
            } else if (event.type == MouseEvent.ROLL_OUT) {
                mouseState = "up";
                endPress();
            }
        }

        /**
         * @private
         * 按下按钮时。
         */
        protected function startPress():void {
            if (_autoRepeat) {
                pressTimer.delay = Number(getStyleValue("repeatDelay"));
                pressTimer.start();
            }
            dispatchEvent(new BUIEvent(BUIEvent.BUTTON_REPEAT, true));
        }

        /**
         * @private
         * 松开按钮时。
         */
        protected function endPress():void {
            pressTimer.reset();
        }

        /**
         * @private
         * 重复操作时。
         */
        protected function buttonDown(event:TimerEvent):void {
            if (!_autoRepeat) { 
                endPress(); 
                return; 
            }
            if (pressTimer.currentCount == 1) { 
                pressTimer.delay = Number(getStyleValue("repeatInterval")); 
            }
            dispatchEvent(new BUIEvent(BUIEvent.BUTTON_REPEAT, true));
        }
    }
}
