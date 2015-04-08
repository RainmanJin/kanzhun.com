package baidu.mp3.avatar
{
	import baidu.ui.managers.CursorManager;
	
	import flash.display.*;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.geom.Matrix;
	import flash.geom.Point;
	import flash.geom.Rectangle;
	import flash.utils.ByteArray;
	
	import laan.core.ImageBitmap;
	import laan.smart.utils.CallLater;
	
	/**
	 * 头像预览截图控制
	 * 
	 * @author laan
	 * @createTime 2010
	 * 
	 */	
	public class PhotoPreviewer extends Sprite
	{
		/**
		 * 背景 
		 */		
		private var bg:Sprite;
		
		/**
		 * 图片预览 
		 */		
		//private var image:Loader;
		public var image:ImageBitmap;
		
		/**
		 *  
		 */		
		private var imageMasker:Sprite;
		
		/**
		 * 截取区域 
		 */		
		private var avatarMirror:AvatarMirror;
		
		/**
		 * 边框 
		 */		
		private var border:Sprite;
		
		/**
		 *  
		 */		
		private var mainMasker:Sprite;
		
		
		public function PhotoPreviewer()
		{
			super();
			
			if (stage) {
				initUI();
			} else {
				addEventListener(Event.ADDED_TO_STAGE, function(event:Event):void {
															removeEventListener(Event.ADDED_TO_STAGE, arguments.callee);
															
															initUI();
														});
			}
		}
		
		
		private function initUI():void {
			bg = new Sprite();
			bg.graphics.beginFill(0xcccccc, 1);
			bg.graphics.drawRect(0, 0, 100, 100);
			bg.graphics.endFill();
			//addChild(bg);
			
			image = new ImageBitmap();
			addChild(image);
			
			imageMasker = new Sprite();
			imageMasker.graphics.beginFill(0, 0.4);
			imageMasker.graphics.drawRect(0, 0, 100, 100);
			imageMasker.graphics.endFill();
			imageMasker.visible = false;
			addChild(imageMasker);
			
			border = new Sprite();
			addChild(border);
			
			
			avatarMirror = new AvatarMirror();
			avatarMirror.visible = false;
			addChild(avatarMirror);
			
			mainMasker = new Sprite();
			mainMasker.graphics.beginFill(0xff0000);
			mainMasker.graphics.drawRect(0, 0, 100, 100);
			mainMasker.graphics.endFill();
			addChild(mainMasker);
			mask = mainMasker;
			
			//图片加载完成后平滑处理
			image.contentLoaderInfo.addEventListener(Event.INIT, imageInitHandler);
			
			
			avatarMirror.addEventListener(MouseEvent.MOUSE_OVER, mirrorMouseEventHandler);
			avatarMirror.addEventListener(MouseEvent.MOUSE_DOWN, mirrorMouseEventHandler);
			
			//设置鼠标形状
			CursorManager.getInstance().root = stage;;
			CursorManager.getInstance().register(avatarMirror, Skin_DragCursor);
		}
		
		
		/**
		 * 图片初始化后控制
		 *  
		 * @param event
		 * 
		 */
		private function imageInitHandler(event:Event):void{
//			var bigAvatarInfo:Object = AvatarConfig.bigAvatarInfo;
//			if (image.content.width < bigAvatarInfo.width || image.content.height < bigAvatarInfo.height) {
//				dispatchEvent(new AvatarEvent(AvatarEvent.IMAGE_ERROR, "图片尺寸必须大于" + bigAvatarInfo.width + "*" + bigAvatarInfo.height + "像素！"));
//				return;
//			}
			var bitmap:Bitmap = image.content as Bitmap;
			bitmap.smoothing = true;
			
			if (!imageMasker.visible) {
				imageMasker.visible = true;
				avatarMirror.visible = true;
			}
			
			dispatchEvent(new AvatarEvent(AvatarEvent.IMAGE_READY, [bitmap.width, bitmap.height]));
		};
		
		/**
		 *  
		 * @param event
		 * 
		 */		
		private function mirrorMouseEventHandler(event:MouseEvent):void {
			switch (event.type) {
				case MouseEvent.MOUSE_OVER:
					
					break;
				case MouseEvent.MOUSE_DOWN:
					var rec:Rectangle = new Rectangle(image.x, image.y, image.width - avatarMirror.width, image.height - avatarMirror.height);
					if (rec.x < 0) rec.x = 0;
					if (rec.y < 0) rec.y = 0;
					if (rec.width > width - avatarMirror.width) rec.width = width - avatarMirror.width; 
					if (rec.height > height - avatarMirror.height) rec.height = height - avatarMirror.height; 
					avatarMirror.startDrag(false, rec);
					
					stage.addEventListener(MouseEvent.MOUSE_MOVE, stageMouseMoveHandler);
					stage.addEventListener(MouseEvent.MOUSE_UP, stageMouseMoveHandler);
					break;
			}
		}
		
		private function stageMouseMoveHandler(event:MouseEvent):void {
			if (event.type == MouseEvent.MOUSE_UP) {
				avatarMirror.stopDrag();
				
				stage.removeEventListener(MouseEvent.MOUSE_MOVE, stageMouseMoveHandler);
				stage.removeEventListener(MouseEvent.MOUSE_UP, stageMouseMoveHandler);
			} else {
				//调整图片位置
				if (image.width > width) {
					image.x = -avatarMirror.x * (image.width - width) / (width - avatarMirror.width);
				}
				if (image.height > height) {
					image.y = -avatarMirror.y * (image.height - height) / (height - avatarMirror.height);
				}
				
				refreshSlice();
				event.updateAfterEvent();
//				CallLater.callLater(refreshSlice);
			}
		}
		
		
		/**
		 * 设置切片大小
		 *  
		 * @param w
		 * @param h
		 * 
		 */		
		public function setSliceSize(w:Number, h:Number):void {
			avatarMirror.width = w;
			avatarMirror.height = h;
			
			avatarMirror.x = width / 2 - w / 2;
			avatarMirror.y = height / 2 - h / 2;
			
			//调整图片位置
			if (image.width > width) {
				image.x = -avatarMirror.x * (image.width - width) / (width - avatarMirror.width);
			}
			if (image.height > height) {
				image.y = -avatarMirror.y * (image.height - height) / (height - avatarMirror.height);
			}
			
			refresh();
		}
		
		/**
		 *  
		 * @param data
		 * 
		 */		
		public function set data(data:Object):void {
			if (!data) return;
			
			if (data.hasOwnProperty("imageScale")) {
				image.scaleX = image.scaleY = data.imageScale;
			}
			
			if (data.hasOwnProperty("mirrorX")) {
				avatarMirror.x = data.mirrorX;
				avatarMirror.y = data.mirrorY;
			}
			
			if (data.hasOwnProperty("imageX")) {
				image.x = data.imageX;
				image.y = data.imageY;
			}
			
			//如果截取区域不在图片区域内，需要调整截取区域位置
			if (avatarMirror.x < image.x) avatarMirror.x = image.x;
			else if (avatarMirror.x + avatarMirror.width > image.x + image.width) avatarMirror.x = image.x + image.width - avatarMirror.width;
			if (avatarMirror.y < image.y) avatarMirror.y = image.y;
			else if (avatarMirror.y + avatarMirror.height > image.y + image.height) avatarMirror.y = image.y + image.height - avatarMirror.height;
			if (avatarMirror.x < 0) avatarMirror.x = 0;
			else if (avatarMirror.x + avatarMirror.width > width) avatarMirror.x = width - avatarMirror.width;
			if (avatarMirror.y < 0) avatarMirror.y = 0;
			else if (avatarMirror.y + avatarMirror.height > height) avatarMirror.y = height - avatarMirror.height;
			
//			if (!data.useImagePosition) {
//				//调整图片位置
//				if (image.width > width) {
//					image.x = -avatarMirror.x * (image.width - width) / (width - avatarMirror.width);
//				}
//				if (image.height > height) {
//					image.y = -avatarMirror.y * (image.height - height) / (height - avatarMirror.height);
//				}
//			}
			
			refreshSlice();
		}
		
		
		/**
		 *  
		 * @return 
		 * 
		 */		
		public function get data():Object {
			return {
					imageX:image.x, 
					imageY:image.y, 
					mirrorX:avatarMirror.x, 
					mirrorY:avatarMirror.y,
					imageScale:image.scaleX,
					scale:_imageScale
					}
		}
		
		
		
		
		/**
		 * 设置图片数据
		 *  
		 * @param bytes
		 * 
		 */		
		public function setImageData(bytes:ByteArray):void {
			var loader:ImageBitmap = new ImageBitmap();
			loader.addEventListener(Event.INIT, function(event:Event):void {
													var bigAvatarInfo:Object = AvatarConfig.bigAvatarInfo;
													/*if (loader.content.width < bigAvatarInfo.width
														|| loader.content.height < bigAvatarInfo.height) {
														dispatchEvent(new AvatarEvent(AvatarEvent.IMAGE_ERROR, "图片尺寸必须大于" + bigAvatarInfo.width + "*" + bigAvatarInfo.height + "像素！"));
													} else {*/
														image.bitmapData = loader.bitmapData;
													//}
												});
			loader.loadBytes(bytes);
//			image.loadBytes(bytes);
		}
		
		/**
		 *  
		 */
		private var _imageScale:Number = 1;
		
		/**
		 * 设置图片缩放
		 *  
		 * @param value
		 * 
		 */		
		public function setImageScale(value:Number):void {
			if (_imageScale == value) return;
			
			_imageScale = value;
			refresh();
		}
		
		/**
		 * 获取图片切片的图片数据
		 *  
		 * @return 
		 * 
		 */		
		public function getSliceBitmapData():BitmapData {
			if (avatarMirror.bitmapData) return avatarMirror.bitmapData.clone();
			return null;
		}
		
		/**
		 * 重新绘制图片切片 
		 * 
		 */		
		private function refreshSlice():void {
			if (!image.content || !avatarMirror.width || !avatarMirror.height) return;
			
			//更新切片数据
			var bitmapData:BitmapData = new BitmapData(avatarMirror.width, avatarMirror.height, false, 0xffffff);
			var matrix:Matrix = new Matrix();
			matrix.tx = -avatarMirror.x;
			matrix.ty = -avatarMirror.y;
			avatarMirror.visible = false;
			imageMasker.visible = false;
			border.visible = false;
			bitmapData.draw(this, matrix);
			avatarMirror.visible = true;
			imageMasker.visible = true;
			border.visible = true;
			avatarMirror.bitmapData = bitmapData;
			
			//抛出事件通知截图更新
			dispatchEvent(new AvatarEvent(AvatarEvent.SLICE_DATA_CHANGE));
		}
		
		/**
		 * 重新布局 
		 * 
		 */		
		private function refresh():void {
			if (!bg) return;
			
			bg.width = width;
			imageMasker.width = width;
			mainMasker.width = width;
			bg.height = height;
			imageMasker.height = height;
			mainMasker.height = height;
			
			border.graphics.clear();
			border.graphics.lineStyle(1, 0x999999);
			border.graphics.drawRect(0, 0, width - 1, height - 1);
			
			//如果已设置图片缩放级别
			if (image.content) {
				var minW:Number = 0;
				var minH:Number = 0;
				
				if(Math.ceil(image.width) >= Math.ceil(avatarMirror.width)){
					minW = Math.ceil(avatarMirror.width);
				}else{
					minW = Math.ceil(image.width);
				}
				if(Math.ceil(image.height) >= Math.ceil(avatarMirror.height)){
					minH = Math.ceil(avatarMirror.height);
				}else{				
					minH = Math.ceil(image.height);
				}
				
				//var minW:Number = Math.ceil(avatarMirror.width);
				//var minH:Number = Math.ceil(avatarMirror.height);
				
				
				var maxW:Number = Math.ceil(image.width / image.scaleX);
				var maxH:Number = Math.ceil(image.height / image.scaleY);
				
				//if (maxW <= minW || maxH <= minH) return;
				
				//检查宽和高的缩放比例，确定是否使用宽为基准缩放图片
				var useW:Boolean = true;
				
				if (maxW/minW > maxH/minH) useW = false;
				
				//计算图片当前中心点，以便缩放后截取位置保持一致
				var originalCenterPoint:Point = avatarMirror.localToGlobal(new Point(avatarMirror.width / 2, avatarMirror.height / 2));
				var imageCenterPoint:Point = image.globalToLocal(originalCenterPoint);
				
				var toScale:Number;
				
				//选择宽和高中小的值 作为缩放比例，图片不够的补白
				if (!useW) {
					toScale = ((maxW - minW) * _imageScale + minW) / maxW;
				} else {
					toScale = ((maxH - minH) * _imageScale + minH) / maxH;
				}
				
				image.scaleX = image.scaleY = toScale;
				
				//调整图片保持截取中心不变
				imageCenterPoint = image.localToGlobal(imageCenterPoint);
				image.x -= imageCenterPoint.x - originalCenterPoint.x;
				image.y -= imageCenterPoint.y - originalCenterPoint.y;
				
				if (image.x > 0 || image.x + image.width < width) {
					image.x = width / 2 - image.width / 2;
				}
				if (image.y > 0 || image.y + image.height < height) {
					image.y = height / 2 - image.height / 2;
				}
				
				//缩放后，如果截取区域不在图片区域内，需要调整截取区域位置
				// 图片宽高小于mirror的时候 mirror 居中显示
				if (avatarMirror.x < image.x) 
				//avatarMirror.x = image.x;
				avatarMirror.x = Math.ceil((bg.width - avatarMirror.width) /2) ;
				else if (avatarMirror.x + avatarMirror.width > image.x + image.width) avatarMirror.x = image.x + image.width - avatarMirror.width;
				
				if (avatarMirror.y < image.y) 
				//avatarMirror.y = image.y;
				avatarMirror.y = Math.ceil((bg.height - avatarMirror.height) /2) ;
				else if (avatarMirror.y + avatarMirror.height > image.y + image.height) 
				avatarMirror.y = image.y + image.height - avatarMirror.height;
				
				
				
				refreshSlice();
			}
		}
		
		
		
		
		private var _width:Number;
		
		/**
		 * 设置宽度
		 *  
		 * @param value
		 * 
		 */		
		override public function set width(value:Number):void {
			_width = value;
			
			refresh();
		}
		
		override public function get width():Number {
			return _width || 0;
		}
		
		
		private var _height:Number;
		
		/**
		 *  
		 * @param value
		 * 
		 */		
		override public function set height(value:Number):void {
			_height = value;
			
			refresh();
		}
		
		override public function get height():Number {
			return _height || 0;
		}
	}
}

