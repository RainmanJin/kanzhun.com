package baidu.ui.controls.list {

    /**
     * 渲染器的接口。
     * @author yaowei
     */
    public interface IListCell {

    	/**
    	 * 获取/设置 数据。
    	 */
    	function get data():*;
        function set data(value:*):void;
        
        /**
         * 获取/设置 元素的控制相关数据。
         * 常见的信息有：index,row,col
         */
        function get listData():ListData;
        function set listData(value:ListData):void;
    	
    	/**
    	 * 获取/设置 鼠标状态。可能为以下值：
    	 * up,over,down,disabled
    	 */
    	function get mouseState():String;
    	function set mouseState(value:String):void;
    	
    	/**
    	 * 获取/设置 选中状态。
    	 */
    	function get selected():Boolean;
    	function set selected(value:Boolean):void;
    	
    }
}
