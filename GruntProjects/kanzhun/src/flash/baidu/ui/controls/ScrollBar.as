package baidu.ui.controls {
    import flash.events.MouseEvent;	

    import baidu.ui.core.Invalidation;	
    import baidu.ui.events.ScrollEvent;	
    import baidu.ui.events.BUIEvent;	
    import baidu.ui.core.BUI;
    import baidu.ui.constants.BUIConstants;

    /**
     * 滚动时派发此事件。
     */
    [Event(name="scroll", type="baidu.ui.events.ScrollEvent")]
    
    /**
     * 皮肤。注意，本皮肤的结构有一定的复杂度，请参照默认皮肤制作。
     */
    [Style(name="skin", type="Class")]

    /**
     * 滚动条类。本控件目前主要提供给 ScrollPane 使用。如果你制作自己的滚动容器，可能会使用到此类。
     * @author yaowei
     */
    public class ScrollBar extends BUI {
        /**
         * 默认样式。
         */
        public static var defaultStyles:Object = {skin:"ScrollBar_Skin"};

        /**
         * 宽度。此变量控制所有ScollBar的宽度。
         */
        public static var WIDTH:int = 11;

        /**
         * 拖动按钮的最小高度。防止因为显示对象过大，导致 拖动按钮 的尺寸过小。
         */
        public static const THUMB_MIN_HEIGHT:int = 10;

        /**
         * 页面大小。注意指的是可视区域的长度。
         */
        private var _pageSize:Number = 10;

        /**
         * 页滚动量。点击track时的滚动量。
         */
        private var _pageScrollSize:Number = 0;

        /**
         * 行滚动量。点击上下箭头时的滚动量。
         */
        private var _lineScrollSize:Number = 1;

        /**
         * 最小滚动位置。通常为0。
         */
        private var _minScrollPosition:Number = 0;

        /**
         * 最大滚动位置。通常为文档的尺寸。
         */
        private var _maxScrollPosition:Number = 0;

        /**
         * 当前滚动位置。
         */
        private var _scrollPosition:Number = 0;

        /**
         * 滚动的取向。不是指东南西北，而是指水平和垂直。
         */
        private var _orientation:String = BUIConstants.VERTICAL;

        /**
         * 拖动按钮滑动的距离。
         */
        private var thumbScrollOffset:Number;

        /**
         * @private
         * 当前是否正在拖动。
         */
        protected var isDragging:Boolean = false;

        /**
         * @private
         * 向上箭头。
         */
        protected var up:Button;

        /**
         * @private
         * 向下箭头。
         */
        protected var down:Button;

        /**
         * @private
         * 拖动按钮。
         */
        protected var thumb:LabelButton;

        /**
         * @private
         * 轨道。
         */
        protected var track:Button;

        /**
         * 构造函数。
         */
        public function ScrollBar() {
            super();
        }

        /**
         * @private
         */
        override public function setSize(width:Number, height:Number, fire:Boolean = true):void {
            if (_orientation == BUIConstants.HORIZONTAL) {
                super.setSize(height, width, fire);
            } else {
                super.setSize(width, height, fire);
            }
        }

        /**
         * @private
         */
        override public function get width():Number {
            return (_orientation == BUIConstants.HORIZONTAL) ? super.height : super.width;
        }

        /**
         * @private
         */
        override public function get height():Number {
            return (_orientation == BUIConstants.HORIZONTAL) ? super.width : super.height;
        }

        /**
         * @private
         */
        override public function set enabled(value:Boolean):void {
            super.enabled = value;
            down.enabled = track.enabled = thumb.enabled = up.enabled = (enabled && _maxScrollPosition > _minScrollPosition);
            updateThumb();
        }

        /**
         * @private
         */
        override public function get classStyles():Object {
            return mergeStyles(BUI.defaultStyles, defaultStyles);
        }

        /**
         * 设置滚动属性集合。
         * @param pageSize 页面大小
         * @param minScrollPosition 最小滚动位置
         * @param maxScrollPosition 最大滚动位置
         * @param pageScrollSize 页滚动量
         */
        public function setScrollProperties(pageSize:Number,minScrollPosition:Number,maxScrollPosition:Number,pageScrollSize:Number = 0):void {
            this.pageSize = pageSize;
            _minScrollPosition = minScrollPosition;
            _maxScrollPosition = maxScrollPosition;
            if (pageScrollSize >= 0) { 
                _pageScrollSize = pageScrollSize; 
            }
            enabled = (_maxScrollPosition > _minScrollPosition);
            // 确保先前的滚动位置仍然在合适的范围
            setScrollPosition(_scrollPosition, false);
            updateThumb();
        }

        /**
         * 获取/设置 滚动位置。
         */
        public function get scrollPosition():Number { 
            return _scrollPosition; 
        }

        public function set scrollPosition(newScrollPosition:Number):void {
            setScrollPosition(newScrollPosition, true);
        }

        /**
         * 获取/设置 最小滚动位置。
         */
        public function get minScrollPosition():Number {
            return _minScrollPosition;
        }

        public function set minScrollPosition(value:Number):void {
            //需要更新滚动条
            setScrollProperties(_pageSize, value, _maxScrollPosition);
        }

        /**
         * 获取/设置 最大滚动位置。
         */
        public function get maxScrollPosition():Number {
            return _maxScrollPosition;
        }

        public function set maxScrollPosition(value:Number):void {
            //需要更新滚动条
            setScrollProperties(_pageSize, _minScrollPosition, value);
        }

        /**
         * 获取/设置 页面size。
         */
        public function get pageSize():Number {
            return _pageSize;
        }

        public function set pageSize(value:Number):void {
            if (value > 0) {
                _pageSize = value;
            }
        }

        /**
         * 获取/设置 页滚动速度。
         */
        public function get pageScrollSize():Number {
            //如果没有指定 _pageScrollSize，将返回 _pageSize 作为页滚动速度。
            return (_pageScrollSize == 0) ? _pageSize : _pageScrollSize;
        }

        public function set pageScrollSize(value:Number):void {
            if (value >= 0) { 
                _pageScrollSize = value; 
            }
        }

        /**
         * 获取/设置 行滚动速度。
         */
        public function get lineScrollSize():Number {
            return _lineScrollSize;
        }

        public function set lineScrollSize(value:Number):void {
            if (value > 0) {
                _lineScrollSize = value; 
            }
        }

        /**
         * 获取/设置 滚动方向。
         */
        public function get orientation():String {
            return _orientation;
        }

        public function set orientation(value:String):void {
            if (_orientation == value) { 
                return; 
            }
            _orientation = value;

            var horizontal:Boolean = _orientation == BUIConstants.HORIZONTAL;
            if (horizontal && rotation == 0) {
                rotation = -90;
                scaleX = -1;
            } else if (!horizontal && rotation == -90 ) {
                rotation = 0;
                scaleX = 1;
            }
            invalidate(Invalidation.SIZE);
        }

        /**
         * 初始化UI。
         */
        override protected function initUI():void {
            super.initUI();

            track = new Button();
            track.setPosition(0, WIDTH);
            track.useHandCursor = false;
            track.autoRepeat = true;
            addChild(track);

            thumb = new LabelButton();
            thumb.label = "";
            thumb.setSize(WIDTH, 15);
            thumb.setPosition(0, 15);
            addChild(thumb);

            down = new Button();
            down.setSize(WIDTH, WIDTH);
            down.autoRepeat = true;
            addChild(down);

            up = new Button();
            up.setSize(WIDTH, WIDTH);
            up.setPosition(0, 0);
            up.autoRepeat = true;
            addChild(up);

            up.addEventListener(BUIEvent.BUTTON_REPEAT, handleScrollPress, false, 0, true);
            down.addEventListener(BUIEvent.BUTTON_REPEAT, handleScrollPress, false, 0, true);
            track.addEventListener(BUIEvent.BUTTON_REPEAT, handleScrollPress, false, 0, true);
            thumb.addEventListener(MouseEvent.MOUSE_DOWN, handleThumbPress, false, 0, true);

            enabled = false;
        }

        /**
         * @private
         * 重绘。
         */
        override protected function draw():void {	
            if (isInvalid(Invalidation.SIZE)) {
                var h:Number = _height;
                down.setPosition(0, Math.max(up.height, h - down.height));
                track.setSize(WIDTH, Math.max(0, h - (down.height + up.height)));
                updateThumb();
            }
            if (isInvalid(Invalidation.STYLES)) {
                var skin:* = getSkinInstance(getStyleValue("skin"));
                track.setStyle("skin", skin["track"]);
                thumb.setStyle("skin", skin["thumb"]);
                thumb.setStyle("iconSkin", skin["thumbIcon"]);
                down.setStyle("skin", skin["down"]);
                up.setStyle("skin", skin["up"]);
            }
            // 直接调用drawNow，绕开组件嵌套时Render事件出错。
            down.drawNow();
            up.drawNow();
            track.drawNow();
            thumb.drawNow();
            validate();
        }

        /**
         * @private
         * 按下 上下按钮 和 track 时触发。
         */
        protected function handleScrollPress(event:BUIEvent):void {
            event.stopImmediatePropagation();
            if (event.currentTarget == up) {
                setScrollPosition(_scrollPosition - _lineScrollSize); 
            } else if (event.currentTarget == down) {
                setScrollPosition(_scrollPosition + _lineScrollSize);
            } else {
                var mousePosition:Number = (track.mouseY) / track.height * (_maxScrollPosition - _minScrollPosition) + _minScrollPosition;
                var pgScroll:Number = (pageScrollSize == 0) ? pageSize : pageScrollSize;
                if (_scrollPosition < mousePosition) {
                    setScrollPosition(Math.min(mousePosition, _scrollPosition + pgScroll));
                } else if (_scrollPosition > mousePosition) {
                    setScrollPosition(Math.max(mousePosition, _scrollPosition - pgScroll));
                }
            }
        }

        /**
         * @private
         * 按下 thumb 时触发。
         */
        protected function handleThumbPress(event:MouseEvent):void {
            isDragging = true;
            thumbScrollOffset = mouseY - thumb.y;
            thumb.mouseStateLocked = true;
            mouseChildren = false; 
            // Should be able to do stage.mouseChildren, but doesn't seem to work.
            stage.addEventListener(MouseEvent.MOUSE_MOVE, handleThumbDrag, false, 0, true);
            stage.addEventListener(MouseEvent.MOUSE_UP, handleThumbRelease, false, 0, true);
        }

        /**
         * @private
         * 拖动 thumb 时触发。
         */
        protected function handleThumbDrag(event:MouseEvent):void {
            var pos:Number = Math.max(0, Math.min(track.height - thumb.height, mouseY - track.y - thumbScrollOffset));
            setScrollPosition(pos / (track.height - thumb.height) * (_maxScrollPosition - _minScrollPosition) + _minScrollPosition);
            //使得滚动更加流畅
            event.updateAfterEvent();
        }

        /**
         * @private
         * 松开 thumb 时触发。
         */
        protected function handleThumbRelease(event:MouseEvent):void {
            isDragging = false;
            mouseChildren = true;
            thumb.mouseStateLocked = false;
            stage.removeEventListener(MouseEvent.MOUSE_MOVE, handleThumbDrag);
            stage.removeEventListener(MouseEvent.MOUSE_UP, handleThumbRelease);
        }

        /**
         * 设置滚动的位置。
         * @param newScrollPosition 新的滚动位置。
         * @param fire 是否需要派发事件。
         */
        public function setScrollPosition(newScrollPosition:Number, fire:Boolean = true):void {
            var oldPosition:Number = scrollPosition;
            _scrollPosition = Math.max(_minScrollPosition, Math.min(_maxScrollPosition, newScrollPosition));
            if (oldPosition == _scrollPosition) { 
                return; 
            }
            if (fire) { 
                dispatchEvent(new ScrollEvent(_orientation, scrollPosition - oldPosition, scrollPosition)); 
            }
            updateThumb();
        }

        /**
         * @private
         * 更新 thumb 的尺寸和位置。
         */
        protected function updateThumb():void {
            var per:Number = _maxScrollPosition - _minScrollPosition + _pageSize;
            if (track.height <= THUMB_MIN_HEIGHT || _maxScrollPosition <= _minScrollPosition || (per == 0 || isNaN(per))) {
                thumb.height = THUMB_MIN_HEIGHT;
                thumb.visible = false;
            } else {
                thumb.height = Math.max(THUMB_MIN_HEIGHT + 1, _pageSize / per * track.height);
                thumb.y = track.y + (track.height - thumb.height) * ((_scrollPosition - _minScrollPosition) / (_maxScrollPosition - _minScrollPosition));
                thumb.visible = enabled;
            }
        }
    }
}
