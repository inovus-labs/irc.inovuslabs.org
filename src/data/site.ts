export const site = {
  network: "inovuslabs",
  host: "irc.inovuslabs.org",
  tlsPort: "6697",
  defaultChannel: "#lobby",
  url: "https://irc.inovuslabs.org",
  ogImage: "https://irc.inovuslabs.org/branding/og-image.png",
  parentUrl: "https://inovuslabs.org",
  parentName: "Inovus Labs",
  datePublished: "2026-04-22",
  dateModified: "2026-04-29",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  licenseName: "CC BY 4.0",
} as const;

export interface FaqItem {
  q: string;
  a: string;
}

export const faq: FaqItem[] = [
  {
    q: "Who is the Inovus Labs IRC server for?",
    a: "It is a private learning environment for fellows of Inovus Labs. The goal is hands-on exposure to Internet Relay Chat — its protocol, behaviour, and legacy as one of the original real-time messaging systems on the internet. It is not a general-purpose public IRC network.",
  },
  {
    q: "Is the Inovus Labs IRC server open to the general public?",
    a: "No. The server exists for Inovus Labs fellows to experiment with IRC firsthand. It is not advertised as a public chat service and is not intended as a community for general users.",
  },
  {
    q: "Will this IRC server be available long-term?",
    a: "There is no long-term guarantee. Compute is a constrained resource at Inovus Labs, and the server may be decommissioned once fellows have had enough opportunity to explore IRC. Treat it as a provisional, educational deployment.",
  },
  {
    q: "How do fellows connect to the Inovus Labs IRC server?",
    a: "Use any IRC client that supports TLS. Connect to irc.inovuslabs.org on port 6697 with SSL/TLS enabled, then join the #lobby channel. With WeeChat: /server add inovus irc.inovuslabs.org/6697 -ssl -nicks=yourname, then /connect inovus, then /join #lobby.",
  },
  {
    q: "What is the IRC server address and port?",
    a: "The server is irc.inovuslabs.org on port 6697 (TLS only). The IRCS protocol URL is ircs://irc.inovuslabs.org:6697.",
  },
  {
    q: "Does the Inovus Labs IRC server support TLS/SSL?",
    a: "Yes — port 6697 is TLS-only. Plaintext IRC (port 6667) is not offered. All clients must connect with SSL/TLS enabled.",
  },
  {
    q: "What is the default channel?",
    a: "#lobby is the main channel where fellows gather to try out IRC commands and chat. It is meant for exploration and casual experimentation, not scheduled meetings.",
  },
  {
    q: "Which IRC client should fellows use?",
    a: "Any standards-compliant client with TLS support works. The site documents WeeChat (recommended for terminal users) on macOS (brew), Linux (apt), and Windows (choco). irssi, HexChat, and modern web clients also work.",
  },
  {
    q: "Do fellows need to register a nickname?",
    a: "No registration is required. Fellows pick a nick when they connect (the -nicks=yourname flag in WeeChat).",
  },
  {
    q: "Who runs the Inovus Labs IRC server?",
    a: "It is operated by Inovus Labs (inovuslabs.org) as an internal educational deployment for its fellows — a way to give them practical exposure to IRC rather than just reading about it.",
  },
];

export interface HowToStep {
  name: string;
  text: string;
  code?: string;
}

export const howToSteps: HowToStep[] = [
  {
    name: "Install WeeChat",
    text: "Install the WeeChat IRC client on your operating system. macOS: brew install weechat. Linux (Debian/Ubuntu): sudo apt install weechat. Windows: choco install weechat -y.",
    code: "brew install weechat",
  },
  {
    name: "Add the Inovus server",
    text: "In WeeChat, register the Inovus IRC server with TLS enabled and your chosen nickname.",
    code: "/server add inovus irc.inovuslabs.org/6697 -ssl -nicks=yourname",
  },
  {
    name: "Connect to the server",
    text: "Open the connection to the Inovus IRC server.",
    code: "/connect inovus",
  },
  {
    name: "Join the lobby channel",
    text: "Join the #lobby channel and send your first message.",
    code: "/join #lobby",
  },
];

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
