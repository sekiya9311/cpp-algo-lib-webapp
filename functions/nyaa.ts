import { Handler, Context, Callback, APIGatewayEvent } from 'aws-lambda'

interface NyaaResponse {
  statusCode: Number,
  body: string
}

export const handler: Handler = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const res: NyaaResponse = {
    statusCode: 200,
    body: 'lambda de nyaa'
  }
  callback(null, res)
}
