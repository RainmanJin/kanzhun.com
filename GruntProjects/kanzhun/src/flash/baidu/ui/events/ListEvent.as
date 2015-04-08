package baidu.ui.events {
    import flash.events.Event;        

    /**
     * 列表事件。
     */
    public class ListEvent extends Event {

        /**
         * 鼠标划出项目。
         */
        public static const ITEM_ROLL_OUT:String = "itemRollOut";

        /**
         * 鼠标经过项目。
         */
        public static const ITEM_ROLL_OVER:String = "itemRollOver";

        /**
         * 鼠标点击项目。
         */
        public static const ITEM_CLICK:String = "itemClick";

        /**
         * 鼠标双击项目。
         */
        public static const ITEM_DOUBLE_CLICK:String = "itemDoubleClick";

        /**
         * @private
         */
        protected var _rowIndex:int;

        /**
         * @private
         */
        protected var _columnIndex:int;

        /**
         * @private
         */
        protected var _index:int;

        /**
         * @private
         */
        protected var _item:Object;

        /**
         * 构造函数
         * @param type 事件类型
         * @param bubbles 是否冒泡
         * @param cancelable 是否可以取消
         * @param columnIndex 列索引
         * @param rowIndex 行索引
         * @param index 索引。在List组件中，只用到了index，而columnIndex和rowIndex没有被使用。
         * @param item 数据项
         */
        public function ListEvent(type:String, bubbles:Boolean = false, cancelable:Boolean = false, columnIndex:int = -1, rowIndex:int = -1, index:int = -1, item:Object = null) {
            super(type, bubbles, cancelable);
            _rowIndex = rowIndex;
            _columnIndex = columnIndex;
            _index = index;
            _item = item;
        }

        /**
         * 获取行索引。
         */
        public function get rowIndex():Object {
            return _rowIndex;
        }

        /**
         * 获取列索引。
         */
        public function get columnIndex():int {
            return _columnIndex;
        }

        /**
         * 获取索引。
         */
        public function get index():int {
            return _index;
        }

        /**
         * 获取数据项。
         */
        public function get item():Object {
            return _item;
        }

        /**
         * @private
         */
        override public function toString():String {
            return formatToString("ListEvent", "type", "bubbles", "cancelable", "columnIndex", "rowIndex", "index", "item");
        }

        /**
         * @private
         */
        override public function clone():Event {
            return new ListEvent(type, bubbles, cancelable, _columnIndex, _rowIndex);
        }
    }
}