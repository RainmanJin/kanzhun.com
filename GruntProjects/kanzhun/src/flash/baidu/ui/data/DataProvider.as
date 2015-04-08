package baidu.ui.data {
    import flash.events.EventDispatcher;
    import RangeError;
    import baidu.ui.events.DataChangeEvent;
    import baidu.ui.events.DataChangeType;        

    /**
     * 数据变化前派发。
     */
    [Event(name="preDataChange", type="baidu.ui.events.DataChangeEvent")]
	
	/**
	 * 数据变化后派发。
	 */
	[Event(name="dataChange", type="baidu.ui.events.DataChangeEvent")]

    /**
     * From adobe fl cs3。
     * DataProvider 类提供一些方法和属性，这些方法和属性允许您查询和修改任何基于列表的组件
     * （例如，List、DataGrid、TileList 或 ComboBox 组件）中的数据。数据提供者 是用作
     * 数据源的项目的线性集合，例如，一个数组。 数据提供者中的每个项目都是包含一个或多个数据
     * 字段的对象或 XML 对象。 通过使用 DataProvider.getItemAt() 方法，可以按索引访问
     * 数据提供者中包含的项目。
     */
	public class DataProvider extends EventDispatcher {
        /**
         * @private
		 */
		protected var data:Array;

		/**
		 * 构造函数。
		 * 通过将列表、XML 实例或数据对象数组作为数据源，创建一个新的 DataProvider 对象。
		 * 
         * @param value 用于创建 DataProvider 的数据。 
		 */
		public function DataProvider(value:Object=null) {			
			if (value == null) {
				data = [];
			} else {
				data = getDataFromObject(value);				
			}
		}

		/**
		 * DataProvider包含的数据项的数目。
		 */
		public function get length():uint {
			return data.length;
		}

		/**
		 * 让一个指定索引的数据项失效。
		 *
		 * @param index 需要失效的数据项的索引。
         *
         * @throws RangeError 指定的索引小于0或者大于等于 DataProvider 的长度。
         *
         * @see #invalidate()
         * @see #invalidateItem()
		 */
		public function invalidateItemAt(index:int):void {
			checkIndex(index,data.length-1);
			dispatchChangeEvent(DataChangeType.INVALIDATE,[data[index]],index,index);
		}

		/**
		 * 让一个指定的数据项失效。
		 *
         * @param item 需要失效的数据项。
         *
         * @see #invalidate()
         * @see #invalidateItemAt()
		 */
		public function invalidateItem(item:Object):void {
			var index:uint = getItemIndex(item);
			if (index == -1) { return; }
			invalidateItemAt(index);
		}

		/**
		 * 让所有的数据项失效。
         *
         * @see #invalidateItem()
         * @see #invalidateItemAt()
		 */
		public function invalidate():void {
			dispatchEvent(new DataChangeEvent(DataChangeEvent.DATA_CHANGE, DataChangeType.INVALIDATE_ALL,data.concat(),0,data.length));
		}


		/**
		 * 将新项目添加到数据提供者的指定索引处。如果指定的索引超过数据提供者的长度，会抛出异常。
		 *
		 * @param item 包含要添加的项目数据的对象。
		 *
         * @param index 要在其位置添加项目的索引。
         *
         * @throws RangeError 指定的索引小于 0 或大于等于数据提供者的长度。
         *
         * @see #addItem()
         * @see #addItems()
         * @see #addItemsAt()
         * @see #getItemAt()
         * @see #removeItemAt()
		 */
		public function addItemAt(item:Object,index:uint):void {
			checkIndex(index,data.length);
			dispatchPreChangeEvent(DataChangeType.ADD,[item],index,index);
			data.splice(index,0,item);
			dispatchChangeEvent(DataChangeType.ADD,[item],index,index);
		}

		/**
		 * 将项目追加到数据提供者的结尾。 
		 *
         * @param 要追加到当前数据提供者的结尾的项目。
         *
         * @see #addItemAt()
         * @see #addItems()
         * @see #addItemsAt()
		 */
		public function addItem(item:Object):void {
			dispatchPreChangeEvent(DataChangeType.ADD,[item],data.length-1,data.length-1);
			data.push(item);
			dispatchChangeEvent(DataChangeType.ADD,[item],data.length-1,data.length-1);
		}

		/**
		 * 向数据提供者的指定索引处添加若干项目，并调度 DataChangeType.ADD 事件。 
		 *
		 * @param items 要追加到数据提供者的项目。
		 *
		 * @param index 要在其位置插入项目的索引。
         *
         * @throws RangeError 指定的索引小于 0 或大于等于数据提供者的长度。
         *
         * @see #addItem()
         * @see #addItemAt()
         * @see #addItems()
		 */
		public function addItemsAt(items:Object,index:uint):void {
			checkIndex(index,data.length);
			var arr:Array = getDataFromObject(items);
			dispatchPreChangeEvent(DataChangeType.ADD,arr,index,index+arr.length-1);			
			data.splice.apply(data, [index,0].concat(arr));
			dispatchChangeEvent(DataChangeType.ADD,arr,index,index+arr.length-1);
		}

		/**
		 * 向 DataProvider 的末尾追加多个项目，并调度 DataChangeType.ADD 事件。 按照指定项目的顺序添加项目。
		 *
         * @param 要追加到数据提供者的项目。
         *
         * @see #addItem()
         * @see #addItemAt()
         * @see #addItemsAt()
		 */
		public function addItems(items:Object):void {
			addItemsAt(items,data.length);
		}

		/**
		 * 将指定项目连接到当前数据提供者的结尾。此方法调度 DataChangeType.ADD 事件。
		 *
         * @param items 要添加到数据提供者的项目。
         *
         * @see #addItems()
         * @see #merge()
		 */
		public function concat(items:Object):void {
			addItems(items);
		}

		/**
		 * 将指定数据追加到数据提供者包含的数据，并删除任何重复的项目。 此方法调度 DataChangeType.ADD 事件。 
		 *
         * @param data 要合并到数据提供者的数据。  
         *
         * @see #concat()
		 */
		public function merge(newData:Object):void {
			var arr:Array = getDataFromObject(newData);
			var l:uint = arr.length;
			var startLength:uint = data.length;
			
			dispatchPreChangeEvent(DataChangeType.ADD,data.slice(startLength,data.length),startLength,this.data.length-1);
			
			for (var i:uint=0; i<l; i++) {
				var item:Object = arr[i];
				if (getItemIndex(item) == -1) {
					data.push(item);
				}
			}
			if (data.length > startLength) {
				dispatchChangeEvent(DataChangeType.ADD,data.slice(startLength,data.length),startLength,this.data.length-1);
			} else {
				dispatchChangeEvent(DataChangeType.ADD,[],-1,-1);
			}
		}

		/**
         * 返回指定索引处的项目。
		 *
		 * @param index 要返回的项目的位置。  
		 *
		 * @return 指定索引处的项目。
         *
         * @throws RangeError 指定的索引小于 0 或大于等于数据提供者的长度。
         *
         * @see #getItemIndex()
         * @see #removeItemAt()
		 */
		public function getItemAt(index:uint):Object {
			checkIndex(index,data.length-1);
			return data[index];
		}

		/**
		 * @param item 要查找的项目。
		 *
         * @return 指定项目的索引；如果没有找到指定项目，则为 -1。 
         *
         * @see #getItemAt()
		 */
		public function getItemIndex(item:Object):int {
			return data.indexOf(item);;
		}

		/**
		 * 删除指定索引处的项目，并调度 DataChangeType.REMOVE 事件。
		 *
		 * @param index 要删除的项目的索引。  
         *
         * @return 被删除的项目。
         *
         * @throws RangeError 指定的索引小于 0 或大于等于数据提供者的长度。
         *
         * @see #removeAll()
         * @see #removeItem()
		 */
		public function removeItemAt(index:uint):Object {
			checkIndex(index,data.length-1);
			dispatchPreChangeEvent(DataChangeType.REMOVE, data.slice(index,index+1), index, index);
			var arr:Array = data.splice(index,1);
			dispatchChangeEvent(DataChangeType.REMOVE,arr,index,index);
			return arr[0];
		}

		/**
		 * 从数据提供者中删除指定项目，并调度 DataChangeType.REMOVE 事件。
		 *
		 * @param item 要删除的项目。  
         *
         * @return 被删除的项目。
         *
         * @see #removeAll()
         * @see #removeItemAt()
		 */
		public function removeItem(item:Object):Object {
			var index:int = getItemIndex(item);
			if (index != -1) {
				return removeItemAt(index);
			}
			return null;
		}

		/**
		 * 从数据提供者中删除所有项目，并调度 DataChangeType.REMOVE_ALL 事件。
         *
         * @see #removeItem()
         * @see #removeItemAt()
		 */
		public function removeAll():void {
			var arr:Array = data.concat();
			
			dispatchPreChangeEvent(DataChangeType.REMOVE_ALL,arr,0,arr.length);
			data = [];
			dispatchChangeEvent(DataChangeType.REMOVE_ALL,arr,0,arr.length);
		}

		/**
		 * 用新项目替换现有项目，并调度 DataChangeType.REPLACE 事件。
		 *
		 * @param oldItem 需要被替换的项目。
		 *
		 * @param newItem 新项目。
		 *
         * @return 被替换的项目。
         *
         * @throws RangeError 指定的索引小于 0 或大于等于数据提供者的长度。
         *
         * @see #replaceItemAt()
		 */
		public function replaceItem(newItem:Object,oldItem:Object):Object {
			var index:int = getItemIndex(oldItem);
			if (index != -1) {
				return replaceItemAt(newItem,index);
			}
			return null;
		}

		/**
		 * 替换指定索引处的项目，并调度 DataChangeType.REPLACE 事件。
		 *
		 * @param newItem 新项目。
		 *
		 * @param index 需要被替换的项目的索引。
		 *
         * @return 被替换的项目。
         * 
         * @throws RangeError 指定的索引小于 0 或大于等于数据提供者的长度。
         *
         * @see #replaceItem()
		 */
		public function replaceItemAt(newItem:Object,index:uint):Object {
			checkIndex(index,data.length-1);
			var arr:Array = [data[index]];
			dispatchPreChangeEvent(DataChangeType.REPLACE,arr,index,index);
			data[index] = newItem;
			dispatchChangeEvent(DataChangeType.REPLACE,arr,index,index);
			return arr[0];
		}

		/**
		 * 对数据提供者包含的项目进行排序，并调度 DataChangeType.SORT 事件。
         *
		 * @param sortArg 用于排序的参数。  
		 *
         * @return 返回值取决于方法是否接收任何参数。 有关详细信息，请参阅 Array.sort() 方法。
         * 当 sortOption 属性设置为 Array.UNIQUESORT 时，该方法返回 0。
		 *
         * @see #sortOn()
         * @see Array#sort() Array.sort()
		 */
		public function sort(...sortArgs:Array):* {
			dispatchPreChangeEvent(DataChangeType.SORT,data.concat(),0,data.length-1);
			var returnValue:Array = data.sort.apply(data,sortArgs);
			dispatchChangeEvent(DataChangeType.SORT,data.concat(),0,data.length-1);
			return returnValue;
		}

		/**
		 * 按指定字段对数据提供者包含的项目进行排序，并调度 DataChangeType.SORT 事件。 指定字段可以是
		 * 字符串或字符串值数组，这些字符串值指定要按优先顺序对其进行排序的多个字段。
		 *
		 * @param fieldName 要按其进行排序的项目字段。 该值可以是字符串或字符串值数组。
		 *
		 * @param options 用于排序的选项。
		 *
		 * @return 返回值取决于方法是否接收任何参数。 有关详细信息，请参阅“Array.sortOn() 方法”。 如
		 *         果 sortOption 属性设置为 Array.UNIQUESORT，则该方法返回 0。
		 *
         * @see #sort()
         * @see Array#sortOn() Array.sortOn()
		 */
		public function sortOn(fieldName:Object,options:Object=null):* {
			dispatchPreChangeEvent(DataChangeType.SORT,data.concat(),0,data.length-1);
			var returnValue:Array = data.sortOn(fieldName,options);
			dispatchChangeEvent(DataChangeType.SORT,data.concat(),0,data.length-1);
			return returnValue;
		}

		/**
		 * 创建当前 DataProvider 对象的副本。
		 *
         * @return 该 DataProvider 对象的新实例。
		 */
		public function clone():DataProvider {
			return new DataProvider(data);
		}

		/**
		 * 转换成数组。
		 *
         * @return Array 转换之后的数组。
		 */
		public function toArray():Array {
			return data.concat();
		}

		/**
		 * 转换成字符串。
		 *
         * @return String 转换之后的字符串。
		 */
		override public function toString():String {
			return "DataProvider ["+data.join(" , ")+"]";
		}

		/**
         * @private (protected)
         * @param obj 可以使 Array，DataProvider，或者 XML。
		 */
		protected function getDataFromObject(obj:*):Array {
			var result:Array;
			var item:Object;
			if (obj is Array) {
				var arr:Array = obj as Array;
				if (arr.length > 0) {
					if (arr[0] is String || arr[0] is Number) {
						result = [];
						for (var i:uint = 0; i < arr.length; i++) {
							item = arr[i];
							result.push(item);
						}
						return result;
					}
				}
				return arr.concat();
			} else if (obj is DataProvider) {
				return (obj as DataProvider).toArray();
			} else if (obj is XML) {
				var xml:XML = obj as XML;
				result = [];
				var nodes:XMLList = xml.*;
				for each (var node:XML in nodes) {
					item = {};
					var attrs:XMLList = node.attributes();
					for each (var attr:XML in attrs) {
						item[attr.localName()] = attr.toString();
					}
					var propNodes:XMLList = node.*;
					for each (var propNode:XML in propNodes) {
						if (propNode.hasSimpleContent()) {
							item[propNode.localName()] = propNode.toString();
						}
					}
					result.push(item);
				}
				return result;
			} else {
				throw new TypeError("Error: Type Coercion failed: cannot convert "+obj+" to Array or DataProvider.");
				return null;
			}
		}
		
		/**
         * @private (protected)
         * 检查索引指定的索引是否越界。
		 */
		protected function checkIndex(index:int,maximum:int):void {
			if (index > maximum || index < 0) {
				throw new RangeError("DataProvider index ("+index+") is not in acceptable range (0 - "+maximum+")");
			}
		}

		/**
         * @private (protected)
         * 派发数据变化事件。
		 */
		protected function dispatchChangeEvent(evtType:String,items:Array,startIndex:int,endIndex:int):void {
			dispatchEvent(new DataChangeEvent(DataChangeEvent.DATA_CHANGE,evtType,items,startIndex,endIndex));
		}
		
		/**
         * @private (protected)
         * 派发数据变化前的事件。
		 */
		protected function dispatchPreChangeEvent(evtType:String, items:Array, startIndex:int, endIndex:int):void {
			dispatchEvent(new DataChangeEvent(DataChangeEvent.PRE_DATA_CHANGE, evtType, items, startIndex, endIndex));
		}
	}

}