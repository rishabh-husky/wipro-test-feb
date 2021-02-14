import { Request, Response } from "express";

export enum resourceTypes {
  fetch = "fetch",
  document = "document",
  other = "other",
  stylesheet = "stylesheet",
  image = "image",
  script = "script",
  font = "font",
}

export interface HARRequest {
  method: string;
  url: string;
}

export interface HARResponse {
  status: number;
  statusText: string;
  headers: Array<any>;
  content: any;
}

export interface HAREntryInterface {
  _resourceType: resourceTypes;
  request: HARRequest;
  response: HARResponse;
}

export class HARFormat {
  log: {
    version: string;
    entries: Array<HAREntryInterface>;
    creator: any;
    pages: Array<any>;
  } = {
    version: "",
    entries: [],
    pages: [],
    creator: {},
  };
}
