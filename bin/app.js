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
    Date.prototype.Format = function (fmt) { //author: meizz
      var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    };
    function findButtonbyTextContent(text) {
      var buttons = document.querySelectorAll('button');
      for (var i=0, l=buttons.length; i<l; i++) {
        if (buttons[i].firstChild.nodeValue == text)
          return buttons[i];
      }
    }
    function randText() {
      return Math.random().toString(36).substr(2);
    }
    function logWithTime(text) {
      console.log(new Date().Format("yyyy-MM-dd HH:mm:ss"), text);
    }
    logWithTime('处理开始');
    var southPanel = view.findById('southPanel');

    function handle() {
      var win = document.querySelector('#downAnsWindow');
      if (win && win.style.visibility === 'visible') {
        logWithTime('应答对话框出现')
        // 选择问题：
        southPanel.downAnsListGrid.getSelectionModel().selectFirstRow();
        // 点击回答问题按钮：
        findButtonbyTextContent('回答问题').click();
        // 填答案:
        var answer = randText();
        document.querySelector('textarea[name="answer"]').value = answer;
        // 点击确定按钮:
        document.querySelector('#downAnsWindow div.x-tool-close').click()
        findButtonbyTextContent('确定').click();

      }
    }

    setInterval(handle, 2000);

  })
  .evaluate(() => document.title)
  .then(title => printWithTime(`${title} => 加载完成`))
  .catch(err => error(err))

nightmare
  .on('page', (type, ...args) => {
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

