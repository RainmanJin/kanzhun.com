package laan.core
{
	import baidu.lib.images.BMPLoader;
	
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.Loader;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.utils.ByteArray;

	public class ImageBitmap extends Bitmap
	{
		
		private var loader:Loader;
		
		private var bmpLoader:BMPLoader;
		
		public function ImageBitmap()
		{
			super();
			
			loader = new Loader();
			loader.contentLoaderInfo.addEventListener(Event.INIT, function(event:Event):void{
													bitmapData =(loader.content as Bitmap).bitmapData;
												});
			loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, function(event:Event):void{
													bmpLoader.loadFromBinary(bytes);
												});
			
			bmpLoader = new BMPLoader();
			bmpLoader.addEventListener("complete", function(event:Event):void {
														bitmapData = bmpLoader.getBmd();
													});
		}
		
		override public function set bitmapData(value:BitmapData):void {
			super.bitmapData = value;
			
			bytes = null;
			dispatchEvent(new Event(Event.INIT));
		}
		
		override public function get width():Number {
			return super.width || bitmapData.width;
		}
		
		override public function get height():Number {
			return super.height || bitmapData.height;
		}
		
		
		private var bytes:ByteArray;
		
		/**
		 *  
		 * @param bytes
		 * 
		 */		
		public function loadBytes(bytes:ByteArray):void {
			this.bytes = bytes;
			
			loader.loadBytes(bytes);
		}
		
		public function get content():Bitmap {
			if (bitmapData) return this;
			
			return null;
		}
		
		public function get contentLoaderInfo():Bitmap {
			return this;
		}
		
		public function unload():void {
			loader.unload();
			
			bytes = null;
		}
		
		
	}
}