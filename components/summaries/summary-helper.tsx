export const parseSection=(section:string):{
    title:string,
    points:string[]
}=>{
    const [title, ...contentLines] = section.split('\n');
    const cleanTitle = title.startsWith('#') ? title.slice(1).trim() : title.trim();

    const points = contentLines
        .map(line => line.trim())
        .filter(line => line && line.startsWith('•'))
        .map(line => line.trim());

    return {
        title: cleanTitle,
        points: points.filter(point => point && !point.startsWith('#') && !point.startsWith('[Choose'))
    };
}


export function parsePoint(point: string) {
  const isNumbered = /^\d+\./.test(point);
  const isMainPoint = /^•/.test(point);
  // Replace the Unicode property escape with a simpler emoji detection
  const emojiRegex = /[\u{1F300}-\u{1F9FF}|[\u2600-\u26FF]/u;
  const hasEmoji = emojiRegex.test(point);
  const isEmpty = !point.trim();

  return { isNumbered, isMainPoint, hasEmoji, isEmpty };
}

export function parseEmojiPoint(content: string) {
  const cleanContent = content.replace(/^•\s*/, '').trim();

  const matches = cleanContent.match(/^(\p{Emoji}+)(.+)$/u);
  if (!matches) return null;

  const [, emoji, text] = matches;
  return {
    emoji: emoji.trim(),
    text: text.trim(),
  };
}