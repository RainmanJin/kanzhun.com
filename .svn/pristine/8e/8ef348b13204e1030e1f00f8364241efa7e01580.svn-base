1. 






















使用说明：
  1. gruntfile里requirejs配置的modules里，对于要压缩的js的name 要和使用时依赖的JS模块名称一致
  如：
  modules[{
    name: 'c/general',
    exclude: ['c/auth_dialog', 'c/widgets', 'u/validator']
  }]

  和：
  require(['c/auth_dialog', 'c/user_response', 'c/general', 'comp/toggler/toggler'], function(auth_dialog, user_response){
    ...
  })

  这两个地方的 c/general要一致