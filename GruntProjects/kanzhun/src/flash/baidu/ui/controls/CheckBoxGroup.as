package baidu.ui.controls {
    import flash.events.Event;
    import flash.events.EventDispatcher;

    /**
     * 当有成员的 selected 属性发生变化时，派发此事件。
     */
    [Event(name="change", type="flash.events.Event")]

    /**
     * 复选框 组。它和 RadioButtonGroup 有比较大的区别。因为同组的 RadioButton 之间有互斥关系，而同组的 CheckBox 没有这个问题。
     */
    public class CheckBoxGroup extends EventDispatcher {

        //所有的组
        private static var groups:Object;

        //计数
        private static var groupCount:uint = 0;

        /**
         * @private
         * 名字
         */
        protected var _name:String;

        /**
         * @private
         * 组内的按钮。
         */
        protected var checkBoxes:Array;

        /**
         * 获取一个指定名称的组。
         */
        public static function getGroup(name:String):CheckBoxGroup {
            if (groups == null) {
                groups = {}; 
            }
            var group:CheckBoxGroup = groups[name] as CheckBoxGroup;
            if (group == null) {
                group = new CheckBoxGroup(name);
                // 每创建20个RadioButtonGroup，做一次清理，清除那些不用的 group
                if ((++groupCount) % 20 == 0) {
                    cleanUpGroups();
                }
            }
            return group;
        }

        /**
         * 注册一个组。
         */
        private static function registerGroup(group:CheckBoxGroup):void {
            if(groups == null) {
                groups = {};
            }
            groups[group.name] = group;
        }

        /**
         * 整理所有的分组。清除一些不使用的group。
         */
        private static function cleanUpGroups():void {
            for (var n:String in groups) {
                var group:CheckBoxGroup = groups[n] as CheckBoxGroup;
                if (group.checkBoxes.length == 0) {
                    delete(groups[n]);
                }
            }
        }

        /**
         * 构造函数。
         */
        public function CheckBoxGroup(name:String) {
            _name = name;
            checkBoxes = [];
            registerGroup(this);
        }

        /**
         * 获取组名。
         */
        public function get name():String {
            return _name;
        }

        /**
         * 添加单选按钮。
         */
        public function add(checkBox:CheckBox):void {
            if(checkBox.selected) {
                dispatchEvent(new Event(Event.CHANGE));
            }
            checkBox.addEventListener(Event.CHANGE, handleChange);
            
            checkBoxes.push(checkBox);
        }

        /**
         * 删除。
         */
        public function remove(checkBox:CheckBox):void {
            if(checkBox.selected) {
                dispatchEvent(new Event(Event.CHANGE));
            }
            checkBox.removeEventListener(Event.CHANGE, handleChange);
            
            var i:int = checkBoxes.indexOf(checkBox);
            if (i != -1) {
                checkBoxes.splice(i, 1);
            }
        }

        /**
         * @private
         */
        protected function handleChange(event:Event):void {
            dispatchEvent(new Event(Event.CHANGE));
        }

        /**
         * 获取/设置选择的实例。
         */
        public function get selection():Array {
            return checkBoxes.filter(function (element:CheckBox, index:int, arr:Array):Boolean {
                return (element.selected);
            });
        }

        /**
         * 设置选中。
         */
        public function set selection(value:Array):void {
            checkBoxes.forEach(function (element:CheckBox, index:int, arr:Array):void {
                element.selected = false;
            });
            value.forEach(function (element:CheckBox, index:int, arr:Array):void {
                element.selected = true;
            });
        }

        /**
         * 获取/设置选择的数据。
         */
        public function get selectedData():Array {
            return selection.map(function (element:CheckBox, index:int, arr:Array):Object {
                return (element.value);
            });
        }

        public function set selectedData(value:Array):void {
            checkBoxes.forEach(function (element:CheckBox, index:int, arr:Array):void {
                if (element.value == value) {
                    element.selected = true;
                }
            });
        }

        /**
         * 获取单选按钮的个数。
         */
        public function get num():int {
            return checkBoxes.length;
        }
    }
}
