package baidu.ui.events {
    import flash.events.Event;

    /**
     * 数据改变事件。
     */
    public class DataChangeEvent extends Event {
        /**
         * 数据改变。
         */
        public static const DATA_CHANGE:String = "dataChange";

        /**
         * 数据即将改变。
         */
        public static const PRE_DATA_CHANGE:String = "preDataChange";

        /**
         * @private
         */
        protected var _startIndex:uint;

        /**
         * @private
         */
        protected var _endIndex:uint;

        /**
         * @private
         */
        protected var _changeType:String;

        /**
         * @private
         */
        protected var _items:Array;

        /**
         * 构造函数
         * @param eventType 事件类型
         * @param changeType 改变类型
         * @param items 变化的数据项
         * @param startIndex 起始索引
         * @param endIndex 结束索引
         */
        public function DataChangeEvent(eventType:String, changeType:String, items:Array,startIndex:int = -1, endIndex:int = -1):void {
            super(eventType);
            _changeType = changeType;
            _startIndex = startIndex;
            _items = items;
            _endIndex = (endIndex == -1) ? _startIndex : endIndex;
        }

        /**
         * 获取 数据改变类型。
         */
        public function get changeType():String {
            return _changeType;
        }

        /**
         * 获取 改变的数据项。
         */
        public function get items():Array {
            return _items;
        }

        /**
         * 获取 其实索引。
         */
        public function get startIndex():uint {
            return _startIndex;
        }

        /**
         * 获取 结束索引。
         */
        public function get endIndex():uint {
            return _endIndex;
        }

        /**
         * @private
         */
        override public function toString():String {
            return formatToString("DataChangeEvent", "type", "changeType", "startIndex", "endIndex", "bubbles", "cancelable");
        }

        /**
         * @private
         */
        override public function clone():Event {
            return new DataChangeEvent(type, _changeType, _items, _startIndex, _endIndex);
        }
    }
}