
const electron = require('electron')
const url = require('url')
const path = require('path')

const { app, BrowserWindow, Menu } = electron

let mainWindow

app.on('ready', ( ) => {
  mainWindow = new BrowserWindow({ })
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', ( ) => {
    app.quit( )
  })

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
  Menu.setApplicationMenu(mainMenu)
})

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Start new tracery'
      },
      {
        label: 'Quit',
        // TODO: find out why the accelerator does not work
        // acceleration: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        acceleration: 'CommandOrControl+Q',
        click( ) {
          app.quit( );
        }
      }
    ]
  }
]

if (process.platform == 'darwin') {
  mainMenuTemplate.unshift({ })
}

if (process.env.NODE_ENV !== 'production') {
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        // TODO: when the accelerators work, then insert the hotkey
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools( )
        }
      },
      {
        label: 'Reload',
        role: 'reload'
      }
    ]
  })
}
