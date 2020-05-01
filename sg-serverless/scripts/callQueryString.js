const cp = require('child_process')
const fs = require('fs')
const rootPath = require('app-root-path')


if (process.argv.length < 4) {
  console.log('Require at least 2 argument')
  process.exit()
}

const funcName = process.argv[2]
const fileName = process.argv[3]
const jsonFile = fs.readFileSync(`${rootPath}/test/event/${fileName}`).toString()
fs.writeFileSync(`${rootPath}/scripts/file.json`, JSON.stringify({queryStringParameters: JSON.parse(jsonFile)}, null, 2))

const data = cp.execSync(`serverless invoke local -f ${funcName} --path ${__dirname}/file.json`)
console.log(data.toString())
