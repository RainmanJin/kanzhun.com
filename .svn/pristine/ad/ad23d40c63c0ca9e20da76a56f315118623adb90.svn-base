package laan.smart.utils
{
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.utils.Dictionary;
	
	/**
	 * 延迟处理
	 * 
	 * @author laan
	 * @createTime 2010.02
	 * 
	 */	
	public class CallLater
	{
		/**
		 * 用于触发EnterFrame事件 
		 */		
		private static const sprite:Sprite = new Sprite();
		
		/**
		 * 标志添加延迟处理时是否立即执行。
		 * 
		 * <p>
		 * 用于处理文件保存接口调用必须用户主动交互的问题。
		 * </p> 
		 */		
		private var pushIsExecute:Boolean;
		
		/**
		 * 需要延迟调用的方法列表 
		 */		
		private var laterFunMap:Dictionary = new Dictionary();
		
		/**
		 * 延迟处理顺序队列 
		 */		
		private var callLaterStack:Object = [];
		
		/**
		 *  
		 * @param pushIsExecute
		 * 
		 */		
		public function CallLater(pushIsExecute:Boolean = false) {
			this.pushIsExecute = pushIsExecute;
		}
		
		
		/**
		 * 初始化延迟处理 
		 * 
		 */		
		private function doCallLater(start:Boolean):void {
			if (start) {
				sprite.addEventListener(Event.ENTER_FRAME, spriteEnterFrameHandler);
			} else {
				sprite.removeEventListener(Event.ENTER_FRAME, spriteEnterFrameHandler);
			}
		}
		
		
		/**
		 *  
		 * 
		 */		
		private function spriteEnterFrameHandler(event:Event):void {
			var fun:Function;
			
			//处理延迟处理池
			for (var obj:Object in laterFunMap) {
				fun = obj as Function;
				fun.apply(null, laterFunMap[obj]);
				
				delete laterFunMap[obj];
			}
			
			if (callLaterStack.length) {
				//处理延迟处理列表
				var listItem:Array = callLaterStack.shift() as Array;
				fun = listItem[0] as Function;
				fun.apply(null, listItem[1]);
			}
			
			
			if (!callLaterStack.length) {
				doCallLater(false);
			}
		}
		
		/**
		 * 添加延迟处理控制
		 *  
		 * @param fun
		 * @param params
		 * 
		 */		
		public function callLater(fun:Function, ... params):void {
			doCallLater(true);
			
			laterFunMap[fun] = params;
		}
		
		/**
		 * 清空延迟处理池 
		 * 
		 */		
		public function clearCallLater():void {
			laterFunMap = new Dictionary();
		}
		
		/**
		 * 添加延迟处理到队列
		 *  
		 * @param fun
		 * @param params
		 * 
		 */		
		public function pushCallLater(fun:Function, ... params):void {
			if (pushIsExecute) {
				fun.apply(null, params);
			} else {
				doCallLater(true);
				
				callLaterStack.push([fun, params]);
			}
		}
		
		/**
		 * 清空延迟处理队列 
		 * 
		 */		
		public function clearCallLaterStack():void {
			callLaterStack = [];
		}
		
		//==========================================================================
		private static var _inst:CallLater;
		
		/**
		 *  
		 * @return 
		 * 
		 */		
		public static function get instance():CallLater {
			if (!_inst) return _inst = new CallLater();
			return _inst;
		}

	}
}