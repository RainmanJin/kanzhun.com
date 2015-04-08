package baidu.ui.controls {
    import baidu.ui.core.Invalidation;    
    import baidu.ui.core.BUI;    

    import flash.events.IOErrorEvent;   
    import flash.events.Event;  
    import flash.net.URLRequest;    
    import flash.display.Loader;    

    /**
     * 图片组件。
     * @author yaowei
     */
    public class Image extends BUI {

        public function Image() {
            super();
        }

        /**
         * 获取/设置 url。
         */
        public function get url():String {
            return _url;
        }

        public function set url(value:String):void {
            _url = value;
            invalidate(Invalidation.DATA);
        }

        /**
         * 获取 图片原始的宽度。
         */
        public function get imageWidth():Number {
            return _imageWidth;
        }

        /**
         * 获取 图片原始的高度。
         */
        public function get imageHeight():Number {
            return _imageHeight;
        }

        private var _imageWidth:Number = 0;
        private var _imageHeight:Number = 0;

        private var _isLoaded:Boolean = false;
        private var _loader:Loader;
        private var _url:String;

        override protected function initUI():void {
        	super.initUI();
        	setSize(-1, -1);
        	
            _loader = new Loader();
            addChild(_loader);
            _loader.contentLoaderInfo.addEventListener(Event.COMPLETE, completeHandler);
            _loader.contentLoaderInfo.addEventListener(IOErrorEvent.IO_ERROR, errorHandler);
        }

        override protected function draw():void {
            if (isInvalid(Invalidation.SIZE)) {
                drawLayout();
            }
            if (isInvalid(Invalidation.DATA)) {
                drawData();
            }
            super.draw();
        }

        protected function drawLayout():void {
            if(_isLoaded){
                _loader.width = (_width==-1) ? _imageWidth : _width;
                _loader.height = (_height==-1) ? _imageHeight : _height;
            }
        }

        protected function drawData():void {
            if(url == "" || url == null)
                return;
            
            var request:URLRequest = new URLRequest(url);
            _loader.load(request);
            _imageWidth = 0;
            _imageHeight = 0;
        }

        private function completeHandler(event:Event):void {
            _isLoaded = true;
            _imageWidth = _loader.width;
            _imageHeight = _loader.height;
            
            invalidate(Invalidation.SIZE);
            dispatchEvent(event);
        }

        private function errorHandler(event:IOErrorEvent):void {
            dispatchEvent(event);
        }
    }
}
