package baidu.mp3.avatar
{
	import flash.events.Event;
	
	/**
	 *  
	 * @author laan
	 * 
	 * 
	 */	
	public class AvatarEvent extends Event
	{
		/**
		 * 图片准备完毕
		 */		
		public static const IMAGE_READY:String = "imageReady";
		
		/**
		 * 图片出错
		 */		
		public static const IMAGE_ERROR:String = "imageError";
		
		/**
		 * 头像切片数据更改
		 */		
		public static const SLICE_DATA_CHANGE:String = "sliceDataChange";
		
		/**
		 * 切片编辑激活事件 
		 */		
		public static const SLICE_ACTIVED:String = "sliceActived";
		
		/**
		 * 头像缩放处理 
		 */		
		public static const IMAGE_SCALE_CHANGE:String = "imageScaleChange";
		
		public function AvatarEvent(type:String, data:* = null, bubbles:Boolean=false, cancelable:Boolean=false)
		{
			super(type, bubbles, cancelable);
			
			_data = data;
		}
		
		private var _data:*;
		
		public function get data():* {
			return _data;
		}
		
		/**
		 *  
		 * @return 
		 * 
		 */		
		override public function clone():Event {
			return new AvatarEvent(type, _data);
		}
		
	}
}