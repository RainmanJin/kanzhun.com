package baidu.mp3.avatar
{
	import caurina.transitions.Tweener;
	
	import flash.display.DisplayObject;
	import flash.display.Sprite;
	import flash.filters.DropShadowFilter;
	import flash.geom.Rectangle;
	import flash.text.TextField;
	import flash.text.TextFieldAutoSize;
	import flash.text.TextFormat;

	public class Tip extends Sprite
	{
		
		private var topBg:Sprite;
		
		private var bottonBg:Sprite;
		
		/**
		 *  
		 */		
		private var tipTxt:TextField;
		
		public function Tip()
		{
			super();
			
			initUI();
			
			filters = [new DropShadowFilter(4, 45, 0, 0.5)];
		}
		
		/**
		 *  
		 * @param target
		 * @param tip
		 * @param location
		 * @param level
		 * 
		 */		
		public function showInfo(target:DisplayObject, tip:String, location:String = "top", level:uint = 0):void {
			var isTop:Boolean = location != "bottom";
			
			topBg.visible = isTop;
			bottonBg.visible = !isTop;
			
			tipTxt.text = tip;
			//tipTxt.textColor = level == 0 ? 0x333333 : 0xff0000;
			tipTxt.textColor = 0xff0000;
			
			tipTxt.x = -5;
			tipTxt.y = isTop ? -33 : 12; 
			
			topBg.width = tipTxt.textWidth + 14;
			topBg.height = tipTxt.height + 14;
			bottonBg.width = topBg.width;
			bottonBg.height = topBg.height;
			
			var rec:Rectangle = target.getRect(parent);
			x = int(rec.x + rec.width / 2);
			y = isTop ? rec.y : (rec.y + rec.height);
			
			alpha = 1;
			Tweener.addTween(this, {time:0.3, delay:3, alpha:0});
		}
		
		/**
		 *  
		 * 
		 */		
		private function initUI():void {
			topBg = new Skin_TipBackground_Top();
			addChild(topBg);
			
			bottonBg = new Skin_TipBackground_Botton();
			addChild(bottonBg);
			
			tipTxt = new TextField();
			tipTxt.defaultTextFormat = new TextFormat("Arial", 12, 0x000000, false);
			tipTxt.autoSize = TextFieldAutoSize.LEFT;
			addChild(tipTxt);
		}
		
	}
}