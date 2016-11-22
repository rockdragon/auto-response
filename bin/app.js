import Nightmare from 'nightmare'
require('nightmare-custom-event')(Nightmare)
import { pageEventHandler, willNavigateHandler, errorHandler } from './eventHandler'

const nightmare = new Nightmare(config.nightmare)

nightmare
  .on('page', pageEventHandler)
  .on('will-navigate', (event, url) => {
    willNavigateHandler(event, url)
    if (url.includes('index.html')) {
      errorHandler(nightmare, 'redirection')
    }
  })
  .goto(config.site.url)
  .on('custom-event',  (...err) => {
    errorHandler(nightmare, err)
  })
  .bind('custom-event')
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
    function logWithTime(text) {
      console.log(new Date().Format("yyyy-MM-dd HH:mm:ss"), text);
    }
    function getAnswer(panel) {
      const datas = panel.datas['downAns']
      logWithTime('datas:', datas)
      if (datas && datas.length && datas[0].recordContent) {
        return datas[0].recordContent.split(/[：:]/)[1]
      }
      return '000'
    }
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    logWithTime('处理开始');
    var southPanel = view.findById('southPanel');

    function handle() {
      var win = document.querySelector('#downAnsWindow');
      if (win && win.style.visibility === 'visible') {
        setTimeout(() => {
          logWithTime('应答对话框出现')
          // 选择问题：
          southPanel.downAnsListGrid.getSelectionModel().selectFirstRow();
          // 点击回答问题按钮：
          findButtonbyTextContent('回答问题').click();
          // 填答案:
          var answer = getAnswer(southPanel)
          logWithTime('回答：' + answer)
          document.querySelector('textarea[name="answer"]').value = answer;
          // 点击确定按钮:
          document.querySelector('#downAnsWindow div.x-tool-close').click()
          findButtonbyTextContent('确定').click();
        }, 1000 * getRandomInt(1, 5));
      }
    }

    setInterval(handle, 2000);

    window.addEventListener('error', function(err) {
      console.dir(err)
      console.dir(ipc)
      if (err.message.indexOf('Uncaught SyntaxError') > -1) {
        console.error('sending custom-event')
        ipc.send('custom-event', err.message);
      }
    })

    //window.onbeforeunload = function(e) {
    //  var dialogText = '您别走';
    //  e.returnValue = dialogText;
    //  return dialogText;
    //};
    /* eslint-enable */
  })
  .evaluate(() => document.title)
  .then(title => printWithTime(`${title} => 加载完成`))
  .catch(err => errorHandler(nightmare, err))

process.on('uncaughtException', (...err) => {
  errorHandler(nightmare, err)
})


