package baidu.ui.containers {
	import baidu.ui.core.BUI;

	import flash.display.DisplayObject;

	/**
	 * @author Leon
	 */

	[DefaultProperty("children")]

	public class ContainerBase extends BUI {
		
		protected var _children:Array = [];
		
		public function ContainerBase() {
			super();
		}

		public function set children(value : Array) : void {
			_children = value;
			for each(var child:* in value) {
				if(child is DisplayObject) {
					addChild(child);
				}
			}			
		}	
		
		public function get	children():Array{
			return _children;
		}
	}
}
