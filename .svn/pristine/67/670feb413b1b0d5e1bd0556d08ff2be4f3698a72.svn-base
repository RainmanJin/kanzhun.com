package baidu.mp3.avatar
{
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.geom.Rectangle;
	
	import laan.core.ButtonMaker;
	import laan.smart.utils.CallLater;
	
	/**
	 * 图片缩放器
	 *  
	 * @author laan
	 * @createTime 201005
	 * 
	 */	
	public class ImageScaler extends Sprite
	{
		/**
		 * 缩小按钮 
		 */		
		private var reduceMC:MovieClip;
		
		/**
		 * 放大按钮 
		 */		
		private var increaseMC:MovieClip;
		
		
		private var track:MovieClip;
		
		/**
		 *  
		 */		
		private var thumb:MovieClip;
		
		/**
		 * 重置按钮 
		 */		
		public var resetMC:MovieClip;
		
		
		public function ImageScaler()
		{
			super();
			
			initUI();
		}
		
		/**
		 *  
		 * 
		 */		
		private function initUI():void {
			reduceMC = new Skin_ScaleReduce();
			reduceMC.buttonMode = true;
			addChild(reduceMC);
			ButtonMaker.toButton(reduceMC);
			
			track = new Skin_ScaleTrack();
			track.x = reduceMC.width + 3;
			track.y = reduceMC.height / 2 - track.height / 2;
			addChild(track);
			
			increaseMC = new Skin_ScaleIncrease();
			increaseMC.x = track.x + track.width + 5;
			increaseMC.buttonMode = true;
			addChild(increaseMC);
			ButtonMaker.toButton(increaseMC);
			
			thumb = new Skin_ScaleThumb();
			thumb.y = reduceMC.height / 2 - thumb.height / 2;
			thumb.x = track.x;
			thumb.buttonMode = true;
			addChild(thumb);
			ButtonMaker.toButton(thumb);
			
			resetMC = new Skin_Reset(); 
			resetMC.x = 242;
			resetMC.y = 2;
			resetMC.buttonMode = true; 
			addChild(resetMC);
			ButtonMaker.toButton(resetMC);
			
			
			reduceMC.addEventListener(MouseEvent.CLICK, function(event:MouseEvent):void{
															scaleValue -= 0.1;
														});
			increaseMC.addEventListener(MouseEvent.CLICK, function(event:MouseEvent):void{
															scaleValue += 0.1;
														});
			track.addEventListener(MouseEvent.CLICK, function(event:MouseEvent):void {
															scaleValue = (track.mouseX - thumb.width / 2) / (track.width - thumb.width);
														});
			resetMC.addEventListener(MouseEvent.CLICK, function(event:MouseEvent):void {
															scaleValue = 1;
														});
			
//			CallLater.callLater(function():void {
//									stage.addEventListener(MouseEvent.MOUSE_WHEEL, function(event:MouseEvent):void {
//																						if (event.delta > 0) scaleValue += 0.1;
//																						else scaleValue -= 0.1;
//																					});
//									});
														
			thumb.addEventListener(MouseEvent.MOUSE_DOWN, thumbEventsHandler);
			
			//初始化数据
			scaleValue = 1;
		}
		
		/**
		 *  
		 * @param event
		 * 
		 */		
		private function thumbEventsHandler(event:MouseEvent):void {
			switch (event.type) {
				case MouseEvent.MOUSE_DOWN:
					thumb.startDrag(false, new Rectangle(track.x, thumb.y, track.width - thumb.width, 0));
					thumbIsDragging = true;
					
					stage.addEventListener(MouseEvent.MOUSE_UP, thumbEventsHandler);
					stage.addEventListener(MouseEvent.MOUSE_MOVE, thumbEventsHandler);
					break;
				case MouseEvent.MOUSE_MOVE:
					scaleValue = (thumb.x - track.x) / (track.width - thumb.width);
					break;
				case MouseEvent.MOUSE_UP:
					thumb.stopDrag();
					thumbIsDragging = false;
					
					stage.removeEventListener(MouseEvent.MOUSE_UP, thumbEventsHandler);
					stage.removeEventListener(MouseEvent.MOUSE_MOVE, thumbEventsHandler);
					break;
			}
		}
		
		/**
		 * 标识是否在拖动缩放 
		 */		
		private var thumbIsDragging:Boolean = false;
		
		/**
		 *  
		 */		
		private var _scaleValue:Number;
		
		/**
		 * 设置缩放数值。数值范围为0-1
		 *  
		 * @param value
		 * 
		 */		
		public function set scaleValue(value:Number):void {
			value = int(value * 100) / 100;
			
			if (value < 0) value = 0;
			if (value > 1) value = 1;
			
			if (_scaleValue == value) return;
			
			_scaleValue = value;
			
			if (!thumbIsDragging) {
				thumb.x = (track.width - thumb.width) * value + track.x;
			}
			
			dispatchEvent(new AvatarEvent(AvatarEvent.IMAGE_SCALE_CHANGE, _scaleValue));
		}
		
		/**
		 *  
		 * @return 
		 * 
		 */		
		public function get scaleValue():Number {
			return _scaleValue;
		}
		
	}
}