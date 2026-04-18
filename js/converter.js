// ============================================================
// BOLD TEXT GENERATOR — Unicode conversion engine
// ============================================================

const BoldConverter = (() => {
  // Unicode offset maps for each style
  const STYLES = [
    {
      id: 'sans-bold',
      name: '𝗦𝗮𝗻𝘀-𝗦𝗲𝗿𝗶𝗳 Bold',
      label: 'Sans-Serif Bold',
      emoji: '🅱',
      desc: 'Clean modern bold — perfect for Instagram bios, Twitter, LinkedIn posts.',
      upper: 0x1D5D4,
      lower: 0x1D5EE,
      digits: 0x1D7EC,
    },
    {
      id: 'serif-bold',
      name: '𝐒𝐞𝐫𝐢𝐟 Bold',
      label: 'Serif Bold',
      emoji: '📖',
      desc: 'Classic serif bold — great for Facebook posts and formal announcements.',
      upper: 0x1D400,
      lower: 0x1D41A,
      digits: 0x1D7CE,
    },
    {
      id: 'serif-bold-italic',
      name: '𝑺𝒆𝒓𝒊𝒇 Bold Italic',
      label: 'Serif Bold Italic',
      emoji: '✍️',
      desc: 'Elegant bold italic — stunning for quotes, captions, and creative writing.',
      upper: 0x1D468,
      lower: 0x1D482,
      digits: null,
    },
    {
      id: 'sans-bold-italic',
      name: '𝘼𝙡𝙡 Bold Italic Sans',
      label: 'Sans Bold Italic',
      emoji: '🎯',
      desc: 'Modern slanted bold — eye-catching for social media stories and highlights.',
      upper: 0x1D63C,
      lower: 0x1D656,
      digits: null,
    },
    {
      id: 'fraktur-bold',
      name: '𝔅𝔬𝔩𝔡 𝔉𝔯𝔞𝔨𝔱𝔲𝔯',
      label: 'Bold Fraktur',
      emoji: '⚜️',
      desc: 'Gothic blackletter — dramatic and artistic for creative profiles.',
      upper: 0x1D56C,
      lower: 0x1D586,
      digits: null,
    },
    {
      id: 'double-struck',
      name: 'ℂ𝕠𝕟𝕥𝕠𝕦𝕣𝕖𝕕',
      label: 'Double-Struck',
      emoji: '🔲',
      desc: 'Outlined double-struck style — unique and standout on any platform.',
      upper: 0x1D538,
      lower: 0x1D552,
      digits: 0x1D7D8,
      exceptions: {
        C: 'ℂ', H: 'ℍ', N: 'ℕ', P: 'ℙ', Q: 'ℚ', R: 'ℝ', Z: 'ℤ',
      },
    },
    {
      id: 'script-bold',
      name: '𝓑𝓸𝓵𝓭 𝓢𝓬𝓻𝓲𝓹𝓽',
      label: 'Bold Script',
      emoji: '🖋️',
      desc: 'Flowing cursive bold — beautiful for personal branding and bios.',
      upper: 0x1D4D0,
      lower: 0x1D4EA,
      digits: null,
    },
    {
      id: 'circled',
      name: 'Ⓒⓘⓡⓒⓛⓔⓓ Ⓣⓔⓧⓣ',
      label: 'Circled Text',
      emoji: '⭕',
      desc: 'Fun circled letters — quirky and distinctive for Discord and social posts.',
      circled: true,
    },
    {
      id: 'squared',
      name: '🄱🄾🄻🄳 🅂🅀🅄🄰🅁🄴🄳',
      label: 'Squared Text',
      emoji: '🟦',
      desc: 'Square-enclosed letters — geometric style for headers and emphasis.',
      squared: true,
    },
    {
      id: 'fullwidth',
      name: 'Ｆｕｌｌ　Ｗｉｄｔｈ',
      label: 'Full-Width',
      emoji: '📐',
      desc: 'Wide spaced aesthetic text — popular for Japanese-inspired aesthetics.',
      fullwidth: true,
    },
    {
      id: 'inverted',
      name: 'pǝʇɹǝʌuI ʇxǝ⊥',
      label: 'Upside Down',
      emoji: '🙃',
      desc: 'Flipped upside-down text — fun and playful for humorous posts.',
      inverted: true,
    },
    {
      id: 'strikethrough',
      name: 'S̶t̶r̶i̶k̶e̶t̶h̶r̶o̶u̶g̶h̶',
      label: 'Strikethrough',
      emoji: '❌',
      desc: 'Crossed-out style — perfect for making a point or dramatic effect.',
      combining: '\u0336',
    },
    {
      id: 'underline',
      name: 'U̲n̲d̲e̲r̲l̲i̲n̲e̲d̲',
      label: 'Underlined Bold',
      emoji: '📏',
      desc: 'Underlined text using Unicode combining — great for emphasis anywhere.',
      combining: '\u0332',
    },
    {
      id: 'wide-bold',
      name: '🅦🅘🅓🅔 🅑🅞🅛🅓',
      label: 'Negative Squared',
      emoji: '🔳',
      desc: 'High contrast negative squared — bold and dramatic on any background.',
      negSquared: true,
    },
  ];

  // Circled alphabet
  const circledUpper = 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ'.split('');
  const circledLower = 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ'.split('');
  const circledDigits = '⓪①②③④⑤⑥⑦⑧⑨'.split('');

  const squaredUpper = '🄰🄱🄲🄳🄴🄵🄶🄷🄸🄹🄺🄻🄼🄽🄾🄿🅀🅁🅂🅃🅄🅅🅆🅇🅈🅉'.split('');

  const fullwidthUpper = 'ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ'.split('');
  const fullwidthLower = 'ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ'.split('');
  const fullwidthDigits = '０１２３４５６７８９'.split('');

  const invertedMap = {
    a:'ɐ',b:'q',c:'ɔ',d:'p',e:'ǝ',f:'ɟ',g:'ƃ',h:'ɥ',i:'ᴉ',j:'ɾ',k:'ʞ',l:'l',
    m:'ɯ',n:'u',o:'o',p:'d',q:'b',r:'ɹ',s:'s',t:'ʇ',u:'n',v:'ʌ',w:'ʍ',x:'x',
    y:'ʎ',z:'z',A:'∀',B:'ᗺ',C:'Ɔ',D:'ᗡ',E:'Ǝ',F:'Ⅎ',G:'פ',H:'H',I:'I',
    J:'ſ',K:'ʞ',L:'˥',M:'W',N:'N',O:'O',P:'Ԁ',Q:'Q',R:'ᴚ',S:'S',T:'┴',
    U:'∩',V:'Λ',W:'M',X:'X',Y:'⅄',Z:'Z',
    '0':'0','1':'Ɩ','2':'ᄅ','3':'Ɛ','4':'ᔭ','5':'ϛ','6':'9','7':'ㄥ','8':'8','9':'6',
    '!':'¡','?':'¿','.':'˙',',':'\'','\'':',','(':')',')':'(','[':']',']':'[',
    '{':'}','}':'{','<':'>','>':'<','&':'⅋',
  };

  const negSquaredUpper = '🅐🅑🅒🅓🅔🅕🅖🅗🅘🅙🅚🅛🅜🅝🅞🅟🅠🅡🅢🅣🅤🅥🅦🅧🅨🅩'.split('');

  function charToCodePoint(ch) {
    return ch.codePointAt(0);
  }

  function convertWithOffsets(text, style) {
    let result = '';
    for (const ch of text) {
      const code = charToCodePoint(ch);
      if (code >= 65 && code <= 90) { // A-Z
        if (style.exceptions && style.exceptions[ch]) {
          result += style.exceptions[ch];
        } else {
          result += String.fromCodePoint(style.upper + (code - 65));
        }
      } else if (code >= 97 && code <= 122) { // a-z
        result += String.fromCodePoint(style.lower + (code - 97));
      } else if (code >= 48 && code <= 57 && style.digits) { // 0-9
        result += String.fromCodePoint(style.digits + (code - 48));
      } else {
        result += ch;
      }
    }
    return result;
  }

  function convertCircled(text) {
    let result = '';
    for (const ch of text) {
      const code = charToCodePoint(ch);
      if (code >= 65 && code <= 90) result += circledUpper[code - 65];
      else if (code >= 97 && code <= 122) result += circledLower[code - 97];
      else if (code >= 48 && code <= 57) result += circledDigits[code - 48];
      else result += ch;
    }
    return result;
  }

  function convertSquared(text) {
    let result = '';
    for (const ch of text) {
      const code = charToCodePoint(ch);
      if (code >= 65 && code <= 90) result += squaredUpper[code - 65];
      else if (code >= 97 && code <= 122) result += squaredUpper[code - 97];
      else result += ch;
    }
    return result;
  }

  function convertNegSquared(text) {
    let result = '';
    for (const ch of text) {
      const code = charToCodePoint(ch);
      if (code >= 65 && code <= 90) result += negSquaredUpper[code - 65];
      else if (code >= 97 && code <= 122) result += negSquaredUpper[code - 97];
      else result += ch;
    }
    return result;
  }

  function convertFullwidth(text) {
    let result = '';
    for (const ch of text) {
      const code = charToCodePoint(ch);
      if (code >= 65 && code <= 90) result += fullwidthUpper[code - 65];
      else if (code >= 97 && code <= 122) result += fullwidthLower[code - 97];
      else if (code >= 48 && code <= 57) result += fullwidthDigits[code - 48];
      else if (ch === ' ') result += '\u3000';
      else result += ch;
    }
    return result;
  }

  function convertInverted(text) {
    let result = '';
    const chars = [...text].reverse();
    for (const ch of chars) {
      result += invertedMap[ch] || ch;
    }
    return result;
  }

  function convertCombining(text, combiner) {
    let result = '';
    for (const ch of text) {
      if (ch !== ' ') result += ch + combiner;
      else result += ch;
    }
    return result;
  }

  function convert(text, style) {
    if (!text) return '';
    if (style.circled) return convertCircled(text);
    if (style.squared) return convertSquared(text);
    if (style.negSquared) return convertNegSquared(text);
    if (style.fullwidth) return convertFullwidth(text);
    if (style.inverted) return convertInverted(text);
    if (style.combining) return convertCombining(text, style.combining);
    return convertWithOffsets(text, style);
  }

  function convertAll(text) {
    return STYLES.map(style => ({
      ...style,
      output: convert(text, style),
    }));
  }

  return { STYLES, convert, convertAll };
})();
