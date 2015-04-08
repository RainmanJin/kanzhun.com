package baidu.ui.managers {
    import flash.system.ApplicationDomain;    
    import flash.utils.Dictionary;    

    /**
     * 实例管理器。用于以下场景
     * <li>如果对实例的个数非常关心，不愿意依靠系统的垃圾回收</li>
     * <li>如果希望在不同的代码域中共享类的1个或者多个实例</li>
     * <li>通过类名，类甚至是实例本身来获取一个实例</li>
     * @author yaowei
     */
    public class InstanceManager {

        /**
         * 存储各个类的所有实例，是一个二维字典。
         */
        private static var instances:Dictionary = new Dictionary();

        /**
         * 返回一个类的实例。
         * @param c 类名，类，或者实例。
         * @return 一个实例。
         */
        public static function createInstance(c:*):* {
        	
            if (c is String) {
                c = getClass(c);
            }
        	
            if (c is Class) {
                return new c();
            }
        	
            return c;
        }

        /**
         * 返回一个类的单例。
         * @param c 类名，类，或者实例。
         * @return 一个类的单例。
         */
        public static function createSingletonInstance(c:*):* {
            return createUniqueInstance(c, "singleton");
        }

        /**
         * 根据指定的id，返回一个类的实例。
         * @param c 类名，类，或者实例。
         * @param id 一个标示符，与实例相对应。
         * @return 一个类的实例。
         */
        public static function createUniqueInstance(c:*,id:*):* {
        	
            if (c is String) {
                c = getClass(c);
            }
        	
            if (c is Class) {
                if (instances[c] == null) {
                    instances[c] = new Dictionary();
                }
        		
                if (instances[c][id] == null) {
                    instances[c][id] = createInstance(c);
                }
        	   
                return instances[c][id];
            }
            return c;
        }

        /**
         * 获取一个类。从当前程序域中获取一个实例。
         * @param className 类名。
         */
        public static function getClass(className:String):Class {
            return ApplicationDomain.currentDomain.getDefinition(className) as Class;
        }
    }
}
