package baidu.lib.images {
	import flash.external.ExternalInterface;	
	import flash.display.BitmapData;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.IOErrorEvent;
	import flash.net.URLLoader;
	import flash.net.URLLoaderDataFormat;
	import flash.net.URLRequest;
	import flash.utils.ByteArray;		

	/**
	 * @author zhanzhihu@baidu.com
	 * 加载并解析bmp图片
	 */
	public class BMPLoader extends Sprite {
		
		/**
		 * 最终生成的BitmapData
		 */
		private var _bmd : BitmapData;

		private var _loader : URLLoader;
		/**
		 * 保存加载到的二进制数据
		 */
		private var _binaryArray : ByteArray;
		/**
		 * 当前解析的字节数
		 */
		private var _crtPos : int = 0;
		
		private var _url : String = null;
		//bmp文件内容所用
		//文件头部分
		
		/*** 位图文件的类型，必须为"BM"*/ 
		private var isBm : Boolean;
		/*** 位图文件的大小，以字节为单位*/ 
		private var bfSize : Number; 
		/*** 位图数据的起始位置,以相对于位图文件头的偏移量表示，以字节为单位*/
		private var bfoffBits : Number;
		//BMP位图信息头数据，用于说时位图的尺寸等信息
		/*** 位图信息头部分所用的字节数*/ 
		private var biSize : int;
		/*** 位图的宽度，以像素为单位*/ 
		private var biWidth : int;
		/*** 位图的高度，以像素为单位*/
		private var biHeight : int;
		/*** 目标设备的平面数，必须为1*/
		private var biPlanes : int;
		/*** 每个像互所需的位数，必须是1(双色), 4(16色)，8(256色)或24(真彩色)之一 */
		private var biBitCount : int;
		/** 位图压缩类型，必须是 0(不压缩),1(BI_RLE8压缩类型)或2(BI_RLE4压缩类型)之一 */
		private var biCompression : int;
		/** 位图的大小，以字节为单位*/
		private var biSizeImage : Number;
		/** 位图的水平分辨率，每米像素数量*/
		private var biXpelsPerMeter : Number;
		/** 位图的垂直分辨率，每米像素数量*/
		private var biYPelsPerMeter : Number;
		/** 位图实际使用Color表中的Color数*/
		private var biClrUsed : int;
		/** 位图显示过程中的重要颜色数*/
		private var biClrImportant : int;
		//Color表部分
		/** Color表,每一项存放一个Color值*/
		private var arrayRGBQuad : Array;

		//位图数据部分，不做本地保存

		public function get url() : String {
			return _url;
		}

		public function set url(value : String) : void {
			_url = value;
			if(!_loader) {
				_loader = new URLLoader();
				_loader.dataFormat = URLLoaderDataFormat.BINARY;
				_loader.addEventListener(Event.COMPLETE, onBmpLoadComplete);
				_loader.addEventListener(IOErrorEvent.IO_ERROR, onioError);
				var urlrequest : URLRequest = new URLRequest(url);
				try {
					_loader.load(urlrequest);
				}catch(e : Error) {
				}
			}
		}
		private function onioError(e : IOErrorEvent):void{
			dispatchEvent(new Event("loadError"));
		}

		private function onBmpLoadComplete(e : Event) : void {
			_loader.removeEventListener(Event.COMPLETE, onBmpLoadComplete);
			_binaryArray = _loader.data as ByteArray;
			try{
				parseBmpData();
			}catch(error:Error){
				dispatchEvent(new Event("loadError"));
			}
		}
		public function loadFromBinary(byteArray : ByteArray):void {
			_binaryArray = byteArray;
			try{
				parseBmpData();
			}catch(error:Error){
				dispatchEvent(new Event("loadError"));
			}
		}

		private function parseBmpData() : void {
			_crtPos = 0;
			
			//位图文件的类型
			var temp1 : int = readbyte();
			var temp2 : int = readbyte();
			if(temp1 != 66 || temp2 != 77) {
				isBm = false;
				ExternalInterface.call("console.log","is not bmp");
				dispatchEvent(new Event("loadError"));
				return;
			}
			ExternalInterface.call("console.log","is a bmp");
			isBm = true;
			//位图文件的大小
			bfSize = readint();
			//两个保留位
			readshort();
			readshort();
			//位图数据的起始位置
			bfoffBits = readint();
			
			biSize = readint();
			biWidth = readuint();
			biHeight = readuint();
			biPlanes = readshort();
			biBitCount = readshort();
			biCompression = readint();
			biSizeImage = readint();
			biXpelsPerMeter = readint();
			biYPelsPerMeter = readint();
			biClrUsed = readint();
			biClrImportant = readint();
			
			var i : int,j : int;
			var r : int,g : int,b : int;
			var numline : int = 0;
			ExternalInterface.call("console.log", biBitCount+"位");
			if(biBitCount == 24) {
				_bmd = new BitmapData(biWidth, biHeight);
				_bmd.lock();
				//没有Color表
				numline = 0;
				for(j = biHeight - 1;j >= 0;j--) {
					//从最下面的一行开始
					numline = 0;
					for(i = 0;i < biWidth;i++) {
						//从左到右开始
						b = readunsignedbyte();
						g = readunsignedbyte();
						r = readunsignedbyte();
						_bmd.setPixel(i, j, r << 16 | g << 8 | b);
						numline += 3;
					}
					while(numline % 4 != 0) {
						numline++;
						readbyte();
					}
				}
				_bmd.unlock();
				dispatchEvent(new Event("complete"));
//				_bmp = new Bitmap(_bmd,"auto",true);
//				addChild(_bmp);
			}else if(biBitCount == 1 || biBitCount == 4 || biBitCount == 8) {
				//有Color表,选建立color表
				var numcolors : int = (bfoffBits - _crtPos) / 4 ;
				arrayRGBQuad = [];
				for(i = 0;i < numcolors;i++) {
					var rgbObj : Object = new Object();
					rgbObj.b = readunsignedbyte();
					rgbObj.g = readunsignedbyte();
					rgbObj.r = readunsignedbyte();
					readunsignedbyte();
					arrayRGBQuad.push(rgbObj);
				}
				var rgb8 : Object;
				_bmd = new BitmapData(biWidth, biHeight);
				_bmd.lock();
				numline = 0;
				var ix1 : int,ix2 : int,ix3 : int,ix4 : int,ix5 : int,ix6 : int,ix7 : int,ix8 : int,ix0 : int;
				for(j = biHeight - 1;j >= 0;j--) {
					//从最下面的一行开始
					numline = 0;
					for(i = 0;i < biWidth;) {
						//从左到右开始
						numline += 1;
						if(biBitCount == 8 ) {
							ix1 = readunsignedbyte();
							rgb8 = arrayRGBQuad[ix1];
							r = rgb8.r;
							g = rgb8.g;
							b = rgb8.b;
							_bmd.setPixel(i, j, r << 16 | g << 8 | b);
							i++;
						}else if(biBitCount == 4) {
							ix1 = readunsignedbyte();
							ix2 = ix1 >> 4;
							ix3 = ix1 & 0x0f;
							rgb8 = arrayRGBQuad[ix2];
							r = rgb8.r;
							g = rgb8.g;
							b = rgb8.b;
							_bmd.setPixel(i, j, r << 16 | g << 8 | b);
							i++;
							rgb8 = arrayRGBQuad[ix3];
							r = rgb8.r;
							g = rgb8.g;
							b = rgb8.b;
							_bmd.setPixel(i, j, r << 16 | g << 8 | b);
							i++;
						}else if(biBitCount == 1) {
							ix0 = readunsignedbyte();
							ix1 = (ix0 >> 4) & 8;
							ix2 = (ix0 >> 4) & 4;
							ix3 = (ix0 >> 4) & 2;
							ix4 = (ix0 >> 4) & 1;
							ix5 = (ix0 & 0x0f)&8;
							ix6 = (ix0 & 0x0f)&4;
							ix7 = (ix0 & 0x0f)&2;
							ix8 = (ix0 & 0x0f)&1;
							
							rgb8 = arrayRGBQuad[ix1];
							r = rgb8.r;
							g = rgb8.g;
							b = rgb8.b;
							_bmd.setPixel(i, j, r << 16 | g << 8 | b);
							i++;
							
							rgb8 = arrayRGBQuad[ix2];
							r = rgb8.r;
							g = rgb8.g;
							b = rgb8.b;
							_bmd.setPixel(i, j, r << 16 | g << 8 | b);
							i++;
							
							rgb8 = arrayRGBQuad[ix3];
							r = rgb8.r;
							g = rgb8.g;
							b = rgb8.b;
							_bmd.setPixel(i, j, r << 16 | g << 8 | b);
							i++;
							
							rgb8 = arrayRGBQuad[ix4];
							r = rgb8.r;
							g = rgb8.g;
							b = rgb8.b;
							_bmd.setPixel(i, j, r << 16 | g << 8 | b);
							i++;
							
							rgb8 = arrayRGBQuad[ix5];
							r = rgb8.r;
							g = rgb8.g;
							b = rgb8.b;
							_bmd.setPixel(i, j, r << 16 | g << 8 | b);
							i++;
							
							rgb8 = arrayRGBQuad[ix6];
							r = rgb8.r;
							g = rgb8.g;
							b = rgb8.b;
							_bmd.setPixel(i, j, r << 16 | g << 8 | b);
							i++;
							
							rgb8 = arrayRGBQuad[ix7];
							r = rgb8.r;
							g = rgb8.g;
							b = rgb8.b;
							_bmd.setPixel(i, j, r << 16 | g << 8 | b);
							i++;
							
							rgb8 = arrayRGBQuad[ix8];
							r = rgb8.r;
							g = rgb8.g;
							b = rgb8.b;
							_bmd.setPixel(i, j, r << 16 | g << 8 | b);
							i++;
							
						}
					}
					while(numline % 4 != 0) {
						numline++;
						readbyte();
					}
				}
				_bmd.unlock();
				dispatchEvent(new Event("complete"));
//				_bmp = new Bitmap(_bmd,"auto",true);
//				addChild(_bmp);
			}
		}
		public function getBmd():BitmapData{
			return _bmd;
		}

		public function readbyte() : int {
			_crtPos++;
			return _binaryArray.readByte();
		}

		public function readunsignedbyte() : int {
			_crtPos++;
			return _binaryArray.readUnsignedByte();
		}

		private var short1 : int;
		private var short2 : int;

		/**
		 * 读16位
		 */
		public function readshort() : int {
			_crtPos += 2;
			short1 = _binaryArray.readUnsignedByte();
			short2 = _binaryArray.readUnsignedByte(); 
			return short2 << 8 | short1;
		}

		private var int1 : int,int2 : int,int3 : int,int4 : int;

		/**
		 * 读32位
		 */
		public function readuint() : int {
			_crtPos += 4;
			int1 = _binaryArray.readUnsignedByte();
			int2 = _binaryArray.readUnsignedByte();
			int3 = _binaryArray.readUnsignedByte();
			int4 = _binaryArray.readUnsignedByte();
			return int4 << 24 | int3 << 16 | int2 << 8 | int1 ;
		}

		public function readint() : int {
			_crtPos += 4;
			int1 = _binaryArray.readByte();
			int2 = _binaryArray.readByte();
			int3 = _binaryArray.readByte();
			int4 = _binaryArray.readByte();
			return int4 << 24 | int3 << 16 | int2 << 8 | int1 ;
		}

		public function BMPLoader() {
		}
	}
}
