package baidu.ui.events {
    import flash.events.Event;    
    
    /**
     * @author as4game@gmail.com
     */
    public class WindowEvent extends Event {
    	
    	/**
    	 * 窗口打开。
         */
        public static const OPEN : String = "open";
        
        /**
         * 窗口关闭
         */
        public static const CLOSE : String = "close";
        
        /**
         * 构造函数
         */
        public function WindowEvent(type : String, bubbles : Boolean = false, cancelable : Boolean = false) {
            super(type, bubbles, cancelable);
        }

        /**
         * @private
         */
        override public function toString() : String {
            return formatToString("WindowEvent", "type", "bubbles", "cancelable");
        }

        /**
         * @private
         */
        override public function clone() : Event {
            return new WindowEvent(type, bubbles, cancelable);
        }
    }
}
