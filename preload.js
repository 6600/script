// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

window.addEventListener('DOMContentLoaded', () => {
  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }

  // for (const type of ['chrome', 'node', 'electron']) {
  //   replaceText(`${type}-version`, process.versions[type])
  // }

  function selectVideo () {
    const menuList = child.document.querySelectorAll('#Menu li a')
    let canNext = true
    for (const key in menuList) {
      if (Object.hasOwnProperty.call(menuList, key)) {
        canNext = false
        const element = menuList[key];
        if (element.innerText.includes('未学习') || element.innerText.includes('时间不够')) {
          console.log('继续未学习!')
          element.click()
          return
        }
      }
    }
    child.document.querySelector('a[onclick="returnForward()"]').click()
  }
  var child = null
  setInterval(() => {
    console.log('检测!')
    // 判断是否播放页
    if (document.getElementById("mainFrame")) {
      child = document.getElementById("mainFrame").contentWindow
      child.window.alert = function (text) {
        console.log(text)
      }
      const titleStr = child.document.title
      // 判断是否有播放按钮
      if (child.document.querySelector('#replaybtn')) {
        setTimeout(() => {
          if (child.document.querySelector('#replaybtn').style.display != "none") {
            child.document.querySelector('#replaybtn').click()
          } else {
            var video = child.document.querySelector('video')
            if (video && video.currentTime > 0) {
              var bili = video.currentTime / video.duration
              if (bili > 0.8) {
                selectVideo()
              }
            }
          }
        }, 1000); 
      } else if (titleStr == "课程管理") {
        console.log('课程管理')
        const xuexiList = child.document.querySelectorAll('.table_a tr')
        if (xuexiList.length > 0) {
          for (const key in xuexiList) {
            if (Object.hasOwnProperty.call(xuexiList, key)) {
              const element = xuexiList[key];
              
              if (element.innerText.includes('未完成')) {
                console.log(element)
                element.querySelector('a').click()
                return
              }
            }
          }
        }
        
      } else if (titleStr == "课程学习") {
        const xuexiList2 = child.document.querySelectorAll('#button2')
        console.log(xuexiList2)
        if (xuexiList2.length > 0) {
          for (const key in xuexiList2) {
            const element = xuexiList2[key];
            console.log(element.value)
            if (element.value == '进入学习' || element.value == '继续学习') {
              element.click()
              return
            }
          }
          // 学时申请
          child.document.querySelector('input[value="申请学时"]').click()
          setTimeout(() => {
            child.document.querySelector('input[value="返回"]').click()
          }, 100);
        }
      }
    }
  }, 2000);
})
