package baidu.ui.controls {
	import flash.text.TextField;

	import baidu.ui.core.BUI;
	import baidu.ui.core.Invalidation;        

	/**
	 * 文本标签 目前主要解决了文本省略的问题。
	 * @author as4game@gmail.com
	 */
	public class Label extends BUI {

		protected var _textField : TextField;

		protected var _text : String;
		protected var _ellipsis : Boolean;
		protected var _ellipsisIndex : int = -1;
		protected var _tail : String = "...";

		/**
		 * 获取 文本框的引用。
		 */
		public function get textField() : TextField {
			return _textField;
		}

		/**
		 * 获取/设置 文本。
		 */
		public function get text() : String {
			return _text;
		}

		public function set text(value : String) : void {
			_text = value;
			invalidate(Invalidation.SIZE);
		}

		/**
		 * 获取 显示出来的文本。当 ellipsis 属性为 true 时，displayText 和 text属性可能
		 * 不相等。
		 */
		public function get displayText() : String {
			return _textField.text;
		}

		/**
		 * 是否开启省略。
		 */
		public function get ellipsis() : Boolean {
			return _ellipsis;
		}

		public function set ellipsis(value : Boolean) : void {
			_ellipsis = value;
			invalidate(Invalidation.SIZE);
		}

		/**
		 * 获取/设置 省略的位置。0代表第1个字符，-1代表最后1个字符，-4代表倒数第4个字符。
		 */
		public function get ellipsisIndex() : int {
			return _ellipsisIndex;
		}

		public function set ellipsisIndex(value : int) : void {
			_ellipsisIndex = value;
			invalidate(Invalidation.SIZE);
		}

		/**
		 * 获取/设置 省略符号。
		 */
		public function get tail() : String {
			return _tail;
		}

		public function set tail(value : String) : void {
			_tail = value;
			invalidate(Invalidation.SIZE);
		}

		/**
		 * 构造函数。
		 */
		public function Label() {
			super();
		}

		override protected function initUI() : void {
			super.initUI();
			setSize(100, 100);
        	
			_textField = new TextField();
			addChild(_textField);
		}

		override protected function draw() : void { 
			if (isInvalid(Invalidation.SIZE)) {
				drawLayout();
				drawTextField();
			}
			super.draw();
		}

		protected function drawLayout() : void {
			_textField.width = _width;
			_textField.height = _height;
		}

		protected function drawTextField() : void {
			_textField.text = _text;
            
			if(_ellipsis) {
				if(_textField.textWidth > _textField.width) {
                	
                	var source : String = _text;
                	
					//索引超出范围
					if(_ellipsisIndex > source.length - 1 || _ellipsisIndex < -source.length) {
						trace("Error：参数 " + _ellipsisIndex + " 不合法，不再允许范围。");
						return;
					}
                	
					//保留字符过多
					if(_ellipsisIndex < 0) {
						_textField.text = _tail 
							+ source.slice(source.length + _ellipsisIndex + 1, source.length);
						if(_textField.textWidth > _textField.width - 4) {
							trace("Error：参数 " + _ellipsisIndex + " 不合法，保留的字符过多。");
							return;
						}
					}else {
						_textField.text = source.slice(0, _ellipsisIndex) + _tail;
						if(_textField.textWidth > _textField.width - 4) {
							trace("Error：参数 " + _ellipsisIndex + " 不合法，保留的字符过多。");
							return;
						}
					}
                    
					//正常省略
					_textField.text = _text + _tail;
                    
					var before : String;
					var after : String;
					while(_textField.textWidth > _textField.width - 4) {
						//去掉 source 的 _ellipsisIndex 位置的1个字符
						if(_ellipsisIndex < 0) {
							before = source.slice(0, source.length + _ellipsisIndex);
							after = source.slice(source.length + _ellipsisIndex + 1, source.length);
						} else {
							before = source.slice(0, _ellipsisIndex);
							after = source.slice(_ellipsisIndex + 1, source.length);
						}
						source = before + after;
                        
						//将省略符号加进去
						_textField.text = before + _tail + after;
                        
						//字符没了
						if(source.length == 0) {
							break;
						}
					}
				}
			}
		}
	}
}