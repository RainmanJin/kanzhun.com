package baidu.ui.controls {
    import flash.display.DisplayObject;
    import flash.display.Graphics;
    import flash.display.Shape;
    import flash.events.Event;    

    /**
     * 单选框。<br/>
     * 此类和RadioButtonGroup类紧密相关，需配合使用。
     * @author yaowei
     */
    public class RadioButton extends LabelButton {
        /**
         * 构造函数。
         */
        public function RadioButton() {
            super();
            groupName = defaultGroupName;
        }

        /**
         * @private
         */
        override public function get classStyles():Object {
            return mergeStyles(super.classStyles, defaultStyles);
        }

        public static var defaultStyles:Object = {iconSkin:"RadioButton_Skin"};

        /**
         * @private
         */
        override public function get toggle():Boolean {
            return true;
        }

        /**
         * @private
         */
        override public function set toggle(value:Boolean):void {
            trace("Warning: 不要修改 RadioButton 的 toggle 属性.");
        }

        /**
         * @private
         */
        override public function get autoRepeat():Boolean {	
            return false;
        }		

        /**
         * @private
         */
        override public function set autoRepeat(value:Boolean):void {
            return;
        }

        /**
         * @private
         */
        override public function get selected():Boolean {
            return super.selected;
        }

        /**
         * @private
         */
        override public function set selected(value:Boolean):void {
            // RadioButton的selected属性，只能设置为true，一旦设置就不能设置回去。
            if (value == false || selected) { 
                return; 
            }
            if (_group != null) { 
                _group.selection = this; 
            }
			else { 
                super.selected = value; 
            }
        }

        /**
         * 获取/设置 组名。
         */
        public function get groupName():String {
            return (_group == null) ? null : _group.name;
        }

        public function set groupName(value:String):void {
            if (_group != null) {
                _group.removeRadioButton(this);
                _group.removeEventListener(Event.CHANGE, handleChange);
            }
            _group = (value == null) ? null : RadioButtonGroup.getGroup(value);
            if (_group != null) {
                _group.addRadioButton(this);
                _group.addEventListener(Event.CHANGE, handleChange, false, 0, true);
            }
        }

        /**
         * 获取/设置 组。
         */
        public function get group():RadioButtonGroup {
            return _group;
        }

        public function set group(value:RadioButtonGroup):void {
            groupName = value.name;
        }

        /**
         * @private
         * 保存当前所属 group 的引用
         */
        protected var _group:RadioButtonGroup;

        /**
         * @private
         * 默认组名
         */
        protected var defaultGroupName:String = "RadioButtonGroup";

        
        /**
         * @private
         */
        override protected function initUI():void {
            super.initUI();
            super.toggle = true;
            super.autoSize = true;

            var bg:Shape = new Shape();
            var g:Graphics = bg.graphics;
            g.beginFill(0, 0);
            g.drawRect(0, 0, 100, 100);
            g.endFill();
            background = bg as DisplayObject;
            addChildAt(background, 0);

            _width = bg.width;
            _height = bg.height;
        }

        /**
         * @private
         */
        protected function handleChange(event:Event):void {
            super.selected = (_group.selection == this);
            dispatchEvent(new Event(Event.CHANGE, true));
        }

        /**
         * @private
         */
        override protected function drawBackground():void {
            //无皮肤类型背景，背景用shape绘制。
        }
    }
}
