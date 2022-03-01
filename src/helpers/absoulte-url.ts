import { IncomingMessage } from "http";

type AbsoluteURLReturn = {
  protocol: string;
  host: string;
  origin: string;
};

export function absoluteUrl(
  req: IncomingMessage,
  localhostAddress?: string
): AbsoluteURLReturn {
  if (localhostAddress === void 0) {
    localhostAddress = "localhost:3000";
  }
  var _a: any;
  var host =
    (((_a = req) === null || _a === void 0 ? void 0 : _a.headers)
      ? req.headers.host
      : window.location.host) || localhostAddress;
  var protocol = /^localhost(:\d+)?$/.test(host) ? "http:" : "https:";
  if (
    req &&
    req.headers["x-forwarded-host"] &&
    typeof req.headers["x-forwarded-host"] === "string"
  ) {
    host = req.headers["x-forwarded-host"];
  }
  if (
    req &&
    req.headers["x-forwarded-proto"] &&
    typeof req.headers["x-forwarded-proto"] === "string"
  ) {
    protocol = req.headers["x-forwarded-proto"] + ":";
  }
  return {
    protocol: protocol,
    host: host,
    origin: protocol + "//" + host,
  };
}
