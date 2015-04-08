package baidu.ui.events {
	import flash.events.Event;		

	/**
	 * 滑动条事件
	 * @author zhanzhihu
	 */
	public class SliderEvent extends BUIEvent {
		/**
		 * 值改变
		 */
		public static const CHANGE : String = "change";

		/**
		 * 鼠标按下滑块
		 */
		public static const THUMB_PRESS : String = "thumbPress";

		/**
		 * 鼠标拖动滑块
		 */
		public static const THUMB_DRAG : String = "thumbDrag";

		/**
		 * 鼠标从滑块上放开
		 */
		public static const THUMB_UP : String = "thumbUp";
		
		/**
		 * 滑块被点击
		 */
		public static const TRACK_DOWN:String = "trackDown";

		/**
		 * 当前值
		 */
		public var value : Number;

		/**
		 * 构造函数
		 */
		public function SliderEvent(type : String,value : Number, bubbles : Boolean = false, cancelable : Boolean = false) {
			super(type, bubbles, cancelable);
			this.value = value;
		}

		/**
		 * @private
		 */
		override public function toString() : String {
			return formatToString("SliderEvent", "type", "bubbles", "cancelable", "value");
		}

		/**
		 * @private
		 */
		override public function clone() : Event {
			return new SliderEvent(type, value, bubbles, cancelable);
		}
	}
}
