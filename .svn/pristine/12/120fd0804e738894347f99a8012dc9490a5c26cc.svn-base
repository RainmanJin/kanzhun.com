package baidu.ui.controls {
    import flash.display.DisplayObject;
    import flash.events.Event;
    import flash.events.MouseEvent;
    import flash.geom.Point;
    import flash.text.TextField;
    import flash.text.TextFormat;

    import baidu.ui.controls.list.IListCell;
    import baidu.ui.core.BUI;
    import baidu.ui.core.Invalidation;
    import baidu.ui.data.DataProvider;
    import baidu.ui.events.DataChangeEvent;
    import baidu.ui.events.ListEvent;    

    /**
     * 选择变化。
     */
    [Event(name="change", type="flash.events.Event")]

    /**
     * 列表事件 itemRollOver。
     */
    [Event(name="itemRollOver", type="fl.events.ListEvent")]

    /**
     * 列表事件 itemRollOut。
     */
    [Event(name="itemRollOut", type="fl.events.ListEvent")]

    /**
     * 列表关闭。
     */
    [Event(name="close", type="flash.events.Event")]

    /**
     * 列表打开。
     */
    [Event(name="open", type="flash.events.Event")]

    /**
     * ScrollPane 滚动。
     */
    [Event(name="scroll", type="fl.events.ScrollEvent")]

    /**
     * 样式，右边小按钮的宽度。
     */
    [Style(name="buttonWidth", type="Number", format="Length")]

    /**
     * 样式，按钮上的文本和背景边缘的间距。
     */
    [Style(name="textPadding", type="Number", format="Length")]

    /**
     * 样式，皮肤。
     */
    [Style(name="skin", type="Class")]

    /**
     * 组合框。
     */
    public class ComboBox extends BUI {

        /**
         * @private
         */
        protected var textField:TextField;

        /**
         * @private
         */
        protected var background:Button;

        /**
         * 内置的list对象。
         */
        public var list:List;

        /**
         * @private
         */
        protected var isOpen:Boolean = false;

        /**
         * @private
         */
        protected var _rowCount:uint = 5;

        /**
         * @private
         */
        protected var _dropdownWidth:Number;

        /**
         * @private
         */
        public static var defaultStyles:Object = {
            skin:"ComboBox_Skin", buttonWidth:20, textPadding:2
        };

        /**
         * 构造函数。
         */
        public function ComboBox() {
            super();
        }

        /**
         * @private
         */
        override public function get classStyles():Object {
            return mergeStyles(super.classStyles, defaultStyles);
        }
        
        /**
         * 获取/设置禁用状态。
         */
        override public function get enabled():Boolean {
            return super.enabled;
        }

        override public function set enabled(value:Boolean):void {
            super.enabled = value;
            mouseEnabled = value;
            
            background.enabled = value;
            if(!value){
                close();
            }
        }

        /**
         * 获取/设置 行高。
         */
        public function get rowCount():int {
            return _rowCount;
        }

        public function set rowCount(value:int):void {
        	//fix 最小为1
        	_rowCount = Math.max(1, value);
            invalidate(Invalidation.SIZE);
        }

        /**
         * 获取/设置 选中的索引。
         */
        public function get selectedIndex():int {
            return list.selectedIndex;
        }

        public function set selectedIndex(value:int):void {
            list.selectedIndex = value;
            invalidate(Invalidation.SELECTED);
        }

        /**
         * 获取/设置 选中的数据项。
         */
        public function get selectedItem():Object {
            return list.selectedItem;
        }

        public function set selectedItem(value:Object):void {
            list.selectedItem = value;
            invalidate(Invalidation.SELECTED);
        }

        /**
         * 获取 下拉列表的引用。
         */
        public function get dropdown():List {
            return list;
        }

        /**
         * 获取列表的长度。
         */
        public function get length():int {
            return list.length;
        }

        /**
         * 获取/设置 数据提供器。
         */
        public function get dataProvider():DataProvider {
            return list.dataProvider;
        }

        public function set dataProvider(value:DataProvider):void {
            value.addEventListener(DataChangeEvent.DATA_CHANGE, handleDataChange, false, 0, true);
            list.dataProvider = value;
            invalidate(Invalidation.DATA);
        }

        /**
         * 获取/设置 下拉列表的宽度。
         */
        public function get dropdownWidth():Number {
            return list.width;
        }

        public function set dropdownWidth(value:Number):void {
            _dropdownWidth = value;
            invalidate(Invalidation.SIZE);
        }

        /**
         * 添加数据项。
         */
        public function addItem(item:Object):void {
            list.addItem(item);
            invalidate(Invalidation.DATA);
        }

        /**
         * 在指定的索引添加数据项。
         */
        public function addItemAt(item:Object,index:uint):void {
            list.addItemAt(item, index);
            invalidate(Invalidation.DATA);
        }

        /**
         * 移除所有的数据项。
         */
        public function removeAll():void {
            list.removeAll();
            textField.text = "";
            invalidate(Invalidation.DATA);
        }

        /**
         * 移除指定的数据项。
         */
        public function removeItem(item:Object):Object {
            return list.removeItem(item);
        }

        /**
         * 移除指定索引的数据项。
         */
        public function removeItemAt(index:uint):void {
            list.removeItemAt(index);
            invalidate(Invalidation.DATA);
        }

        /**
         * 获取指定索引的数据项。
         */
        public function getItemAt(index:uint):Object {
            return list.getItemAt(index);
        }

        /**
         * 替换指定索引的数据项。
         */
        public function replaceItemAt(item:Object, index:uint):Object {
            return list.replaceItemAt(item, index);
        }

        /**
         * 排序。
         */
        public function sortItems(...sortArgs:Array):* {
            return list.sortItems.apply(list, sortArgs);
        }

        /**
         * 字段排序。
         */
        public function sortItemsOn(field:String,options:Object = null):* {
            return list.sortItemsOn(field, options);
        }

        /**
         * 打开下来列表。
         */
        public function open():void {
            if (isOpen || length == 0) { 
                return; 
            }

            isOpen = true;

            // 延时一帧的策略。暂不使用。
            //            addEventListener(Event.ENTER_FRAME, addCloseListener, false, 0, true);
            if(stage){
                stage.addEventListener(MouseEvent.MOUSE_DOWN, onStageClick, false, 0, true);       
                adjustListPosition();
                list.scrollToSelected();
                stage.addChild(list);
            }
            
            dispatchEvent(new Event(Event.OPEN));
        }

        /**
         * 关闭下拉列表。
         */
        public function close():void {
            if (!isOpen) { 
                return; 
            }
            
            if(stage){
                stage.removeEventListener(MouseEvent.MOUSE_DOWN, onStageClick);
                isOpen = false;
                if(stage.contains(list))
                    stage.removeChild(list);
            }
            
            dispatchEvent(new Event(Event.CLOSE));
        }

        /**
         * @private
         */
        override protected function initUI():void {
            super.initUI();
            
            setSize(100, 22);
            
            background = new Button();
            background.addEventListener(MouseEvent.MOUSE_DOWN, onToggleListVisibility, false, 0, true);
            addChild(background);
            
            textField = new TextField();
            addChild(textField);
            textField.mouseEnabled = false;

            list = new List();
            list.dataProvider.addEventListener(DataChangeEvent.DATA_CHANGE, handleDataChange, false, 0, true);
            list.addEventListener(Event.CHANGE, onListChange, false, 0, true);
            list.addEventListener(ListEvent.ITEM_CLICK, onListChange, false, 0, true);
            list.addEventListener(ListEvent.ITEM_ROLL_OUT, passEvent, false, 0, true);
            list.addEventListener(ListEvent.ITEM_ROLL_OVER, passEvent, false, 0, true);
            list.scrollPane.vScrollBar.addEventListener(Event.SCROLL, passEvent, false, 0, true);
        }

        /**
         * @private
         */
        protected function handleDataChange(event:DataChangeEvent):void {
            //fix selectedIndex
            var si:int = selectedIndex;
            if(dataProvider.length == 0) {
                si = Math.max(-1, Math.min(si, length - 1));
            }else {
                si = Math.max(0, Math.min(si, length - 1)); 
            }
            if (list.selectedIndex != si) {
                list.selectedIndex = si;
                invalidate(Invalidation.SELECTED, false);
            }
            
            invalidate(Invalidation.DATA);
        }

        /**
         * @private
         */
        override protected function draw():void {
        	
            if (isInvalid(Invalidation.STYLES)) {
                invalidate(Invalidation.SIZE, false);
                
                //背景换肤
                var skin:* = getSkinInstance(getStyleValue("skin"));
                background.setStyle("skin", skin);
            }
            if (isInvalid(Invalidation.SIZE, Invalidation.DATA, Invalidation.STATE)) {
                drawTextFormat();
                drawLayout();
                invalidate(Invalidation.DATA);
            }
            if (isInvalid(Invalidation.DATA)) {
                drawList();
                invalidate(Invalidation.SELECTED, true);
            }
            if (isInvalid(Invalidation.SELECTED)) {
                if (selectedIndex == -1) {
                	textField.text = "";
            	}else {
                    textField.text = list.selectedItem.label;
                }
            }
            
            super.draw();
        }

        /**
         * @private
         */
        protected function drawLayout():void {
            var buttonWidth:Number = getStyleValue("buttonWidth") as Number;
            var textPadding:Number = getStyleValue("textPadding") as Number;
            background.setSize(_width, _height);
            textField.x = textField.y = textPadding;
            textField.width = _width - buttonWidth - textPadding;
            textField.height = _height - textPadding;
            
            list.width = (isNaN(_dropdownWidth)) ? _width : _dropdownWidth;
            
            background.enabled = enabled;
            background.drawNow();
        }

        /**
         * @private
         */
        protected function drawTextFormat():void {
            var tf:TextFormat = getStyleValue(_enabled ? "textFormat" : "disabledTextFormat") as TextFormat;
            if (tf == null) { 
                tf = new TextFormat(); 
            }
            textField.defaultTextFormat = tf;
            textField.setTextFormat(tf);
        }

        /**
         * @private
         */
        protected function drawList():void {
            list.rowCount = Math.max(0, Math.min(_rowCount, list.dataProvider.length));
        }

        /**
         * @private
         */
        protected function adjustListPosition():void {
            var p:Point = localToGlobal(new Point(0, 0));
            list.x = p.x;
            if (p.y + height + list.height > stage.stageHeight) {
                list.y = p.y - list.height;
            } else {
                list.y = p.y + height;
            }
        }

        /**
         * @private
         */
        protected function onToggleListVisibility(event:MouseEvent):void {
            event.stopPropagation();
            dispatchEvent(event);
            if (isOpen) {
                close();
            } else {
                open();
                stage.addEventListener(MouseEvent.MOUSE_UP, onListItemUp, false, 0, true);
            }
        }

        /**
         * @private
         */
        protected function onListItemUp(event:MouseEvent):void {
            stage.removeEventListener(MouseEvent.MOUSE_UP, onListItemUp);
            if (!(event.target is IListCell ) || !list.contains(event.target as DisplayObject)) {
                return;
            }
            
            var startIndex:int = selectedIndex;
            selectedIndex = event.target.listData.index;
            
            if (startIndex != selectedIndex) {
                dispatchEvent(new Event(Event.CHANGE));
            }
            
            close();            
        }

        /**
         * @private
         */
        protected function onListChange(event:Event):void {
            dispatchEvent(event);
            invalidate(Invalidation.SELECTED);
            close();
        }

        /**
         * @private
         */
        protected function onStageClick(event:MouseEvent):void {
            if (!isOpen) { 
                return; 
            }
            if (!contains(event.target as DisplayObject) && !list.contains(event.target as DisplayObject)) {
                close();
            }
        }

        /**
         * @private
         */
        protected function passEvent(event:Event):void {
            dispatchEvent(event);
        }

        /**
         * @private
         */
//        private function addCloseListener(event:Event):void {
//            removeEventListener(Event.ENTER_FRAME, addCloseListener);
//            if (!isOpen) { 
//                return; 
//            }
//            stage.addEventListener(MouseEvent.MOUSE_DOWN, onStageClick, false, 0, true);
//        }
    }
}