package baidu.ui.controls.colorPicker {

	/**
	 * @author Administrator
	 */
internal class ColorTools {
	public static function DecToHex(dec : uint) : String {
		var i : int = 0;
		var j : int = 20;
		var str : String = "#";
		while(j >= 0) {
			i = (dec >> j) % 16;
			if(i >= 10) {
				if(i == 10) {
					str += "A";
				}
					else if(i == 11) {
					str += "B";
				}
					else if(i == 12) {
					str += "C";
				}
					else if(i == 13) {
					str += "D";
				}
					else if(i == 14) {
					str += "E";
				}
					else {
					str += "F";
				}
			}else {
				str += i;
			}
			j -= 4;
		}
		return str;
	}

	public static function MIN(...arg) : Number {
		var min : Number = 255;
		for(var i : int = 0;i < arg.length;i++) {
			if(arg[i] < min) {
				min = arg[i];
			}
		}
		return min;
	}

	public static function MAX(...arg) : Number {
		var max : Number = 0;
		for(var i : int = 0;i < arg.length; i++) {
			if(arg[i] > max) {
				max = arg[i];
			}
		}
		return max;
	}
}
}


