package baidu.ui.managers {
    import flash.display.DisplayObjectContainer;
    import flash.display.InteractiveObject;
    import flash.display.Sprite;
    import flash.display.Stage;
    import flash.events.MouseEvent;
    import flash.events.TimerEvent;
    import flash.geom.Point;
    import flash.text.TextField;
    import flash.text.TextFormat;
    import flash.utils.Dictionary;
    import flash.utils.Timer;        

    /**
     * TooltipManager 用于管理Tooltip。类似于html的a标签的title效果。
     * @author yaowei
     */
    /* 
     * 策略1：在 BUI 甚至是 在 Sprite 上扩展tooltip属性。
     * <li>问题是消耗比较大，因为并不是所有的 UIComponent 或者 Sprite 都需要tooltip。</li>
     * <li>有的需要 tooltip，却不一定是 Sprite，可能是比 Sprite 还要抽象（DisplayObject）或者是并列的对象（TextField）。</li>
     * <li>会受到 BUI 或者 Sprite 的层次约束。而 tooltip 一般会处于顶层，不能被遮挡。</li>
     * 
     * 策略2：管理器的方式。即跳到对象之外，成立一个 TooltipManager 全局对象，让他与所有需要 tooltip 的对象关联。
     * <li>不浪费，按需索取</li>
     * <li>可以通过注册在顶级或者高层的容器中，就可以避免被遮挡。</li>
     * 
     */
    public class TooltipManager {

        /**
         * 触发器 到 提示 的映射。
         */
        private var trigger2Tooltip:Dictionary = new Dictionary(true);

        /**
         * 文本框。一个默认的tooltip。
         */
        private var textField:TextField;

        /**
         * 顶级容器。
         */
        private var _root:DisplayObjectContainer;

        /**
         * tooltip的容器。
         */
        private var container:Sprite;

        /**
         * 渲染器。
         */
        private var _defaultRender:* = null;

        /**
         * 计时器。
         */
        private var timer:Timer = new Timer(4000, 1);

        /**
         * @private
         * 构造函数。仅供本类的内部使用，不要调用此函数。
         */
        public function TooltipManager() {
            
            //容器
            container = new Sprite();
            container.mouseEnabled = false;
            container.tabEnabled = false;
            container.mouseChildren = false;
            
            //初始化动态文本
            textField = new TextField();
            textField.background = true;
            textField.backgroundColor = 0xFFFFCC;
            textField.border = true;
            textField.borderColor = 0x000000;
            textField.multiline = false;
            textField.wordWrap = false;
            textField.autoSize = "left";
            
            //设置动态文本样式
            var format:TextFormat = new TextFormat("宋体", 12, 0x000000);
            format.indent = 2;
            textField.setTextFormat(format);
            textField.defaultTextFormat = format;
            
            timer.addEventListener(TimerEvent.TIMER, handleTimer);
        }

        /**
         * 获取一个 TooltipManager 的实例。
         * @return 一个 TooltipManager 的实例。
         */
        public static function getInstance():TooltipManager {
            return InstanceManager.createSingletonInstance(TooltipManager);
        }

        /**
         * 获取/设置 显示提示文本的容器。一般为 stage 。
         */
        public function get root():DisplayObjectContainer {
            return _root;
        }

        public function set root(value:DisplayObjectContainer):void {
            if (_root == null) {
                _root = value;
                _root.addChild(container);
            } else {
                trace("Error:root只允许设置一次，之后不允许修改。");
            }
        }

        /**
         * 获取/设置 多久以后隐藏提示文本。
         */
        public function get hideDelay():Number {
            return timer.delay;
        }

        public function set hideDelay(value:Number):void {
            timer.delay = value;
        }

        /**
         * 获取/设置 提示文本的渲染器。
         */
        public function get defaultRender():* {
            return _defaultRender;
        }

        public function set defaultRender(value:*):void {
            _defaultRender = value;
        }

        /**
         * 获取渲染器实例。
         */
        private function getRenderInstance(render:*):* {
            //trigger个体渲染器 > TooltipManager的默认渲染器 > TooltipManager的内置渲染器
            var renderInstance:*;
            if (render != null) {
                renderInstance = InstanceManager.createSingletonInstance(render);
            } else if (defaultRender != null) {
                renderInstance = InstanceManager.createSingletonInstance(defaultRender);
            } else {
                renderInstance = textField;
            }
            return renderInstance;
        }
        
        private function showTooltip(text:String, render:*, trigger:InteractiveObject):void {
            var renderInstance:* = getRenderInstance(render);
            container.addChild(renderInstance);
            renderInstance.text = text;
            
            //设置位置
            var stage:Stage = container.stage;
            if (stage != null){
                var mouseX:Number = stage.mouseX;
                var mouseY:Number = stage.mouseY;
                var rWidth:Number = renderInstance.width;
                var rHeight:Number = renderInstance.height;
                var sWidth:Number = stage.stageWidth;
                var sHeight:Number = stage.stageHeight;
                
                //水平方向上的限制
                if (mouseX + rWidth + 2 > sWidth){
                    renderInstance.x = container.globalToLocal(new Point(sWidth, sHeight)).x 
                                        - rWidth - 2;
                } else{
                    renderInstance.x = container.mouseX;
                }
                
                //竖直方向上的限制
                if (mouseY + rHeight + 22 > sHeight) {
                    renderInstance.y = container.mouseY - rHeight;
                } else {
                    renderInstance.y = container.mouseY + 22;
                }
            }
            
            timer.reset();
            timer.start();
        }
        
        private function hideTooltip(render:*):void{
            var renderInstance:* = getRenderInstance(render);
            if (container.contains(renderInstance)) {
                container.removeChild(renderInstance);
            }
            
            timer.reset();
            timer.stop();
        }

        /**
         * 为一个触发器注册tooltip。
         * @param trigger 触发器。InteractiveObject对象。
         * @param text 字符串。
         * @param render 渲染器。可选。
         */
        public function register(trigger:InteractiveObject, text:String, render :*= null):void {
            if (text != null) {
                trigger2Tooltip[trigger] = {text:text, render:render};
                trigger.addEventListener(MouseEvent.ROLL_OVER, handleTriggerOver, false);
                trigger.addEventListener(MouseEvent.ROLL_OUT, handleTriggerOut, false);
            } else {
                //handleTriggerOut(null);
                trigger.removeEventListener(MouseEvent.ROLL_OVER, handleTriggerOver, false);
                trigger.removeEventListener(MouseEvent.ROLL_OUT, handleTriggerOut, false);
                delete trigger2Tooltip[trigger];
            }
        }

        /**
         * 为一个触发器注销tooltip。
         * @param trigger 触发器。InteractiveObject对象。
         */
        public function unregister(trigger:InteractiveObject):void {
            register(trigger, null);
        }

        private function handleTriggerOver(event:MouseEvent):void {
            var trigger:InteractiveObject = event.target as InteractiveObject;
            var text:String = trigger2Tooltip[trigger]["text"];
            var render:* = trigger2Tooltip[trigger]["render"];
            
            if (!event.buttonDown) {
                showTooltip(text, render, trigger);
            }
        }
        
        private function handleTriggerOut(event:MouseEvent):void {
            var trigger:InteractiveObject = event.target as InteractiveObject;
            var render:* = trigger2Tooltip[trigger]["render"];
            
            hideTooltip(render);
        }
        
        /**
         * 计时器事件。
         */
        private function handleTimer(event:TimerEvent):void {
            if (container.numChildren) {
                container.removeChildAt(0);
            }
        }
    }
}