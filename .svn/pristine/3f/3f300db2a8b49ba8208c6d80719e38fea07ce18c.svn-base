package baidu.ui.controls {
    import flash.display.DisplayObject;
    import flash.display.Sprite;
    import flash.events.Event;
    import flash.events.MouseEvent;
    import flash.utils.Dictionary;
    
    import baidu.ui.constants.ScrollPolicy;
    import baidu.ui.containers.ScrollPane;
    import baidu.ui.controls.ListBase;
    import baidu.ui.controls.list.IListCell;
    import baidu.ui.controls.list.ListData;
    import baidu.ui.core.BUI;
    import baidu.ui.core.Invalidation;
    import baidu.ui.data.DataProvider;
    import baidu.ui.events.ScrollEvent;
    import baidu.ui.managers.InstanceManager;    

    /**
     * 样式，皮肤。
     */
    [Style(name="skin", type="Class")]
    
    /**
     * 列表。
     * @author yaowei
     */
    public class List extends ListBase {

        /**
         * 默认样式。
         */
        public static var defaultStyles:Object = {
        };

        /**
         * @private
         * 行高。
         */
        protected var _rowHeight:Number = 20;

        /**
         * @private
         * 当前使用的渲染器。
         */
        protected var _cellRenderer:Object;

        /**
         * @private
         * 滑动窗。
         */
        protected var _scrollPane:ScrollPane;

        /**
         * 构造函数。
         */
        public function List() {
            super();
        }

        /**
         * @private
         */
        override public function get classStyles():Object {
            return mergeStyles(super.classStyles, defaultStyles);
        }

        /**
         * @private
         */
        override public function set enabled(value:Boolean):void {
            super.enabled = value;
            _scrollPane.enabled = value;
            container.mouseChildren = _enabled;
        }

        /**
         * 获取 滑动窗。
         */
        public function get scrollPane():ScrollPane {
            return _scrollPane;
        }

        /**
         * 获取/设置 行高。
         */
        public function get rowHeight():Number {
            return _rowHeight;
        }

        public function set rowHeight(value:Number):void {
            _rowHeight = value;
            invalidate(Invalidation.SIZE);
        }

        /**
         * 获取/设置 行数。
         */
        public function get rowCount():uint {
            return Math.ceil(_scrollPane.height / rowHeight);
        }

        public function set rowCount(value:uint):void {
            var padding:Number = Number(_scrollPane.getStyle("padding"));
            height = rowHeight * value + 2 * padding;
        }

        /**
         * @private
         */
        override protected function initUI():void {
            super.initUI();
            setSize(100, 100);
        	
            _scrollPane = new ScrollPane();
            addChild(_scrollPane);
            _scrollPane.hScrollPolicy = ScrollPolicy.OFF;
            _scrollPane.vScrollPolicy = ScrollPolicy.AUTO;
            
            //将 container 作为 scrollPane 的内容。
            container = new Sprite();
            _scrollPane.content = container;
            
            //监听 scrollPane 的垂直滚动条的滚动。
            _scrollPane.vScrollBar.addEventListener(ScrollEvent.SCROLL, handleScroll, false, 0, true);
        }

        /**
         * @private
         */
        protected function handleScroll(event:ScrollEvent):void {
            invalidate(Invalidation.SCROLL);
        }

        /**
         * @private
         */
        override protected function draw():void {
            var contentHeightChanged:Boolean = (_scrollPane.contentHeight != rowHeight * length);
            _scrollPane.contentHeight = rowHeight * length;
            _scrollPane.invalidate();
            _scrollPane.drawNow();
        	
            if (isInvalid(Invalidation.STYLES)) {
                // 渲染器的改变比较消耗资源。增加一重验证。
                if (_cellRenderer != getStyleValue("renderer")) {
                    _invalidateList();
                    _cellRenderer = getStyleValue("renderer");
                }
            }
            
            if (isInvalid(Invalidation.SIZE, Invalidation.STATE) || contentHeightChanged) {
                drawLayout();
                _scrollPane.drawNow();
            }
            
            if (isInvalid(Invalidation.RENDERER_STYLES)) {
                updateRendererStyles(); 
            }
            
            if (isInvalid(Invalidation.STYLES, Invalidation.SIZE, Invalidation.DATA, Invalidation.SCROLL, Invalidation.SELECTED)) {
                drawList();
            }
            
            validate();
        }

        /**
         * @private
         */
        override protected function drawList():void {
        	
            //计算需要显示的数据项的起始和结束索引。
            var startIndex:uint = Math.floor(_scrollPane.vScrollPosition / rowHeight);
            var endIndex:uint = Math.min(length, startIndex + rowCount + 1);
            
            //遍历操作需要的变量
            var i:int;
            var item:*;
            var cell:IListCell;
            
            //记录需要被显示的 数据项
            var itemHash:Dictionary = renderedItems = new Dictionary(true);
            for (i = startIndex;i < endIndex; i++) {
                itemHash[_dataProvider.getItemAt(i)] = true;
            }
            
            //遍历当前正在显示的cell，将其分为2类。
            //第1类为，数据项不再需要显示，该cell可以用回收用来显示别的数据项。
            //第2类为，数据项仍然需要显示，该cell还需要显示，只是外观失效了。
            
            //记录item到cell的映射关系
            var itemToRendererHash:Dictionary = new Dictionary(true);
            
            while (activeCells.length > 0) {
                cell = activeCells.pop() as IListCell;
                item = cell.data;
                if (itemHash[item] == null || invalidItems[item] == true) {
                    availableCells.push(cell);
                } else {
                    itemToRendererHash[item] = cell;
                    // prevent problems with duplicate objects:
                    invalidItems[item] = true;
                }
                container.removeChild(cell as DisplayObject);
            }
            invalidItems = new Dictionary(true);
            
            //显示cell
            for (i = startIndex;i < endIndex; i++) {
                var reused:Boolean = false;
                item = _dataProvider.getItemAt(i);
                if (itemToRendererHash[item] != null) {
                    // 存在与该数据项对应的cell

                    reused = true;
                    cell = itemToRendererHash[item];
                    // 被使用了之后，要立即删除。看起来不必要，但是有可能有2个item指向的是同一个对象，由此行可以避开这个bug。
                    delete(itemToRendererHash[item]);
                } else if (availableCells.length > 0) {
                    
                    // 不存在与该数据项对应的cell，但是存在有空闲的cell
                    cell = availableCells.pop() as IListCell;
                } else {
                    
                    // 既没有对应的cell，也没有空闲的cell，就需要构造新的cell
                    cell = InstanceManager.createInstance(getStyleValue("renderer")) as IListCell;
                    var rendererSprite:Sprite = cell as Sprite;
                    if (rendererSprite != null) {
                        // 注册事件侦听器
                        rendererSprite.addEventListener(MouseEvent.CLICK, handleCellClick, false, 0, true);
                        rendererSprite.addEventListener(MouseEvent.ROLL_OVER, handleCellRendererMouseEvent, false, 0, true);
                        rendererSprite.addEventListener(MouseEvent.ROLL_OUT, handleCellRendererMouseEvent, false, 0, true);
                        rendererSprite.addEventListener(Event.CHANGE, handleCellChange, false, 0, true);
                        rendererSprite.doubleClickEnabled = true;
                        rendererSprite.addEventListener(MouseEvent.DOUBLE_CLICK, handleCellDoubleClick, false, 0, true);
                        
                        // 设置样式。
                        if (rendererSprite["setStyle"] != null) {
                            for (var n:String in rendererStyles) {
                                rendererSprite["setStyle"](n, rendererStyles[n]);
                            }
                        }
                    }
                }
                
                //添加到容器，并用 activeCellRenderers 进行记录。
                container.addChild(cell as Sprite);
                activeCells.push(cell);
                
                //(cell as BUI).y = rowHeight*(i-startIndex);
                (cell as BUI).y = rowHeight * i;
                (cell as BUI).setSize(_scrollPane.availableWidth, rowHeight);
                
                //如果不是重用的原来的cell，需要重新设置项目数据。
                if (!reused) {
                    cell.data = item;
                }
                
                //更新列表相关数据和选中状态
                cell.listData = new ListData({index:i, owner:this});
                cell.selected = (_selectedIndices.indexOf(i) != -1);
                
                //如果cell是BUI，那么立即重绘，因为当前的执行环境（正在进行render事件处理）中，render事件不会被触发的。
                if (cell is BUI) {
                    (cell as BUI).drawNow();
                }
            }
        }

        /**
         * @private
         */
        override protected function drawLayout():void {
            _scrollPane.setSize(_width, _height);
        }

        /**
         * @private
         */
        override public function scrollToIndex(index:int):void {
            drawNow();
            
            var lastVisibleItemIndex:uint = Math.floor((_scrollPane.vScrollPosition + _scrollPane.availableHeight) / rowHeight) - 1;
            var firstVisibleItemIndex:uint = Math.ceil(_scrollPane.vScrollPosition / rowHeight);
            if(index < firstVisibleItemIndex) {
                _scrollPane.vScrollPosition = index * rowHeight;
            } else if(index > lastVisibleItemIndex) {
                _scrollPane.vScrollPosition = (index + 1) * rowHeight - _scrollPane.availableHeight;
            }
        }
    }
}
