import { SHA256, enc } from 'crypto-js'
import ResolvedApi from 'prismic-javascript/d.ts/ResolvedApi'
import { S3UploadFolder, IPrismicResult } from '../types'
import { prismicMaxPerPage, cloudfrontUrl, frontendServerUrl } from '../data'
import { getFileInfo, getFileThumbnail, paginate } from '../tools'
import { setCacheValue, getCacheValue } from '../functions/redis'
import { s3ListFiles } from './aws'

export async function savePrismicResults(filePrefix: S3UploadFolder) {
  const results = await s3ListFiles(filePrefix)
  if(results.length === 0) {
    return results.length
  }
  const prismicResults: IPrismicResult[] = []
  for (const file of results) {
    const { LastModified, Key } = file
    const fileName = Key!.split('/')[1]
    const fileInfo = getFileInfo(fileName)
    const { type } = fileInfo
    const fileUrl = `${cloudfrontUrl}/${filePrefix}/${fileName}`
    const wordArray = SHA256(fileName)
    const hashedId = wordArray.toString(enc.Base64)

    const thumbnail = getFileThumbnail(fileUrl, type, frontendServerUrl)
    prismicResults.push({
      id: hashedId,
      title: fileName,
      description: type,
      image_url: thumbnail,
      last_update: Number(LastModified!),
      blob: { fileUrl, fileName, thumbnail }
    })
  }
  return setCacheValue(filePrefix, prismicResults)
    .then(() => results.length)
    .catch((err => err))
}

export async function fetchPrismicResults(
  filePrefix: S3UploadFolder,
  page?: number
) {
  const prismicFiles: IPrismicResult[] = await getCacheValue(filePrefix)
  const paginatedResults = page
    ? paginate(prismicFiles, page, prismicMaxPerPage)
    : prismicFiles
  return {
    results_size: prismicFiles.length,
    results: paginatedResults
  }
}

export async function getPrismicDocuments(
  prismicClient: ResolvedApi,
  predicates: string | string[]
) {
  const response = await prismicClient.query(predicates, {})

  const { results } = response
  let { page, next_page } = response

  while (next_page) {
    const nextResponse = await prismicClient.query(predicates, {
      page: page + 1
    })
    results.push(...nextResponse.results)
    page = nextResponse.page
    next_page = nextResponse.next_page
  }
  return results
}
