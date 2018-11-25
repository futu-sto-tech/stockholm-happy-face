const randomNumber = (min_value, max_value) => {
  const random_number = Math.random() * (max_value - min_value) + min_value;
  return Math.floor(random_number);
};
const randomArrayItem = array => array[randomNumber(0, array.length)];
const shuffleArray = array => {
  const newArray = [...array];

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

export default count => {
  const goodCount = [...Array(count / 2).keys()];
  const goodEmoji = goodCount.map(() => {
    const randomItem = randomArrayItem(EMOJIS.good);
    return randomItem;
  });

  const badCount = [...Array(count / 4).keys()];
  const badEmoji = badCount.map(() => randomArrayItem(EMOJIS.bad));

  const randomCount = [...Array(count / 4).keys()];
  const randomEmoji = randomCount.map(() => randomArrayItem(EMOJIS.random));

  return shuffleArray([...goodEmoji, ...badEmoji, ...randomEmoji]);
};

export const EMOJIS = {
  good: [
    "😀",
    "😁",
    "😂",
    "🤣",
    "😃",
    "😄",
    "😅",
    "😆",
    "😉",
    "😊",
    "😋",
    "😎",
    "😍",
    "😘",
    "😙",
    "😚",
    "🙂",
    "🤗",
    "🤩",
    "😌",
    "😇",
    "🤠",
    "🤓",
    "😺",
    "😸",
    "😹",
    "😻",
    "💃",
    "🕺",
    "🙌",
    "👏",
    "🤝",
    "👍",
    "✌️",
    "🤟",
    "👌",
    "💪",
    "🙏",
    "💋",
    "👑",
    "⛑",
    "🦄",
    "🦅",
    "🦉",
    "🦑",
    "🕊",
    "☃️",
    "🌈",
    "☀️",
    "🍾",
    "🍹",
    "🧘‍♀️",
    "🧘‍♂️",
    "🏆",
    "🎨",
    "🎰",
    "🎯",
    "🎳",
    "🥇",
    "🚀",
    "💎",
    "❤️"
  ],
  bad: [
    "🤔",
    "🤨",
    "😐",
    "😑",
    "😶",
    "😣",
    "😥",
    "🤐",
    "😪",
    "😫",
    "😴",
    "😛",
    "😒",
    "😓",
    "😔",
    "😕",
    "☹️",
    "🙁",
    "😖",
    "😞",
    "😟",
    "😢",
    "😭",
    "😧",
    "😨",
    "😩",
    "😰",
    "😱",
    "😳",
    "😵",
    "😡",
    "😠",
    "🤬",
    "😷",
    "🤒",
    "🤕",
    "🤢",
    "🤮",
    "🤧",
    "🤥",
    "💩",
    "🙀",
    "😿",
    "😾",
    "🤦‍♀️",
    "🤦‍♂️",
    "🙅‍♀️",
    "🙅‍♂️",
    "👎",
    "🖕",
    "🌪",
    "💥",
    "🌧",
    "⛈",
    "☔️",
    "🥊",
    "🚨",
    "🌋",
    "⚰️",
    "💔",
    "🗯"
  ],
  random: [
    "🙄",
    "😏",
    "😮",
    "😜",
    "😝",
    "🤤",
    "🙃",
    "🤑",
    "😲",
    "😤",
    "🤯",
    "😬",
    "🤪",
    "🤡",
    "🤫",
    "🤭",
    "🧐",
    "😈",
    "👻",
    "👽",
    "🤖",
    "🤞",
    "🖖",
    "🤙",
    "👀",
    "🐲",
    "🔥",
    "🍺",
    "🎲",
    "🛩",
    "💭"
  ]
};
