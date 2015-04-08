package baidu.ui.core {
	import baidu.ui.events.BUIEvent;
	
	import flash.display.DisplayObject;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.system.ApplicationDomain;
	import flash.system.Capabilities;
	import flash.text.TextFormat;
	import flash.utils.Dictionary;

    /**
     * 尺寸变化。
     */
    [Event(name="sizeChange", type="baidu.ui.events.BUIEvent")]

    /**
     * 位置变化。
     */
    [Event(name="positionChange", type="baidu.ui.events.BUIEvent")]

    /**
     * 一般文本格式。
     */
    [Style(name="textFormat", type="Class")]

    /**
     * 禁用文本格式。
     */
    [Style(name="disabledTextFormat", type="Number")]

    /**
     * 基本组件。
     * 该基本组件解决的问题如下：
     * <ul>
     * <li>位置问题。</li>
     * <li>尺寸问题。</li>
     * <li>---缩放问题。暂时不支持---</li>
     * <li>禁用问题。</li>
     * <li>重绘问题。</li>
     * <li>样式问题。</li>
     * </ul>
     * 所有的组件，都继承了本类。
     * @author yaowei
     */
    public class BUI extends Sprite {
    	
        /**
         * 默认样式。
         */
        public static var defaultStyles:Object = {
            textFormat: new TextFormat("宋体", 12, 0x000000, false, false, false, "", "", "left", 0, 0, 0, 0),
            disabledTextFormat: new TextFormat("宋体", 12, 0x999999, false, false, false, "", "", "left", 0, 0, 0, 0)
        };

        /**
         * 构造函数。
         * <li>成员变量的默认值，一般在这里设置。但静态成员的默认值不在这里设置。</li>
         * <li>子类的构造函数，需先调用此函数。</li>
         */
        public function BUI() {
            super();
            instanceStyles = {};
            invalidHash = {};

            callLaterMethods = new Dictionary();
            _enabled = true;			
            initUI();
            invalidate(Invalidation.ALL);
        }

        /**
         * 失效方法。控制重绘的重要方法。
         * @param property 失效的类型，也就是重绘的类型。InvalidationType中的一种。
         * @param callLater 是否需要下一帧重绘组件。
         */
        public function invalidate(property:String = "all",callLater:Boolean = true):void {
            invalidHash[property] = true;
            if (callLater) {
                this.callLater(draw);
            }
        }

        /**
         * 设置组件的位置。
         * @param x
         * @param y
         * @param fire 是否需要派发事件。
         */
        public function setPosition(x:Number,y:Number,fire:Boolean = true):void {
            if(isNaN(x) || isNaN(y))return;
			
            _x = x;
            _y = y;
            super.x = Math.round(x);
            super.y = Math.round(y);
            if(fire)
				dispatchEvent(new BUIEvent(BUIEvent.POSITION_CHANGE));
        }

        /**
         * 获取/设置x位置。
         */
        override public function get x():Number {
            return _x;
			//return ( isNaN(_x) ) ? super.x : _x; 
        }

        override public function set x(value:Number):void {
            setPosition(value, _y);
        }

        /**
         * 获取/设置y位置。
         */
        override public function get y():Number {
            return _y;
//			return ( isNaN(_y) ) ? super.y : _y;
        }

        override public function set y(value:Number):void {
            setPosition(_x, value);
        }

        /**
         * 设置组件的尺寸。
         * @param width
         * @param height
         * @param fire 是否需要派发事件，默认值为 true 。
         */
        public function setSize(width:Number, height:Number, fire:Boolean = true):void {
            if (_width == width && _height == height) {
                return;
            }
            _width = width;
            _height = height;
            invalidate(Invalidation.SIZE);
            if(fire)
				dispatchEvent(new BUIEvent(BUIEvent.SIZE_CHANGE, false));
        }

        /**
         * 获取/设置宽度。
         */
        override public function get width():Number { 
            return _width;
        }

        override public function set width(value:Number):void {
            if (_width == value) {
                return;
            }
            setSize(value, _height);
        }

        /**
         * 获取/设置高度。
         */
        override public function get height():Number { 
            return _height; 
        }

        override public function set height(value:Number):void {
            if (_height == value) { 
                return;
            }
            setSize(_width, value);
        }

        /**
         * 获取/设置禁用状态。
         */
        public function get enabled():Boolean { 
            return _enabled; 
        }

        public function set enabled(value:Boolean):void {
            if (value == _enabled) { 
                return; 
            }
            _enabled = value;
            invalidate(Invalidation.STATE);
        }

        /**
         * 立即重绘。
         */
        public function drawNow():void {
            draw();
        }

        /**
         * 获取类样式。
         */
        public function get classStyles():Object {
            return defaultStyles;
        }

        /**
         * 设置实例样式。
         */
        public function setStyle(style:String, value:Object):void {
            //使用严格意义上的相等，这样当 instanceStyles[style] 等于 undefined 的时候， null 会与 undefined 不等，而可以塞进去。
            //跳过一些特殊的值，如 TextFormat
            if (instanceStyles[style] === value && !(value is TextFormat)) { 
                return; 
            }
            instanceStyles[style] = value;
            invalidate(Invalidation.STYLES);
        }
        
        /**
         * 一次性设置实例的多个样式。//add on 20090610
         */
        public function setStyles(styles:Object):void{
            for (var n:String in styles) {
                setStyle(n, styles[n]);
            }
        }

        /**
         * 获取实例样式。
         */
        public function getStyle(style:String):Object {
            return instanceStyles[style];
        }

        /**
         * 清除样式。
         */
        public function clearStyle(style:String):void {			
            setStyle(style, null);
        }

        /**
         * 混合2个样式。如果重复出现，后面的会覆盖前面的。
         */
        public static function mergeStyles(...list:Array):Object {
            var result:Object = {};
            var l:uint = list.length;
            for (var i:uint = 0;i < l; i++) {
                var obj:Object = list[i];
                for (var n:String in obj) {
                    result[n] = list[i][n];
                }
            }
            return result;
        }

        /**
         * 获得一个皮肤的实例。
         * @param skin 皮肤的表示符。可以为3种类型的对象。这样皮肤的获取方式变得非常的灵活。
         * <li>String 一个绑定类的名称</li>
         * <li>Class 一个绑定类</li>
         * <li>DisplayObject 一个 DisplayObject 类型的实例</li>
         */
        public static function getSkinInstance(skin:*):DisplayObject {
            if(skin == null) {
                return null;
            }
			
            if (skin is Class) {
                return (new skin()) as DisplayObject; 
            } else if (skin is DisplayObject) {
                (skin as DisplayObject).x = 0;
                (skin as DisplayObject).y = 0;
                return skin as DisplayObject;
            }
			
            var classDef:Class = null;
            try {
                classDef = ApplicationDomain.currentDomain.getDefinition(skin) as Class;
            }catch(e:Error) {
                classDef = null;
            }
            if (classDef == null) {
                return null;
            }
            return (new classDef()) as DisplayObject;
        }

        /**
         * 是否正在执行延迟函数。
         */
        public static var inCallLaterPhase:Boolean = false;

        /**
         * @private
         * x位置
         */
        protected var _x:Number;

        /**
         * @private
         * y位置
         */
        protected var _y:Number;

        /**
         * @private
         * 宽度
         */
        protected var _width:Number;

        /**
         * @private
         * 高度
         */
        protected var _height:Number;

        /**
         * @private
         * 可用状态
         */
        protected var _enabled:Boolean;

        /**
         * @private
         * 实例样式
         */
        protected var instanceStyles:Object;

        /**
         * @private
         * 延迟函数集合。
         */
        protected var callLaterMethods:Dictionary;

        /**
         * @private
         * 实现对象。记录所有的失效的标志位。
         */
        protected var invalidHash:Object;

        /**
         * @private
         * 初始化UI。
         * 负责工作如下：
         * <li>位置，宽度的初始值。</li>
         * <li>不换肤的元件的构造和添加。</li>
         * 注意：
         * <li>子类覆盖此类时，通常先调用此方法一次。</li>
         */
        protected function initUI():void {
            //			setSize(100,100);
            setPosition(0, 0);
			//rotation
			//scale
        }

        /**
         * @private
         * draw函数在执行完毕之后，一定要调用 validate 函数。
         */
        protected function draw():void {
            validate();
        }

        /**
         * @private
         * 将所有失效标志位置为true，并立刻重绘。
         * 原本是public类型，因为一直没有使用，降级为protected。2009-03-26
         */
        protected function validateNow():void {
            invalidate(Invalidation.ALL, false);
            draw();
        }

        /**
         * @private
         * 判断一个或者多个属性中，是否失效。
         * @param property
         */
        protected function isInvalid(property:String,...properties:Array):Boolean {
            if (invalidHash[property] || invalidHash[Invalidation.ALL]) { 
                return true;
            }
            while (properties.length > 0) {
                if (invalidHash[properties.pop()]) { 
                    return true; 
                }
            }
            return false;
        }

        /**
         * @private
         * 设置有效。清空重绘记录。
         */
        protected function validate():void {
            invalidHash = {};
        }

        /**
         * @private
         * 延迟调用。将一个函数延迟到下一帧调用。
         * @param fn 需要延迟调用的函数。
         */
        protected function callLater(fn:Function):void {
            if (inCallLaterPhase) { 
                return; 
            }
			
            callLaterMethods[fn] = true;
            if (stage != null) {
                //stage.addEventListener(Event.RENDER, callLaterDispatcher, false, 0, true);
				//兼容windows和linux
				var type:String = (Capabilities.os.toLowerCase().indexOf("linux")!=-1) ? Event.ENTER_FRAME : Event.RENDER;
				stage.addEventListener(type, callLaterDispatcher, false, 0, true);
				if(type == Event.RENDER){
                	stage.invalidate();
				}
            } else {
                addEventListener(Event.ADDED_TO_STAGE, callLaterDispatcher, false, 0, true);
            }
        }

        /**
         * @private
         * 延迟调用的分发函数。
         * 这个函数可以直接调用延迟函数。也可能继续延迟。
         */
        private function callLaterDispatcher(event:Event):void {
            //失效的设置，有可能发生在添加到舞台之前。需要校正。
            var type:String
            if (event.type == Event.ADDED_TO_STAGE) {
                removeEventListener(Event.ADDED_TO_STAGE, callLaterDispatcher);
                //这时才能监听render事件。
                //stage.addEventListener(Event.RENDER, callLaterDispatcher, false, 0, true);
				//兼容windows和linux
				type = (Capabilities.os.toLowerCase().indexOf("linux")!=-1) ? Event.ENTER_FRAME : Event.RENDER;
				stage.addEventListener(type, callLaterDispatcher, false, 0, true);
                stage.invalidate();
				
                return;
            } else {
                //event.target.removeEventListener(Event.RENDER, callLaterDispatcher);
                //兼容windows和linux
                type = (Capabilities.os.toLowerCase().indexOf("linux")!=-1) ? Event.ENTER_FRAME : Event.RENDER;
				event.target.removeEventListener(type, callLaterDispatcher);
                if (stage == null) {
                    //接收到render时间，舞台却为空。
                    addEventListener(Event.ADDED_TO_STAGE, callLaterDispatcher, false, 0, true);
                    return;
                }
            }
			
            inCallLaterPhase = true;
			
            var methods:Dictionary = callLaterMethods;
            for (var method:Object in methods) {
                method();
                delete(methods[method]);
            }
            inCallLaterPhase = false;
        }

        /**
         * @private
         * 获取一个样式值。实例样式优先于共享样式。
         */
        protected function getStyleValue(name:String):* {
            return (instanceStyles[name] == null) ? classStyles[name] : instanceStyles[name];
        }
    }
}