package baidu.ui.core {
    import flash.display.DisplayObject;

    import baidu.ui.core.Invalidation;	
    import baidu.ui.core.BUI;	

    /**
     * 换肤Sprite。让Sprite能自我解决换肤问题。
     * Button 经常作为高级组件的子组件，但是有时候Button都嫌太强大了，需要更加基础的子组件，于是有了 BSkin。
     * 将来可以考虑 Button 里面的background 使用BSkin。
     * @author yaowei
     */
    public class BSkin extends BUI {
        protected var skinInstance : DisplayObject;
        protected var _autoSize:Object = false;

        public function BSkin() {
            super();
        }
        
        public function get autoSize():Object {
            return _autoSize;
        }

        public function set autoSize(value:Object):void {
            _autoSize = value;
            invalidate(Invalidation.SIZE);
        }

        override protected function draw() : void {
            if (isInvalid(Invalidation.STYLES, Invalidation.STATE)) {
                drawSkin();
                invalidate(Invalidation.SIZE, false);
            }
            if (isInvalid(Invalidation.SIZE)) {
                drawLayout();
            }
            super.draw();
        }

        protected function drawLayout() : void {
        	if(skinInstance){
            	if(_autoSize){
            	    width = skinInstance.width;
            	    height = skinInstance.height;
            	}else{
            	    skinInstance.width = _width;
                    skinInstance.height = _height;
            	}
        	}
        }

        protected function drawSkin() : void {
            var old : DisplayObject = skinInstance;
            skinInstance = getSkinInstance(getStyleValue("skin"));
            if(skinInstance){
                addChildAt(skinInstance, 0);
            }
            if (old != null && old != skinInstance) { 
                removeChild(old); 
            }
        }
    }
}
