import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
  console.log('HTTP ' + req.url);
  const { url = '/' } = req;
  const { query = {} } = parse(url, true);
  const { name = '', imageUrl = '' } = query;

  const parsedRequest: ParsedRequest = {
    name: Array.isArray(name) ? name[0] : name,
    imageUrl: Array.isArray(imageUrl) ? imageUrl[0] : imageUrl,
  };
  return parsedRequest;
}
