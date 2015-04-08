package baidu.mp3.avatar
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.Graphics;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	
	/**
	 * 头像切片
	 * 
	 * @author laan
	 * @createTime 201005
	 * 
	 */	
	public class AvatarSlice extends Sprite
	{
		/**
		 * 当前激活的头像切片 
		 */		
		private static var currentActivedSlice:AvatarSlice;
		
		/**
		 *  激活后头像切片的边框
		 */		
		private var activedBorder:Sprite;
		
		/**
		 *  
		 */		
		private var imageBg:Sprite;
		
		/**
		 * 头像图片
		 */		
		private var imageSlice:Bitmap;
		
		
		
		public function AvatarSlice()
		{
			super();
			
			activedBorder = new Sprite();
			//addChild(activedBorder);
			
			imageBg = new Sprite();
			addChild(imageBg);
			
			var image:Sprite = new Sprite();
			image.mouseEnabled = false;
			imageSlice = new Bitmap();
			imageSlice.smoothing = true;
			image.addChild(imageSlice);
			addChild(image);
//			imageSlice = new Bitmap();
//			addChild(imageSlice);
			
			//点击头像控制
			/*imageBg.addEventListener(MouseEvent.CLICK, function(event:MouseEvent):void{
															if (enabled) {
																active();
															}
														});*/
		}
		
		/**
		 * 设置头像图片数据
		 *  
		 * @param value
		 * 
		 */		
		public function set bitmapData(value:BitmapData):void {
			if (imageSlice.bitmapData) {
				imageSlice.bitmapData.dispose();
				imageSlice.bitmapData = null;
			}
			
			if (value) {
				imageSlice.bitmapData = value;
			}
		}
		
		/**
		 * 获取头像图片数据
		 *  
		 * @return 
		 * 
		 */		
		public function get bitmapData():BitmapData {
			return imageSlice.bitmapData;
		}
		
		
		private var _data:Object;
		
		/**
		 * 设置数据
		 * 
		 * @param value
		 * 
		 */		
		public function set data(value:Object):void {
			_data = value;
		}
		
		/**
		 *  
		 * @return 
		 * 
		 */		
		public function get data():Object {
			return _data;
		}
		
		/**
		 *  
		 */		
		private var _enabled:Boolean = true;
		
		/**
		 * 设置是否可用
		 *  
		 * @param value
		 * 
		 */		
		public function set enabled(value:Boolean):void {
			_enabled = value;
			
			imageBg.mouseEnabled = value;
		}
		
		
		public function get enabled():Boolean {
			return _enabled;
		}
		
		
		/**
		 *  
		 */		
		private var _actived:Boolean;
		
		/**
		 * 设置激活该头像切片
		 *  
		 * 
		 */		
		public function active():void {
			/*if (currentActivedSlice) {
				currentActivedSlice.setActived(false);
			}
			currentActivedSlice = this;
			currentActivedSlice.setActived(true);*/
			
			dispatchEvent(new AvatarEvent(AvatarEvent.SLICE_ACTIVED));
		}
		
		/**
		 *  
		 * @param value
		 * 
		 */		
		private function setActived(value:Boolean):void {
			_actived = value;
			refresh();
		}
		
		
		/**
		 * 更新显示 
		 * 
		 */		
		public function refresh():void {
			//activedBorder.visible  = _actived;
			
			if (sizeChanged && width > 0 && height > 0) {
				sizeChanged = false;
				
				imageBg.graphics.clear();
				imageBg.graphics.lineStyle(1, 0x999999);
				//imageBg.graphics.beginFill(0xffffff, 0);
				//imageBg.graphics.drawRect(-1, -1, width + 1, height + 1);
				imageBg.graphics.endFill();
				/*
				var borderThickness:uint = 5;
				var g:Graphics = activedBorder.graphics;
				g.clear();
				g.beginFill(AvatarConfig.STYLE_AVATAR_BORDER_COLOR);
				g.moveTo(-borderThickness*2, height / 2);
				g.lineTo(-borderThickness, height / 2 - borderThickness);
				g.lineTo(-borderThickness, - borderThickness);
				g.lineTo(width + borderThickness, - borderThickness);
				g.lineTo(width + borderThickness, height + borderThickness);
				g.lineTo(-borderThickness, height + borderThickness);
				g.lineTo(-borderThickness, height / 2 + borderThickness);
				g.endFill();*/
			}
		}
		
		
		/**
		 * 标志头像切片尺寸是否有更改 
		 */		
		private var sizeChanged:Boolean = false;
		
		private var _width:Number;
		
		/**
		 * 设置宽度
		 */
		override public function set width(value:Number):void {
			_width = value;
			
			sizeChanged = true;
			refresh();
		}
		
		override public function get width():Number {
			return _width || 0;
		}
		
		private var _height:Number;
		
		/**
		 * 设置高度
		 */
		override public function set height(value:Number):void {
			_height = value;
			
			sizeChanged = true;
			refresh();
		}
		
		override public function get height():Number {
			return _height || 0;
		}
	}
}