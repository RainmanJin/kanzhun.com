package baidu.ui.controls.list {
    import flash.events.MouseEvent;
    
    import baidu.ui.controls.LabelButton;        

    /**
     * 列表元素。BUI的使用者可以定义自己的列表元素，只需要继承 IListCell 就可以了。
     * @author yaowei
     */
    public class ListCell extends LabelButton implements IListCell {

        /**
         * @private
         */
        public static var defaultStyles:Object = {skin:"ListCell_Skin", iconSkin:null};

        /**
         * @private
         */
        protected var _data:*;

        /**
         * @private
         */
        protected var _listData:ListData;

        public function ListCell() {
            super();
            toggle = true;
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
        override protected function toggleSelected(event:MouseEvent):void {
            //干掉 LabelButton 的自动切换功能。
        }

        /**
         * 获取/设置 数据。
         */
        public function get data():* {
            return _data;
        }

        public function set data(value:*):void {
            _data = value;
            //每个 cell 可按照自己的约定去访问 _data，这是ListCell的约定。
            label = _data.label;
            icon = _data.icon;
        }

        /**
         * 获取/设置 列表数据。
         */
        public function get listData():ListData {
            return _listData;
        }

        
        public function set listData(value:ListData):void {
            _listData = value;
        }
        
        //让文本左对齐 add at 20090803
        override protected function drawLayout():void {
            var padding:Number = Number(getStyleValue("padding"));
            var textFieldX:Number = 0;
            
            if (_icon != null) {
                _icon.x = padding;
                _icon.y = Math.round((_height-_icon.height)/2);
                textFieldX = _icon.width + padding;
            }
            
            if (label.length > 0) {
                textField.visible = true;
                var textWidth:Number =  Math.max(0, _width - textFieldX - padding*2);
                textField.width = textWidth;
                textField.height = textField.textHeight + 4;
                textField.x = textFieldX + padding;
                textField.y = Math.round((_height - textField.height)/2);
            } else {
                textField.visible = false;
            }
            
            background.width = _width;
            background.height = _height;
        }
    }
}
