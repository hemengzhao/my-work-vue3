module.exports = {
  types: [
    { value: 'feature', name: '✨ Features |   增加新功能' },
    { value: 'bug', name: '🐛 Bug Fixes | 测试反馈bug列表中的bug号' },
    { value: 'fix', name: '🐛 Bug Fixes | 修复bug' },
    { value: 'ui', name: '💄 UI| 更新UI' },
    { value: 'docs', name: '📝 Documentation |文档变更' },
    { value: 'style', name: '💄 Styles | 风格(不影响代码运行的变动)' },
    { value: 'perf', name: '⚡Performance Improvements | 性能优化' },
    { value: 'refactor', name: '♻ Code Refactoring |重构(既不是增加feature，也不是修复bug)' },
    { value: 'release', name: 'release:  发布' },
    { value: 'deploy', name: '🚀 Chore |部署' },
    { value: 'test', name: '✅ Tests |增加测试' },
    { value: 'chore', name: '🚀 Chore |构建过程或辅助工具的变动(更改配置文件)' },
    { value: 'revert', name: '⏪ Revert | 回退回退' },
    { value: 'build', name: '📦‍ Build System |打包' }
  ],
  // override the messages, defaults are as follows
  messages: {
    type: '请选择提交类型:',
    customScope: '请输入您修改的范围(可选):',
    subject: '请简要描述提交 message (必填):',
    body: '请输入详细描述(可选，待优化去除，跳过即可):',
    footer: '请输入要关闭的issue(待优化去除，跳过即可):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
  },
  // 要是同一个git下有多个项目文件家， 可以打开注释选择git要操作的项目
  // scopes: [{ name: 'h5' }, { name: 'manage'}],
  allowCustomScopes: true,
  skipQuestions: ['body', 'footer'],
  subjectLimit: 72
}
