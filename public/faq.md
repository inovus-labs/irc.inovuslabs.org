# IRC @ Inovus Labs — Frequently Asked Questions

A plain-markdown copy of the FAQ also published as `FAQPage` JSON-LD on the homepage. Stable URL: https://irc.inovuslabs.org/faq.md

---

## Who is the Inovus Labs IRC server for?

It is a private learning environment for fellows of Inovus Labs. The goal is hands-on exposure to Internet Relay Chat — its protocol, behaviour, and legacy as one of the original real-time messaging systems on the internet. It is **not** a general-purpose public IRC network.

## Is the Inovus Labs IRC server open to the general public?

No. The server exists for Inovus Labs fellows to experiment with IRC firsthand. It is not advertised as a public chat service and is not intended as a community for general users.

## Will this IRC server be available long-term?

There is no long-term guarantee. Compute is a constrained resource at Inovus Labs, and the server may be decommissioned once fellows have had enough opportunity to explore IRC. Treat it as a provisional, educational deployment.

## How do fellows connect to the Inovus Labs IRC server?

Use any IRC client that supports TLS. Connect to `irc.inovuslabs.org` on port `6697` with SSL/TLS enabled, then join `#lobby`.

With WeeChat:

```
/server add inovus irc.inovuslabs.org/6697 -ssl -nicks=yourname
/connect inovus
/join #lobby
```

## What is the IRC server address and port?

The server is `irc.inovuslabs.org` on port `6697` (TLS only). The IRCS protocol URL is `ircs://irc.inovuslabs.org:6697`.

## Does the Inovus Labs IRC server support TLS/SSL?

Yes — port 6697 is TLS-only. Plaintext IRC (port 6667) is not offered. All clients must connect with SSL/TLS enabled.

## What is the default channel?

`#lobby` is the main channel where fellows gather to try out IRC commands and chat. It is meant for exploration and casual experimentation, not scheduled meetings.

## Which IRC client should fellows use?

Any standards-compliant client with TLS support works. The site documents WeeChat (recommended for terminal users) on macOS (`brew`), Linux (`apt`), and Windows (`choco`). irssi, HexChat, and modern web clients also work.

## Do fellows need to register a nickname?

No registration is required. Fellows pick a nick when they connect (the `-nicks=yourname` flag in WeeChat).

## Who runs the Inovus Labs IRC server?

It is operated by [Inovus Labs](https://inovuslabs.org) as an internal educational deployment for its fellows — a way to give them practical exposure to IRC rather than just reading about it.

---

License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Attribute "Inovus Labs (irc.inovuslabs.org)".
