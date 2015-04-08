package baidu.ui.controls.colorPicker {

	import baidu.ui.controls.colorPicker.HSB;
	import baidu.ui.controls.colorPicker.ColorTools;
	/**
	 * @author Administrator
	 */
	public class RGB {
		private var _r : uint,_g : uint,_b : uint;

		public function get r() : uint {
			return _r;
		}

		public function set r(value : uint) : void {
			_r = value;
		}

		public function get g() : uint {
			return _g;
		}

		public function set g(value : uint) : void {
			_g = value;
		}

		public function get b() : uint {
			return _b;
		}

		public function set b(value : uint) : void {
			_b = value;
		}

		public function toString() : String {
			return "RGB" + " R:" + r + " G:" + g + " B:" + b;
		}

		public function RGB(r : uint = 0,g : uint = 0,b : uint = 0) {
			this.r = r;
			this.g = g;
			this.b = b;
		}

		public function fromHSB(hsb : HSB) : void {
			var hue : Number = hsb.h;
			var sat : Number = hsb.s / 100.0;
			var bri : Number = hsb.b / 100.0;
			var hi : uint = Math.floor(hue / 60) % 6;
			var f : Number = hue / 60 - hi;
			var p : Number = bri * (1 - sat);
			var q : Number = bri * (1 - f * sat);
			var t : Number = bri * (1 - (1 - f) * sat);
			var rgb:Object;
			switch(hi){
				case 0:rgb={r:bri, g:t,  b:p};break;
				case 1:rgb={r:q,   g:bri,  b:p};break;
				case 2:rgb={r:p,   g:bri,b:t};break;
				case 3:rgb={r:p,   g:q,  b:bri};break;
				case 4:rgb={r:t,   g:p,  b:bri};break;
				case 5:rgb={r:bri, g:p,  b:q};break;
			}
			r = Math.floor(rgb.r * 0xff);
			g = Math.floor(rgb.g * 0xff);
			b = Math.floor(rgb.b * 0xff);
		}

		public function toDec() : uint {
			return r << 16 | g << 8 | b;
		}

		public function fromDec(value : uint) : void {
			r = value >> 16;
			g = value >> 8 & 0xff;
			b = value & 0xff;
		}

		public function toHex() : String {
			var n : uint = b;
			n += g << 8;
			n += r << 16;
			return ColorTools.DecToHex(n);
		}

		public function FromHex(hex : String) : void {
			hex = hex.toUpperCase();
			if(hex.charAt(0) == "#") {
				hex = hex.substring(1, hex.length);
			}
			r = parseInt(hex.substring(0, 2), 16);
			g = parseInt(hex.substring(2, 4), 16);
			b = parseInt(hex.substring(4, 6), 16);
			if(isNaN(r)) {
				r = 0;
			}
			if(isNaN(g)) {
				g = 0;
			}
			if(isNaN(b)) {
				b = 0;
			}
		}
	}
}
