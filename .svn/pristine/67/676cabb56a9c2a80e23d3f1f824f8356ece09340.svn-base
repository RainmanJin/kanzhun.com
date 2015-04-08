package baidu.ui.controls {
    import flash.events.Event;
    import flash.events.EventDispatcher;    

    /**
     * 当选择发生变化时，派发此事件。
     */
    [Event(name="change", type="flash.events.Event")]

    /**
     * 单选框 组。
     * 本类的模式很特殊。
     * <li>它是一个“管理器群”。</li>
     * <li>它有点像“单例模式”，却有数个实例。</li>
     */
    public class RadioButtonGroup extends EventDispatcher {
        //所有的组
        private static var groups:Object;
        //计数
        private static var groupCount:uint = 0;

        /**
         * 获取一个指定名称的组。
         */
        public static function getGroup(name:String):RadioButtonGroup {
            if (groups == null) { 
                groups = {}; 
            }
            var group:RadioButtonGroup = groups[name] as RadioButtonGroup;
            if (group == null) {
                group = new RadioButtonGroup(name);
                // 清除老的 group
                if ((++groupCount) % 20 == 0) {
                    cleanUpGroups();
                }
            }
            return group;
        }

        /**
         * 注册一个组。
         */
        private static function registerGroup(group:RadioButtonGroup):void {
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
                var group:RadioButtonGroup = groups[n] as RadioButtonGroup;
                if (group.radioButtons.length == 0) {
                    delete(groups[n]);
                }
            }
        }

        protected var _name:String;

        protected var radioButtons:Array;

        protected var _selection:RadioButton;

        /**
         * 构造函数。
         */
        public function RadioButtonGroup(name:String) {
            _name = name;
            radioButtons = [];
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
        public function addRadioButton(radioButton:RadioButton):void {
            if (radioButton.groupName != name) {
                radioButton.groupName = name;
                return;
            }
            radioButtons.push(radioButton);
            if (radioButton.selected) { 
                selection = radioButton; 
            }
        }

        /**
         * 删除单选按钮。
         */
        public function removeRadioButton(radioButton:RadioButton):void {
            var i:int = getRadioButtonIndex(radioButton);
            if (i != -1) {
                radioButtons.splice(i, 1);
            }
            if (_selection == radioButton) { 
                _selection = null; 
            }
        }

        /**
         * 获取选择的实例。
         */
        public function get selection():RadioButton {
            return _selection;
        }

        /**
         * 设置选择的实例。
         */
        public function set selection(value:RadioButton):void {
            if (_selection == value || value == null || getRadioButtonIndex(value) == -1) { 
                return; 
            }
            _selection = value;
            dispatchEvent(new Event(Event.CHANGE, true));
        }

        /**
         * 获取选择的数据。
         */
        public function get selectedData():Object {
            var s:RadioButton = _selection;
            return (s == null) ? null : s.value;
        }

        /**
         * 设置选择的数据。
         */
        public function set selectedData(value:Object):void {
            for (var i:int = 0;i < radioButtons.length; i++) {
                var rb:RadioButton = radioButtons[i] as RadioButton;
                if (rb.value == value) {
                    selection = rb;
                    return;
                }
            }
        }

        /**
         * 获取选择的单选按钮的索引。
         */
        public function getRadioButtonIndex(radioButton:RadioButton):int {
            for (var i:int = 0;i < radioButtons.length; i++) {
                var rb:RadioButton = radioButtons[i] as RadioButton;
                if(rb == radioButton) {
                    return i;
                }
            }
            return -1;
        }

        /**
         * 获取指定索引的单选按钮。
         */
        public function getRadioButtonAt(index:int):RadioButton {
            return RadioButton(radioButtons[index]);
        }

        /**
         * 获取单选按钮的个数。
         */
        public function get numRadioButtons():int {
            return radioButtons.length;
        }
    }
}
