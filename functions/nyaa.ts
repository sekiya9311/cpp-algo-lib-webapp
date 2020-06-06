import { Handler } from 'aws-lambda';

interface NyaaResponse {
  statusCode: Number;
  body: string;
}

export const handler: Handler = (_event, _context, callback) => {
  const res: NyaaResponse = {
    statusCode: 200,
    body: 'lambda de nyaa',
  };
  callback(null, res);
};
