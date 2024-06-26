import {parse, stringify} from 'yaml';


function baseDecode(source: string): string {
  return atob(source);
}

function baseEncode(source: string): string {
  return btoa(source);
}

function isEncoded(source: string): boolean {
  try {
    baseDecode(source);
    return true;
  } catch (ex) {
    return false;
  }
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

function runForAll(source: string, op: Function, filterOp: Function): string {
  console.groupCollapsed(`runForAll(${op.name})`);

  const doc = parse(source);
  if (!('data' in doc)) {
    console.warn("Data not found in doc")
    return source;
  }

  for(const key in doc.data) {
    const value = doc.data[key];
    console.warn("Processing key: ", key, " value: ", value)
    if (filterOp(value)) {
      console.info("Converting value: ", value)
      doc.data[key] = op(value);
    }
  }
  console.groupEnd();
  return stringify(doc);
}

export function encodeAll(source: string): string {
  return runForAll(source, baseEncode, (v: string) => !isEncoded(v));
}

export function decodeAll(source: string): string {
  return runForAll(source, baseDecode, (v: string) => isEncoded(v));
}
