export const site = {
  network: "inovuslabs",
  host: "irc.inovuslabs.org",
  tlsPort: "6697",
  defaultChannel: "#lobby",
  url: "https://irc.inovuslabs.org",
  ogImage: "https://irc.inovuslabs.org/og.png",
  parentUrl: "https://inovuslabs.org",
  parentName: "Inovus Labs",
} as const;

export const youNick = "arjun";

export type MemberColor = "u1" | "u2" | "u3" | "u4" | "u5" | "u6";

export interface Member {
  nick: string;
  color: MemberColor;
  op?: boolean;
}

export const members: Member[] = [
  { nick: "arjun", color: "u1", op: true },
  { nick: "amith", color: "u2" },
  { nick: "sane", color: "u3", op: true },
  { nick: "nikhil", color: "u4" },
];

export const commands = [
  { cmd: `/nick ${youNick}`, desc: "Change your visible name (nickname)" },
  { cmd: "/part #channel", desc: "Leave the current channel window" },
  { cmd: "/msg amith hey there", desc: "Send a private one-to-one message" },
  { cmd: "/me waves", desc: "Post an action message (third-person style)" },
  { cmd: `/topic ${site.defaultChannel} weekly meet 7pm`, desc: "Change the channel topic (if allowed)" },
  { cmd: "/whois sane", desc: "Show basic details about a user" },
  { cmd: "/names", desc: "List everyone in this channel" },
  { cmd: "/quit catch you later", desc: "Disconnect from IRC cleanly" },
];

type ChatExtras = { group?: string };

export type ChatLine =
  | ({ type: "sys"; text: string; ts: string; arrow?: "in" | "out" } & ChatExtras)
  | ({ type: "join"; who: string; ts: string } & ChatExtras)
  | ({ type: "part"; who: string; ts: string; reason?: string } & ChatExtras)
  | ({ type: "topic"; by: string; text: string; ts: string } & ChatExtras)
  | ({ type: "msg"; who: string; text: string; ts: string } & ChatExtras)
  | ({ type: "action"; who: string; text: string; ts: string } & ChatExtras);

export const chatScript: ChatLine[] = [
  { type: "sys", arrow: "in", text: `connected to ${site.host}/${site.tlsPort}`, ts: "14:02", group: "boot" },
  { type: "sys", text: `you are now known as ${youNick}`, ts: "14:02", group: "boot" },
  { type: "join", who: "arjun", ts: "14:02", group: "boot" },
  {
    type: "topic",
    by: "sane",
    text: `inovus public IRC · ${site.host} · Thu 7pm · kiosk`,
    ts: "14:02",
    group: "boot",
  },
  { type: "join", who: "amith", ts: "14:02", group: "boot" },
  { type: "join", who: "nikhil", ts: "14:02", group: "boot" },
  { type: "join", who: "sane", ts: "14:02", group: "boot" },
  { type: "msg", who: "sane", text: `#lobby is low-noise on purpose — good for pings between ${site.parentName} meets`, ts: "14:03", group: "a" },
  {
    type: "msg",
    who: "amith",
    text: "visitor-facing kiosk is kiosk.inovuslabs.org — wrong copy there is a bug, not a shrug",
    ts: "14:03",
    group: "a",
  },
  {
    type: "msg",
    who: "nikhil",
    text: `Thu 7pm is the informal sync unless the topic drifts · same hostname (${site.host})`,
    ts: "14:03",
    group: "a",
  },
  { type: "msg", who: "amith", text: "lurking is fine — /msg nick if you want a side thread", ts: "14:03", group: "b" },
  { type: "msg", who: "sane", text: "bring rough demos and unclear questions; polished silence is what we're avoiding", ts: "14:04", group: "b" },
  { type: "msg", who: "nikhil", text: "if something's misbehaving (this room, site, kiosk) say so — we only fix what we hear about", ts: "14:04", group: "c" },
  { type: "msg", who: "arjun", text: `got it — I'll stay in ${site.defaultChannel} for a bit`, ts: "14:04", group: "d" },
  { type: "action", who: "amith", text: "waves", ts: "14:04", group: "e" },
  { type: "msg", who: "sane", text: "if you drop, reconnect to the same host — your client usually remembers the channel list", ts: "14:05", group: "f" },
  { type: "msg", who: "nikhil", text: "I'm on WeeChat here; anything with TLS + server password field works for this setup", ts: "14:05", group: "f" },
  {
    type: "msg",
    who: "amith",
    text: "worst bug is forgetting to `/join` and wondering why nobody answers",
    ts: "14:05",
    group: "f",
  },
  {
    type: "msg",
    who: "arjun",
    text: "reasonable — anything I should avoid pasting here vs DMs?",
    ts: "14:06",
    group: "g",
  },
  {
    type: "msg",
    who: "sane",
    text: "public channel paste: snippets and logs OK; secrets and keys belong in `/msg` or elsewhere",
    ts: "14:06",
    group: "g",
  },
  { type: "msg", who: "nikhil", text: "Pastebin links > walls of XML in channel — saves scrollback for humans", ts: "14:06", group: "g" },
  { type: "action", who: "sane", text: "nods", ts: "14:07", group: "h" },
  {
    type: "msg",
    who: "amith",
    text: "when you're done testing, `/quit bye` beats yanking wifi — netsplit theatre is noisy",
    ts: "14:07",
    group: "h",
  },
  {
    type: "msg",
    who: "nikhil",
    text: "topic bar is pinned at the top in most GUIs · same Thu 7pm note you saw on join",
    ts: "14:07",
    group: "h",
  },
  {
    type: "msg",
    who: "arjun",
    text: "perfect — I'll lurk unless something breaks · thanks all",
    ts: "14:08",
    group: "i",
  },
  { type: "action", who: "amith", text: "salutes", ts: "14:08", group: "i" },
];

export function colorFor(nick: string): MemberColor {
  return members.find((m) => m.nick === nick)?.color ?? "u1";
}
