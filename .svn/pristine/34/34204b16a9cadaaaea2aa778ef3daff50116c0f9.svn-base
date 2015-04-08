package baidu.mp3.avatar
{
	import baidu.lib.images.JPGEncoder;

	import caurina.transitions.Tweener;

	import flash.display.DisplayObject;
	import flash.display.MovieClip;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.events.MouseEvent;
	import flash.events.SecurityErrorEvent;
	import flash.external.ExternalInterface;
	import flash.net.FileFilter;
	import flash.net.FileReference;
	import flash.net.URLLoader;
	import flash.net.URLLoaderDataFormat;
	import flash.net.URLRequest;
	import flash.net.URLRequestHeader;
	import flash.net.URLRequestMethod;
	import flash.net.URLVariables;
	import flash.system.ApplicationDomain;
	import flash.system.System;
	 import flash.system.Security;
	import flash.utils.ByteArray;

	import laan.core.ButtonMaker;
	import laan.smart.Post;
	import flash.display.Loader;
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.text.TextField;
	import flash.system.LoaderContext;
	import flash.geom.Matrix;
	//import com.adobe.serialization.json.JSON;

	/**
	 * 头像制作器
	 *
	 * @author laan
	 * @createTime 2010.05
	 *
	 */
	[SWF(width="549", height="439", backgroundColor="0xffffff", frameRate="20")]
	public class AvatarMaker extends Sprite
	{
		/**
		 * 浏览图片
		 */
		protected var browserMC:MovieClip;

		/**
		 * 生成头像
		 */
		protected var createAvatarMC:MovieClip;

		/**
		 * 保存头像到服务器
		 */
		protected var saveAvatarMC:MovieClip;

		/**
		 * 取消
		 */
		protected var cancelMC:MovieClip;

		/**
		 * 重新编辑头像
		 */
		protected var reeditAvatarMC:MovieClip;


		/**
		 *
		 */
		protected var photoPreviewer:PhotoPreviewer;

		/**
		 * 小头像预览
		 */
		protected var smallAvatarSlice:AvatarSlice;
		protected var smallAvatarSlicePreviewer:AvatarSlice;

		/**
		 * 大头像预览
		 */
		protected var bigAvatarSlice:AvatarSlice;
		protected var bigAvatarSlicePreviewer:AvatarSlice;

		/**
		 *
		 */
		protected var scaler:ImageScaler;

		/**
		 *
		 */
		protected var fr:FileReference;
       
	    var sc;
		var active=true;
		
		public function AvatarMaker()
		{
			super();

			System.useCodePage = true;

			stage.scaleMode = StageScaleMode.NO_SCALE;
			stage.align = StageAlign.TOP_LEFT;
             
			//貌似是跨域用的
			//Security.loadPolicyFile("http://himg.bdimg.com/crossdomain.xml");
				 
			fr = new FileReference();
			fr.addEventListener(Event.SELECT, fileEventsHandler);
			fr.addEventListener(Event.COMPLETE, fileEventsHandler);
             
			//延迟处理
			addEventListener(Event.ENTER_FRAME, preInit);
		}

		private function preInit(event:Event = null):void {
			if (stage.stageWidth == 0) {
				return;
			}
			removeEventListener(Event.ENTER_FRAME, preInit);

			//获取flash初始化参数
			var parameters:Object = loaderInfo.parameters;

			//js callback
			if (parameters.hasOwnProperty("jsCallback")) {
				AvatarConfig.jsCallback = parameters["jsCallback"];
			}

			//session
			if (parameters.hasOwnProperty("session")) {
				AvatarConfig.session = parameters["session"];
			}

			//是否使用预览步骤
			if (parameters.hasOwnProperty("usePreviewStep")) {
				AvatarConfig.usePreviewStep = parameters["usePreviewStep"] == "true";
			}

			//头像上传地址
			if (parameters.hasOwnProperty("uploadURL")) {
				AvatarConfig.uploadURL = parameters["uploadURL"];
			}
        
			//预加载头像
			//AvatarConfig.surl='http://youxi.baidu.com/attachment/sys/portrait/item/9011/s/60256361726f6c696e3931331d10.jpg';
		    //AvatarConfig.burl='http://youxibeta.baidu.com/attachment/sys/portrait/item/829/b/8cd4766f7273696368747b01.jpg';
			//if (parameters.hasOwnProperty("surl")) {
//				AvatarConfig.surl = parameters["surl"]+'?'+int(Math.random()*10000000);
//			}
//			if (parameters.hasOwnProperty("burl")) {
//			    AvatarConfig.burl='http://iyouxi.baidu.com'+parameters["burl"].split('http://youxi.baidu.com')[1]+'?'+int(Math.random()*10000000);
//				//AvatarConfig.burl = parameters["burl"]+'?'+int(Math.random()*10000000);
//			}
			//AvatarConfig.burl='http://iyouxi.baidu.com'+AvatarConfig.burl.split('http://youxibeta.baidu.com')[1]+'?'+int(Math.random()*10000000);
			
         
			//头像上传是否要上传原图
			if (parameters.hasOwnProperty("uploadImage")) {
				AvatarConfig.uploadImage = parameters["uploadImage"] == "true";
			}

			//头像生成是压缩质量0-100
			if (parameters.hasOwnProperty("imageQuality")) {
				AvatarConfig.imageQuality = int(parameters["imageQuality"]);
			}

			//取消回调
			if (parameters.hasOwnProperty("cancelCallback")) {
				AvatarConfig.cancelCallback = parameters["cancelCallback"];
			}

			//AvatarConfig.cancelCallback = "true";

			initUI();
		}

		/**
		 * 初始化UI
		 *
		 */
		protected function initUI():void {
			addChild(new Skin_StageBackground());

			//浏览图片按钮
			browserMC = new Skin_Browser();
			browserMC.x = 15;
			browserMC.y = 410;
			browserMC.buttonMode = true;
			ButtonMaker.toButton(browserMC);
			addChild(browserMC);

			//生成头像按钮
			createAvatarMC = new Skin_CreateAvatar();
			createAvatarMC.x = stage.stageWidth / 2 - createAvatarMC.width / 2;
			createAvatarMC.y = 410;
			createAvatarMC.buttonMode = true;
			ButtonMaker.toButton(createAvatarMC);
			addChild(createAvatarMC);

			//取消头像编辑
			if (AvatarConfig.cancelCallback) {
				//如果已设置取消头像编辑回调，则显示取消按钮
				var cancelClass:Class = ApplicationDomain.currentDomain.getDefinition("Skin_Cancel") as Class;
				cancelMC = new cancelClass() as MovieClip;
				cancelMC.x = stage.stageWidth - cancelMC.width - 5;
				cancelMC.y = createAvatarMC.y;
				cancelMC.buttonMode = true;
				ButtonMaker.toButton(cancelMC);
				addChild(cancelMC);
			}

			//保存头像
			saveAvatarMC = new Skin_SaveAvatar();
			saveAvatarMC.x = stage.stageWidth / 2 * 3 - 5 - saveAvatarMC.width;

			saveAvatarMC.y = 410;
			saveAvatarMC.buttonMode = true;
			ButtonMaker.toButton(saveAvatarMC);
			addChild(saveAvatarMC);


			//重新编辑头像
			reeditAvatarMC = new Skin_Reedit();
			reeditAvatarMC.x = stage.stageWidth / 2 * 3 + 5;
			reeditAvatarMC.y = 410;
			reeditAvatarMC.buttonMode = true;
			ButtonMaker.toButton(reeditAvatarMC);
			addChild(reeditAvatarMC);

			//图片预览
			photoPreviewer = new PhotoPreviewer();
			photoPreviewer.width = 308;
			photoPreviewer.height = 308;
			photoPreviewer.x = 15;
			photoPreviewer.y = 47;
			addChild(photoPreviewer);

			//头像预览
			var smallInfo:Object = AvatarConfig.smallAvatarInfo;
			smallAvatarSlice = new AvatarSlice();
			smallAvatarSlice.x = smallInfo.x;
			smallAvatarSlice.y = smallInfo.y;
			smallAvatarSlice.width = smallInfo.width;
			smallAvatarSlice.height = smallInfo.height;
			smallAvatarSlice.enabled = false;
			addChild(smallAvatarSlice);
            
			var bigInfo:Object = AvatarConfig.bigAvatarInfo;
			bigAvatarSlice = new AvatarSlice();
			bigAvatarSlice.x = bigInfo.x;
			bigAvatarSlice.y = bigInfo.y;
			bigAvatarSlice.width = bigInfo.width;
			bigAvatarSlice.height = bigInfo.height;
			bigAvatarSlice.enabled = false;
			addChild(bigAvatarSlice);

			scaler = new ImageScaler();
			scaler.x = photoPreviewer.x + 38;
			scaler.y = photoPreviewer.y + photoPreviewer.height + 10;
			addChild(scaler);

            //uploadURL=http://youxi.baidu.com/i/attachments.xhtml?c=uploadPortrit&
			//jsCallback=uploadOk&
			//burl=http://youxibeta.baidu.com/attachment/sys/portrait/item/16499/b/aac57364666577756536801d.jpg&
			//surl=http://youxi.baidu.com/attachment/sys/portrait/item/9011/s/60256361726f6c696e3931331d10.jpg
			
			//头像预览
			smallAvatarSlicePreviewer = new AvatarSlice();
			smallAvatarSlicePreviewer.width = smallAvatarSlice.width;
			smallAvatarSlicePreviewer.width = smallAvatarSlice.width;
			smallAvatarSlicePreviewer.x = smallInfo.previewX;
			smallAvatarSlicePreviewer.y = smallInfo.previewY;
			smallAvatarSlicePreviewer.enabled = false;
			addChild(smallAvatarSlicePreviewer);

			bigAvatarSlicePreviewer = new AvatarSlice();
			bigAvatarSlicePreviewer.width = bigAvatarSlice.width;
			bigAvatarSlicePreviewer.width = bigAvatarSlice.width;
			bigAvatarSlicePreviewer.x = bigInfo.previewX;
			bigAvatarSlicePreviewer.y = bigInfo.previewY;
			bigAvatarSlicePreviewer.enabled = false;
			addChild(bigAvatarSlicePreviewer);
            
			if(AvatarConfig.burl!=''){
				 var preLoader:Loader = new Loader();
				//Security.allowDomain(loader.contentLoaderInfo.url)
                 preLoader.contentLoaderInfo.addEventListener(Event.COMPLETE, onpreLoaderReady);
				 preLoader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, preLoaderHandler);
				 preLoader.contentLoaderInfo.addEventListener(SecurityErrorEvent.SECURITY_ERROR, preLoaderHandler);
				 var lc:LoaderContext = new LoaderContext(true);
                 lc.checkPolicyFile = true;
                 preLoader.load(new URLRequest(AvatarConfig.burl), lc);
			}
			
			//========================================================================
			//预览面板
			if (!AvatarConfig.usePreviewStep) {
				//调整各按钮位置及显示
				createAvatarMC.visible = false;
				reeditAvatarMC.visible = false;
				saveAvatarMC.x = createAvatarMC.x;
			}
			//========================================================================


			//添加事件
			//smallAvatarSlice.addEventListener(AvatarEvent.SLICE_ACTIVED, sliceActivedHandler);
			bigAvatarSlice.addEventListener(AvatarEvent.SLICE_ACTIVED, sliceActivedHandler);

			scaler.addEventListener(AvatarEvent.IMAGE_SCALE_CHANGE, imageScaleChangeHandler);

			photoPreviewer.addEventListener(AvatarEvent.SLICE_DATA_CHANGE, sliceDataChangeHandler);
			photoPreviewer.addEventListener(AvatarEvent.IMAGE_READY, imageEventsHandler);
			photoPreviewer.addEventListener(AvatarEvent.IMAGE_ERROR, imageEventsHandler);

			//鼠标点击控制
			browserMC.addEventListener(MouseEvent.CLICK, mcClickHandler);
			createAvatarMC.addEventListener(MouseEvent.CLICK, mcClickHandler);
			reeditAvatarMC.addEventListener(MouseEvent.CLICK, mcClickHandler);
			saveAvatarMC.addEventListener(MouseEvent.CLICK, mcClickHandler);
			if (cancelMC) {
				cancelMC.addEventListener(MouseEvent.CLICK, mcClickHandler);
			}
			
		}

		/**
		 *
		 * @param event
		 *
		 */
		private function fileEventsHandler(event:Event):void {
			if (event.type == Event.SELECT) {
				fr.load();
			} else if (event.type ==  Event.COMPLETE) {
				scaler.scaleValue = 1;
				photoPreviewer.setImageData(fr.data);
			}
		}

		/**
		 * 当前激活头像切片
		 */
		private var currentSlice:AvatarSlice;

		/**
		 * 目标头像激活控制
		 *
		 * @param event
		 *
		 */
		private function sliceActivedHandler(event:AvatarEvent):void {

			currentSlice = event.target as AvatarSlice;

			var data:Object = currentSlice.data;

			photoPreviewer.setSliceSize(currentSlice.width, currentSlice.height);

			if (data && data.hasOwnProperty("scale")) {
				scaler.scaleValue = data.scale;
			}

			photoPreviewer.data = data;
		}

		/**
		 * 图片缩放控制
		 *
		 * @param event
		 *
		 */
		private function imageScaleChangeHandler(event:AvatarEvent):void {
			photoPreviewer.setImageScale(scaler.scaleValue);
		}

		/**
		 * 预览图片切片数据更改后控制
		 *
		 * @param event
		 *
		 */
		private function sliceDataChangeHandler(event:AvatarEvent):void {
			if (currentSlice) {
				currentSlice.bitmapData = photoPreviewer.getSliceBitmapData();
				currentSlice.data = photoPreviewer.data;
               if (currentSlice == bigAvatarSlice) {
					if (bigAvatarSlicePreviewer){
						
					    bigAvatarSlicePreviewer.bitmapData = currentSlice.bitmapData;
						smallAvatarSlicePreviewer.bitmapData=smallAvatarSlice.bitmapData= currentSlice.bitmapData;
						smallAvatarSlice.scaleX=smallAvatarSlice.scaleY=0.5;
						smallAvatarSlicePreviewer.scaleX=smallAvatarSlicePreviewer.scaleY=0.5;
						  sc=0.5;
					}
				}
			}
		}

		/**
		 *
		 * @param event
		 *
		 */
		private function imageEventsHandler(event:AvatarEvent):void {
			if (event.type == AvatarEvent.IMAGE_ERROR) {
				showInfo(browserMC, "top", String(event.data), 1);
			} else if (event.type == AvatarEvent.IMAGE_READY) {
				bigAvatarSlice.scaleX=bigAvatarSlice.scaleY=1;
				bigAvatarSlicePreviewer.scaleX=bigAvatarSlicePreviewer.scaleY=1;
				smallAvatarSlice.scaleX=smallAvatarSlice.scaleY=1;
				
				//加载图片后，默认对大小头像进行第一次初始化截图
               
				//调整大小
				var w:int = event.data[0];
				if (w > photoPreviewer.width * 2) {
					scaler.scaleValue = (photoPreviewer.width * 2) / w;
				}

				//重置数据
				smallAvatarSlice.enabled = true;
				smallAvatarSlice.bitmapData = null;
				smallAvatarSlice.data = null;
				bigAvatarSlice.enabled = true;
				bigAvatarSlice.bitmapData = null;
				bigAvatarSlice.data = null;

				//激活头像顺序
				smallAvatarSlice.active();
				bigAvatarSlice.active();
				for (var i:uint = 0; i < AvatarConfig.AVATAR_ACTIVE.length; i++) {/*
					var avatarID:uint = AvatarConfig.AVATAR_ACTIVE[i];
					if (avatarID == 1) {
						smallAvatarSlice.active();
					} else if (avatarID == 2) {
						bigAvatarSlice.active();
					}
				*/}
			}
		}

		/**
		 * 各个按钮点击控制
		 *
		 * @param event
		 *
		 */
		private function mcClickHandler(event:Event):void {
			switch (event.target) {
				case browserMC:
					//浏览图片
					fr.browse([new FileFilter("图片", "*.png;*.jpg;*.jpeg;*.gif;*.bmp")]);
					break;
				case createAvatarMC:
					//生成头像预览
					if (!fr.data) {
						//如果没有打开推按
						showInfo(browserMC, "top", "请先选择图片", 1);
						return;
					} else if (!smallAvatarSlice.bitmapData) {
						//如果没有编辑小头像
						showInfo(browserMC, "top", "请先选择图片", 1);
						return;
					} else if (!bigAvatarSlice.bitmapData) {
						//如果没有编辑小头像
						showInfo(bigAvatarSlice, "top", "请编辑图片", 1);
						return;
					}
					Tweener.addTween(this, {time:0.3, x:-stage.stageWidth, transition:"easeInOutQuad"});
					break;
				case reeditAvatarMC:
					//重新编辑头像
					
					Tweener.addTween(this, {time:0.3, x:0, transition:"easeInOutQuad"});
					break;
				case saveAvatarMC:
					//保存头像到服务器
					saveAvatars();
					break;
				case cancelMC:
					//取消编辑
					if (ExternalInterface.available && AvatarConfig.cancelCallback) {
						ExternalInterface.call(AvatarConfig.cancelCallback);
					}
					break;
			}
		}

		/**
		 * 保存头像到服务器
		 *
		 */
		private function saveAvatars():void {
			//如果没有打开图片
			if (!fr.data&&AvatarConfig.burl=='') {
				showInfo(browserMC, "top", "请先选择图片...", 1);
				return;
			}

			var loader:URLLoader = new URLLoader();
			loader.dataFormat = URLLoaderDataFormat.BINARY;

			var request:URLRequest = new URLRequest();
			request.url = AvatarConfig.uploadURL;
			request.method = URLRequestMethod.POST;

			var jpegEncoder:JPGEncoder = new JPGEncoder(AvatarConfig.imageQuality);
             
			var m:Matrix=new Matrix();
			m.scale(sc,sc);
			var small:BitmapData=new BitmapData(90,90);
			small.draw(smallAvatarSlice,m);
			
			var uv:URLVariables = new URLVariables();
			uv.session = AvatarConfig.session;
			uv.smallAvatar = jpegEncoder.encode(small);
			uv.bigAvatar = jpegEncoder.encode(bigAvatarSlice.bitmapData);

			if (AvatarConfig.uploadImage) {
				uv.image = fr.data;
			}

			request.requestHeaders.push(new URLRequestHeader('Cache-Control', 'no-cache'));
			request.requestHeaders.push(new URLRequestHeader('content-Type', 'multipart/form-data; boundary=' + Post.getBoundary()));

			//uv.session = "################################*&*";
			//request.url = "http://localhost/test.php";

			//request.data = uv;
			request.data = Post.getPostData(uv);

			loader.addEventListener(Event.COMPLETE, saveAvatarHandler);
			loader.addEventListener(IOErrorEvent.IO_ERROR, saveAvatarHandler);
			loader.addEventListener(SecurityErrorEvent.SECURITY_ERROR, saveAvatarHandler);
			loader.load(request);


			setEnable(false);
			showInfo(saveAvatarMC, "top", "正在上传...");
		}


		/**
		 * 保存图片控制
		 *
		 * @param event
		 *
		 */
		private function saveAvatarHandler(event:Event):void {
			setEnable(true);

			var loader:URLLoader = event.target as URLLoader;
			loader.removeEventListener(Event.COMPLETE, saveAvatarHandler);
			loader.removeEventListener(IOErrorEvent.IO_ERROR, saveAvatarHandler);
			loader.removeEventListener(SecurityErrorEvent.SECURITY_ERROR, saveAvatarHandler);

			var info:String;
			//var info:Object = new Object();
				

			if (event.type == Event.COMPLETE) {
				info = ByteArray(loader.data).toString();
				
				//info = JSON.decode(ByteArray(loader.data).toString());

				if (!info) {
					showInfo(saveAvatarMC, "top", "图片保存失败！", 1);
				} else if (info.match(/true|<\-\-.*true.*\-\->/)) {
					showInfo(saveAvatarMC, "top", "图片保存成功！", 1);
				} else {
					showInfo(saveAvatarMC, "top", "图片保存成功！", 1);
				}
			} else {
				showInfo(saveAvatarMC, "top", "图片保存失败！", 1);
			}

			if (AvatarConfig.jsCallback) {
				//js回调
				try {
					trace(AvatarConfig.jsCallback);
					//var infoJSON:Object = JSON.decode(info);
					ExternalInterface.call(AvatarConfig.jsCallback, info);
				} catch (e:Error) {

				}
			}
		}

		/**
		 *
		 * @param enable
		 *
		 */
		private function setEnable(value:Boolean):void {
			mouseChildren = mouseEnabled = value;

			for (var i:uint = 0; i < numChildren; i++) {
				var item:Object = getChildAt(i);
				if (item.hasOwnProperty("setEnabled")) {
					item["setEnabled"](value);
				}
			}
		}

		/**
		 *
		 */
		private var tip:Tip;

		/**
		 * 显示提示信息
		 *
		 * @param target	目标对象
		 * @param info		信息内容
		 * @param level		信息级别
		 *
		 */
		private function showInfo(target:DisplayObject, location:String, info:String, level:uint = 0):void {
			if (!tip) {
				tip = new Tip();
				addChild(tip);
			}

			tip.showInfo(target, info, location, level);
		}
		private function preLoaderHandler(e:Event):void{
			trace('df');}
		
		private function onpreLoaderReady(e:Event):void{
			     var image:Bitmap=Bitmap(e.target.content);
                 var bitmap:BitmapData = image.bitmapData;
				 if(image.width==220){
					 var  scBMC:BitmapData= new BitmapData(180,180);
					 scBMC.draw(bitmap);
					 bigAvatarSlicePreviewer.bitmapData=bigAvatarSlice.bitmapData=scBMC;
				     smallAvatarSlicePreviewer.bitmapData=smallAvatarSlice.bitmapData=scBMC;
				 }else{
				     bigAvatarSlicePreviewer.bitmapData=bigAvatarSlice.bitmapData=bitmap;
				     smallAvatarSlicePreviewer.bitmapData=smallAvatarSlice.bitmapData=bitmap;
				 }
				  if(image.width<111){
				  active=false;
				  var w=image.width/10;
				  bigAvatarSlice.scaleX=bigAvatarSlice.scaleY=18/w;
				  bigAvatarSlicePreviewer.scaleX=bigAvatarSlicePreviewer.scaleY=18/w;
				  smallAvatarSlice.scaleX=smallAvatarSlice.scaleY=9/w;
				  smallAvatarSlicePreviewer.scaleX=smallAvatarSlicePreviewer.scaleY=9/w;
				  sc=9/w;
				  }else{
				   active=true;
				   smallAvatarSlice.scaleX=smallAvatarSlice.scaleY=0.5;
				   smallAvatarSlicePreviewer.scaleX=smallAvatarSlicePreviewer.scaleY=0.5;
				   sc=0.5;
				  }
				  
				
		 }

	}
}