package baidu.ui.events {
	import flash.events.Event;

	/**
	 * 颜色拾取器事件。
	 */
	public class ColorPickerEvent extends Event {
		public static const CHANGE : String = "change";
		public static const OPEN : String = "open";
		public static const CLOSE : String = "close";
		public static const ITEM_ROLL_OVER : String = "itemRollOver";
		public static const ITEM_ROLL_OUT : String = "itemRollOut";
		public static const HSB_OPEN : String = "hsbOpen";
		public static const HSB_CLOSE : String = "hsbClose";
		public static const COLOR_POOL_OPEN : String = "colorPoolOpen";
		public static const COLOR_POOL_CLOSE : String =  "colorPoolClose";
		/**
		 * 颜色。
		 */
		protected var _color : uint;

		/**
		 * 获取 颜色。
		 */
		public function get color() : uint {
			return _color;
		}

		public function ColorPickerEvent(type : String, color : uint) {
			super(type, true);			
			_color = color;
		}

		/**
		 * @private
		 */
		override public function toString() : String {
			return formatToString("ColorPickerEvent", "type", "bubbles", "cancelable", "color");
		}

		/**
		 * @private
		 */
		override public function clone() : Event {
			return new ColorPickerEvent(type, color);
		}
	}
}