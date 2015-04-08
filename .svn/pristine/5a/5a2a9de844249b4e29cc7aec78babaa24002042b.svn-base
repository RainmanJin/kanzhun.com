package baidu.ui.controls {
    import flash.display.DisplayObject;
    import flash.display.Sprite;
    import flash.events.Event;
    import flash.events.MouseEvent;
    import flash.utils.Dictionary;
    
    import baidu.ui.controls.list.IListCell;
    import baidu.ui.controls.list.ListCell;
    import baidu.ui.core.BUI;
    import baidu.ui.core.Invalidation;
    import baidu.ui.data.DataProvider;
    import baidu.ui.events.DataChangeEvent;
    import baidu.ui.events.DataChangeType;
    import baidu.ui.events.ListEvent;    

    /**
     * 滑出数据项。
     */
    [Event(name="itemRollOut", type="baidu.ui.events.ListEvent")]
    
    /**
     * 滑入数据项。
     */
    [Event(name="itemRollOver", type="baidu.ui.events.ListEvent")]
    
    /**
     * 单击数据项。
     */
    [Event(name="itemClick", type="baidu.ui.events.ListEvent")]
    
    /**
     * 双击数据项。
     */
    [Event(name="itemDoubleClick", type="baidu.ui.events.ListEvent")]
    
    /**
     * 列表变化。
     */
    [Event(name="change", type="flash.events.Event")]
    
    /**
     * 样式，渲染器。
     */
    [Style(name="cellRenderer", type="Class")]

    /**
     * 列表基础类。不可实例化。
     * @author yaowei
     */
    public class ListBase extends BUI {

        /**
         * @private
         * 被选择的索引。
         */
        protected var _selectedIndices:Array = [];

        /**
         * @private
         * 可选的。
         */
        protected var _selectable:Boolean = true;

        /**
         * @private
         * 是否多选。
         */
        protected var _multiple:Boolean = false;

        /**
         * @private
         * 数据提供器。
         */
        protected var _dataProvider:DataProvider;

        /**
         * @private
         * 渲染器的样式。
         */
        protected var rendererStyles:Object = {};

        /**
         * @private
         * 需要更新的渲染器的样式。
         */
        protected var updatedRendererStyles:Object = {};

        /**
         * @private
         * 用于在改变数据项之前，记录一些数据项。
         */
        protected var preChangeItems:Array = [];

        /**
         * @private
         * 当前选中索引。
         */
        protected var caretIndex:int = -1;

        /**
         * @private
         * 上次选中索引。
         */
        protected var lastCaretIndex:int = -1;

        /**
         * @private
         * 添加到容器中的cell。
         */
        protected var activeCells:Array = [];

        /**
         * @private
         * 可以重复利用的cell。
         */
        protected var availableCells:Array = [];

        /**
         * @private
         * 被显示的数据项。
         */
        protected var renderedItems:Dictionary = new Dictionary(true);

        /**
         * @private
         * 失效的数据项。
         */
        protected var invalidItems:Dictionary = new Dictionary(true);

        /**
         * @private
         * 容器。
         */
        protected var container:Sprite;

        /**
         * 默认样式。
         */
        public static var defaultStyles:Object = {
        	renderer:ListCell, gap:0
        };

        /**
         * 构造函数。
         */
        public function ListBase() {
            super();
            if (dataProvider == null) { 
                dataProvider = new DataProvider(); 
            }
        }

        /**
         * @private
         */
        override public function get classStyles():Object {
            return mergeStyles(super.classStyles, defaultStyles);
        }
        
        /**
         * 获取/设置 渲染器。<br/>
         * getStyle("renderer")和setStyle("renderer", value)的快捷方式。
         */
        public function get renderer():*{
            return getStyle("renderer");
        }
        
        public function set renderer(value:*):void{
        	setStyle("renderer", value);
        }

        /**
         * 获取/设置 数据提供器。
         */
        public function get dataProvider():DataProvider {
            return _dataProvider;
        }

        public function set dataProvider(value:DataProvider):void {
            if (_dataProvider != null) {
                _dataProvider.removeEventListener(DataChangeEvent.DATA_CHANGE, handleDataChange);
                _dataProvider.removeEventListener(DataChangeEvent.PRE_DATA_CHANGE, handlePreDataChange);
            }
            _dataProvider = value;
            _dataProvider.addEventListener(DataChangeEvent.DATA_CHANGE, handleDataChange, false, 0, true);
            _dataProvider.addEventListener(DataChangeEvent.PRE_DATA_CHANGE, handlePreDataChange, false, 0, true);
        }

        /**
         * 获取列表长度。
         */
        public function get length():uint {
            return _dataProvider.length;
        }

        /**
         * 获取/设置 多选。
         */
        public function get multiple():Boolean {
            return _multiple;
        }

        public function set multiple(value:Boolean):void {
            if (value == _multiple) { 
                return; 
            }
            _multiple = value;
            
            //从多选切换到单选时，只保留最后一个选中的索引。
            if (!value && _selectedIndices.length > 1) {
                _selectedIndices = [_selectedIndices.pop()];
                invalidate(Invalidation.DATA);
            }
        }

        /**
         * 获取/设置 列表是否可选。
         */
        public function get selectable():Boolean {
            return _selectable;
        }

        public function set selectable(value:Boolean):void {
            if (value == _selectable) { 
                return; 
            }
            
            //从可选切换到不可选时，清除所有的选中索引。
            if (!value) { 
                selectedIndices = []; 
            }
            
            _selectable = value;
        }

        /**
         * 获取/设置 当前选中的索引。
         */
        public function get selectedIndex():int {
            return (_selectedIndices.length == 0) ? -1 : _selectedIndices[_selectedIndices.length - 1];
        }

        public function set selectedIndex(value:int):void {
            selectedIndices = (value == -1) ? null : [value];
        }

        /**
         * 获取/设置 当前选中的多个索引。
         */
        public function set selectedIndices(value:Array):void {
            if (!_selectable) { 
                return; 
            }
            _selectedIndices = (value == null) ? [] : value.concat();
            
            if (!_multiple && _selectedIndices.length > 1) {
                _selectedIndices = [_selectedIndices.pop()];
            }
            
            invalidate(Invalidation.SELECTED);
        }

        public function get selectedIndices():Array {
            return _selectedIndices.concat();
        }

        /**
         * 获取/设置 当前选中的数据项。
         */
        public function get selectedItem():Object {
            return (_selectedIndices.length == 0) ? null : _dataProvider.getItemAt(selectedIndex);
        }

        public function set selectedItem(value:Object):void {
            var index:int = _dataProvider.getItemIndex(value);
            selectedIndex = index;
        }

        /**
         * 获取/设置 当前选中的多个数据项。
         */
        public function get selectedItems():Array {
            var items:Array = [];
            for (var i:uint = 0;i < _selectedIndices.length; i++) {
                items.push(_dataProvider.getItemAt(_selectedIndices[i]));
            }
            return items;
        }

        public function set selectedItems(value:Array):void {
            if (value == null) {
                selectedIndices = null;
                return;
            }
            var indices:Array = [];
            for (var i:uint = 0;i < value.length; i++) {
                var index:int = _dataProvider.getItemIndex(value[i]);
                if (index != -1) {
                    indices.push(index);
                }
            }
            selectedIndices = indices;
        }

        /**
         * 查询指定数据的渲染器。
         */
        public function itemToCell(item:Object):IListCell {
            if(item != null) {
                for(var index:String in activeCells) {
                    var renderer:IListCell = activeCells[index] as IListCell;
                    if(renderer.data == item) {
                        return renderer;
                    }
                }
            }
            return null;
        }

        /**
         * 清除选中。
         */
        public function clearSelection():void {
            selectedIndex = -1;
        }

        /**
         * 添加数据项。
         */
        public function addItem(item:Object):void {
            _dataProvider.addItem(item);
            invalidateList();
        }

        /**
         * 在指定索引添加数据项。
         */
        public function addItemAt(item:Object,index:uint):void {
            _dataProvider.addItemAt(item, index);
            invalidateList();
        }

        /**
         * 移除全部的数据项。
         */
        public function removeAll():void {
            _dataProvider.removeAll();
        }

        /**
         * 获取指定索引的数据项。
         */
        public function getItemAt(index:uint):Object {
            return _dataProvider.getItemAt(index);
        }

        /**
         * 移除指定的数据项。
         */
        public function removeItem(item:Object):Object {
            return _dataProvider.removeItem(item);
        }

        /**
         * 移除指定索引的数据项。
         */
        public function removeItemAt(index:uint):Object {
            return _dataProvider.removeItemAt(index);
        }

        /**
         * 替换指定索引的数据项。
         */
        public function replaceItemAt(item:Object, index:uint):Object {
            return _dataProvider.replaceItemAt(item, index);
        }

        /**
         * 排序。
         */
        public function sortItems(...sortArgs:Array):* {
            return _dataProvider.sort.apply(_dataProvider, sortArgs);
        }

        /**
         * 字段排序。
         */
        public function sortItemsOn(field:String,options:Object = null):* {
            return _dataProvider.sortOn(field, options);
        }

        /**
         * 判断指定的数据项是否被选中。
         */
        public function isItemSelected(item:Object):Boolean {
            return selectedItems.indexOf(item) > -1;
        }

        /**
         * 滚动到选中的数据项。
         */
        public function scrollToSelected():void {
            scrollToIndex(selectedIndex);
        }

        /**
         * 滚动到指定的索引。
         */
        public function scrollToIndex(newCaretIndex:int):void {
            //在子类中实现。
        }

        /**
         * 获取渲染器样式。
         */
        public function getRendererStyle(name:String, column:int = -1):Object {
            return rendererStyles[name];    
        }

        /**
         * 设置渲染器样式。
         */
        public function setRendererStyle(name:String, style:Object, column:uint = 0):void {
            if (rendererStyles[name] == style) { 
                return; 
            }
            updatedRendererStyles[name] = style;
            rendererStyles[name] = style;
            invalidate(Invalidation.RENDERER_STYLES);
        }

        /**
         * 清除渲染器样式。
         */
        public function clearRendererStyle(name:String, column:int = -1):void {
            delete rendererStyles[name];
            //不能删除此字段，需要用它来清除渲染器的样式。
            updatedRendererStyles[name] = null;
            invalidate(Invalidation.RENDERER_STYLES);
        }

        /**
         * @private
         */
        override protected function initUI():void {
            super.initUI();
        }

        /**
         * @private
         */
        override protected function draw():void {
            super.draw();
            //子类覆盖
        }

        /**
         * @private
         */
        protected function drawList():void {
        	//子类实现
        }

        /**
         * @private
         */
        protected function drawLayout():void {
        	//子类实现
        }

        /**
         * 整个列表失效。强制所有的cell重绘。
         */
        public function invalidateList():void {
            _invalidateList();
            invalidate(Invalidation.DATA);
        }

        /**
         * @private
         */
        protected function _invalidateList():void {
            //将可回收利用的cell清空。
            availableCells = [];
            
            //清空容器中的cell。
            while (activeCells.length > 0) {
                container.removeChild(activeCells.pop() as DisplayObject);
            }
        }

        /**
         * 让一个指定的数据项失效。
         */
        public function invalidateItem(item:Object):void {
            if (renderedItems[item] == null) { 
                return;
            }
            invalidItems[item] = true;
            invalidate(Invalidation.DATA);
        }

        /**
         * 让一个指定索引的数据项失效。
         */
        public function invalidateItemAt(index:uint):void {
            var item:Object = _dataProvider.getItemAt(index);
            if (item != null) {
                invalidateItem(item);
            }
        }

        /**
         * @private
         * 处理数据变化。
         */
        protected function handleDataChange(event:DataChangeEvent):void {
            var startIndex:int = event.startIndex;
            var endIndex:int = event.endIndex;
            var changeType:String = event.changeType;
            var i:uint;
            
            //分7种情况，更新选中数据。
            switch(changeType) {
                case DataChangeType.ADD:
                    //当添加数据：如果选中的索引号，处在添加数据项的起始索引的后面，
                    //那么全部要增加startIndex - endIndex + 1
                    for (i = 0;i < _selectedIndices.length; i++) {
                        if (_selectedIndices[i] >= startIndex) {
                            _selectedIndices[i] += startIndex - endIndex + 1;
                        }
                    }
                    break;
                case DataChangeType.INVALIDATE:
                    for (i = 0;i < event.items.length; i++) {
                        invalidateItem(event.items[i]);
                    }
                    break;
                case DataChangeType.INVALIDATE_ALL:
                    clearSelection();
                    invalidateList();
                    break;
                case DataChangeType.REMOVE:
                    for (i = 0;i < _selectedIndices.length; i++) {
                        if (_selectedIndices[i] >= startIndex) {
                            if (_selectedIndices[i] <= endIndex) {
                                delete(_selectedIndices[i]);
                            } else {
                                _selectedIndices[i] -= startIndex - endIndex + 1;
                            }
                        }
                    }
                    break;
                case DataChangeType.REMOVE_ALL:
                    clearSelection();
                    break;
                case DataChangeType.REPLACE:
                    // 什么也不需要做。
                    break;
                case DataChangeType.SORT:
                    // 排序后，要恢复原来的选中状态。
                    selectedItems = preChangeItems;
                    preChangeItems = null;
                    break;
            }
            invalidate(Invalidation.DATA);
        }

        /**
         * @private
         * 处理数据"预"变化。
         */
        protected function handlePreDataChange(event:DataChangeEvent):void {
            switch (event.changeType) {
                case DataChangeType.ADD:
                case DataChangeType.INVALIDATE:
                case DataChangeType.INVALIDATE_ALL:
                case DataChangeType.REMOVE:
                case DataChangeType.REMOVE_ALL:
                case DataChangeType.REPLACE:
                    break;
                default:
                    //排序之前，要把当前列表选中的数据项都记录下来。
                    preChangeItems = selectedItems; 
                    break;
            }
        }

        /**
         * @private
         * 处理cell的鼠标事件，包括rollOver和rollOut。
         */
        protected function handleCellRendererMouseEvent(event:MouseEvent):void {
            var renderer:IListCell = event.target as IListCell;
            var evtType:String = (event.type == MouseEvent.ROLL_OVER) ? ListEvent.ITEM_ROLL_OVER : ListEvent.ITEM_ROLL_OUT;
            dispatchEvent(new ListEvent(evtType, false, false, renderer.listData.col, renderer.listData.row, renderer.listData.index, renderer.data));
        }

        /**
         * @private
         */
        protected function handleCellChange(event:Event):void {
            var renderer:IListCell = event.currentTarget as IListCell;
            var itemIndex:uint = renderer.listData.index;
            _dataProvider.invalidateItemAt(itemIndex);
        }

        /**
         * @private
         */
        protected function handleCellClick(event:MouseEvent):void {
            if (!_enabled) { 
                return; 
            }
            var renderer:IListCell = event.currentTarget as IListCell;
            var itemIndex:uint = renderer.listData.index;
            // this event is cancellable:
            if (!dispatchEvent(new ListEvent(ListEvent.ITEM_CLICK, false, true, renderer.listData.col, renderer.listData.row, itemIndex, renderer.data)) || !_selectable) { 
                return; 
            }
            var selectIndex:int = selectedIndices.indexOf(itemIndex);
            var i:int;
            if (!_multiple) {
                if (selectIndex != -1) {
                    return;
                } else {
                    renderer.selected = true;
                    _selectedIndices = [itemIndex];
                }
                lastCaretIndex = caretIndex = itemIndex;
            } else {
                if (event.shiftKey) {
                    var oldIndex:uint = (_selectedIndices.length > 0) ? _selectedIndices[0] : itemIndex;
                    _selectedIndices = [];
                    if (oldIndex > itemIndex) {
                        for (i = oldIndex;i >= itemIndex; i--) {
                            _selectedIndices.push(i);
                        }
                    } else {
                        for (i = oldIndex;i <= itemIndex; i++) {
                            _selectedIndices.push(i);
                        }
                    }
                    caretIndex = itemIndex;
                } else if (event.ctrlKey) {
                    if (selectIndex != -1) {
                        renderer.selected = false;
                        _selectedIndices.splice(selectIndex, 1);
                    } else {
                        renderer.selected = true;
                        _selectedIndices.push(itemIndex);
                    }
                    caretIndex = itemIndex;
                } else {
                    _selectedIndices = [itemIndex];
                    lastCaretIndex = caretIndex = itemIndex;
                }
            }
            dispatchEvent(new Event(Event.CHANGE));
            invalidate(Invalidation.DATA);
        }

        /**
         * @private
         */
        protected function handleCellDoubleClick(event:MouseEvent):void {
            if (!_enabled) { 
                return; 
            }
            var renderer:IListCell = event.currentTarget as IListCell;
            var itemIndex:uint = renderer.listData.index;
            dispatchEvent(new ListEvent(ListEvent.ITEM_DOUBLE_CLICK, false, true, renderer.listData.col, renderer.listData.row, itemIndex, renderer.data));        
        }

        /**
         * @private
         */
        protected function updateRendererStyles():void {
            var renderers:Array = availableCells.concat(activeCells);
            var l:uint = renderers.length;
            for (var i:uint = 0;i < l; i++) {
                if (renderers[i].setStyle == null) { 
                    continue; 
                }
                for (var n:String in updatedRendererStyles) {
                    renderers[i].setStyle(n, updatedRendererStyles[n]);
                }
                renderers[i].drawNow();
            }
            updatedRendererStyles = {};
        }
    }
}
