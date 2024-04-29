function isEncoded(source: string): boolean {
  return false;
}

function baseDecode(source: string): string {
  return "";
}

function baseEncode(source: string): string {
  return "";
}

export enum DocumentSummary {
  PLAINTEXT,
  ENCODED,
  MIXED 
}

export function getDocumentSummary(source: string): DocumentSummary {
  return DocumentSummary.MIXED;
}

export function encodeAll(source: string): string {
  return source;
}

export function decodeAll(source: string): string {
  return source;
}
