package baidu.ui.events {
    import flash.events.Event;

    /**
     * 滚动事件。
     */
    public class ScrollEvent extends Event {

        /**
         * 滚动。
         */
        public static const SCROLL:String = "scroll";

        private var _orientation:String;

        private var _delta:Number;

        private var _position:Number;

        /**
         * 构造函数。
         */
        public function ScrollEvent(orientation:String, delta:Number, position:Number) {
            super(ScrollEvent.SCROLL, false, false);
            _orientation = orientation;
            _delta = delta;
            _position = position;
        }

        /**
         * 获取取向。
         */
        public function get orientation():String {
            return _orientation;
        }

        /**
         * 获取滚动量。
         */
        public function get delta():Number {
            return _delta;
        }

        /**
         * 获取当前位置。
         */
        public function get position():Number {
            return _position;
        }

        /**
         * @private
         */
        override public function toString():String {
            return formatToString("ScrollEvent", "type", "bubbles", "cancelable", "direction", "delta", "position");
        }

        /**
         * @private
         */
        override public function clone():Event {
            return new ScrollEvent(_orientation, _delta, _position);
        }
    }
}