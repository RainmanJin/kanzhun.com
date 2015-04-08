package laan.smart {

	import flash.events.*;
	import flash.net.*;
	import flash.utils.ByteArray;
	import flash.utils.Endian;

	/**
	 * 使用URLLoader发送文件
	 * 
	 * <p>
	 * request.method = URLRequestMethod.POST;
	 * request.requestHeaders.push(new URLRequestHeader('Cache-Control', 'no-cache'));
	 * request.requestHeaders.push(new URLRequestHeader('content-Type', 'multipart/form-data; boundary=' + UploadPostHelper.getBoundary()));
	 * 
	 * ...
	 * loader.dataFormat = URLLoaderDataFormat.BINARY;
	 * </p>
	 * 
	 */
	public class Post {

		/**
		 *  
		 * @param parameters
		 * @return 
		 * 
		 */
		public static function getPostData(parameters:Object):ByteArray {
			var i: int;
			var bytes:String;

			var postData:ByteArray = new ByteArray();
			postData.endian = Endian.BIG_ENDIAN;

			//add Filename to parameters
			if(parameters == null) {
				parameters = new Object();
			}
			//parameters.Filename = fileName;

			//add parameters to postData
			for(var name:String in parameters) {
				if (parameters[name] is ByteArray) {
					//add Filedata to postData
					var byteArray:ByteArray = parameters[name];
					
					postData = BOUNDARY(postData);
					postData = LINEBREAK(postData);
					bytes = 'Content-Disposition: form-data; name="'+name+'"; filename="';
					for ( i = 0; i < bytes.length; i++ ) {
						postData.writeByte( bytes.charCodeAt(i) );
					}
					postData.writeUTFBytes(name);//filename
					postData = QUOTATIONMARK(postData);
					postData = LINEBREAK(postData);
					bytes = 'Content-Type: application/octet-stream';
					for ( i = 0; i < bytes.length; i++ ) {
						postData.writeByte( bytes.charCodeAt(i) );
					}
					postData = LINEBREAK(postData);
					postData = LINEBREAK(postData);
					postData.writeBytes(byteArray, 0, byteArray.length);
					postData = LINEBREAK(postData);
				} else if (parameters[name] is String){
					postData = BOUNDARY(postData);
					postData = LINEBREAK(postData);
					bytes = 'Content-Disposition: form-data; name="' + name + '"';
					for ( i = 0; i < bytes.length; i++ ) {
						postData.writeByte( bytes.charCodeAt(i) );
					}
					postData = LINEBREAK(postData);
					postData = LINEBREAK(postData);
					postData.writeUTFBytes(parameters[name]);
					postData = LINEBREAK(postData);
					
					//add upload filed to postData
					postData = LINEBREAK(postData);
					postData = BOUNDARY(postData);
					postData = LINEBREAK(postData);
					bytes = 'Content-Disposition: form-data; name="Upload"';
					for ( i = 0; i < bytes.length; i++ ) {
						postData.writeByte( bytes.charCodeAt(i) );
					}
					postData = LINEBREAK(postData);
					postData = LINEBREAK(postData);
					bytes = 'Submit Query';
					for ( i = 0; i < bytes.length; i++ ) {
						postData.writeByte( bytes.charCodeAt(i) );
					}
					postData = LINEBREAK(postData);
				}
			}

			//closing boundary
			postData = BOUNDARY(postData);
			postData = DOUBLEDASH(postData);

			return postData;
		}
		
		
		/**
		 * Boundary used to break up different parts of the http POST body
		 */
		private static var _boundary:String = "";

		/**
		 * Get the boundary for the post.
		 * Must be passed as part of the contentType of the UrlRequest
		 */
		public static function getBoundary():String {

			if(_boundary.length == 0) {
				for (var i:int = 0; i < 0x20; i++ ) {
					_boundary += String.fromCharCode( int( 97 + Math.random() * 25 ) );
				}
			}

			return _boundary;
		}

		/**
		 * Add a boundary to the PostData with leading doubledash
		 */
		private static function BOUNDARY(p:ByteArray):ByteArray {
			var l:int = Post.getBoundary().length;

			p = DOUBLEDASH(p);
			for (var i:int = 0; i < l; i++ ) {
				p.writeByte( _boundary.charCodeAt( i ) );
			}
			return p;
		}

		/**
		 * Add one linebreak
		 */
		private static function LINEBREAK(p:ByteArray):ByteArray {
			p.writeShort(0x0d0a);
			return p;
		}

		/**
		 * Add quotation mark
		 */
		private static function QUOTATIONMARK(p:ByteArray):ByteArray {
			p.writeByte(0x22);
			return p;
		}

		/**
		 * Add Double Dash
		 */
		private static function DOUBLEDASH(p:ByteArray):ByteArray {
			p.writeShort(0x2d2d);
			return p;
		}

	}
}