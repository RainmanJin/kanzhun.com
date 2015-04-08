package baidu.ui.controls {
	import baidu.ui.constants.BUIConstants;
	import baidu.ui.core.BUI;
	import baidu.ui.core.Invalidation;
	import baidu.ui.events.SliderEvent;
	
	import flash.events.MouseEvent;

	/**
	 * 值改变时，派发该事件
	 */
	[Event(name="change", type="baidu.ui.events.SliderEvent")]

	/**
	 * 滑块被按下时，派发该事件
	 */
	[Event(name="thumbPress", type="baidu.ui.events.SliderEvent")]

	/**
	 * 滑块被拖动时，派发该事件
	 */
	[Event(name="thumbDrag", type="baidu.ui.events.SliderEvent")]

	/**
	 * 滑块上放开鼠标时，派发该事件
	 */
	[Event(name="thumbUp", type="baidu.ui.events.SliderEvent")]

	/**
	 * 皮肤。注意，本皮肤的结构有一定的复杂度，请参照默认皮肤制作。
	 */
	[Style(name="skin", type="Class")]

	/**
	 * 滑动条组件<br>
	 * <li>支持水平与垂直两种方向</li>
	 * <li>可以设置是否在拖动滑块时派发Change事件</li>
	 * <li>可以设置是否派发滑块相关鼠标事件</li>
	 * @author zhanzhihu
	 */
	public class Slider extends BUI {

		/**
		 * 默认皮肤
		 */
		public static var defaultStyles : Object = {skin:"Slider_Skin"};

		/**
		 * @private
		 * 最大值
		 */
		protected var _max : Number = 100;

		/**
		 * @private
		 * 最小值
		 */
		protected var _min : Number = 0;

		/**
		 * @private
		 * 当前值
		 */
		protected var _value : Number = 0;

		/**
		 * @private
		 * 步长
		 */
		protected var _step : Number = 5;

		/**
		 * @private
		 * 是否派发滑块相关鼠标事件
		 */
		protected var _fireThumbEvent : Boolean = false;

		/**
		 * @private 
		 * 拖动时是否派发Change事件
		 */
		protected var _liveDragging : Boolean = true;

		/**
		 * @private
		 * 方向
		 */
		protected var _orientation : String = BUIConstants.HORIZONTAL;

		/**
		 * @private
		 * 当前是否正被拖动
		 */
		protected var _dragging : Boolean = true;

		/**
		 * @private
		 * 轨道
		 */
		protected var track : Button;

		/**
		 * @private
		 * 滑块
		 */
		protected var thumb : Button;

		/**
		 * @private
		 * 记录点击时滑动条的值
		 */

		private  var valueAtPress : Number;

		/**
		 * 构造函数
		 */
		public function Slider() {
			super();
		}

		/**
		 * @private
		 * 针对Slider的方向来决定尺度<br>
		 * 一个重要的原则是:<br>
		 * width始终代表的是水平方向滑动条的宽度<br>
		 * height始终代表的垂直方向滑动条的高度
		 */
		override public function setSize(width : Number, height : Number, fire : Boolean = true) : void {
			if (_orientation == BUIConstants.HORIZONTAL) {
				super.setSize(width, height, fire);
			} else {
				super.setSize(height, width, fire);
			}
		}

		/**
		 * @private
		 * 初始化ui
		 */
		override protected function initUI() : void {
			super.initUI();
			
			setSize(100, 4);
			
			//创建滑条与滑块
			track = new Button();
			track.useHandCursor = false;
			track.autoRepeat = true;
			addChild(track);

			thumb = new Button();
			addChild(thumb);
			
			//添加事件监听  
			thumb.addEventListener(MouseEvent.MOUSE_DOWN, onMouseDownThumb);
			track.addEventListener(MouseEvent.MOUSE_DOWN, onMouseClickTrack);
		}

		/**
		 * @private
		 */
		override protected function draw() : void {	
			if (isInvalid(Invalidation.STYLES)) {
				var skin : * = getSkinInstance(getStyleValue("skin"));
				track.setStyle("skin", skin["track"]);
				thumb.setStyle("skin", skin["thumb"]);
			}
			if (isInvalid(Invalidation.SIZE)) {
				track.width = super._width;
				setValue(this.value);
			}
			track.drawNow();
			thumb.drawNow();
			super.draw();
		}

		/**
		 * @private
		 * 鼠标点击滑条监听函数<br>
		 */
		protected function onMouseClickTrack(e : MouseEvent) : void {
			//计算新的值，将滑块移动到相应位置
			var valueAtPress : Number = value;
			var distanceClick : Number = track.mouseX;
			setNewThumbPostion(distanceClick,false);
			//当值发生变化时，派发"change"事件
			dispatchEvent(new SliderEvent(SliderEvent.TRACK_DOWN,valueAtPress,true));
			if(value != valueAtPress) {
				dispatchEvent(new SliderEvent(SliderEvent.CHANGE, value, true));
			}
			thumb.mouseState = "over";
			onMouseDownThumb(null);
		}

		/**
		 * 鼠标点击滑块监听函数
		 */
		protected function onMouseDownThumb(e : MouseEvent) : void {
			valueAtPress = value;
			setDragging(true);               
			//设置正在拖动滑块
			mouseChildren = false;         
			//禁止鼠标交互
			thumb.mouseStateLocked = true; 
			//锁定滑块状态
			//添加监听
			stage.addEventListener(MouseEvent.MOUSE_UP, onMouseUpThumb);
			stage.addEventListener(MouseEvent.MOUSE_MOVE, onDragThumb);
			//派发事件
			if(fireThumbEvent && e!=null) {
				dispatchEvent(new SliderEvent(SliderEvent.THUMB_PRESS, value, true)); 
			}
		}

		/**
		 * 鼠标在滑块上放开监听函数
		 */
		protected function onMouseUpThumb(e : MouseEvent) : void {
			thumb.mouseStateLocked = false; 
			//解锁滑块状态
			mouseChildren = true;           
			//打开鼠标交互
			setDragging(false);
			//设置拖动滑块未被正在拖动
			//删除监听
			stage.removeEventListener(MouseEvent.MOUSE_UP, onMouseUpThumb);
			stage.removeEventListener(MouseEvent.MOUSE_MOVE, onDragThumb);
			//派发事件
			if(fireThumbEvent) {
				dispatchEvent(new SliderEvent(SliderEvent.THUMB_UP, value, true));
			}
			//值改变才派发事件，值不改变不派发事件
			if(value != valueAtPress) {
				dispatchEvent(new SliderEvent(SliderEvent.CHANGE, value, true));
			}
		}

		/**
		 * 鼠标拖动滑块监听函数
		 */
		protected function onDragThumb(e : MouseEvent) : void {
			//点击点离track的（0，0）的距离，即离Slider的起始点
			var distanceClick : Number = track.mouseX;
			//计算滑块新的位置
			setNewThumbPostion(distanceClick, _liveDragging);
			//新的位置设置好以后，向外派发"thumb_drag"事件
			if(fireThumbEvent) {
				dispatchEvent(new SliderEvent(SliderEvent.THUMB_DRAG, value, true));
			}
			//使得滚动更加流畅
			e.updateAfterEvent();
		}

		/**
		 * 设置滑块新的位置
		 * @param distance 新位置离起始点的距离
		 * @param fire   是否派发Change事件
		 */
		protected function setNewThumbPostion(distance : Number,fire : Boolean=true) : void {
			var LengthOfTrack : Number = super._width ;
			var preNewValue : Number = (distance / LengthOfTrack) * (max - min);
			preNewValue += min;
			setValue(preNewValue, fire);
		}

		/**
		 * 设置新值
		 * @param fire  是否派发事件
		 * @param value 新值
		 */
		protected function setValue(value : Number,fire : Boolean = true) : void {
			var oldValue : Number = this.value;
			var stepUse : Number = (step < 0) ? 0 : step; 
			//防止使用者将step设置为负数的情况
			if (stepUse != 0 && stepUse != 1) { 
				var pow : Number = Math.pow(10, getPrecision(stepUse));
				var snap : Number = stepUse * pow;
				var rounded : Number = Math.round(value * pow);
				var snapped : Number = Math.round(rounded / snap) * snap;
				var trueValue : Number = snapped / pow; 
				//到这一步才等出真正的可用的值
				_value = Math.max(min, Math.min(max, trueValue));
			} else {
				_value = Math.max(min, Math.min(max, Math.round(value)));
			}
			if(oldValue != _value && fire ) {
				dispatchEvent(new SliderEvent(SliderEvent.CHANGE, _value, true));
			}
			moveThumb();
		}

		/**
		 * @private
		 * 移动滑块到适当位置
		 */
		protected function moveThumb() : void {
			var LengthOfTrack : Number = super._width ;
			thumb.setPosition((value - min) * LengthOfTrack / (max - min), thumb.y);
		}

		/**
		 * @private
		 * 得到滑动条宽度<br>
		 * width始终为水平方向的宽度<br>
		 */
		override public function get width() : Number {
			return (_orientation == BUIConstants.HORIZONTAL) ? super._width : super._height;
		}

		/**
		 * @private
		 * 改变滑动条的宽度<br>
		 * width始终为水平方向的宽度<br>
		 */
		override public function set width(value : Number) : void {
			super.width = value;
		}

		/**
		 * @private
		 * 得到滑动条宽度<br>
		 * height始终为垂直方向的高度<br>
		 */
		override public function get height() : Number {
			return (_orientation == BUIConstants.HORIZONTAL) ? super._height : super._width;
		}

		/**
		 * @private
		 * 改变滑动条的宽度<br>
		 * height始终为垂直方向的高度<br>
		 */
		override public function set height(value : Number) : void {
			super.height = value;
		}

		/**
		 * @private
		 */
		override public function set enabled(value : Boolean) : void {
			super.enabled = value;
			track.enabled = thumb.enabled = enabled;
		}

		/**
		 * @private
		 */
		override public function get classStyles() : Object {
			return mergeStyles(BUI.defaultStyles, defaultStyles);
		}

		/**
		 * 获取/设置 最大值
		 */
		public function get max() : Number {
			return _max;
		}

		public function set max(value : Number) : void {
			if(value < min) {
				return;
			}
			_max = value;
			//this.vlaue取新当前this.value与max的最小值
			//同时也可以将滑块移动到相应的位置
			this.value = Math.min(value, this.value);
			invalidate(Invalidation.DATA);
		}

		/**
		 * 获取/设置 最小值
		 */
		public function get min() : Number {
			return _min;
		}

		public function set min(value : Number) : void {
			if(value > max ) {
				return;
			}
			_min = value;
			this.value = Math.max(value, this.value);
			invalidate(Invalidation.DATA);
		}

		/**
		 * 获取/设置 值
		 */
		public function get value() : Number {
			return _value;
		}

		public function set value(value : Number) : void {
			setValue(value, false);
		}

		/**
		 * 获取/设置 派发滑块相关鼠标事件<br>
		 * 默认为false
		 */
		public function get fireThumbEvent() : Boolean {
			return _fireThumbEvent;
		}

		public function set fireThumbEvent(value : Boolean) : void {
			_fireThumbEvent = value;
		}

		/**
		 * 获取/设置 拖动时是否派发Change事件<br>
		 * 默认为true
		 */
		public function get liveDragging() : Boolean {
			return _liveDragging;
		}

		public function set liveDragging(value : Boolean) : void {
			_liveDragging = value;
		}

		/**
		 * 获取/设置 方向(水平或垂直)
		 */
		public function get orientation() : String {
			return _orientation;
		} 

		public function set orientation(value : String) : void {
			//如果设置的方向与目前方向一样的话，直接返回
			if(_orientation == value) {
				return;
			}
			_orientation = value;
			var beVertical : Boolean = (_orientation == BUIConstants.VERTICAL);
			
			if (beVertical && rotation == 0) {
				rotation = -90;
			} else if (!beVertical && rotation == -90 ) {
				rotation = 0;
			}
            
			invalidate(Invalidation.SIZE);
		}

		/**
		 * 获取/设置 移动步值
		 */
		public function get step() : Number {
			return _step;
		}

		public function set step(value : Number) : void {
			_step = value;
		}

		/**
		 * @private
		 * 设置当前是否在拖动滑块
		 */
		private function setDragging(value : Boolean) : void {
			_dragging = value;
		}

		/**
		 * @private
		 * 得到数字的精度
		 */
		protected function getPrecision(num : Number) : Number {
			var s : String = num.toString();
			if (s.indexOf(".") == -1) { 
				return 0; 
			}
			return s.split(".").pop().length;
		}
	}
}