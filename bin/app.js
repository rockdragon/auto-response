import Nightmare from 'nightmare'

const nightmare = new Nightmare(config.nightmare)

nightmare
  .goto(config.site.url)
  .viewport(1024, 768)
  .cookies.clearAll()
  .type('#username', config.site.user)
  .type('#password', config.site.password)
  .click('img[src*="images/login2/dl_1.jpg"]')
  .wait('#mainPanel')
  .evaluate(() => {
    /* eslint-disable */
    // 选择按钮：
    function findButtonbyTextContent(text) {
      var buttons = document.querySelectorAll('button');
      for (var i=0, l=buttons.length; i<l; i++) {
        if (buttons[i].firstChild.nodeValue == text)
          return buttons[i];
      }
    }
    function randText() {
      return Math.random().toString(36).substr(2)
    }

    var southPanel = view.findById('southPanel');
    southPanel.datas['downAns'].push({
      platType:1,
      surperPlateformName: '上峰指令',
      objectType: 1,
      objectTypeName: '222', recordContent: '干吗呢',
      objectId: '22222',
      stamp: Date.now()
    });
    southPanel.showWindow('downAns');
    // 选择问题：
    southPanel.downAnsListGrid.getSelectionModel().selectFirstRow();
    // 点击回答问题按钮：
    findButtonbyTextContent('回答问题').click();
    // 填答案:
    document.querySelector('textarea[name="answer"]').value = randText();
    // 点击确定按钮:
    findButtonbyTextContent('确定').click();
    // 关闭窗口：
    setTimeout(() => {
      Ext.WindowMgr.getActive().close();
    }, 1000);
    return document.title;
    /* eslint-enable */
  })
  .then(title => print(`${title} => 加载完成`))
  .catch(err => error(err))

nightmare.on('page', (type, ...args) => {
  if (type === 'error') {
    error(args)
  } else if (type === 'alert') {
    print('alert')
  } else if (type === 'prompt') {
    print('prompt', args)
  } else if (type === 'confirm') {
    print('confirm', args)
  }
})

