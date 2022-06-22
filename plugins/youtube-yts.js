import { youtubeSearch } from "@bochilteam/scraper";
let handler = async (m, { text }) => {
  if (!text) throw "Cari apa?";
  const { video, channel } = await youtubeSearch(text);
  let teks = [...channel, ...video]
    .map((v) => {
      switch (v.type) {
        case "channel":
          return `
📌 *${v.channelName}* (${v.url})
🧑‍🤝‍🧑 _${v.subscriberH} (${v.subscriber}) Subscriber_
🎥 ${v.videoCount} video
`.trim();
        case "video":
          return `
📌 *${v.title}* (${v.url})
⌚ Duration: ${v.durationH}
⏲️ Uploaded ${v.publishedTime}
👁️ ${v.view} views
      `.trim();
      }
    })
    .filter((v) => v)
    .join("\n\n========================\n\n");
  m.reply(teks);
};
handler.help = ["", "earch"].map((v) => "yts" + v + " <pencarian>");
handler.tags = ["tools"];
handler.command = /^yts(earch)?$/i;

export default handler;