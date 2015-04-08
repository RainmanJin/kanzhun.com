package baidu.mp3.avatar
{
	/**
	 * 程序配置数据
	 * 
	 * @author laan
	 * @createTime 201005
	 * 
	 */	
	public class AvatarConfig
	{
		/**
		 *  头像被激活后的边框颜色
		 */		
		public static var STYLE_AVATAR_BORDER_COLOR:uint = 0xED8D29;
		
		 
		/**
		 * 头像默认激活顺序，先激活大头像，再激活小头像 
		 */
		public static var AVATAR_ACTIVE:Array = [1];
		
		/**
		 * 小头像信息
		 */		
		public static var smallAvatarInfo:Object = {x:335,
												   y:48,
												   width:90,
												   height:90,
												   previewX:622,
												   previewY:102};
		
		/**
		 * 大头像尺寸 
		 */		
		public static var bigAvatarInfo:Object = {x:335,
												  y:174,
												  width:180,
												  height:180,
												  previewX:746,
												  previewY:102};
		
		/**
		 * 取消回调
		 */		
		public static var cancelCallback:String;
		
		/**
		 * js回调 
		 */		
		public static var jsCallback:String;
		
		/**
		 *  
		 */		
		public static var session:String;
		
		/**
		 * 是否使用预览过程 
		 */		
		public static var usePreviewStep:Boolean = true;
		
		/**
		 *  头像接收服务器
		 */		
		public static var uploadURL:String = "";
		
		
		/**
		 * 是否上传原图数据
		 */		
		public static var uploadImage:Boolean = false;
		
		/**
		 * 图片压缩质量 
		 */		
		public static var imageQuality:uint = 90;
		/**
		 * 预加载小图片路径
		 */		
		public static var surl:String = '';
		/**
		 * 预加载大图片路径
		 */		
		public static var burl:String = '';

	}
}