import { HAREntryInterface } from "./types/har.types";
import HAREntry from "./HAREntry";

export default class HAREntries {
  constructor(private entries: Array<HAREntryInterface>) {}

  getResults() {
    const result: {
      hostsKey: any;
      count: number;
      diffStatusKey: any;
      erroneousResHost: any;
    } = {
      hostsKey: {},
      count: 0,
      diffStatusKey: {},
      erroneousResHost: [],
    };
    const entries = this.entries.forEach((entry: HAREntryInterface) => {
      const entryInstance: HAREntry = new HAREntry(
        // eslint-disable-next-line no-underscore-dangle
        entry._resourceType,
        entry.request,
        entry.response
      );
      result.hostsKey[entryInstance.getHost()] = "";
      result.count += 1;
      result.diffStatusKey[entryInstance.getResponseStatusCode()] = "";
      if (entryInstance.isErroneous()) {
        result.erroneousResHost.push({
          host: entryInstance.getHost(),
          body: entryInstance.getResponseBody(),
        });
      }
    });
    return result;
  }
}
