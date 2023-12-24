const CARD_STYLES = [
  { ko: "귀여운", en: "Cute" },
  { ko: "정직한", en: "Honest" },
  { ko: "레트로", en: "Retro" },
  { ko: "모던", en: "Modern" },
  { ko: "아트", en: "Artistic" },
  { ko: "클래식", en: "Classic" },
  { ko: "유니크", en: "Unique" },
  { ko: "컬러풀", en: "Colorful" },
  { ko: "세련된", en: "Sophisticated" },
  { ko: "아름다운", en: "Beautiful" },
  { ko: "몽환적인", en: "Dreamy" },
  { ko: "세레모니얼", en: "Ceremonial" },
  { ko: "우아한", en: "Elegant" },
  { ko: "시크", en: "Chic" },
  { ko: "화려한", en: "Glamorous" },
  { ko: "심플", en: "Simple" },
  { ko: "모던 빈티지", en: "Modern Vintage" },
  { ko: "팝 아트", en: "Pop Art" },
  { ko: "로맨틱", en: "Romantic" },
  { ko: "청량한", en: "Refreshing" },
  { ko: "모험적인", en: "Adventurous" },
  { ko: "포근한", en: "Cozy" },
  { ko: "우스꽝스러운", en: "Whimsical" },
  { ko: "편안한", en: "Relaxed" },
  { ko: "고전적인", en: "Classic" },
  { ko: "파스텔", en: "Pastel" },
  { ko: "콘서버티브", en: "Conservative" },
  { ko: "유니버셜", en: "Universal" },
  { ko: "힙스터", en: "Hipster" },
  { ko: "미니멀리스트", en: "Minimalist" },
];

const CARD_MESSAGES = [
  { ko: "새해 복 많이 받아! 🎉", en: "Happy New Year! 🎉" },
  {
    ko: "행복 가득한 새해 되길! 🥳",
    en: "Wishing you a Happy New Year filled with happiness. 🥳",
  },
  {
    ko: "건강과 행복이 가득한 새해 되길! 🌟",
    en: "May the New Year be filled with health and happiness. 🌟",
  },
  {
    ko: "새로운 시작의 기회가 찾아온다! 🚀",
    en: "A chance for new beginnings is coming your way. 🚀",
  },
  {
    ko: "2024년이 행운 가득한 해가 되길 기원해! 🍀",
    en: "Wishing you a year filled with good luck in 2024. 🍀",
  },
  {
    ko: "가족과 함께 행복한 시간 보내! ❤️",
    en: "Enjoy happy times with your family. ❤️",
  },
  {
    ko: "모든 소원이 이루어지길 바라! 🌠",
    en: "May all your wishes come true. 🌠",
  },
  {
    ko: "새해에는 더 많은 성취와 행운이 있길 바라봐! 🌈",
    en: "Looking forward to more achievements and luck in the New Year. 🌈",
  },
  {
    ko: "모든 일이 원하는 대로 잘 풀리길 바라! 🌟",
    en: "May everything go your way. 🌟",
  },
  {
    ko: "새로운 시작, 새로운 기회야! 🎈",
    en: "New beginnings, new opportunities! 🎈",
  },
  {
    ko: "뜻하는 모든 것들이 이루어질 거야. 🌟",
    en: "Everything you wish for will come true. 🌟",
  },
  {
    ko: "새해에는 모든 것이 더 잘될 거야. 🚀",
    en: "Everything will be better in the New Year. 🚀",
  },
  {
    ko: "행운과 행복이 가득한 한 해가 되길 바라! 🌟",
    en: "Wishing you a year full of luck and happiness. 🌟",
  },
  {
    ko: "새해에는 믿음과 희망을 갖고 진전을 이루어봐! 🌈",
    en: "Have faith and hope for progress in the New Year. 🌈",
  },
  {
    ko: "더 많은 사랑과 웃음이 있는 해가 되길 바라! ❤️",
    en: "Wishing you a year filled with more love and laughter. ❤️",
  },
  {
    ko: "사랑하는 가족과 함께 특별한 순간을 만들어봐! 🥰",
    en: "Create special moments with your loved ones. 🥰",
  },
  {
    ko: "새해에는 더 많은 성공과 행운이 함께 하길 바라! 🌟",
    en: "May more success and luck be with you in the New Year. 🌟",
  },
  {
    ko: "행복한 순간을 만들어봐! 🌟",
    en: "Let's create happy moments! 🌟",
  },
  {
    ko: "새해에는 새로운 모험을 찾아보자! 🚀",
    en: "Discover new adventures in the New Year. 🚀",
  },
  {
    ko: "행복이 항상 당신과 함께하기를 바라! ❤️",
    en: "Wishing happiness always be with you. ❤️",
  },
  {
    ko: "새해에는 건강과 행복이 함께 하길 바라! 🌟",
    en: "May health and happiness be with you in the New Year. 🌟",
  },
  {
    ko: "모든 꿈이 이루어질 거야. 🌠",
    en: "All your dreams will come true. 🌠",
  },
  {
    ko: "새해에는 더 많은 성취를 경험해봐! 🌟",
    en: "Experience more achievements in the New Year. 🌟",
  },
  {
    ko: "행운의 별이 항상 당신과 함께 하길 바라! ⭐",
    en: "May the lucky star always be with you. ⭐",
  },
  {
    ko: "새해 복 많이 받아! 🎉",
    en: "May you have a Happy New Year! 🎉",
  },
  {
    ko: "2024년이 밝고 행복한 해가 되길 바라! 🌟",
    en: "Wishing you a bright and happy year in 2024. 🌟",
  },
  {
    ko: "새해에는 모든 일이 원하는 대로 풀릴 거야. 🌈",
    en: "In the New Year, everything will go your way. 🌈",
  },
  {
    ko: "새해에는 믿음과 희망을 갖고 진전을 이루어봐! 🚀",
    en: "Have faith and hope for progress in the New Year. 🚀",
  },
];

const getRandomMessage = () =>
  CARD_MESSAGES[Math.floor(Math.random() * CARD_MESSAGES.length)];

export { getRandomMessage, CARD_STYLES, CARD_MESSAGES };
