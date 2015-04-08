package baidu.ui.controls {
    import flash.display.DisplayObject;
    import flash.display.Graphics;
    import flash.display.Shape;

    /**
     * 复选框。
     * 此类可以单独使用，也可以和CheckBox配合使用。
     * @author yaowei
     */
    public class CheckBox extends LabelButton {
        public static var defaultStyles:Object = {iconSkin:"CheckBox_Skin"};

        /**
         * 构造函数。
         */
        public function CheckBox() {
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
        override public function get toggle():Boolean {	
            return true;
        }

        /**
         * @private
         */
        override public function set toggle(value:Boolean):void {
            trace("Warning: 不要修改 CheckBox 的 toggle 属性.");
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
            trace("Warning: 不要修改 CheckBox 的 autoRepeat 属性.");
        }

        /**
         * @private (protected)
         * 初始化UI。
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
         * @private (protected)
         * 重绘背景。
         */
        override protected function drawBackground():void {
            //没有背景。
        }
    }
}