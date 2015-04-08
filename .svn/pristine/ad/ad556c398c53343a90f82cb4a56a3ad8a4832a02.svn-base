package baidu.ui.controls {
    import flash.display.DisplayObject;
    import flash.display.MovieClip;
    import flash.events.Event;
    import flash.events.MouseEvent;
    import flash.text.TextField;
    import flash.text.TextFieldType;
    import flash.text.TextFormat;

    import baidu.ui.constants.BUIConstants;
    import baidu.ui.core.Invalidation;

    /**
     * 当按钮的 selected 属性发生切换时，派发此事件。
     */
    [Event(name="change", type="flash.events.Event")]

    /**
     * 图标的皮肤。和 Button的皮肤skin类似。
     */
    [Style(name="iconSkin", type="Class")]

    /**
     * 图标和文本的整体的外框矩形和按钮边框的距离。
     */
    [Style(name="padding", type="Number")]

    /**
     * 图标和文本之间的距离。
     */
    [Style(name="gap", type="Number")]

    /**
     * 是否使用嵌入文本。默认值为false。
     */
    [Style(name="embedFonts", type="Boolean")]

    /**
     * 标签按钮。<br/>
     * LabelButton 的应用：
     * <li> LabelButton 本身也是一种常用的按钮。</li>
     * <li> LabelButton 被 CheckBox 和 RadioButton 继承。</li>
     * LabelButton 在 Button 的基础上扩充了以下功能：
     * <li>toggle</li>
     * <li>label</li>
     * <li>icon</li>
     * @author yaowei
     */
    public class LabelButton extends Button {

        /**
         * 默认皮肤。
         */
        public static var defaultStyles:Object = {iconSkin:"Button_Icon_Skin", padding:5, gap:5, embedFonts:false};

        /**
         * 构造函数。
         */
        public function LabelButton() {
            super();
        }

        /**
         * @private
         */
        override public function get classStyles():Object {
            return mergeStyles(super.classStyles, defaultStyles);
        }

        /**
         * @private
         */
        override public function get selected():Boolean {
        	
            return (_toggle) ? _selected : false;
        }

        override public function set selected(value:Boolean):void {
            _selected = value;
            if (_toggle) {
                invalidate(Invalidation.STATE);
            }
        }

        /**
         * 获取/设置图标样式。
         */
        public function get icon():Object {
            return getStyle("iconSkin");
        }

        public function set icon(value:*):void {
            setStyle("iconSkin", value);
        }

        /**
         * 获取/设置标签。
         */
        public function get label():String {
            return _label;
        }

        public function set label(value:String):void {
            _label = value;
            if (textField.text != _label) {
                textField.text = _label;
            }
            invalidate(Invalidation.SIZE);
            invalidate(Invalidation.STYLES);
        }

        /**
         * 获取/设置标签位置类型。
         */
        public function get labelPlacement():String {
            return _labelPlacement;
        }

        public function set labelPlacement(value:String):void {
            _labelPlacement = value;
            invalidate(Invalidation.SIZE);
        }

        /**
         * 获取/设置开关标志位。
         */
        public function get toggle():Boolean {
            return _toggle;
        }

        public function set toggle(value:Boolean):void {
            if (!value && super.selected) { 
                selected = false; 
            }
            _toggle = value;
            if (_toggle) { 
                addEventListener(MouseEvent.CLICK, toggleSelected, false, 0, true); 
            } else { 
                removeEventListener(MouseEvent.CLICK, toggleSelected); 
            }
            invalidate(Invalidation.STATE);
        }

        /**
         * 获取/设置值。
         */
        public function get value():Object {
            return _value;
        }

        public function set value(val:Object):void {
            _value = val;
        }

        /**
         * 获取/设置 是否自动设置尺寸。
         * 注意：当 autoSize 为 true 时，width 和 height 的可能反应不及时，为了保险起见，可以先调用 drawNow 函数，再获取。
         */
        public function get autoSize():Object {
            return _autoSize;
        }

        public function set autoSize(value:Object):void {
            _autoSize = value;
            invalidate(Invalidation.SIZE);
        }

        /**
         * @private (protected)
         * 数据。
         */
        protected var _value:Object;

        /**
         * 文本框。
         */
        public var textField:TextField;

        /**
         * @private (protected)
         */
        protected var _labelPlacement:String = BUIConstants.RIGHT;

        /**
         * @private (protected)
         */	
        protected var _toggle:Boolean = false;

        /**
         * @private (protected)
         */
        protected var _icon:DisplayObject;

        /**
         * @private (protected)
         */
        protected var _label:String = "Label";

        /**
         * @private (protected)
         */
        protected var _autoSize:Object = false;

        /**
         * @private (protected)
         */
        protected function toggleSelected(event:MouseEvent):void {
            selected = !selected;
            dispatchEvent(new Event(Event.CHANGE, true));
        }

        /**
         * @private (protected)
         */
        override protected function initUI():void {
            super.initUI();
			
            textField = new TextField();
            textField.type = TextFieldType.DYNAMIC;
            textField.selectable = false;
            addChild(textField);
        }

        /**
         * @private (protected)
         */
        override protected function draw():void {
            if (textField.text != _label) { 
                label = _label;
            }

            if (isInvalid(Invalidation.STYLES, Invalidation.STATE)) {
                drawBackground();
                drawIcon();
                drawTextFormat();

                invalidate(Invalidation.SIZE, false);
            }
            if (isInvalid(Invalidation.SIZE)) {
                drawLayout();
            }
            validate(); // 清空标志位。
        }

        /**
         * @private (protected)
         */
        protected function drawIcon():void {
            
            var old:DisplayObject = _icon;
            _icon = getSkinInstance(getStyleValue("iconSkin")) as DisplayObject;
            
            if (_icon != null) {
                
                addChildAt(_icon, 1);
                
                if(_icon is MovieClip) {
                    var frameName:String = (enabled) ? mouseState : "disabled";
                    if (selected) { 
                        frameName = "selected" + frameName.substr(0, 1).toUpperCase() + frameName.substr(1); 
                    }
                    (_icon as MovieClip).gotoAndStop(frameDict[frameName]);
                }
            }
            
            if (old != null && old != _icon) { 
                removeChild(old); 
            }
        }

        /**
         * @private (protected)
         */
        protected function drawTextFormat():void {
            var tf:TextFormat = getStyleValue(enabled ? "textFormat" : "disabledTextFormat") as TextFormat;
            if (tf != null) {
                textField.setTextFormat(tf);
                textField.defaultTextFormat = tf;
            }
            setEmbedFont();
        }

        /**
         * @private (protected)
         */
        protected function setEmbedFont():void {
            var embed:* = getStyleValue("embedFonts");
            if (embed != null) {
                textField.embedFonts = embed;
            }
        }

        /**
         * @private (protected)
         * 重绘尺寸和布局。主要是设置 icon 和 textField 的布局。
         */
        override protected function drawLayout():void {
            var padding:Number = Number(getStyleValue("padding"));
            var gap:Number = Number(getStyleValue("gap"));
            
            var placement:String = (_icon == null) ? BUIConstants.TOP : _labelPlacement;
            
            textField.height = textField.textHeight + 4;
            var txtW:Number = textField.textWidth + 4;
            var txtH:Number = textField.textHeight + 4;
            var iconW:Number = (_icon == null) ? 0 : _icon.width;
            var iconH:Number = (_icon == null) ? 0 : _icon.height;
            var gappedIconW:Number = (_icon == null) ? 0 : _icon.width + gap;
            var gappedIconH:Number = (_icon == null) ? 0 : _icon.height + gap;
            //label为空时，直接将文本隐藏
            textField.visible = (label.length > 0);
            
            //考虑自适应大小问题
            if(autoSize) {
                textField.autoSize = "left";
                if(placement == BUIConstants.BOTTOM || placement == BUIConstants.TOP) {
                    _width = Math.max(txtW, iconW) + padding * 2;
                    _height = txtH + gappedIconH + padding * 2;
                }else {
                    _width = txtW + gappedIconW + padding * 2;
                    _height = Math.max(txtH, iconH) + padding * 2;
                }
            }else {
                textField.autoSize = "none";
            }
            
            //先将图标居中放置。因为图标至少在一个方向上会是居中的。
            if (_icon != null) {
                _icon.x = Math.round((_width - _icon.width) / 2);
                _icon.y = Math.round((_height - _icon.height) / 2);
            }
            
            var tmpWidth:Number;
            var tmpHeight:Number;
            
            if (textField.visible == false) {
                textField.width = 0;
                textField.height = 0;
            } else if (placement == BUIConstants.BOTTOM || placement == BUIConstants.TOP) {
                tmpWidth = Math.max(0, Math.min(txtW, _width - 2 * padding));
                tmpHeight = Math.min(_height - 2, txtH);
                
                textField.width = txtW = tmpWidth;
                textField.height = txtH = tmpHeight;
                
                textField.x = Math.round((_width - txtW) / 2);
                textField.y = Math.round((_height - textField.height - gappedIconH) / 2 
                                + ((placement == BUIConstants.BOTTOM) ? gappedIconH : 0));
                if (_icon != null) {
                    _icon.y = Math.round((placement == BUIConstants.BOTTOM) ? textField.y 
                                - gappedIconH : textField.y + textField.height + gap);
                }
            } else {
                tmpWidth = Math.max(0, Math.min(txtW, _width - gappedIconW - 2 * padding));	
                textField.width = txtW = tmpWidth;	
                
                textField.x = Math.round((_width - txtW - gappedIconW) / 2 
                                + ((placement != BUIConstants.LEFT) ? gappedIconW : 0));
                textField.y = Math.round((_height - textField.height) / 2);
                if (_icon != null) {
                    _icon.x = Math.round((placement != BUIConstants.LEFT) 
                                            ? textField.x - gappedIconW : textField.x + txtW + gap);
                }
            }
            super.drawLayout();
        }
    }
}
