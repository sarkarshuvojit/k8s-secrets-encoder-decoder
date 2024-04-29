import {parse, stringify} from 'yaml';

function isEncoded(source: string): boolean {
  return false;
}

function baseDecode(source: string): string {
  return atob(source);
}

function baseEncode(source: string): string {
  return btoa(source);
}

export enum DocumentSummary {
  PLAINTEXT,
  ENCODED,
  MIXED,
  UNKNOWN
}

export function getDocumentSummary(source: string): DocumentSummary {
  const doc = parse(source);
  if (!('data' in doc)) {
    return DocumentSummary.UNKNOWN;
  }

  let total = 0, encoded = 0;
  for(const key in doc.data) {
    const value = doc.data[key];
    if (isEncoded(value)) encoded++;
    total++;
  }

  if (encoded === 0) return DocumentSummary.PLAINTEXT;
  if (total === encoded) return DocumentSummary.ENCODED;
  return DocumentSummary.MIXED;
}

export function encodeAll(source: string): string {
  const doc = parse(source);
  if (!('data' in doc)) {
    return source;
  }

  for(const key in doc.data) {
    const value = doc.data[key];
    if (!isEncoded(value)) {
      doc.data[key] = baseEncode(value);
    }
  }
  return stringify(source);
}

export function decodeAll(source: string): string {
  const doc = parse(source);
  if (!('data' in doc)) {
    return source;
  }

  for(const key in doc.data) {
    const value = doc.data[key];
    if (isEncoded(value)) {
      doc.data[key] = baseDecode(value);
    }
  }
  return stringify(source);

}
