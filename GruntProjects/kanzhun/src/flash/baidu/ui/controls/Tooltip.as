package baidu.ui.controls {
    import flash.display.MovieClip;
    import flash.display.Sprite;
    import flash.text.TextField;

    import baidu.ui.core.BUI;
    import baidu.ui.core.Invalidation;        

    /**
     * 一个简单的 Tooltip 类。可以作为 TooltipManager 的渲染器。<br/>
     * 您可以模仿这个类，设计自己的 Tooltip。定义一个 Tooltip 需要满足以下规范：<br/>
     * <li>是DisplayObject的子类</li>
     * <li>有text属性</li>
     * @author yaowei
     */
    public class Tooltip extends BUI {

        /**
         * @private
         */
        protected var textField:TextField;
        
        /**
         * @private
         */
        protected var background:Sprite;

        /**
         * 默认皮肤。
         */
        public static var defaultStyles:Object = {
    		skin:"Tooltip_Skin", padding:2
    	};

        /**
         * 构造函数。
         */
        public function Tooltip() {
            super();
        }

        /**
         * 获取类样式。
         */
        override public function get classStyles():Object {
            return BUI.mergeStyles(super.classStyles, defaultStyles);
        }

        /**
         * 获取/设置 文本。
         */
        public function get text():String {
            return textField.text;
        }

        public function set text(value:String):void {
            textField.text = value;
            invalidate(Invalidation.SIZE);
            invalidate(Invalidation.STYLES);
        }

        override protected function initUI():void {
            super.initUI();
        	
            textField = new TextField();
            addChild(textField);
            textField.autoSize = "left";
        }

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
            var padding:int = getStyleValue("padding");
        	
            _width = background.width = textField.width + padding * 2;
            _height = background.height = textField.height + padding * 2;
            textField.x = textField.y = padding;
        }

        /**
         * @private
         * 绘制皮肤。
         */
        protected function drawBackground():void {
            var old:MovieClip = background as MovieClip;
            background = getSkinInstance(getStyleValue("skin")) as Sprite;
            addChildAt(background, 0);
            if (old != null && old != background && contains(old)) { 
                removeChild(old); 
            }
        }
    }
}
