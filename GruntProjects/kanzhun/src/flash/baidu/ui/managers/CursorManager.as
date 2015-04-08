package baidu.ui.managers {
    import flash.display.DisplayObject;
    import flash.display.DisplayObjectContainer;
    import flash.display.InteractiveObject;
    import flash.display.Sprite;
    import flash.display.Stage;
    import flash.events.Event;
    import flash.events.MouseEvent;
    import flash.ui.Mouse;
    import flash.utils.Dictionary;

    import baidu.ui.managers.DepthManager;
    import baidu.ui.managers.InstanceManager;

    /**
     * CursorManager 用于管理光标。
     * 它的用法有2种：
     * <li>使用 register 方法，为某个显示元素设置特定的光标外观。例如：window 的边缘，当鼠标触摸时，光标显示为 resize 形状。</li>
     * <li>使用 showCursor 和 hideCursor 方法。</li>
     * 
     * @author yaowei
     */
    public class CursorManager {

        /**
         * 触发器 到 光标 的映射。
         */
        private var tigger2Cursor:Dictionary = new Dictionary(true);

        /**
         * 光标所在的顶级容器。准确的说是 cursorContainer 将添加到这里，并保持在最高层。
         */
        private var _root:DisplayObjectContainer = null;

        /**
         * 光标的容器。将所有的光标都放在这里的好处是，方便控制光标的层次。
         */
        private var container:DisplayObjectContainer = null;

        /**
         * 当前正在显示光标。
         */
        private var currentCursor:DisplayObject = null;

        /**
         * @private
         * 构造函数。
         */
        public function CursorManager() {
            //容器
            container = new Sprite();
            container.mouseEnabled = false;
            container.tabEnabled = false;
            container.mouseChildren = false;
        }

        /**
         * 获取一个 CursorManager 的实例。
         * @return 一个 CursorManager 的实例。
         */
        public static function getInstance():CursorManager {
            return InstanceManager.createSingletonInstance(CursorManager);
        }

        /**
         * 获取/设置 用于放置光标的顶级容器。一般为 stage 。
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
         * 显示指定的用户光标，并可以选择是否隐藏系统。
         * 如果当前另外一个用户光标正在显示，那么当前的光标隐藏，显示新的用户光标。
         * @param cursor 要显示的用户光标。
         * @param hideSystemCursor 是否隐藏系统光标。
         */
        public function showCursor(cursor:*, hideSystemCursor:Boolean = true):void {
        	
            cursor = InstanceManager.createSingletonInstance(cursor);
        	
            if (hideSystemCursor) {
                Mouse.hide();
            } else {
                Mouse.show();
            }
            if (cursor == currentCursor) {
                return;
            }
		
            if (container != null) {
                if (currentCursor != cursor) {
                    if (currentCursor != null) {
                        container.removeChild(currentCursor);
                    }
                    currentCursor = cursor;
                    container.addChild(currentCursor);
                }
                DepthManager.bringToTop(container);
                root.stage.addEventListener(MouseEvent.MOUSE_MOVE, handleMove, false);
                handleMove(null);
            }
        }

        private function handleMove(event:MouseEvent):void {
            container.x = container.parent.mouseX;
            container.y = container.parent.mouseY;
            DepthManager.bringToTop(container);
            if (event != null) {
                event.updateAfterEvent();
            }
        }

        /**
         * 隐藏指定的用户光标，显示系统光标。
         * @param cursor 要隐藏的光标，如果该光标还没有被显示，直接返回。 
         */
        public function hideCursor(cursor:*):void {
            cursor = InstanceManager.createSingletonInstance(cursor);
            if (cursor != currentCursor) {
                return;
            }
            
            hideCurrentCursor();
        }

        /**
         * 隐藏当前显示的用户光标，显示系统光标。
         */
        public function hideCurrentCursor():void {
            if (container != null) {
                if (currentCursor != null) {
                    container.removeChild(currentCursor);
                }
            }
            currentCursor = null;
            Mouse.show();
            if (root != null) {
                root.stage.removeEventListener(MouseEvent.MOUSE_MOVE, handleMove);
            }
        }

        /**
         * 为一个触发器设置指定的光标。
         * @param trigger 触发器。当鼠标触摸到触发器时，指定的光标会出现。
         * @param cursor 光标对象。为null时，会恢复为系统光标。
         */
        public function register(trigger:InteractiveObject, cursor:*):void {
            if (cursor != null) {
                tigger2Cursor[trigger] = InstanceManager.createSingletonInstance(cursor);
                trigger.addEventListener(MouseEvent.ROLL_OVER, handleTriggerOver, false);
                trigger.addEventListener(MouseEvent.ROLL_OUT, handleTriggerOut, false);
                trigger.addEventListener(MouseEvent.MOUSE_UP, handleTriggerUp, false);
            } else {
                handleTriggerOut(null);
                trigger.removeEventListener(MouseEvent.ROLL_OVER, handleTriggerOver, false);
                trigger.removeEventListener(MouseEvent.ROLL_OUT, handleTriggerOut, false);
                trigger.removeEventListener(MouseEvent.MOUSE_UP, handleTriggerUp, false);
                delete tigger2Cursor[trigger];
            }
        }

        /**
         * 为一个触发器注销光标，恢复为系统光标。
         * @param trigger 触发器。当鼠标触摸到触发器时，指定的光标会出现。
         */
        public function unregister(trigger:InteractiveObject):void {
            register(trigger, null);
        }

        private function handleTriggerOver(event:MouseEvent):void {
            var trigger:InteractiveObject = event.currentTarget as InteractiveObject;
            var cursor:DisplayObject = tigger2Cursor[trigger] as DisplayObject;
            
            if (cursor && !event.buttonDown) {
                showCursor(cursor);
            }
        }

        private function handleTriggerOut(event:MouseEvent):void {
            var trigger:InteractiveObject = event.currentTarget as InteractiveObject;
            var cursor:DisplayObject = tigger2Cursor[trigger] as DisplayObject;
            
            if (cursor) {
                hideCursor(cursor);
            }
        }

        private function handleTriggerUp(event:MouseEvent):void {
            var trigger:InteractiveObject = event.currentTarget as InteractiveObject;
            var cursor:DisplayObject = tigger2Cursor[trigger] as DisplayObject;
            
            if (cursor && trigger.hitTestPoint(event.stageX, event.stageY, true)) {
                showCursor(cursor);
            }
        }
    }
}