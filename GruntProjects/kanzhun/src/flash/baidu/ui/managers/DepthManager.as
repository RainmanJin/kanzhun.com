package baidu.ui.managers {
    import flash.display.*;

    /**
     * 深度管理器。from aswing。
     */
    public class DepthManager {

        /**
         * 将显示对象置于他的所有兄弟节点的下面。
         * @param d 显示对象
         */
        public static function bringToBottom(d:DisplayObject):void {
            var parent:DisplayObjectContainer = d.parent;
            if (parent == null) { 
                return; 
            }
            if (parent.getChildIndex(d) != 0) {
                parent.setChildIndex(d, 0);
            }
        }

        /**
         * 将显示对象置于他的所有兄弟节点的上面。
         * @param d 显示对象
         */	
        public static function bringToTop(d:DisplayObject):void {
            var parent:DisplayObjectContainer = d.parent;
            if (parent == null) return;
            var maxIndex:int = parent.numChildren - 1;
            if (parent.getChildIndex(d) != maxIndex) {
                parent.setChildIndex(d, maxIndex);
            }
        }

        /**
         * 判断显示对象是否在他所有的兄弟节点的上面。
         * @param d 显示对象
         */
        public static function isTop(d:DisplayObject):Boolean {
            var parent:DisplayObjectContainer = d.parent;
            if (parent == null) return true;
            return (parent.numChildren - 1) == parent.getChildIndex(d);
        }

        /**
         * 判断显示对象是否在他所有的兄弟节点的下面。
         * @param d 显示对象
         */
        public static function isBottom(d:DisplayObject):Boolean {
            var parent:DisplayObjectContainer = d.parent;
            if (parent == null) return true;
            return (parent.getChildIndex(d) == 0);
        }

        /**
         * 判断显示对象1是否正好在显示对象2的下面。
         * @param d 显示对象
         * @param aboveD 要判断的是否在d上层的显示对象
         */
        public static function isJustBelow(d:DisplayObject, aboveD:DisplayObject):Boolean {
            var parent:DisplayObjectContainer = d.parent;
            if (parent == null) return false;
            if (aboveD.parent != parent) return false;
		
            return parent.getChildIndex(d) == parent.getChildIndex(aboveD) - 1;
        }

        /**
         * 判断显示对象1是否正好在显示对象2的上面。
         * @param d 显示对象
         * @param belowD 要判断的是否在d下层的显示对象
         */
        public static function isJustAbove(d:DisplayObject, belowD:DisplayObject):Boolean {
            return isJustBelow(belowD, d);
        }
    }
}