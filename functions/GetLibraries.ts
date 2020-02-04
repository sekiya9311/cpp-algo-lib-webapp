import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'
import { TreeNode, TreeType } from '../src/types/TreeNode'
import dotenv from 'dotenv'
import axios from 'axios'

const USER_NAME = 'sekiya9311'
const GITHUB_API_KEY = process.env.GITHUB_API_KEY || ''

interface LibrariesResponse {
  statusCode: Number,
  headers: { 'Content-Type': string }
  body: String
}

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context
) => {

  if (dotenv.config) {
    dotenv.config()
  }

  const params = event.queryStringParameters
  const lang = params && params.lang ? params.lang : 'cpp'

  const body = await (lang === 'cpp' ? getLibrariesCpp() : getLibrariesCs())
  const res: LibrariesResponse = {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(body)
  }
  return res
}

async function getLibrariesCpp(): Promise<TreeNode[]> {
  const RepositoryUrl = 'https://api.github.com/repos/sekiya9311/CplusplusAlgorithmLibrary/contents'

  const res = await getChildren(RepositoryUrl)

  return res
}

async function makeTree(data: any): Promise<TreeNode | null> {
  const res: TreeNode = {
    title: data.name,
    sourceCode: '',
    children: [],
    type: TreeType.leaf
  }

  const isDirectory = data.type === 'dir'
  const isCppFile = data.name.lastIndexOf('.cpp') === data.name.length - 4

  if (isDirectory && data.name === 'test') { return null }

  if (isDirectory) {
    res.children = await getChildren(data.url)
    res.type = TreeType.internal

  } else if (isCppFile) {
    res.sourceCode = JSON.stringify((await axios.get(data.download_url, {
      auth: {
        username: USER_NAME,
        password: GITHUB_API_KEY
      }
    })).data)
    res.type = TreeType.leaf

  } else {
    return null
  }

  return res
}

async function getChildren(url: string): Promise<TreeNode[]> {
  const fetchData = (await axios.get(url, {
    auth: {
      username: USER_NAME,
      password: GITHUB_API_KEY
    }
  })).data as []
  const res = (await Promise.all(
    fetchData.map(async e => await makeTree(e))
  )).filter(e => e) as TreeNode[]
  return res
}

async function getLibrariesCs(): Promise<TreeNode[]> {
  // TODO
  return []
}
