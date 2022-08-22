import RNFS from 'react-native-fs';
import Papa from 'papaparse';

async function validateCSV(filePath) {
  const file = await RNFS.readFile(filePath, 'utf8')
  let isValid = false
  Papa.parse(file, {
    delimiter: ",",
    error: function () {
      isValid = false
    },
    complete: function (results) {
      if (results.data[0].length === 1 && results.data[0][0] === 'Total') {
        isValid = true
      } else {
        isValid = false
      }
    }
  });
  return isValid
}

async function getTotalAmountCSV(filePath, name) {
  const file = await RNFS.readFile(filePath, 'utf8')
  let total = 0
  Papa.parse(file, {
    delimiter: ",",
    error: function () {
      total = 0
    },
    complete: function (results) {
      results.data.shift()
      const normalizedData = results.data.flatMap(row => parseInt(row))
      const sum = normalizedData.reduce((a, b) => a + b, 0)
      total = sum
    }
  });
  return { name, total }
}

export async function processFile(file) {
  const { fileCopyUri } = file
  const fileNameWithFolder = fileCopyUri.split('/').slice(-2).join('/')
  const fileName = fileNameWithFolder.split('/').slice(-1)[0]
  const path = RNFS.DocumentDirectoryPath + '/' + fileNameWithFolder
  let finalPath = RNFS.DocumentDirectoryPath
  const extension = fileName.split('.').slice(-1)[0]

  const fileExists = await RNFS.exists(path)

  if (!fileExists) return

  if (extension === 'csv') {
    finalPath = finalPath + '/csv/' + fileName
    const existCSVFolder = await RNFS.exists(RNFS.DocumentDirectoryPath + '/csv')
    if (!existCSVFolder) {
      await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/csv')
    }
    await RNFS.moveFile(path, finalPath)
    const isValidCSV = await validateCSV(finalPath, fileName)
    if (!isValidCSV) await RNFS.unlink(finalPath)

  }
  if (extension === 'png') {
    finalPath = finalPath + '/png/' + fileName
    const existPNGFolder = await RNFS.exists(RNFS.DocumentDirectoryPath + '/png')
    if (!existPNGFolder) {
      await RNFS.mkdir(RNFS.DocumentDirectoryPath + '/png')
    }
    await RNFS.moveFile(path, finalPath)
  }
}

export async function listPNGFiles() {
  const path = RNFS.DocumentDirectoryPath + '/png'
  const existPNGFolder = await RNFS.exists(path)
  if (!existPNGFolder) return null
  const res = await RNFS.readDir(RNFS.DocumentDirectoryPath + '/png')
  return res.map(file => file.path)
}

export async function listCSVFiles() {
  const path = RNFS.DocumentDirectoryPath + '/csv'
  const existCSVFolder = await RNFS.exists(path)
  if (!existCSVFolder) return null
  const res = await RNFS.readDir(RNFS.DocumentDirectoryPath + '/csv')
  console.log(res)
  const csvFilesWithAmount = await Promise.all(res.map(file => getTotalAmountCSV(file.path, file.name)))
  return csvFilesWithAmount
}