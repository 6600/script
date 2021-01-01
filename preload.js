const { ipcRenderer } = require('electron')
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
function addCssByLink() { 
 
  var doc=document; 

  var link=doc.createElement("link"); 

  link.setAttribute("rel", "stylesheet"); 

  link.setAttribute("type", "text/css"); 

  link.setAttribute("href", 'https://demos.run/core.css'); 

  var heads = doc.getElementsByTagName("head"); 

  if (heads.length) {
    heads[0].appendChild(link); 
  }
  else{
    doc.documentElement.appendChild(link); 
  }
}

function addScr (url) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.charset = "UTF-8";
  script.src = url;
  document.body.appendChild(script)
}

window.addEventListener('DOMContentLoaded', () => {
  // 获取数据
  console.log('获取数据!')
  ipcRenderer.on('getInfo-reply', (event, arg) => {
    console.log(arg) // prints "pong"
    if (!arg) return
    if (arg.html) {
      var insertElement = document.createElement("div");
      insertElement.classList.add('puge-box')
      insertElement.innerHTML = arg.html
      document.body.appendChild(insertElement);
    }
    if (arg.js) {
      addScr(arg.js)
    }
  })
  
  ipcRenderer.send('getInfo', 'ping')
  // setTimeout(() => {
  //   addScr()
  //   addCssByLink()
  //   document.querySelector('.neirong-text').value = window.location.href
  // }, 0);
})
