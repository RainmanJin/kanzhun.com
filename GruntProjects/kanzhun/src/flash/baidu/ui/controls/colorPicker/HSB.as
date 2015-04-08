package baidu.ui.controls.colorPicker {

	import baidu.ui.controls.colorPicker.ColorTools;
	/**
	 * @author Administrator
	 */
	public class HSB {
		private var _h : Number,_s : Number,_b : Number;

		public function HSB(h : Number = 0,s : Number = 0,b : Number = 0) {
			this.h = h;
			this.s = s;
			this.b = b;
		}

		public function toString() : String {
			return "HSB" + " H:" + h + " S:" + s + " B:" + b;
		}

		/**
		 * 获取/设置 色相 
		 * 取值范围(0-360)
		 */
		public function get h() : Number {
			return _h;
		}

		public function set h(value : Number) : void {
			_h = value;
		}

		/**
		 * 获取/设置 饱和度 
		 * 取值范围(1-100)表示(1%-100%)
		 */
		public function get s() : Number {
			return _s;
		}

		public function set s(value : Number) : void {
			_s = value;
		}

		/**
		 * 获取/设置 亮度 
		 * 取值范围(1-100)表示(1%-100%)
		 */
		public function get b() : Number {
			return _b;
		}

		public function set b(value : Number) : void {
			_b = value;
		}

		public function fromRGB(rgb : RGB) : void {
			var r_ : Number = (rgb.r+0.0) / 0xff;
			var g_ : Number = (rgb.g+0.0) / 0xff;
			var b_ : Number = (rgb.b+0.0) / 0xff;
			var max : Number = ColorTools.MAX(r_, g_, b_);
			var min : Number = ColorTools.MIN(r_, g_, b_);
			var hue : Number;
			var sat : Number = (max == 0) ? 0 : (1 - min / max);
			var bri : Number = max;
			if(max == min) {
				h = 0;
				s = sat * 100;
				b = bri * 100;
				return;
			}
			switch(max) {
				case r_:
					hue = 60 * (g_ - b_)/(max -min);
					hue = (hue <0)?(hue+360):hue;
					break;
				case g_:
				    hue = 60 *(b_-r_)/(max-min)+120;
					break;
				case b_:
					hue = 60*(r_-g_)/(max-min)+240;
					break;
			}
			h = hue;
			s = sat * 100;
			b = bri * 100;
		}
	}
}
