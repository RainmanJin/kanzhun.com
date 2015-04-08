package baidu.ui.containers {
    import flash.events.MouseEvent;
    import flash.display.DisplayObject;
    import flash.geom.Rectangle;
    import flash.display.Sprite;	

    import baidu.ui.core.BSkin;	
    import baidu.ui.constants.ScrollPolicy;	
    import baidu.ui.constants.BUIConstants;	
    import baidu.ui.events.ScrollEvent;	
    import baidu.ui.core.Invalidation;	
    import baidu.ui.controls.ScrollBar;	
    import baidu.ui.core.BUI;

    /**
     * 滚动时派发此事件。
     */
    [Event(name="scroll", type="baidu.ui.events.ScrollEvent")]
    
    /**
     * 皮肤。
     * <p>注意:本皮肤的结构有一定的复杂度，请参照默认皮肤制作。内部有2个实例，background 和 disabledOverlay。</p>
     */
    [Style(name="skin", type="Class")]
    
    /**
     * 间距。
     */
    [Style(name="padding", type="Number")]

    /**
     * 滚动窗-ScrollPane。注意，此处的 ScrollPane 只允许通过该设置 content 属性来承载一个 DisplayObject 对象。
     * @author yaowei
     */
    public class ScrollPane extends BUI {
        /**
         * 默认样式。
         */
        public static var defaultStyles:Object = {skin:"ScrollPane_Skin",padding:0};

        /**
         * @private
         */
        protected var _vScrollBar:ScrollBar;

        /**
         * @private
         */
        protected var _hScrollBar:ScrollBar;

        /**
         * @private
         */
        protected var disabledOverlay:BSkin;

        /**
         * @private
         */
        protected var background:BSkin;

        /**
         * @private
         */
        protected var contentContainer:Sprite;

        /**
         * @private
         */
        protected var contentScrollRect:Rectangle;

        /**
         * @private
         */
        protected var contentWidth:Number = 0;

        /**
         * @private
         */
        protected var _contentHeight:Number = 0;

        /**
         * @private
         */
        protected var _availableWidth:Number;

        /**
         * @private
         */
        protected var _availableHeight:Number;

        /**
         * @private
         */
        protected var _hScrollPolicy:String;

        /**
         * @private
         */
        protected var _vScrollPolicy:String;

        /**
         * @private
         */
        protected var vScroll:Boolean;

        /**
         * @private
         */
        protected var hScroll:Boolean;

        /**
         * @private
         */
        protected var _hPageScrollSize:Number = 0;

        /**
         * @private
         */	
        protected var _vPageScrollSize:Number = 0;

        /**
         * @private
         */
        protected var defaultLineScrollSize:Number = 4;

        /**
         * 获取类样式。
         */
        override public function get classStyles():Object {
            return mergeStyles(BUI.defaultStyles, defaultStyles);
        }

        /**
         * 构造函数。
         */
        public function ScrollPane() {
            super();
        }

        /**
         * @private
         */
        override public function get enabled():Boolean {
            return super.enabled;
        }

        /**
         * @private
         */
        override public function set enabled(value:Boolean):void {
            if (enabled == value) { 
                return;
            }
            _vScrollBar.enabled = value;
            _hScrollBar.enabled = value;
            super.enabled = value;
        }
        
        /**
         * 获取 可显示区域的宽度。
         */
        public function get availableWidth():Number{
        	calculateAvailableSize();
            return _availableWidth;
        }
        
        /**
         * 获取 可显示区域的高度。
         */
        public function get availableHeight():Number{
        	calculateAvailableSize();
            return _availableHeight;
        }
        
        /**
         * @private
         * 获取/设置 内容的高度。
         */
        public function get contentHeight():Number{
            return _contentHeight;
        }
        
        public function set contentHeight(value:Number):void{
            _contentHeight = value;
        }

        /**
         * 获取/设置 水平滚动策略。
         */
        public function get hScrollPolicy():String {
            return _hScrollPolicy;
        }

        public function set hScrollPolicy(value:String):void {
            _hScrollPolicy = value;
            invalidate(Invalidation.SIZE);
        }

        /**
         * 获取/设置 垂直滚动策略。
         */
        public function get vScrollPolicy():String {
            return _vScrollPolicy;
        }

        public function set vScrollPolicy(value:String):void {
            _vScrollPolicy = value;
            invalidate(Invalidation.SIZE);
        }

        /**
         * 获取/设置 水平行滚动速度。
         */
        public function get hLineScrollSize():Number {
            return _hScrollBar.lineScrollSize;
        }

        public function set hLineScrollSize(value:Number):void {
            _hScrollBar.lineScrollSize = value;
        }

        /**
         * 获取/设置 垂直行滚动速度。
         */
        public function get vLineScrollSize():Number {
            return _vScrollBar.lineScrollSize;
        }

        public function set vLineScrollSize(value:Number):void {
            _vScrollBar.lineScrollSize = value;
        }

        /**
         * 获取/设置 水平滚动位置。
         */
        public function get hScrollPosition():Number {
            return _hScrollBar.scrollPosition;
        }

        public function set hScrollPosition(value:Number):void {
            drawNow();

            _hScrollBar.scrollPosition = value;
            setHScrollPosition(_hScrollBar.scrollPosition);
        }

        /**
         * 获取/设置 垂直滚动位置。
         */
        public function get vScrollPosition():Number {
            return _vScrollBar.scrollPosition;
        }

        public function set vScrollPosition(value:Number):void {
            drawNow();
            
            _vScrollBar.scrollPosition = value;
            setVScrollPosition(_vScrollBar.scrollPosition);
        }

        /**
         * 获取最大的水平滚动距离。
         */
        public function get maxHScrollPosition():Number {
            drawNow();
            return Math.max(0, contentWidth - _availableWidth);
        }

        /**
         * 获取最大的垂直滚动距离。
         */
        public function get maxVScrollPosition():Number {
            drawNow();
            return Math.max(0, _contentHeight - _availableHeight);
        }

        /**
         * 获取/设置 水平翻页滚动速度。
         */
        public function get hPageScrollSize():Number {
            if (isNaN(_availableWidth)) { 
                drawNow(); 
            }
            return (_hPageScrollSize == 0 && !isNaN(_availableWidth)) ? _availableWidth : _hPageScrollSize;
        }

        public function set hPageScrollSize(value:Number):void {
            _hPageScrollSize = value;
            invalidate(Invalidation.SIZE);
        }

        /**
         * 获取/设置 垂直翻页滚动速度。
         */
        public function get vPageScrollSize():Number {
            if (isNaN(_availableHeight)) { 
                drawNow(); 
            }
            return (_vPageScrollSize == 0 && !isNaN(_availableHeight)) ? _availableHeight : _vPageScrollSize;
        }

        public function set vPageScrollSize(value:Number):void {
            _vPageScrollSize = value;
            invalidate(Invalidation.SIZE);	
        }

        /**
         * 获取水平滚动条的引用。
         */
        public function get hScrollBar():ScrollBar {
            return _hScrollBar;
        }

        /**
         * 获取垂直滚动条的引用。
         */
        public function get vScrollBar():ScrollBar {
            return _vScrollBar;
        }

        /**
         * @private
         */
        override protected function initUI():void {
            super.initUI();
            
            setSize(100, 100);

            // 创建内容的滚动矩形。89:控件默认值尺寸是100，ScrollBar默认宽度是11。
            contentScrollRect = new Rectangle(0, 0, 89, 89);

            // 创建并添加背景。
            background = new BSkin();
            addChild(background);

            // 创建并添加垂直滚动条。
            _vScrollBar = new ScrollBar();
            _vScrollBar.addEventListener(ScrollEvent.SCROLL, handleScroll, false, 0, true);
            _vScrollBar.visible = false;
            _vScrollBar.lineScrollSize = defaultLineScrollSize;
            addChild(_vScrollBar);

            // 创建并添加水平滚动条。
            _hScrollBar = new ScrollBar();
            _hScrollBar.orientation = BUIConstants.HORIZONTAL;
            _hScrollBar.addEventListener(ScrollEvent.SCROLL, handleScroll, false, 0, true);
            _hScrollBar.visible = false;
            _hScrollBar.lineScrollSize = defaultLineScrollSize;
            addChild(_hScrollBar);

            //侦听鼠标滚轮。
            addEventListener(MouseEvent.MOUSE_WHEEL, handleWheel, false, 0, true);

            //内容剪辑
            contentContainer = new Sprite();
            addChild(contentContainer);
            contentContainer.scrollRect = contentScrollRect; 
            
            // 创建禁用矩形。
            disabledOverlay = new BSkin();
            addChild(disabledOverlay);

            //滚动策略默认值
            _hScrollPolicy = ScrollPolicy.AUTO;
            _vScrollPolicy = ScrollPolicy.AUTO;
        }

        /**
         * @private
         */
        protected function setContentSize(width:Number,height:Number):void {
            if (contentWidth == width && _contentHeight == height) { 
                return; 
            }

            contentWidth = width;
            _contentHeight = height;
            invalidate(Invalidation.SIZE);
        }
        
        /**
         * @private
         */
        protected function handleScroll(event:ScrollEvent):void {
            if (event.target == _vScrollBar) {
                setVScrollPosition(event.position);
            } else {
                setHScrollPosition(event.position);
            }
        }

        /**
         * @private
         * 处理鼠标滚轮事件。
         */
        protected function handleWheel(event:MouseEvent):void {
            if (!enabled || !_vScrollBar.visible || _contentHeight <= _availableHeight) {
                return;
            }
            _vScrollBar.scrollPosition -= event.delta * vLineScrollSize;
            setVScrollPosition(_vScrollBar.scrollPosition);
			
            dispatchEvent(new ScrollEvent(BUIConstants.VERTICAL, event.delta, vScrollPosition));
        }

        /**
         * @private
         * 设置水平滚动位置；注意：目前本方法只设置滚动矩形的位置，不管滚动条。
         */
        protected function setHScrollPosition(scroll:Number):void {
            var contentScrollRect:Rectangle = contentContainer.scrollRect;
            contentScrollRect.x = scroll;
            contentContainer.scrollRect = contentScrollRect;
        }

        /**
         * @private
         * 设置垂直滚动位置；注意：目前本方法只设置滚动矩形的位置，不管滚动条。
         */
        protected function setVScrollPosition(scroll:Number):void {
            var contentScrollRect:Rectangle = contentContainer.scrollRect;
            contentScrollRect.y = scroll;
            contentContainer.scrollRect = contentScrollRect;
        }

        /**
         * @private
         */
        override protected function draw():void {
            if (isInvalid(Invalidation.STYLES)) {
                drawStyles();
            }
            if(isInvalid(Invalidation.STATE)){
                drawDisabledOverlay();
            }
            if (isInvalid(Invalidation.SIZE)) {
                drawLayout();
            }
            // 调用内嵌组件的drawNow方法，以绕过嵌套Render带来的bug。
            updateChildren();
            super.draw();
        }

        /**
         * @private
         */
        protected function drawStyles():void {
            var skin:* = getSkinInstance(getStyleValue("skin"));
            background.setStyle("skin", skin["background"]);
            disabledOverlay.setStyle("skin", skin["disabledOverlay"]);
        }

        /**
         * @private
         */
        protected function drawLayout():void {
            calculateAvailableSize();
            calculateContentWidth();

            background.width = _width;
            background.height = _height;

            var padding:Number = Number(getStyleValue("padding"));

            if (vScroll) {
                _vScrollBar.visible = true;
                _vScrollBar.x = _width - ScrollBar.WIDTH - padding;
                _vScrollBar.y = padding;
                _vScrollBar.height = _availableHeight;
            } else {
                _vScrollBar.visible = false;
            }

            _vScrollBar.setScrollProperties(_availableHeight, 0, _contentHeight - _availableHeight, vPageScrollSize);
            setVScrollPosition(_vScrollBar.scrollPosition);

            if (hScroll) {
                _hScrollBar.visible = true;
                _hScrollBar.x = padding;
                _hScrollBar.y = _height - ScrollBar.WIDTH - padding;
                _hScrollBar.width = _availableWidth;
            } else {
                _hScrollBar.visible = false;
            }

            _hScrollBar.setScrollProperties(_availableWidth, 0, contentWidth - _availableWidth, hPageScrollSize);
            setHScrollPosition(_hScrollBar.scrollPosition);

            disabledOverlay.setSize(_width, _height);
            disabledOverlay.setPosition(0, 0);

            //for content
            contentScrollRect = contentContainer.scrollRect;
            contentScrollRect.width = _availableWidth;
            contentScrollRect.height = _availableHeight;

            contentContainer.scrollRect = contentScrollRect;
            contentContainer.x = contentContainer.y = padding;
        }

        /**
         * @private
         */
        protected function drawDisabledOverlay():void {
        	disabledOverlay.visible = !enabled;
        }

        /**
         * @private
         * 计算可用尺寸。
         */
        protected function calculateAvailableSize():void {
        	var padding:Number = Number(getStyleValue("padding"));
            var scrollBarWidth:Number = ScrollBar.WIDTH;

            //计算 是否需要垂直和水平滚动条，以及可用的高度和宽度。
            var availHeight:Number = _height - padding*2;
            vScroll = (_vScrollPolicy == ScrollPolicy.ON) || (_vScrollPolicy == ScrollPolicy.AUTO && _contentHeight > availHeight);
            var availWidth:Number = _width - (vScroll ? scrollBarWidth : 0) - padding*2;
            var maxHScroll:Number = contentWidth - availWidth;
            hScroll = (_hScrollPolicy == ScrollPolicy.ON) || (_hScrollPolicy == ScrollPolicy.AUTO && maxHScroll > 0);
            if (hScroll) { 
                availHeight -= scrollBarWidth; 
            }

            //水平滚动条的出现，可能会影响到垂直滚动条是否应该出现。
            if (hScroll && !vScroll && _vScrollPolicy == ScrollPolicy.AUTO && _contentHeight > availHeight) {
                vScroll = true;
                availWidth -= scrollBarWidth;
            }
            _availableHeight = availHeight;
            _availableWidth = availWidth;
        }

        /**
         * @private
         * 计算内容的宽度。
         */
        protected function calculateContentWidth():void {
            // 需要在子类中实现。
        }

        /**
         * @private
         */
        protected function updateChildren():void {
            _vScrollBar.enabled = _hScrollBar.enabled = enabled;
            _vScrollBar.drawNow();
            _hScrollBar.drawNow();

            background.drawNow();
            disabledOverlay.drawNow();
        }

        /**
         * 更新滚动条。
         */
        public function update():void {
            var child:DisplayObject = contentContainer.getChildAt(0);
            setContentSize(child.width, child.height);
        }

        /**
         * 获取/设置 内容。
         */
        public function get content():DisplayObject {
            if(contentContainer.numChildren > 0) {
                return contentContainer.getChildAt(0);
            }else {
                return null;
            }
        }

        public function set content(d:DisplayObject):void {
            if(contentContainer.numChildren > 0) {
                contentContainer.removeChildAt(0);
            }
            contentContainer.addChild(d);
            update();
        }
    }
}