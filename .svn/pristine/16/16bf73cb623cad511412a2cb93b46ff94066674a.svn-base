package baidu.ui.events {
    import flash.events.Event;    
    
    /**
     * @author as4game@gmail.com
     */
    public class ResizerEvent extends Event {
    	
    	/**
    	 * 边框拖动结束。
         */
        public static const BORDER_DRAG_END : String = "borderDragEnd";
        
        /**
         * 中心拖动结束。
         */
        public static const CENTER_DRAG_END : String = "centerDragEnd";
        
        /**
         * 构造函数
         */
        public function ResizerEvent(type : String, bubbles : Boolean = false, cancelable : Boolean = false) {
            super(type, bubbles, cancelable);
        }

        /**
         * @private
         */
        override public function toString() : String {
            return formatToString("ResizerEvent", "type", "bubbles", "cancelable");
        }

        /**
         * @private
         */
        override public function clone() : Event {
            return new ResizerEvent(type, bubbles, cancelable);
        }
    }
}
