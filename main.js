// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain, session} = require('electron')
const path = require('path')
let mainWindow = null
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1300,
    height: 800,
    autoHideMenuBar: true,
    icon: "./resources/icon.png",
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      // 关闭同源策略
      webSecurity: true,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('./enter/index.html')
  // mainWindow.loadFile('./test/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

let configInfo = null
// 登录事件
ipcMain.on('login', (event, temp) => {
  if (typeof data == 'string') {
    temp.data = JSON.parse(temp.data)
  }
  if (typeof temp.data.data == 'string') {
    temp.data.data = JSON.parse(temp.data.data)
  }
  
  configInfo = temp
  console.log(`login: ${JSON.stringify(temp)}`)
  mainWindow.loadURL(temp.data.url)
})

ipcMain.on('getInfo', (event, arg) => {
  console.log(`send user data: ${JSON.stringify(configInfo)}`)
  event.reply('getInfo-reply', configInfo)
})

ipcMain.on('creatNewWindow', (event, arg) => {
  console.log(arg)
  let presWindow = new BrowserWindow({
    width: 1280,
    height: 768,
    title:'用户登陆',
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      webSecurity: false,
      allowRunningInsecureContent: true,
      contextIsolation: false,
      session: session.fromPartition('persist:bv1Session', { cache: false })
    }
  });
  presWindow.loadURL('https://cc.163.com/user/rank_list/')
  event.reply('windowList', [])
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
