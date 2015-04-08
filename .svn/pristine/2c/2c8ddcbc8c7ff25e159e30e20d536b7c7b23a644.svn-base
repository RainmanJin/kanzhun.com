package baidu.ui.containers {
	import baidu.ui.constants.BUIConstants;
	import baidu.ui.core.BUI;
	import baidu.ui.core.Invalidation;
	import baidu.ui.events.BUIEvent;

	import flash.display.DisplayObject;

	/**
	 * @author liu_yang
	 */
	/**
	 * 组件大小变化事件
	 */
	[Event(name="resize", type="flash.events.Event")]

	/**
	 * 子元素两侧与容器之间的距离
	 */
	[Style(name="padding", type="Number")]

	/**
	 * 子元素之间的距离。
	 */
	[Style(name="gap", type="Number")]

	public class Box extends ContainerBase {
		protected var _direction : String;
		public static var defaultStyles : Object = {padding:5, gap:5};

		public function Box() {
		}

		/**
		 * @private
		 */
		override public function get classStyles() : Object {
			return mergeStyles(super.classStyles, defaultStyles);
		}

		
		override public function addChild(child : DisplayObject) : DisplayObject {
			super.addChild(child);
			child.addEventListener(BUIEvent.SIZE_CHANGE, childResizeHandler);
			invalidate(Invalidation.LAYOUT);
			return child;
		}

		override public function addChildAt(child : DisplayObject,index : int) : DisplayObject {
			super.addChildAt(child, index);
			child.addEventListener(BUIEvent.SIZE_CHANGE, childResizeHandler);
			invalidate(Invalidation.LAYOUT);
			return child;
		}

		override public function removeChild(child : DisplayObject) : DisplayObject {
			super.removeChild(child);            
			child.removeEventListener(BUIEvent.SIZE_CHANGE, childResizeHandler);
			invalidate(Invalidation.LAYOUT);
			return child;
		}

		override public function removeChildAt(index : int) : DisplayObject {
			var child : DisplayObject = super.removeChildAt(index);            
			child.removeEventListener(BUIEvent.SIZE_CHANGE, childResizeHandler);
			invalidate(Invalidation.LAYOUT);
			return child;
		}

		
		override public function swapChildren(child1 : DisplayObject, child2 : DisplayObject) : void {
			invalidate(Invalidation.LAYOUT);
			super.swapChildren(child1, child2);
		}

		
		override public function swapChildrenAt(index1 : int, index2 : int) : void {
			invalidate(Invalidation.LAYOUT);
			super.swapChildrenAt(index1, index2);
		}

		protected function childResizeHandler(event : BUIEvent) : void {
			invalidate(Invalidation.LAYOUT);
		}

		override protected function draw() : void {
			if(isInvalid(Invalidation.LAYOUT, Invalidation.STYLES, Invalidation.SIZE)) {
				drawLayout();
				dispatchEvent(new BUIEvent(BUIEvent.SIZE_CHANGE));
			}
			super.draw();
		}

		protected function drawLayout() : void {
			
			var tempChild : DisplayObject;
			var currentPosition : Number = getStyleValue("padding");
			
			for (var i : int = 0;i < this.numChildren;i++) {
				tempChild = getChildAt(i);
				
				if(tempChild is BUI) {
					(tempChild as BUI).drawNow();
				}
				if(_direction == BUIConstants.VERTICAL) {
					tempChild.y = currentPosition;
					currentPosition += tempChild.height;
					currentPosition += getStyleValue("gap");
				}
				else if(_direction == BUIConstants.HORIZONTAL) {
					tempChild.x = currentPosition;
					currentPosition += tempChild.width;
					currentPosition += getStyleValue("gap");
				}
			}
			
			if(_direction == BUIConstants.VERTICAL) {
				super.height = currentPosition - getStyleValue("gap") + getStyleValue("padding");
				super.width = this.getBounds(this.parent).width;
			}else if(_direction == BUIConstants.HORIZONTAL) {
				super.width = currentPosition - getStyleValue("gap") + getStyleValue("padding");
				super.height = this.getBounds(this.parent).height;
			}
			
			dispatchEvent(new BUIEvent(BUIEvent.SIZE_CHANGE));
		}

		public function get direction() : String {
			return _direction;
		}

		public function set direction(direction : String) : void {
			_direction = direction;
			invalidate(Invalidation.LAYOUT);
		}
	}
}
