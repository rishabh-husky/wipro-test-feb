import {
  HAREntryInterface,
  HARRequest,
  HARResponse,
  resourceTypes,
} from "./types/har.types";

export default class HAREntry implements HAREntryInterface {
  constructor(
    public _resourceType: resourceTypes,
    public request: HARRequest,
    public response: HARResponse
  ) {}

  getHost() {
    const url = new URL(this.request.url);
    return url.hostname;
  }

  getResponseStatusCode() {
    return this.response?.status;
  }

  getResponseMethod(): string {
    return this.request?.method;
  }

  isErroneous() {
    return this.response.status === 500;
  }

  getResponseBody() {
    return this.response?.content;
  }
}
