package baidu.ui.controls.colorPicker {
	import baidu.ui.controls.Button;
	import baidu.ui.controls.LabelButton;
	import baidu.ui.core.BUI;
	import baidu.ui.core.Invalidation;
	import baidu.ui.events.ColorPickerEvent;
	
	import flash.display.DisplayObject;
	import flash.display.Graphics;
	import flash.display.MovieClip;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.MouseEvent;
	import flash.geom.ColorTransform;
	import flash.geom.Point;
	import flash.text.TextField;
	import flash.text.TextFieldType;
	import flash.text.TextFormat;		

	/**
	 * @author zhanzhihu@baidu.com
	 */
	 
	/**
	 * 颜色改变时派发
	 */
	[Event(name="change", type="baidu.ui.events.SliderEvent")]

	/**
	 * 调色板打开时派发
	 */
	[Event(name="open", type="baidu.ui.events.SliderEvent")]

	/**
	 * 调色板关闭时派发
	 */
	[Event(name="close", type="baidu.ui.events.SliderEvent")]

	/**
	 * 鼠标经过某一个色块时派发
	 */
	[Event(name="itemRollOver", type="baidu.ui.events.SliderEvent")]

	/**
	 * 鼠标离开某一色块时派发
	 */
	[Event(name="itemRollOut", type="baidu.ui.events.SliderEvent")]

	/**
	 * Hsb调色板被打开时派发
	 */
	[Event(name="hsbOpen", type="baidu.ui.events.SliderEvent")]

	/**
	 * Hsb调色板关闭时派发
	 */
	[Event(name="hsbClose", type="baidu.ui.events.SliderEvent")]

	/**
	 * 皮肤
	 */	
	[Style(name="skin", type="Class")]

	public class ColorPicker extends BUI {
		public static var defaultStyles : Object = {skin:"ColorPicker_Skin", itemSkin:"ColorPickerItem_Skin"};
		/**
		 * 标识色块调色板
		 */
		public static const COLOR_POOL_PALETTE : String = "colorPoolPalette";
		/**
		 * 标识HSB调色板
		 */
		public static const HSB_PALETTE : String = "hsbPalette";
		/**
		 * 默认颜色
		 */
		public static var colorsDefault : Array;

		/**
		 * @private
		 */
		protected var _hsbOpen : Boolean = false;
		/**
		 * @private
		 */
		protected var _colorPoolOpen : Boolean = false;
		/**
		 * @private
		 */
		protected var _colCount : uint = 18;
		/**
		 * @private
		 */
		protected var _paletteOpen : Boolean = false;
		/**
		 * @private
		 */
		protected var _colors : Array = null;
		/**
		 * @private
		 */
		protected var _editable : Boolean = true;
		/**
		 * @private
		 */
		protected var _hexValue : String = "#FFFF00";
		/**
		 * @private
		 */
		protected var _showTextField : Boolean = true;
		/**
		 * @private
		 * 
		 */
		protected var _selectedColor : uint = 0xFFFF00;
		/**
		 * @private
		 */
		protected var _currType : String = null;

		/**
		 * @private
		 */
		protected var _paletteX : int = 0;
		/**
		 * @private
		 */
		protected var _paletteY : int = 0; 

		/**
		 * @private
		 * 当前浏览color的样例
		 */
		protected var shapeDisplay : Sprite;
		/**
		 * @private
		 * 饱和度亮度调色板 的滑块
		 */
		protected var shapeMouseInSatBri : Shape;
		/**
		 * @private
		 * 调色板的背景
		 */
		protected var background : MovieClip;
		/**
		 * @private
		 * colorpicker颜色文本输入区域
		 */
		protected var textField : TextField;
		/**
		 * @private
		 * 调色板的引用
		 */
		protected var palette : Sprite;
		/**
		 * @private
		 * 切换按钮的引用
		 */
		protected var btnChange : LabelButton;
		/**
		 * @private 
		 * 确定按钮的引用
		 */
		protected var btnConfig : LabelButton;

		/**
		 * @private
		 * COLOR池调板的引用
		 */
		protected var colorPool : Sprite;
		/**
		 * @private 
		 * 用于标识哪个颜色块被选中　
		 */
		protected var shapeBox : Shape;

		/**
		 * @private
		 * HSB调色板的引用
		 */
		protected var hsbPane : Sprite;
		/**
		 * @private
		 * 饱和度亮度调板的引用
		 */
		protected var hsbSatBri : Sprite;
		/**
		 * @private
		 * 色相调板的引用
		 */
		protected var hsbHue : Sprite;
		/**
		 * @private
		 * 色相滑块的引用
		 */
		protected var hsbHueThumb : Button;

		/**
		 * @private
		 * 主选择器按钮的引用
		 */
		protected var swatch : Sprite;
		/**
		 * @private
		 * 选择器边框按钮的引用
		 */
		protected var swatchBtn : Button;
		
		private var swatchBlock:Sprite;

		/**
		 * @private
		 * 当前浏览color的RGB值
		 */
		protected var currRGB : RGB = new RGB(255, 255, 0);
		/**
		 * @private
		 * 当前浏览值的HSB值
		 */
		protected var currHSB : HSB = new HSB(60, 1, 1);

		/**
		 * 获取/设置  color池的列数
		 * 列数只有在第一次打开COLOR池调色板之前设置有效。
		 */
		public function get colCount() : uint {
			return _colCount;
		}

		public function set colCount(value : uint) : void {
			//只在color池创建前设置有效
			if(!colorPool) {
				_colCount = value;
			}
		}

		/**
		 * 获取/设置 COLOR池所有的颜色值
		 */
		public function get colors() : Array {
			return  _colors;
		}

		public function set colors(value : Array) : void {
			//只在color池创建前设置有效
			if(!colorPool) {
				_colors = value;
			}
		}

		/**
		 * 获取当前选中颜色值的十六进制字符串
		 */
		public function get hexValue() : String {
			var rgb_ : RGB = new RGB();
			rgb_.fromDec(selectedColor);
			_hexValue = rgb_.toHex();
			return _hexValue;
		}

		public function get hsbOpen() : Boolean {
			return _hsbOpen;
		} 

		public function set hsbOpen(value : Boolean) : void {
			if(_hsbOpen == value) {
				return;
			}
			if(value) {
				openPaletteByName(HSB_PALETTE);
			}else {
				close();
			}
		}

		/**
		 * 获得/设置 color池调色板是否打开
		 */
		public function get colorPoolOpen() : Boolean {
			return _colorPoolOpen;
		}

		public function set colorPoolOpen(value : Boolean) : void {
			if(_colorPoolOpen == value) {
				return;
			}
			if(value) {
				openPaletteByName(COLOR_POOL_PALETTE);
			}else {
				close();
			}
		}

		/**
		 * 获得/设置 是否打开调色板
		 */
		public function get paletteOpen() : Boolean {
			return _paletteOpen;
		}

		public function set paletteOpen(value : Boolean) : void {
			if(_paletteOpen == value) {
				return;
			}
			if(value) {
				open();
			}else {
				close();
			}
		}

		/**
		 * 获得/设置 文本区域是否可被编辑
		 */
		public function get editable() : Boolean {
			return _editable;
		}

		public function set editable(value : Boolean) : void {
			if(_editable == value) {
				return;
			}			
			_editable = value;
			if(textField) {
				textField.type = (value) ? TextFieldType .INPUT : TextFieldType.DYNAMIC;
			}
		}

		/**
		 * 获得/设置 是否显示文本区域
		 */
		public function get showTextField() : Boolean {
			return _showTextField;
		}

		public function set showTextField(value : Boolean) : void {
			if(_showTextField == value) {
				return;
			}
			_showTextField = value;
			if(textField) {
				textField.visible = value;
			}
		}

		/**
		 * 获得/设置 当前选中颜色值(readonly)
		 */
		public function get selectedColor() : uint {
			return _selectedColor;
		}

		public function set selectedColor(value : uint) : void {
			_selectedColor = value;
			invalidate(Invalidation.SIZE);
		}

		/**
		 * 获得/设置 当前调色板的类型
		 */
		public function get currType() : String {
			return _currType;
		}

		public function set currType(value : String) : void {
			if(value != COLOR_POOL_PALETTE && value != HSB_PALETTE) {
				return;
			}
			if(_currType == value) {
				return;
			}
			openPaletteByName(value);
		}

		/**
		 * 构造函数
		 */
		public function ColorPicker() {
			super();
		}

		/**
		 * 设置调色板的位置
		 * 相对于POPUP BUTTON右上角的位置
		 */
		public function setPalettePosition(x : int = 0,y : int = 0) : void {
			//w 272 h:191
			_paletteX = 0;
			_paletteY = 0;
			if(palette) {
				//当调色板打开的时候，调节调色板的位置
				var point : Point = swatch.localToGlobal(new Point(0, 0));
				palette.x = point.x + swatch.width + _paletteX;
				palette.y = point.y + _paletteY;
				if(palette.x + 272 >stage.stageWidth){
					palette.x = point.x + swatch.width - 272;
					palette.y = point.y + swatch.height;
					if(palette.y + 191 > stage.stageHeight){
						palette.y = point.y - 191;
					}
				}else{
					if(palette.y + 191 > stage.stageHeight){
						palette.y = point.y + swatch.height - 191;
					}
				}
			}
		}

		/**
		 * 打开调色板
		 * 默认打开色板调色板
		 */
		public function open() : void {
			if(!paletteOpen) {
				openPaletteByName(COLOR_POOL_PALETTE);
			}
		}

		/**
		 * 关闭调色板
		 */			
		public function close() : void {
			if(paletteOpen && palette && stage.contains(palette)) {
				stage.removeChild(palette);
				_currType = null;
				_paletteOpen = _colorPoolOpen = _hsbOpen = colorPool.visible  = false;
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.CLOSE, selectedColor)); 
			}
		}

		/**
		 * 设置初始化颜色
		 */
		protected function setInitColor() : void {
			var rgb_ : RGB = new RGB();
			rgb_.fromDec(selectedColor);
			setCurrRgb(rgb_.r, rgb_.g, rgb_.b);
		}

		/**
		 * 添加关闭事件监听
		 */
		protected function addCloseListener(e : Event) : void {
			removeEventListener(Event.ENTER_FRAME, addCloseListener);
			if (!paletteOpen) { 
				return; 
			}
			stage.addEventListener(MouseEvent.MOUSE_DOWN, onStageClick, false, 0, true);
		}

		/**
		 * 处理舞台点击事件
		 * 当舞台被点击时关闭调色板
		 */
		protected function  onStageClick(event : MouseEvent) : void {
			if (!paletteOpen) { 
				return; 
			}
			if (!contains(event.target as DisplayObject) && !palette.contains(event.target as DisplayObject)) {
				stage.removeEventListener(MouseEvent.MOUSE_DOWN, onStageClick);
				close();
			}
		}

		/**
		 * 打开HSB调色板
		 */
		public function openHsbPalette() : void {
			if(!paletteOpen) {
				//palette未打开
				openPaletteByName(HSB_PALETTE);
			}else {
				//palette已经打开
				if(!hsbOpen) {
					//hsbPalette未打开
					togglePalette();
				}
			}
		}

		/**
		 * 切换调色板
		 */
		public function togglePalette() : void {
			if(!paletteOpen) {
				return;
			}
			setInitColor();
			if(!hsbOpen) {
				
				hsbPane.visible = _hsbOpen = true;
				colorPool.visible = _colorPoolOpen = false;
				_currType = HSB_PALETTE;
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.HSB_OPEN, selectedColor));
				btnChange.label = "普通";
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.COLOR_POOL_CLOSE, selectedColor));
				background.height = hsbPane.height + 45;
				positionHsb();
			}else {
				colorPool.visible = _colorPoolOpen = true;
				if(shapeBox && colorPool.contains(shapeBox)) {
					colorPool.removeChild(shapeBox);
				}
				
				hsbPane.visible = _hsbOpen = false;
				_currType = COLOR_POOL_PALETTE;
				
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.HSB_CLOSE, selectedColor));
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.COLOR_POOL_OPEN, selectedColor));
				btnChange.label = "高级";
				background.height = colorPool.height + 45;
			}
			invalidate(Invalidation.STYLES);
		}

		/**
		 * 根据当前颜色重新设置HSB调色板的状态
		 * 这些状态包括:色相滑块的位置，饱和度亮度调板的重绘
		 * 以及亮度调板的小滑块的位置
		 */
		protected function positionHsb() : void {
			hsbHueThumb.y = currHSB.h * 180 / 360 + hsbHue.y;
			positionShapeMouse();
			redrawHsbSatBri();
		}

		/**
		 * 打开特定类型的调板
		 */
		protected function openPaletteByName(type : String) : void {
			if(!paletteOpen) {
				if(!palette) {
					createPalette();
				}
				setPalettePosition(_paletteX, _paletteY);
				stage.addChild(palette);
				_paletteOpen = true;
				addEventListener(Event.ENTER_FRAME, addCloseListener, false, 0, true);
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.OPEN, selectedColor));
			}
			if(!_currType) {
				if(type == COLOR_POOL_PALETTE) {
					colorPool.visible = _colorPoolOpen = true;
					if(shapeBox && colorPool.contains(shapeBox)) {
						colorPool.removeChild(shapeBox);
					}
					
					var colors_ : Array = ColorPicker.colorsDefault;
					if(colors_ == null) {
						colors_ = colors;
					}
					background.height = 45 + 13 * ( Math.floor((colors_.length - 1) / colCount) + 1);
					_currType == COLOR_POOL_PALETTE;
					dispatchEvent(new ColorPickerEvent(ColorPickerEvent.COLOR_POOL_OPEN, selectedColor));
					setInitColor();
					btnChange.label = "高级";
				}else if(type == HSB_PALETTE) {
					hsbPane.visible = _hsbOpen = true;
					background.height = 230;
					_currType = HSB_PALETTE;
					dispatchEvent(new ColorPickerEvent(ColorPickerEvent.HSB_OPEN, selectedColor));
					btnChange.label = "普通";
					setInitColor();
					positionHsb();
				}
			}else {
				if(_currType != type && (type == COLOR_POOL_PALETTE || type == HSB_PALETTE)) {
					togglePalette();
				}
			}
		}

		/**
		 * 创建调板，
		 */
		protected function createPalette() : void {
			palette = new Sprite();
			
			var skin : * = getSkinInstance(getStyleValue("skin"));
			background = background = skin["background"] as MovieClip;
			background.width = 250;
			background.height = 230;
			background.x = background.y = 0;
			palette.addChild(background);
			
			palette.tabChildren = false;
			palette.cacheAsBitmap = true;
			createCommonChildren();
			
			palette.addChild(shapeDisplay);
			palette.addChild(textField);
			//palette.addChild(btnChange);
			
			createColorPool();
			palette.addChild(colorPool);
			colorPool.x = 8;
			colorPool.y = 35;
			colorPool.visible = false;
			
			//createHsbPane();
			//palette.addChild(hsbPane);
			//hsbPane.y = 35;
			//hsbPane.visible = false;
		}

		protected function createCommonChildren() : void {
			shapeDisplay = new Sprite();
			var graphics_ : Graphics = shapeDisplay.graphics;
			graphics_.clear();
			graphics_.lineStyle(1, 0x000000);
			graphics_.lineTo(0, 22);
			graphics_.lineTo(50, 22);
			graphics_.lineTo(50, 0);
			graphics_.lineTo(0, 0);
			graphics_.beginFill(selectedColor);
			graphics_.drawRect(1, 1, 49, 21);
			graphics_.endFill();
			shapeDisplay.buttonMode = true;
			shapeDisplay.x = 15;
			shapeDisplay.y = 5;
			shapeDisplay.addEventListener(MouseEvent.CLICK, onClickShapDisplay);
			
			textField = new TextField();
			textField.restrict = "A-Fa-f0-9#";
			textField.maxChars = 7;
			textField.tabEnabled = true;
			textField.width = 60;
			textField.border = true;
			textField.height = 20;
			textField.borderColor = 0;
			textField.x = 70;
			textField.y = 5;
			textField.text = "#FFFF00";
			var tfmt:TextFormat = new TextFormat();
			tfmt.color = 0x949494;
			tfmt.font = "Arial";
			tfmt.size = 12;
			textField.defaultTextFormat = tfmt;
			textField.setTextFormat(tfmt);
			textField.addEventListener(KeyboardEvent.KEY_DOWN, onKeyDownTextField);
			textField.addEventListener(KeyboardEvent.KEY_UP, onKeyUpTextField);
			setTextEditable();
			
			var skin : * = getSkinInstance(getStyleValue("skin"));
			btnChange = new LabelButton();
			if(btnChange) {
				btnChange.setStyle("skin", skin["btnChange"]);
			}
			btnChange.autoSize = false;
			btnChange.setSize(40, 22);
			btnChange.setPosition(198, 5);
			btnChange.buttonMode = true;
			btnChange.addEventListener(MouseEvent.CLICK, onClickBtnChange);
		}

		/**
		 * 处理点击左上方颜色样例事件
		 */
		protected function onClickShapDisplay(e : MouseEvent) : void {
			closeAndSet();
		}

		/**
		 * 处理文字输入区键盘按下事件
		 */
		protected function onKeyDownTextField(e : KeyboardEvent) : void {
			textField.maxChars = (e.keyCode == "#".charCodeAt(0) || textField.text.indexOf("#") == 0) ? 7 : 6;
		}

		/**
		 * 处理文字输入区键盘放开事件
		 */
		protected function onKeyUpTextField(e : KeyboardEvent) : void {
			if (!paletteOpen) { 
				return; 
			}
			var newColor : uint;
			if (editable && showTextField) {
				var color : String = textField.text;
				
				if (color.indexOf("#") > -1) {
					color = color.replace(/^\s+|\s+$/g, "");
					color = color.replace(/#/g, "");
				} 
				
				newColor = parseInt(color, 16);
				currRGB.fromDec(newColor);
				currHSB.fromRGB(currRGB);
				refreshShapeDisplay();
				if(hsbOpen) {
					positionHsb();					
				}
			}
		}

		/**
		 * 根据当前颜色左上方颜色样例
		 */
		protected function refreshShapeDisplay() : void {
			var graphics_ : Graphics = shapeDisplay.graphics;
			graphics_.clear();
			graphics_.beginFill(currRGB.toDec());
			graphics_.drawRect(1, 1, 49, 21);
			graphics_.endFill();
		}

		/**
		 * 使文字输入框可编辑
		 */
		protected function setTextEditable() : void {
			if (!showTextField) {
				return;
			}
			textField.type = editable ? TextFieldType.INPUT : TextFieldType.DYNAMIC;
			textField.selectable = editable;
		}

		/**
		 * 关闭并将当前颜色设置为选中颜色
		 */
		protected function closeAndSet() : void {
			close();
			_selectedColor = currRGB.toDec();
			dispatchEvent(new ColorPickerEvent(ColorPickerEvent.CHANGE, selectedColor));
			refreshSwatchColor(); 
		}

		/**
		 * 处理点击确定按扭事件
		 */
		protected function onClickBtnConfig(e : MouseEvent) : void {
			closeAndSet();
		}

		/**
		 * 处理点击切换按扭事件
		 */
		protected function onClickBtnChange(e : MouseEvent) : void {
			togglePalette();
		}

		/**
		 * 初始化颜色池调板
		 */
		protected function createColorPool() : void {
			colorPool = new Sprite();
			var colorsUseful : Array = colors;
			if(!colors) {
				if(!ColorPicker.colorsDefault) {
					ColorPicker.colorsDefault = new Array();
					for(var i : int = 0 ;i < 216;i++) {
						ColorPicker.colorsDefault.push(((i / 6 % 3 << 0) + ((i / 108) << 0) * 3) * 0x33 << 16 | i % 6 * 0x33 << 8 | (i / 18 << 0) % 6 * 0x33);
					}
				}
				colorsUseful = ColorPicker.colorsDefault;
			}
			//创建相应的样板
			var graphics_ : Graphics = colorPool.graphics;
			graphics_.clear();
			graphics_.lineStyle(2, 0x000000, 1, false, "normal");
			for(var j : int = 0 ;j < colorsUseful.length && j < 216;j++) {
				var colorItem : Button = new Button();
				colorItem.setStyle("skin", getStyleValue("itemSkin"));
				var ct : ColorTransform = new ColorTransform();
				ct.color = colorsUseful[j];
				colorItem.transform.colorTransform = ct;
				colorItem.setSize(11, 11);
				var x_ : int = 13 * Math.floor(j % colCount);
				var y_ : int = 13 * Math.floor(j / colCount);
				colorItem.setPosition(x_, y_);
				colorPool.addChild(colorItem);
				colorItem.addEventListener(MouseEvent.MOUSE_OVER, onOverColorItem);
				colorItem.addEventListener(MouseEvent.MOUSE_OUT, onOutColorItem);
				colorItem.addEventListener(MouseEvent.CLICK, onClickColorItem);
				graphics_.moveTo(x_, y_-1);
				graphics_.lineTo(x_, y_ + 11);
				graphics_.lineTo(x_ + 12, y_ + 11);
				graphics_.lineTo(x_ + 12, y_-1);
				graphics_.lineTo(x_, y_-1);
			}
		}

		/**
		 * 处理鼠标移动到某一个颜色块事件
		 */
		protected function onOverColorItem(e : MouseEvent) : void {
			var item : Button = e.currentTarget as Button;
			if(!shapeBox) {
				shapeBox = new Shape();
				var graphics_ : Graphics = shapeBox.graphics;
				graphics_.clear();
				graphics_.lineStyle(1, 0xffffff);
				graphics_.moveTo(-1, -1);
				graphics_.lineTo(-1, 12);
				graphics_.lineTo(12, 12);
				graphics_.lineTo(12, -1);
				graphics_.lineTo(-1, -1);
			}
			if(!colorPool.contains(shapeBox)) {
				colorPool.addChild(shapeBox);
			}
			shapeBox.x = item.x;
			shapeBox.y = item.y;
			var rgb_ : RGB = new RGB();
			rgb_.fromDec(item.transform.colorTransform.color) ;
			setCurrRgb(rgb_.r, rgb_.g, rgb_.b);
			//此时派发的并不是选中颜色，而是划过的颜色
			dispatchEvent(new ColorPickerEvent(ColorPickerEvent.ITEM_ROLL_OVER, currRGB.toDec()));
		}

		/**
		 * 处理鼠标一处某一个颜色块事件
		 */
		protected function onOutColorItem(e : MouseEvent) : void {
			if(shapeBox && colorPool.contains(shapeBox)) {
				var item : Button = e.currentTarget as Button;
				var rgb_ : RGB = new RGB();
				rgb_.fromDec(item.transform.colorTransform.color);
				//这里派发不是选中color，而是从哪个块滑出，派发的就是哪个块的color
				dispatchEvent(new ColorPickerEvent(ColorPickerEvent.ITEM_ROLL_OUT, rgb_.toDec()));
			}
		}

		/**
		 * 处理鼠标点击某一个颜色块事件
		 */
		protected function onClickColorItem(e : MouseEvent) : void {
			closeAndSet();
		}

		/**
		 * 初始化HSB调板
		 */
		protected function createHsbPane() : void {
			hsbPane = new Sprite();
			hsbPane.cacheAsBitmap = true;
			hsbHue = new Sprite();
			hsbSatBri = new Sprite();
			hsbHueThumb = new Button();
			var skin : * = getSkinInstance(getStyleValue("skin"));
			if(hsbHueThumb) {
				hsbHueThumb.setStyle("skin", skin["btnHsbHubThumb"]);
			}
			hsbPane.addChild(hsbHue);
			hsbHue.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDownHsbHue);
			hsbHue.x = 207;
			hsbHueThumb.x = 207;
			hsbPane.addChild(hsbSatBri); 
			hsbSatBri.scaleY = hsbSatBri.scaleX = 180 / 201;
			hsbSatBri.x = 15;
			
			hsbPane.addChild(hsbHueThumb);
			hsbHueThumb.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDownHsbHueThumb);
			
			var satBriMask : MovieClip = skin["satBriMask"] as MovieClip;
			hsbPane.addChild(satBriMask);
			satBriMask.width = 201;
			satBriMask.height = 201;
			satBriMask.x = 15;
			satBriMask.y = 0;
			satBriMask.scaleY = satBriMask.scaleX = 180 / 201;
			satBriMask.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDownHsbSatBri);
			
			shapeMouseInSatBri = new Shape();
			var graphics_ : Graphics = shapeMouseInSatBri.graphics;
			graphics_.clear();
			graphics_.lineStyle(1, 0x000000);
			graphics_.drawCircle(0, 0, 5);
			graphics_.lineStyle(1, 0xffffff);
			graphics_.drawCircle(0, 0, 3);
			hsbPane.addChild(shapeMouseInSatBri);
			positionShapeMouse();
			
			btnConfig = new LabelButton();
			hsbPane.addChild(btnConfig);
			if(btnConfig) {
				btnConfig.setStyle("skin", skin["btnChange"]);
			}
			btnConfig.autoSize = false;
			btnConfig.setSize(80, 22);
			btnConfig.setPosition(158, 185);
			btnConfig.buttonMode = true;
			btnConfig.addEventListener(MouseEvent.CLICK, onClickBtnConfig);
			btnConfig.label = "确  定";
			
			
			drawHsbHue();
			drawHsbSatBri();
			positionHsbHueThumb();
		}

		/**
		 * 调整 饱和度亮度跳板 小滑块的位置
		 */
		protected function positionShapeMouse() : void {
			shapeMouseInSatBri.x = hsbSatBri.x + currHSB.s * 180 / 100;
			shapeMouseInSatBri.y = hsbSatBri.y + 180 - 180 * currHSB.b / 100;
		}

		/**
		 * 调整色相 滑块的位置
		 */
		protected function positionHsbHueThumb() : void {
			hsbHueThumb.y = currHSB.h / 2;
		}

		/**
		 * 处理鼠标按下 饱和度亮度
		 */
		protected function onMouseDownHsbSatBri(e : MouseEvent) : void {
			stage.addEventListener(Event.ENTER_FRAME, onMoveShapeMouse);
			stage.addEventListener(MouseEvent.MOUSE_UP, onMouseUpShapeMouse);
			//Mouse.hide();
			onMoveShapeMouse(null);//借用onMouseShape来完成
		}

		/**
		 * 鼠标在饱和度亮度中滑动
		 */
		protected function onMoveShapeMouse(e : Event) : void {
			var pointTo : Point = hsbSatBri.globalToLocal(new Point(stage.mouseX, stage.mouseY));
			if(pointTo.y > 201) {
				pointTo.y = 201;
			} 
			if(pointTo.y < 0) {
				pointTo.y = 0;
			} 
			if(pointTo.x > 201) {
				pointTo.x = 201;
			} 
			if(pointTo.x < 0) {
				pointTo.x = 0;
			} 
			setCurrHsb(currHSB.h, 100 * pointTo.x / 201, 100 - 100 * pointTo.y / 201);
			positionShapeMouse();
		}

		/**
		 * 设置当前HSB颜色
		 * 同时同步当前RGB颜色
		 * 当前文本输入的值
		 * 以及重绘样例
		 */
		protected function setCurrHsb(h : Number,s : Number,b : Number) : void {
			currHSB.h = h;
			currHSB.s = s;
			currHSB.b = b;
			currRGB.fromHSB(currHSB);
			textField.text = currRGB.toHex();
			refreshShapeDisplay();
		}

		/**
		 * 设置当前RGB颜色
		 * 同步当前HSB COLOR
		 * 同步当前文本输入的值
		 * 以及重绘样例
		 */
		protected function setCurrRgb(r : Number,g : Number,b : Number) : void {
			currRGB.r = r;
			currRGB.g = g;
			currRGB.b = b;
			currHSB.fromRGB(currRGB);
			textField.text = currRGB.toHex();
			refreshShapeDisplay();
		}

		/**
		 * 处理 鼠标在饱和度亮度区域放开 事件
		 */
		protected function onMouseUpShapeMouse(e : MouseEvent) : void {
			//Mouse.show();
			if(stage.hasEventListener(Event.ENTER_FRAME)) {
				stage.removeEventListener(Event.ENTER_FRAME, onMoveShapeMouse);
			}
			if(stage.hasEventListener(MouseEvent.MOUSE_UP)) {
				stage.removeEventListener(MouseEvent.MOUSE_UP, onMouseUpShapeMouse);
			}
		}

		/**
		 * 处理鼠标按下色相滑块事件
		 */
		protected function onMouseDownHsbHueThumb(e : MouseEvent) : void {
			if(!stage.hasEventListener(Event.ENTER_FRAME)) {
				stage.addEventListener(Event.ENTER_FRAME, onMoveHsbHueThumb);
			}
			if(!stage.hasEventListener(MouseEvent.MOUSE_UP)) {
				stage.addEventListener(MouseEvent.MOUSE_UP, onMouseUpHsbHueThumb);
			}
		}

		protected function onMouseDownHsbHue(e : MouseEvent) : void {
			var pointTo : Point = hsbHue.globalToLocal(new Point(stage.mouseX, stage.mouseY));
			hsbHueThumb.y = pointTo.y;
			setCurrHsb(hsbHueThumb.y * 2, currHSB.s, currHSB.b);
			redrawHsbSatBri();
			if(!stage.hasEventListener(Event.ENTER_FRAME)) {
				stage.addEventListener(Event.ENTER_FRAME, onMoveHsbHueThumb);
			}
			if(!stage.hasEventListener(MouseEvent.MOUSE_UP)) {
				stage.addEventListener(MouseEvent.MOUSE_UP, onMouseUpHsbHueThumb);
			}
		}

		protected function onMoveHsbHueThumb(e : Event) : void {
			var pointTo : Point = hsbHue.globalToLocal(new Point(stage.mouseX, stage.mouseY));
			if(pointTo.y > hsbHue.height) {
				pointTo.y = hsbHue.height - 1;
			}
			if(pointTo.y < 0) {
				pointTo.y = 0;
			}
			hsbHueThumb.y = pointTo.y;
			setCurrHsb(hsbHueThumb.y * 2, currHSB.s, currHSB.b);
			redrawHsbSatBri();
			//e.updateAfterEvent();
		}

		/**
		 * 处理鼠标在色相忽快上放开事件
		 */
		protected function onMouseUpHsbHueThumb(e : MouseEvent) : void {
			if(stage.hasEventListener(Event.ENTER_FRAME)) {
				stage.removeEventListener(Event.ENTER_FRAME, onMoveHsbHueThumb);
			}
			if(stage.hasEventListener(MouseEvent.MOUSE_UP)) {
				stage.removeEventListener(MouseEvent.MOUSE_UP, onMouseUpHsbHueThumb);	
			}
		}

		/**
		 * 绘制色相跳板
		 */
		protected function drawHsbHue() : void {
			var hsb : HSB = new HSB(0, 100, 100);
			var rgb : RGB = new RGB();
			var graphics_ : Graphics = hsbHue.graphics;
			graphics_.clear();
			for(var i : int = 0;i < 360;i++) {
				rgb.fromHSB(hsb);
				graphics_.lineStyle(1, rgb.toDec());
				var y : Number = (i + 0.0) / 2;
				graphics_.moveTo(0, y);
				graphics_.lineTo(30, y);
				hsb.h += 1;
			}
		}

		protected function drawHsbSatBri() : void {
			redrawHsbSatBri();
		}

		/**
		 * 重绘饱和度亮度调板
		 */
		protected function redrawHsbSatBri() : void {
			var hsbRight : HSB = new HSB(currHSB.h);
			var rgbRight : RGB = new RGB();
			hsbRight.b = 100;
			hsbRight.s = 100;
			rgbRight.fromHSB(hsbRight);
			var graphics_ : Graphics = hsbSatBri.graphics;
			graphics_.clear();
			graphics_.beginFill(rgbRight.toDec());
			graphics_.drawRect(0, 0, 201, 201);
			graphics_.endFill();
		}

		override public function setSize(width : Number, height : Number, fire : Boolean = true) : void {
			super.setSize(width, height, fire);
		} 

		override protected function initUI() : void {
			super.initUI();
			
			setSize(30, 30);
			
			swatch = new Sprite();
			swatch.buttonMode = true;
			addChild(swatch);
			refreshSwatchColor();
			
			swatchBtn = new Button();
			swatchBtn.useHandCursor = true;
			swatchBtn.autoRepeat = false;
			swatch.addChild(swatchBtn);
			
			swatchBlock = new Sprite();
			swatch.addChild(swatchBlock);
			swatchBlock.x = 7;
			swatchBlock.y = 4;
			
			swatch.addEventListener(MouseEvent.CLICK, onClickSwatch);
		}

		protected function refreshSwatchColor() : void {
			if(swatchBlock){
				var g:Graphics = swatchBlock.graphics;
				g.clear();
				g.beginFill(selectedColor,1);
				g.drawRect(0,0,13.4,13.4);
				g.endFill();
			}
		}

		override protected function draw() : void {
			if (isInvalid(Invalidation.SIZE)) {
				//swatchBtn.setSize(width, height);
				refreshSwatchColor();
			}
			if (isInvalid(Invalidation.STYLES)) {
				var skin : * = getSkinInstance(getStyleValue("skin"));
				swatchBtn.setStyle("skin", skin["btnSwatch"]);
				if(btnChange) {
					btnChange.setStyle("skin", skin["btnChange"]);
				}
				if(hsbHueThumb) {
					hsbHueThumb.setStyle("skin", skin["btnHsbHubThumb"]);
				}
			}
			swatchBtn.drawNow();
			if(paletteOpen) {
				btnChange.drawNow();
				if(!hsbOpen){
				}else {
					hsbHueThumb.drawNow();
				}
			}
			super.draw();
		}

		override public function set enabled(value : Boolean) : void {
			super.enabled = value;
		}

		override public function get classStyles() : Object {
			return mergeStyles(BUI.defaultStyles, defaultStyles);
		}

		//点击SWATCH，打开palette，如果已经打开了的话，不用再打开了
		protected function onClickSwatch(e : MouseEvent) : void {
			if(!_paletteOpen){
				open();
			}else{
				close();
			}
		}
	}
}
