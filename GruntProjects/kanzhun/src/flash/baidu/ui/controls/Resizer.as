package baidu.ui.controls {
    import baidu.ui.events.ResizerEvent;    
    
    import flash.display.DisplayObject;
    import flash.display.Graphics;
    import flash.display.Sprite;
    import flash.events.Event;
    import flash.events.MouseEvent;

    import baidu.ui.constants.CursorType;
    import baidu.ui.core.BUI;
    import baidu.ui.core.Invalidation;
    import baidu.ui.managers.CursorManager;        

    /**
     * Resizer 用于对一个目标进行 尺寸和位置上的操作。
     * @author as4game@gmail.com
     */
    public class Resizer extends BUI {

        public static const TL:int = 0;
        public static const T:int = 1;
        public static const TR:int = 2;
        public static const R:int = 3;
        public static const BR:int = 4;
        public static const B:int = 5;
        public static const BL:int = 6;
        public static const L:int = 7;

        public static const BORDER_WIDTH:int = 4;
        public static const CORNER_WIDTH:int = 16;
        
        /**
         * 默认样式。
         */
        public static var defaultStyles:Object = {
            borderColor:0xff0000,
            borderAlpha:1,
            centerColor:0x0000ff,
            centerAlpha:1,
            
            alphaUp:0.1,
            alphaDown:0.3
        };
        
        /**
         * 边框的鼠标。
         */
        public var borderCursors:Array = [CursorType.NW_RESIZE_CURSOR,
            CursorType.V_RESIZE_CURSOR,
            CursorType.NE_RESIZE_CURSOR,
            CursorType.H_RESIZE_CURSOR,
            CursorType.NW_RESIZE_CURSOR,
            CursorType.V_RESIZE_CURSOR,
            CursorType.NE_RESIZE_CURSOR,
            CursorType.H_RESIZE_CURSOR];
        
        /**
         * 中间的鼠标。
         */
        public var centerCursor:String =  CursorType.HV_RESIZE_CURSOR;

        /**
         * 所有的边框。
         */
        public var borders:Array = [];
        
        /**
         * 中心。
         */
        public var center:Sprite;
        
        protected var deltaX:Number;
        protected var deltaY:Number;
        
        protected var dragBorderIndex:int = -1;
        
        protected var _centerHeight:Number = -1;
        protected var _resizable:Boolean = true;
        protected var _moveable:Boolean = true;

        public function Resizer() {
            super();
        }
        
        /**
         * 获取类样式。
         */
        override public function get classStyles():Object {
            return mergeStyles(BUI.defaultStyles, defaultStyles);
        }
        
        public function get centerHeight():Number{
            return _centerHeight;
        }
        
        public function set centerHeight(value:Number):void{
            _centerHeight = value;
            invalidate(Invalidation.SIZE);
        }
        
        /**
         * 获取/设置 是否可以拉动 border。
         */
        public function get resizable():Boolean{
        	return _resizable;
        }
        
        public function set resizable(value:Boolean):void{
        	_resizable = value;
        }
        
        /**
         * 获取/设置 是否可以移动 center。
         */
        public function get moveable():Boolean{
            return _moveable;
        }
        
        public function set moveable(value:Boolean):void{
            _moveable = value;
        }

        override protected function initUI():void {
            super.initUI();
            
            var i:int = 0;
            var l:int = 8;
            var border:Sprite;
            for(i = 0;i < l;i++) {
                border = new Sprite();
                addChild(border);
                borders[i] = border;
                
                border.addEventListener(MouseEvent.MOUSE_DOWN, handleBorderEvent);
                border.addEventListener(MouseEvent.ROLL_OVER, handleBorderEvent);
                border.addEventListener(MouseEvent.ROLL_OUT, handleBorderEvent);
            }
            
            center = new Sprite();
            addChild(center);
            
            center.addEventListener(MouseEvent.MOUSE_DOWN, handleCenterEvent);
            center.addEventListener(MouseEvent.ROLL_OVER, handleCenterEvent);
            center.addEventListener(MouseEvent.ROLL_OUT, handleCenterEvent);
            
            this.alpha = getStyleValue("alphaUp");
        }
        
        protected function handleCenterEvent(event:MouseEvent):void {
        	if(!_moveable)return;
        	switch(event.type) {
                case MouseEvent.MOUSE_DOWN:
                    this.alpha = getStyleValue("alphaDown");
                    dragBorderIndex = -1;
                    addEventListener(Event.ENTER_FRAME, handleEnterFrame);
                    stage.addEventListener(MouseEvent.MOUSE_UP, handleStageMouseUp);
                    
                    deltaX = mouseX - center.x;
                    deltaY = mouseY - center.y;
                    break;
                case MouseEvent.ROLL_OVER:
                    if(!event.buttonDown) {
                    	if(centerCursor!=null){
                            CursorManager.getInstance().showCursor(centerCursor);
                    	}
                    }
                    break;
                case MouseEvent.ROLL_OUT:
                    if(!event.buttonDown) {
                        CursorManager.getInstance().hideCurrentCursor();
                    }
                    break;
            }
        }

        protected function handleBorderEvent(event:MouseEvent):void {
        	if(!_resizable)return;
            switch(event.type) {
                case MouseEvent.MOUSE_DOWN:
                    this.alpha = getStyleValue("alphaDown");
                    dragBorderIndex = getBorderIndex(event.currentTarget as Sprite);
                    addEventListener(Event.ENTER_FRAME, handleEnterFrame);
                    stage.addEventListener(MouseEvent.MOUSE_UP, handleStageMouseUp);
                    
                    deltaX = mouseX - borders[dragBorderIndex].x;
                    deltaY = mouseY - borders[dragBorderIndex].y;
                    break;
                case MouseEvent.ROLL_OVER:
                    if(!event.buttonDown) {
                        CursorManager.getInstance().showCursor(borderCursors[getBorderIndex(event.currentTarget as Sprite)]);
                    }
                    break;
                case MouseEvent.ROLL_OUT:
                    if(!event.buttonDown) {
                        CursorManager.getInstance().hideCurrentCursor();
                    }
                    break;
            }
        }

        protected function handleStageMouseUp(event:MouseEvent):void {
    		this.alpha = getStyleValue("alphaUp");
            removeEventListener(Event.ENTER_FRAME, handleEnterFrame);
            stage.removeEventListener(MouseEvent.MOUSE_UP, handleStageMouseUp);
            
            if(dragBorderIndex==-1){
            	dispatchEvent(new ResizerEvent(ResizerEvent.CENTER_DRAG_END));
            }else{
                dispatchEvent(new ResizerEvent(ResizerEvent.BORDER_DRAG_END));
            }
            
        }

        protected function handleEnterFrame(event:Event):void {
        	if(dragBorderIndex==-1){
        		updateCenterPostion();
        	}else{
                updateSidePosition();
        	}
        }

        protected function updateSidePosition():void {
            var border:Sprite = borders[dragBorderIndex];
            var deltaWidth:Number = mouseX - border.x - deltaX;
            var deltaHeight:Number = mouseY - border.y - deltaY;
            switch(dragBorderIndex) {
                case T:
                    this.height -= deltaHeight;
                    this.y += deltaHeight;
                    break;
                case B:
                    this.height += deltaHeight;
                    break;
                case R:
                    this.width += deltaWidth;
                    break;
                case L:
                    this.width -= deltaWidth;
                    this.x += deltaWidth;
                    break;
                case TL:
                    this.height -= deltaHeight;
                    this.y += deltaHeight;
                    
                    this.width -= deltaWidth;
                    this.x += deltaWidth;
                    break;
                case TR:
                    this.height -= deltaHeight;
                    this.y += deltaHeight;
                    
                    this.width += deltaWidth;
                    break;
                case BR:
                    this.height += deltaHeight;
                    
                    this.width += deltaWidth;
                    break;
                case BL:
                    this.height += deltaHeight;
                    
                    this.width -= deltaWidth;
                    this.x += deltaWidth;
                    break;
            }
        }
        
        protected function updateCenterPostion():void{
            var deltaWidth:Number = mouseX - center.x - deltaX;
            var deltaHeight:Number = mouseY - center.y - deltaY;
            
            x += deltaWidth;
            y += deltaHeight;
        }

        protected function getBorderIndex(border:Sprite):int {
            var i:int = 0;
            var l:int = 8;
            var result:int = -1;
            for(i = 0;i < l;i++) {
                if(borders[i] == border) {
                    result = i;
                }
            }
            return result;
        }

        override protected function draw():void { 
            if (isInvalid(Invalidation.STYLES)) {
            	drawBorder();
            	drawCenter();
                drawLayout();
            }
            if (isInvalid(Invalidation.SIZE)) {
                drawLayout();
            }
            super.draw();
        }

        protected function drawLayout():void {
        	
            //corener xy
            borders[TL].x = 0;
            borders[TL].y = 0;
        	
            borders[TR].x = width - CORNER_WIDTH;
            borders[TR].y = 0;
            
            borders[BR].x = width - CORNER_WIDTH;
            borders[BR].y = height - CORNER_WIDTH;
            
            borders[BL].x = 0;
            borders[BL].y = height - CORNER_WIDTH;
        	
            //border xy
            borders[T].x = CORNER_WIDTH;
        	
            borders[R].x = width - BORDER_WIDTH;
            borders[R].y = CORNER_WIDTH;
        	
            borders[B].x = CORNER_WIDTH;
            borders[B].y = height - BORDER_WIDTH;
        	
            borders[L].x = 0;
            borders[L].y = CORNER_WIDTH;
            
            //border wh
            borders[B].width = borders[T].width = width - 2 * CORNER_WIDTH;
            borders[R].height = borders[L].height = height - 2 * CORNER_WIDTH;
            
            center.width = width - 2*BORDER_WIDTH;
            center.height = (_centerHeight==-1)?height - 2*BORDER_WIDTH:_centerHeight;
            center.x = BORDER_WIDTH;
            center.y = BORDER_WIDTH;
        }
        
        protected function drawBorder():void {
        	var borderColor:uint = getStyleValue("borderColor");
            var borderAlpha:uint = getStyleValue("borderAlpha");
        	var i:int = 0;
            var l:int = 8;
            var border:Sprite;
        	for(i = 0;i < l;i++) {
        		border = borders[i];
                var graphics:Graphics = border.graphics;
                if(i % 2 == 1) {
                    graphics.clear();
                    graphics.beginFill(borderColor,borderAlpha);
                    graphics.drawRect(0, 0, BORDER_WIDTH, BORDER_WIDTH);
                    graphics.endFill();
                }else {
                    graphics.clear();
                    graphics.beginFill(borderColor,borderAlpha);
                    graphics.drawRect(0, 0, CORNER_WIDTH, CORNER_WIDTH);
                    switch(i) {
                        case TL:
                            graphics.drawRect(BORDER_WIDTH, BORDER_WIDTH, CORNER_WIDTH - BORDER_WIDTH, CORNER_WIDTH - BORDER_WIDTH);
                            break;
                        case TR:
                            graphics.drawRect(0, BORDER_WIDTH, CORNER_WIDTH - BORDER_WIDTH, CORNER_WIDTH - BORDER_WIDTH);
                            break;
                        case BR:
                            graphics.drawRect(0, 0, CORNER_WIDTH - BORDER_WIDTH, CORNER_WIDTH - BORDER_WIDTH);
                            break;
                        case BL:
                            graphics.drawRect(BORDER_WIDTH, 0, CORNER_WIDTH - BORDER_WIDTH, CORNER_WIDTH - BORDER_WIDTH);
                            break;
                    }
                    graphics.endFill();
                }
        	}
        }
        
        protected function drawCenter():void {
            var centerColor:uint = getStyleValue("centerColor");
            var centerAlpha:uint = getStyleValue("centerAlpha");
            trace("centerColor="+centerColor);
            var graphics:Graphics = center.graphics;
            graphics.clear();
            graphics.beginFill(centerColor,centerAlpha);
            graphics.drawRect(0, 0, 10, 10);
            graphics.endFill();
        }
    }
}
