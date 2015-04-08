package laan.core
{
	import flash.display.MovieClip;
	import flash.events.MouseEvent;
	
	/**
	 * 对MovieClip对象进行按钮化
	 * 
	 * @author laan
	 * @createTime 2010.03
	 * 
	 */
	public class ButtonMaker
	{
		/**
		 *  
		 * @param mc
		 * 
		 */
		public static function toButton(mc:MovieClip):void {
			if (!mc) return;
			
			mc.addEventListener(MouseEvent.MOUSE_OUT, function(event:MouseEvent):void {if (mc.enabled) mc.gotoAndStop(mc.selected ? 5 : 1);});
			mc.addEventListener(MouseEvent.MOUSE_OVER, function(event:MouseEvent):void {if (mc.enabled) mc.gotoAndStop(mc.selected ? 6 : 2);});
			mc.addEventListener(MouseEvent.MOUSE_DOWN, function(event:MouseEvent):void {if (mc.enabled) mc.gotoAndStop(mc.selected ? 7 : 3);});
			mc.addEventListener(MouseEvent.MOUSE_UP, function(event:MouseEvent):void {if (mc.enabled) mc.gotoAndStop(mc.selected ? 5 : 1);});
			
			mc.selected = false;
			
			mc.setEnabled = function(value:Boolean):void {
								if (mc.enabled == value) return;
								
								mc.enabled = value;
								mc.mouseEnabled = value;
								mc.mouseChildren = value;
								
								if (!value) {
									mc.gotoAndStop(4);
								} else {
									mc.gotoAndStop(mc.selected ? 5 : 1);
								}
							}
			
			mc.setSelected = function(value:Boolean):void {
								mc.selected = value;
								mc.gotoAndStop(mc.selected ? 5 : 1);
							}
			
			mc.gotoAndStop(1);
		}
	}
	
}