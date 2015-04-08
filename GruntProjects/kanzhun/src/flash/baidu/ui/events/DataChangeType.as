package baidu.ui.events {

    /**
     * 数据改变的类型。
     */
    public class DataChangeType {

        /**
         * 一个或者几个数据项失效。
         */
        public static const INVALIDATE:String = "invalidate";

        /**
         * 所有的数据项失效。
         */
        public static const INVALIDATE_ALL:String = "invalidateAll";

        /**
         * 添加了一个数据项。
         */
        public static const ADD:String = "add";

        /**
         * 删除了一个数据项。
         */
        public static const REMOVE:String = "remove";

        /**
         * 清空了所有的数据项。
         */
        public static const REMOVE_ALL:String = "removeAll";

        /**
         * 某一个数据项被替代。
         */
        public static const REPLACE:String = "replace";

        /**
         * 数据项的顺序发生变化，但数据项本身没有变化。
         */
        public static const SORT:String = "sort";
    }
}