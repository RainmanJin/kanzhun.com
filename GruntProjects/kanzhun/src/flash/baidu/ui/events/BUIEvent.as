package baidu.ui.events {
    import flash.events.Event;

    /**
     * BUI组件的基本事件。
     */
    public class BUIEvent extends Event {

        /**
         * 尺寸变化。
         */
        public static const SIZE_CHANGE:String = "sizeChange";

        /**
         * 位置变化。
         */
        public static const POSITION_CHANGE:String = "positionChange";

        /**
         * 可视状态的变化。
         */
        public static const VISIABLE_CHANGE:String = "visiableChange";

        /**
         * 选中状态的变化。
         */
        public static const SELECTED_CHANGE:String = "selectedChange";

        /**
         * 标签变化。
         */
        public static const LABEL_CHANGE:String = "labelChange";

        /**
         * 鼠标按下事件。用于启用了重复功能的按钮。
         */
        public static const BUTTON_REPEAT:String = "buttonRepeat";

        /**
         * 回车事件。
         */
        public static const ENTER:String = "enter";

        /**
         * 事件的数据对象。
         */
        public var data:Object;

        /**
         * 构造函数。
         */
        public function BUIEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false) {
            super(type, bubbles, cancelable);
        }

        override public function toString():String {
            return formatToString("BUIEvent", "type", "bubbles", "cancelable");
        }

        override public function clone():Event {
            var e:BUIEvent = new BUIEvent(type, bubbles, cancelable);
            e.data = data;
            return e;
        }
    }
}