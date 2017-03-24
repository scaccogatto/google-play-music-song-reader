const fs = require('fs')

// google play music json reader

// helpers
const getJSONPath = () => {
  return process.env.APPDATA + '\\Google Play Music Desktop Player\\json_store\\playback.json' //TODO: linux and macosx
}

const readJSON = path => {
  return fs.readFileSync(path, 'utf8')
}

const getData = () => {
  console.log('getting data..')

  // get the json path based on the SO (https://github.com/MarshallOfSound/Google-Play-Music-Desktop-Player-UNOFFICIAL-/blob/master/docs/PlaybackAPI.md)
  let path = getJSONPath()

  // read json
  let jsonText = readJSON(path)

  // decode it and return
  return JSON.parse(jsonText)
}

const publish = () => {
  let json = getData()
  if (json.playing) {
    console.log('writing to file', json.song.title + ' - ' + json.song.artist)
    fs.writeFile(process.env.USERPROFILE + '\\OneDrive\\Documenti\\stream\\song.txt', json.song.title + ' - ' + json.song.artist, error => {
      // todo error
    })
  } else {
    fs.writeFile(process.env.USERPROFILE + '\\OneDrive\\Documenti\\stream\\song.txt', '~', error => {
      // todo error
    })
  }
}

// publish it inside a folder every time
setInterval(publish, 500)