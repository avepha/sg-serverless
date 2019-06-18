import {s3Upload, s3PresignedUrl} from '../../../datasource/aws'
import {json2csv} from 'json-2-csv'
import config from '../../../config'

const {s3} = config.aws

export async function loggerToCsv(sensorLogger) {
  return new Promise((resolve, reject) => {
    json2csv(sensorLogger, (err, csv) => {
      if(err) reject(err)
      else resolve(csv)
    })
  })
}

export async function uploadCsvAndPresignedUrl(csv, {mid, after, before}) {
  const key = createCsvPath({mid, after, before})
  await s3Upload(key, csv)
  return s3PresignedUrl(key)
}

function createCsvPath({mid, after, before}) {
  return `${s3.folder.root}/${s3.folder.csv}/${mid}-${after}-${before}.csv`
}
