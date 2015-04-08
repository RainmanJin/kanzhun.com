package baidu.ui.constants {

    /**
     * 窗口模式。
     * @author as4game@gmail.com
     */
    public class WindowMode {
        public static const CAN_CLOSE:int = 1;
        public static const CAN_MAXIMIZE:int = 2;
        public static const CAN_MINIMIZE:int = 4;
        public static const CAN_MOVE:int = 8;
        public static const CAN_RESIZE:int = 16;
        public static const IS_MODAL:int = 32;
        
        //常见的窗口类型
        
        /**
         * 模式窗口。
         * 等效于 WINDOW.CAN_CLOSE|WINDOW.CAN_MOVE|WINDOW.IS_MODAL
         */
        public static const MODAL:int = 41;
        
        /**
         * 正常窗口。
         */
        public static const NORMAL:int = 31;
        
        /**
         * 固定窗口。
         */
        public static const FIXED:int = 0;
    }
}
