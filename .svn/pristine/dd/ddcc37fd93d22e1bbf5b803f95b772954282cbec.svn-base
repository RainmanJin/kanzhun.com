package baidu.ui.controls {
    import flash.display.Sprite;
    import flash.events.MouseEvent;
    import flash.text.TextField;
    
    import baidu.ui.constants.WindowMode;
    import baidu.ui.containers.Pane;
    import baidu.ui.containers.Window;
    import baidu.ui.core.BSkin;
    import baidu.ui.managers.InstanceManager;        

    /**
     * Dialog 最重要的职责是：
     * 1.提供 alert，confirm，prompt 3种常用对话框功能。
     * 2.有一定的灵活性，可以做一定程度的配置。
     * 
     * 需求意见：
     * 1.图标的 size 最好能和皮肤自适应。
     * 2.alert的文字不论多少，要能自适应。模仿ie的alert策略。最宽可以是屏幕的2/3。
     * 3.
     * @author as4game@gmail.com
     */
    public class Dialog extends Window {

        public static var okLabel:String = "确定";
        public static var cancelLabel:String = "取消";
        public static var alertIcon:String = "Dialog_Alert_Icon_Skin";
        public static var confirmIcon:String = "Dialog_Confirm_Icon_Skin";

        protected var buttons:Array = [];
        protected var text:TextField;
        protected var contentIcon:BSkin;
        protected var okButton:LabelButton;
        protected var cancelButton:LabelButton;
        protected var input:TextField;

        protected var _prompt:Boolean;
        protected var _custom:Sprite;

        protected var _response:String;

        /**
         * 构造一个Dialog。
         */
        public function Dialog() {
            super(WindowMode.CAN_CLOSE|WindowMode.CAN_MOVE|WindowMode.IS_MODAL);
        }

        /**
         * 返回 Dialog 的单例。
         */
        public static function getInstance():Dialog {
            return InstanceManager.createSingletonInstance(Dialog);
        }
        
        public function alert(text:String = "", title:String = ""):void {
            show(text, title);
        }

        public function confirm(text:String = "", title:String = ""):void {
            show(text, title, null, [okLabel,cancelLabel]);
        }

        public function prompt(text:String = "", title:String = ""):void {
            show(text, title, null, null, true);
        }

        /**
         * 显示对话框
         * @param text 文本信息
         * @param title 标题
         * @param icon 如果为null，会使用alertIcon；如果为"",会不使用icon。
         * @param buttons 如果为null，会使用[uiDialog.okLabel]；如果为[]，不显示按钮。
         * @param prompt 是否为prompt对话框
         * @param custom 是否使用自定义内容
         */
        public function show(text:String = "", title:String = "", icon:String = null, buttons:Array = null, prompt:Boolean = false, custom:Sprite = null):void {
            this.text.text = text;
            this.title = title;
            this.contentIcon.setStyle("skin", icon == null ? alertIcon : icon);
            this._custom = custom;
            this._prompt = prompt;
            if(_prompt) {
                buttons = [okLabel,cancelLabel];
                _stage.focus = input;
                input.setSelection(0, 0);
            }
            this._response = null;
            this.input.text = "";
            createButtons(buttons);
            open();
            center();
        }

        private function createButtons(buttonLabels:Array):void {
            if(buttonLabels == null) {
                buttonLabels = [okLabel];
            }
        	
            var i:int;
            var l:int = buttons.length;
            var button:LabelButton;
            var pane:Pane = (content as Pane);
            for(i = 0;i < l;i++) {
                button = buttons[i];
                if(button != null && pane.contains(button)) {
                    pane.removeChild(button);
                }
                button.removeEventListener(MouseEvent.CLICK, handlePaneButtonClick);
            }
            buttons = [];
        	
            l = buttonLabels.length;
            for(i = 0;i < l;i++) {
                button = new LabelButton();
                pane.addChild(button);
                button.setSize(60, 20);
                button.label = buttonLabels[i];
                buttons[i] = button;
        		
                button.addEventListener(MouseEvent.CLICK, handlePaneButtonClick);
            }
        }

        protected function handlePaneButtonClick(event:MouseEvent):void {
            if(_prompt) {
                if(event.currentTarget != _close && (event.currentTarget as LabelButton).label == okLabel) {
                    _response = input.text;
                }else {
                    _response = null;
                }
            }else {
                _response = (event.currentTarget as LabelButton).label;
            }
            close();
        }

        /**
         * 用户的反馈。一般为用户点击的按钮的标签值。
         * 当 prompt 属性为 true 时，response 为文本框中所填的内容。
         * 如果用户点击关闭按钮，response 为 null。
         */
        public function get response():String {
            return _response;
        }

        override protected function initUI():void {
            super.initUI();
        	
            content = new Pane();
        	
            contentIcon = new BSkin();
            contentIcon.setSize(32, 32);
            (content as Pane).addChild(contentIcon);
        	
            text = new TextField();
            (content as Pane).addChild(text);
            text.wordWrap = true;
            text.multiline = true;
            text.autoSize = "left";
        	
            input = new TextField();
            input.type = "input";
            input.width = 240;
            input.height = 20;
            input.border = true;
            (content as Pane).addChild(input);
        }

        override protected function drawLayout():void {
            super.drawLayout();
            
            var padding:Number = 20;
            var buttonPadding:Number = 10;
            var buttonW:Number = 60;
            var buttonH:Number = 20;
            if(!_prompt) {
                input.visible = false;
                
                text.width = 200;
                
                var messageH:Number = Math.max(contentIcon.height, text.height);
                var totalH:Number = messageH + buttonH + padding;
                //                trace("messageH="+messageH);
                //                trace("buttonH="+buttonH);
                //                trace("padding="+padding);
                //                trace("totalH="+totalH);
                var totalW:Number = 200 + 20 + padding;
                var startX:Number = Math.round((content.width - totalW) / 2);
                var startY:Number = Math.round((content.height - totalH) / 2);
                
                contentIcon.setPosition(startX, startY);
                text.x = contentIcon.x + contentIcon.width + padding;
                text.y = startY;
                
                var buttonTotalW:Number = buttons.length * buttonW + buttonPadding * (buttons.length - 1);
                var buttonStartX:Number = Math.round((content.width - buttonTotalW) / 2);
                var buttonStartY:Number = startY + messageH + padding;
                
                var i:int;
                var l:int = buttons.length;
                var button:LabelButton;
                for(i = 0;i < l;i++) {
                    button = buttons[i];
                    button.setSize(buttonW, buttonH);
                    button.setPosition(buttonStartX + i * (buttonW + buttonPadding), buttonStartY);
                }
            }else {
                input.visible = true;
                text.width = 120;
                
                var buttonsH:Number = buttons.length * buttonH + buttonPadding * (buttons.length - 1);
                messageH = Math.max(Math.max(contentIcon.height, text.height), buttonsH);
                var inputH:Number = 20;
                totalH = messageH + inputH + padding;
                totalW = 240;
                startX = Math.round((content.width - totalW) / 2);
                startY = Math.round((content.height - totalH) / 2);
                
                contentIcon.x = startX;
                contentIcon.y = startY;
                
                text.x = contentIcon.x + contentIcon.width + padding;
                text.y = startY;
                
                l = buttons.length;
                for(i = 0;i < l;i++) {
                    button = buttons[i];
                    button.setSize(buttonW, buttonH);
                    button.setPosition(startX + 240 - buttonW, startY + (buttonPadding + buttonH) * i);
                }
                input.x = startX;
                input.y = startY + messageH + padding;
            }
        }
    }
}
