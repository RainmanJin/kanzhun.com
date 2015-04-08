package baidu.ui.containers {
    import baidu.ui.core.BUI;    
    
    /**
     * Pane 是最简单的容器，不会对子元素进行任何布局操作。
     * 它与Sprite的不同在于，size变化时，不会对子元素进行缩放。
     * @author as4game@gmail.com
     */
    public class Pane extends BUI {

        public function Pane() {
        	super();
        }
    }
}