import flash.display.Sprite;
import flash.display.Bitmap;
import flash.display.BitmapData;
	
/**
 * 图片切片
 * 
 * @author laan
 * @createTime 201005
 * 
 */
class AvatarMirror extends Sprite {
	/**
	 *  
	 */	
	private var imageSlice:Bitmap;
	
	
	private var border:Sprite;
	
	/**
	 *  
	 * 
	 */	
	public function AvatarMirror() {
		imageSlice = new Bitmap();
		addChild(imageSlice);
		
		border = new Sprite();
		addChild(border);
	}
	
	/**
	 *  
	 * @param value
	 * 
	 */	
	public function set bitmapData(value:BitmapData):void {
		if (imageSlice.bitmapData) {
			imageSlice.bitmapData.dispose();
		}
		
		imageSlice.bitmapData = value;
		imageSlice.smoothing = true;
	}
	
	/**
	 *  
	 * @return 
	 * 
	 */	
	public function get bitmapData():BitmapData {
		return imageSlice.bitmapData;
	}
	
	
	private function refresh():void {
		if (width > 0 && height > 0) {
			border.graphics.clear();
			border.graphics.lineStyle(1, 0xffffff);
			//border.graphics.beginFill(0xffffff, 0);
			border.graphics.drawRect(-1, -1, width + 1, height + 1);
			//border.graphics.endFill();
		}
	}
	
	private var _width:Number;
	
	/**
	 * 设置宽度
	 *  
	 * @param value
	 * 
	 */		
	override public function set width(value:Number):void {
		_width = value;
		
		refresh();
	}
	
	override public function get width():Number {
		return _width || 0;
	}
	
	
	private var _height:Number;
	
	/**
	 *  
	 * @param value
	 * 
	 */		
	override public function set height(value:Number):void {
		_height = value;
		
		refresh();
	}
	
	override public function get height():Number {
		return _height || 0;
	}
}