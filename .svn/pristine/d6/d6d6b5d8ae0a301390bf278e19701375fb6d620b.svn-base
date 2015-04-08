package baidu.ui.containers {
    import flash.display.DisplayObject;
    import flash.display.Sprite;
    import flash.display.Stage;
    import flash.events.Event;
    import flash.events.MouseEvent;
    import flash.text.TextFormat;
    
    import baidu.ui.constants.WindowMode;
    import baidu.ui.controls.Button;
    import baidu.ui.controls.Label;
    import baidu.ui.controls.Resizer;
    import baidu.ui.core.BSkin;
    import baidu.ui.core.BUI;
    import baidu.ui.core.Invalidation;
    import baidu.ui.events.ResizerEvent;
    import baidu.ui.events.WindowEvent;
    import baidu.ui.managers.DepthManager;
    import baidu.ui.managers.InstanceManager;        

    /**
     * @author yaowei
     */
    public class Window extends BUI {

        /**
         * 默认样式。
         */
        public static var defaultStyles:Object = {
        	skin:"Window_Skin", textFormat:new TextFormat("宋体", 12, 0xffffff, false, false, false, "", "", "left", 0, 0, 0, 0)
        };
        
        /**
         * 边框的宽度。
         */
        public static const BORDER_WIDTH:int = 4;
        
        /**
         * 标题栏的高度。
         */
        public static const TITLE_HEIGHT:int = 20;
        
        /**
         * 最小化的宽度。
         */
        public static const MINIMIZE_WIDTH:int = 100;
        
        /**
         * 最小化的高度。
         */
        public static const MINIMIZE_HEIGHT:int = 34;
        
        /**
         * 对舞台的引用。
         */
        protected static var _stage:Stage;
        private static var _container:Sprite = null;

        private var _mode:int;
        private var _owner:Window;
        private var _maximized:Boolean = false;
        private var _minimized:Boolean = false;

        private var _resizer:Resizer;
        private var _block:Sprite;
        private var _background:BSkin;
        private var _icon:BSkin;
        private var _title:Label;
        private var _minimize:Button;
        private var _maximize:Button;
        private var _normalize:Button;
        protected var _close:Button;
        
        private var _content:DisplayObject;

        private var _preferredWidth:Number;
        private var _preferredHeight:Number;
        private var _preferredX:Number;
        private var _preferredY:Number;

        /**
         * 获取类样式。
         */
        override public function get classStyles():Object {
            return mergeStyles(BUI.defaultStyles, defaultStyles);
        }

        /**
         * 初始化舞台。
         */
        public static function initialize(stage:Stage):void {
            _stage = stage;
            _container = new Sprite();
            _stage.addChild(_container);
        }
        
        public function Window(mode:int = WindowMode.NORMAL, owner:Window = null) {
            _mode = mode;
            _owner = owner;
            super();
        }

        /**
         * 获取 窗口模式。
         */
        public function get mode():int {
            return _mode;
        }

        /**
         * 获取窗口所有者。
         */
        public function get owner():Window {
            return _owner;
        }

        public function get icon():String {
            return null;
        }

        public function set icon(value:String):void {
        }

        public function get title():String {
            return _title.text;
        }

        public function set title(value:String):void {
        	_title.text = value;
        }

        public function get content():DisplayObject {
            return _content;
        }

        public function set content(value:DisplayObject):void {
        	if(_content!=null&&contains(_content)){
        	    removeChild(_content);
        	}
        	_content = value;
        	addChild(_content);
        }

        public function get maximized():Boolean {
            return _maximized;
        }

        public function set maximized(value:Boolean):void {
            _maximized = value;
            if(_maximized) {
                _minimized = false;
            }
            invalidate(Invalidation.STATE);
            invalidate(Invalidation.SIZE);
        }

        public function get minimized():Boolean {
            return _minimized;
        }

        public function set minimized(value:Boolean):void {
            _minimized = value;
            if(_minimized) {
                _maximized = false;
            }
            invalidate(Invalidation.STATE);
            invalidate(Invalidation.SIZE);
        }

        public function open(x:Number=-1,y:Number=-1):void {
        	_container.addChild(this);
        	
        	if(x!=-1){
                _preferredX = x;
        	}
        	if(y!=-1){
                _preferredY = y;
        	}
        	
        	invalidate(Invalidation.ALL);
            dispatchEvent(new WindowEvent(WindowEvent.OPEN));
        }

        public function close():void {
        	_container.removeChild(this);
        	dispatchEvent(new WindowEvent(WindowEvent.CLOSE));
        }

        override protected function initUI():void {
            super.initUI();
            _width = 300;
            _height = 170;
            _preferredWidth = 300;
            _preferredHeight = 170;
            
            _block = new Sprite();
            addChild(_block);
            _block.graphics.beginFill(0xff0000,0.1);
            _block.graphics.drawRect(-5000, -5000, 10000, 10000);
            _block.graphics.endFill();
            _block.visible = Boolean(_mode & WindowMode.IS_MODAL);
            
            _background = new BSkin();
            addChild(_background);
            
            _resizer = new Resizer();
            addChild(_resizer);
            _resizer.centerHeight = 20;
            _resizer.setStyle("centerAlpha", 0);
            _resizer.centerCursor = null;
        	
            _icon = new BSkin();
            addChild(_icon);
            _icon.autoSize = true;
            _icon.mouseChildren =_icon.mouseEnabled = false;
            _title = new Label();
            addChild(_title);
            _title.mouseChildren =_title.mouseEnabled = false;
            _minimize = new Button();
            addChild(_minimize);
            _maximize = new Button();
            addChild(_maximize);
            _normalize = new Button();
            addChild(_normalize);
            _close = new Button();
            addChild(_close);
            
            _title.text = "标题";
            _title.ellipsis = true;
            
            //
            _icon.setSize(16, 16);
            _minimize.setSize(20, 21);
            _maximize.setSize(18, 21);
            _normalize.setSize(18, 21);
            _close.setSize(19, 21);
            _resizer.setSize(width, height);
            
            //
            _maximize.visible = Boolean(_mode & WindowMode.CAN_MAXIMIZE);
            _minimize.visible = Boolean(_mode & WindowMode.CAN_MINIMIZE);
            _close.visible = Boolean(_mode & WindowMode.CAN_CLOSE);
            
            //
            _minimize.addEventListener(MouseEvent.CLICK, handleButtonClick);
            _maximize.addEventListener(MouseEvent.CLICK, handleButtonClick);
            _normalize.addEventListener(MouseEvent.CLICK, handleButtonClick);
            _close.addEventListener(MouseEvent.CLICK, handleButtonClick);
            
            //
            _resizer.center.doubleClickEnabled = Boolean(_mode & WindowMode.CAN_MAXIMIZE);
            _resizer.center.addEventListener(MouseEvent.DOUBLE_CLICK, handleTitleBarEvent);
            _resizer.addEventListener(ResizerEvent.BORDER_DRAG_END, handleResizerEvent);
            _resizer.addEventListener(ResizerEvent.CENTER_DRAG_END, handleResizerEvent);
            
            //
            this.addEventListener(MouseEvent.MOUSE_DOWN, handleWindowMouseDown);
        }
        
        private function handleWindowMouseDown(event:MouseEvent):void {
            DepthManager.bringToTop(this);
        }

        private function handleResizerEvent(event:ResizerEvent):void {
        	switch(event.type) {
                case ResizerEvent.BORDER_DRAG_END:
                    _preferredWidth = _resizer.width;
                    _preferredHeight = _resizer.height;
                    _preferredX += _resizer.x;
                    _preferredY += _resizer.y;
                    _resizer.setPosition(0, 0);
                    invalidate(Invalidation.SIZE);
                    break;
                case ResizerEvent.CENTER_DRAG_END:
                    _preferredX += _resizer.x;
                    _preferredY += _resizer.y;
                    _resizer.setPosition(0, 0);
                    invalidate(Invalidation.SIZE);
                    break;
            }
        }

        private function handleTitleBarEvent(event:MouseEvent):void {
        	switch(event.type) {
                case MouseEvent.DOUBLE_CLICK:
                    if(maximized || minimized){
                        maximized = false;
                        minimized = false;
                    }else{
                        maximized = true;
                    }
                    break;
            }
        }
        
        private function handleButtonClick(event:MouseEvent):void {
            switch(event.currentTarget) {
                case _minimize:
                    minimized = true;
                    break;
                case _maximize:
                    maximized = true;
                    break;
                case _normalize:
                    maximized = false;
                    minimized = false;
                    break;
                case _close:
                    close();
                    break;
            }
        }

        override protected function draw():void {
            if (isInvalid(Invalidation.STYLES)) {
                drawStyles();
            }
            if(isInvalid(Invalidation.STATE)) {
                drawState();
            }
            if (isInvalid(Invalidation.SIZE)) {
                drawLayout();
            }
            // 调用内嵌组件的drawNow方法，以绕过嵌套Render带来的bug。
            updateChildren();
            super.draw();
        }

        protected function drawStyles():void {
            var skin:* = InstanceManager.createInstance(getStyleValue("skin"));
            _background.setStyle("skin", skin["background"]);
            _icon.setStyle("skin", skin["icon"]);
            _minimize.setStyle("skin", skin["minimize"]);
            _maximize.setStyle("skin", skin["maximize"]);
            _normalize.setStyle("skin", skin["normalize"]);
            _close.setStyle("skin", skin["close"]);
        	
            drawTextFormat();
        }

        protected function drawState():void {
            _maximize.visible = (!_maximized) && (_mode & WindowMode.CAN_MAXIMIZE);
            _normalize.visible = (_maximized || _minimized)&&((_mode & WindowMode.CAN_MAXIMIZE || _mode& WindowMode.CAN_MINIMIZE))
            _minimize.visible = (!_minimized) && (_mode & WindowMode.CAN_MINIMIZE);
            
            _resizer.moveable = (!_maximized) && (_mode & WindowMode.CAN_MOVE);
            _resizer.resizable = (!_minimized) && (_mode & WindowMode.CAN_RESIZE);
            
            if(_content!=null){
                _content.visible = !_minimized;
            }
        }

        protected function drawLayout():void {
            if(maximized) {
                _width = _stage.stageWidth+2*BORDER_WIDTH;
                _height = _stage.stageHeight+2*BORDER_WIDTH;
                x = -BORDER_WIDTH;
                y = -BORDER_WIDTH;
            }else if(minimized) {
                _width = MINIMIZE_WIDTH;
                _height = MINIMIZE_HEIGHT;
                x = _preferredX;
                y = _preferredY;
            }else{
                _width = _preferredWidth;
                _height = _preferredHeight;
                x = _preferredX;
                y = _preferredY;
            }
        	
            _background.setSize(_width, _height);
            _resizer.setSize(_width, _height);
            _icon.y = _title.y = 4;
        	
            _icon.x = 4;
            _close.x = _width - 4 - _close.width;
            _maximize.x = _close.x - 2 - _maximize.width;
            _minimize.x = _maximize.x - _minimize.width;
            
            _normalize.x = _minimized ? _minimize.x : _maximize.x;
            
            _title.x = _icon.x + _icon.width;
            _title.width = _minimize.x - _icon.x - _icon.width;
            
            if(_content!=null){
                _content.width = _width - BORDER_WIDTH*2;
                _content.height = _height - BORDER_WIDTH * 2 - TITLE_HEIGHT;
                _content.x = BORDER_WIDTH;
                _content.y = BORDER_WIDTH + TITLE_HEIGHT;
            }
        }

        protected function drawTextFormat():void {
            var format:TextFormat = getStyleValue("textFormat");
            _title.textField.setTextFormat(format);
            _title.textField.defaultTextFormat = format;
        }

        protected function updateChildren():void {
            _background.drawNow();
            _icon.drawNow();
            _title.drawNow();
            _minimize.drawNow();
            _maximize.drawNow();
            _close.drawNow();
            _resizer.drawNow();
            
            if(_content is BUI){
                (_content as BUI).drawNow();
            }
        }
        
        public function center():void{
            _preferredX = Math.round((_stage.stageWidth - _preferredWidth) / 2);
            _preferredY = Math.round((_stage.stageHeight - _preferredHeight) / 2);
            invalidate(Invalidation.SIZE);
        }
    }
}
