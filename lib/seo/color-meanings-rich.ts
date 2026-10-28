import type { ColorMeaningOverride } from "./content";

// Full, hand-written /color-meanings pages for named colors people actually search meanings
// for. Each one is about symbolism, history, culture and feeling, never codes or conversions
// (those live on /colors/<name>), and is written for its own color rather than from a shared
// template. A color listed here becomes indexable again (see isColorMeaningIndexable).
// Spiritual meanings are reported as what traditions and modern practice say, not as fact.

export const richColorMeanings: Record<string, ColorMeaningOverride> = {
  gold: {
    title: "Gold Color Meaning: Symbolism, Psychology & Spiritual Meaning",
    description:
      "What the color gold means: wealth, achievement and warmth, its place in weddings and religious art, how it makes people feel, and how to use it without looking gaudy.",
    answer:
      "Gold stands for wealth, success and achievement, and it carries more weight than most colors because it points to a real, precious metal. It also reads as warm and celebratory, and in religious art it signals the sacred. Used sparingly it feels premium; used everywhere it can feel showy.",
    authoredOnly: true,
    relatedLinks: [
      { title: "Gold color codes", href: "/colors/gold" },
    ],
    keyTakeaways: [
      "Gold means wealth, success and achievement because it points to a precious metal.",
      "It feels warm and celebratory, and in religious art it stands for divine light.",
      "In India and China gold is tied to weddings, festivals and prosperity.",
      "Use it as an accent with dark neutrals; large areas of gold tend to look gaudy.",
    ],
    sections: [
      {
        title: "Why gold means value",
        body: "Gold's meaning comes straight from the metal. It doesn't tarnish, it has always been scarce, and it has been money, jewelry and decoration for thousands of years, so the color borrowed that sense of lasting value. That's why first place gets a gold medal, why we talk about a gold standard or a golden opportunity, and why premium tiers are so often shown in gold.",
      },
      {
        title: "How gold makes people feel",
        body: "Gold feels warmer and richer than yellow: confident, generous and a little celebratory. Deep, metallic golds feel formal and established; bright, flat golds feel playful. The line between luxurious and gaudy is mostly about quantity. A thin gold rule on a dark page looks expensive, while a page covered in gold looks like it is trying too hard.",
      },
      {
        title: "Gold at weddings and festivals",
        body: "In India gold jewelry is central to weddings and to festivals such as Diwali and Akshaya Tritiya, when buying gold is considered auspicious. In Chinese tradition, gold paired with red signals prosperity and good luck, especially at New Year. In the West the fiftieth wedding anniversary is the golden anniversary.",
      },
      {
        title: "Gold and the sacred",
        body: "Medieval painters and icon makers used gold leaf for halos and backgrounds to show divine light, and many traditions link gold with the sun, enlightenment and the divine. In modern spiritual practice gold is often associated with wisdom, inner strength and abundance.",
      },
      {
        title: "Gold in branding and design",
        body: "Gold suits awards, premium memberships, luxury packaging and hospitality. It looks richest next to black, navy, deep green, burgundy and cream. On screens, the bright web gold is light and low in contrast against white, so it needs dark text, and designers often switch to deeper, more metallic golds or soft gradients when they want it to read as metal.",
      },
      {
        title: "Gold or yellow?",
        body: "Gold and yellow share a hue family but not a meaning. Yellow is about sunshine, attention and caution; gold is about value, reward and warmth. In practice gold is usually a little darker and more orange than yellow, and that small shift is enough to move it from a warning sign to a trophy.",
      },
    ],
    faq: [
      { question: "What does the color gold symbolize?", answer: "Wealth, success, achievement and lasting value, because of its link to the precious metal. It also stands for warmth, celebration and, in religious art, divine light." },
      { question: "What does gold mean spiritually?", answer: "In many traditions gold is tied to the sun, divine light and enlightenment, which is why halos and icon backgrounds were painted with gold leaf. Modern spiritual practice also connects it with wisdom and inner strength." },
      { question: "What emotions does gold evoke?", answer: "Confidence, celebration, warmth and a sense of reward. Too much gold can tip into feeling showy or excessive." },
      { question: "Is gold a lucky color?", answer: "In several cultures, yes. Gold, often with red, is linked with prosperity at Chinese New Year, and in India buying gold on festivals such as Akshaya Tritiya and Diwali is considered auspicious." },
      { question: "What colors go well with gold?", answer: "Black, navy, deep green, burgundy and cream make gold look richer. White gives a clean, modern look. Bright yellow next to gold tends to make it look flat." },
      { question: "What is the hex code for gold?", answer: "The web color named gold is #FFD700. For a less bright, more metallic gold, designers often use deeper tones such as #D4AF37 or #B8860B. The gold color page lists every code." },
    ],
  },
  silver: {
    title: "Silver Color Meaning: Symbolism & Psychology",
    description:
      "What silver means: modernity, elegance and reflection, its link to the moon, why 25th anniversaries are silver, and how to use it in design without it looking like plain gray.",
    answer:
      "Silver stands for elegance, modernity and reflection. Like gold it points to a precious metal, but it reads cooler and quieter: the moon, polished steel and new technology rather than treasure. It can also mean second place, as in a silver medal, and twenty-five years, as in a silver anniversary.",
    authoredOnly: true,
    relatedLinks: [
      { title: "Silver color codes", href: "/colors/silver" },
    ],
    keyTakeaways: [
      "Silver means elegance, modernity and reflection.",
      "It is tied to the moon, mirrors and calm, where gold is tied to the sun.",
      "It marks 25-year milestones and second place.",
      "On screens flat silver is just light gray, so it needs shine or context to read as metal.",
    ],
    sections: [
      {
        title: "Sleek, cool and modern",
        body: "Silver is the color of chrome, stainless steel, aluminum laptops and phones, and polished cars, so it signals precision, technology and modern design. It feels composed and cool rather than warm, which makes it look efficient and up to date, and occasionally a little distant.",
      },
      {
        title: "The moon and the mirror",
        body: "Many traditions pair silver with the moon the way they pair gold with the sun, and mirrors are traditionally backed with a thin layer of silver. Those two links give the color its reflective side: calm, intuition, night and looking inward rather than outward.",
      },
      {
        title: "Milestones and second place",
        body: "A silver wedding anniversary and a silver jubilee both mark twenty-five years. A silver medal means second place, close to the top but not quite. And a silver lining is the hopeful part of a bad situation, which gives the color a quietly optimistic side.",
      },
      {
        title: "How silver makes people feel",
        body: "Silver feels calm, clean and sophisticated. In large flat areas it can feel cold or impersonal, which is why silver interiors often bring in wood, leather or warm lighting. Its appeal depends on shine: the same color without a reflective surface simply reads as gray.",
      },
      {
        title: "Silver in branding and design",
        body: "Technology, automotive, premium electronics and jewelry brands lean on silver. It pairs well with navy, black, white, deep blue, purple and emerald. On a screen, flat silver is technically a light gray, so it only reads as metal with gradients, highlights or a clearly metallic context. It also needs dark text, because white text on silver is hard to read.",
      },
      {
        title: "Silver or gold?",
        body: "Gold is warm, festive and abundant; silver is cool, understated and modern. Gold says reward, silver says refinement. Many modern interiors and jewelry collections now mix the two, which works best when one metal clearly leads and the other is a small accent.",
      },
    ],
    faq: [
      { question: "What does the color silver symbolize?", answer: "Elegance, modernity, technology and reflection. It also marks milestones: a silver anniversary or jubilee celebrates twenty-five years." },
      { question: "What does silver mean spiritually?", answer: "In many traditions silver is linked with the moon, intuition and reflection, the cool counterpart to gold's sun. It is often associated with clarity and calm." },
      { question: "Is silver a cold color?", answer: "It leans cool. That makes it feel calm and modern, but large flat areas can feel impersonal; warm woods, leather or blush tones soften it." },
      { question: "What is the difference between silver and gray?", answer: "Silver implies shine and a metal surface; gray is the flat color. On a screen, silver (#C0C0C0) is technically a light gray and only reads as silver with gradients, highlights or a metallic context." },
      { question: "What colors go well with silver?", answer: "Navy, black, white, deep blue, purple and emerald. For warmth, pair it with blush, cognac or natural wood." },
    ],
  },
  lavender: {
    title: "Lavender Color Meaning: Symbolism & Spiritual Meaning",
    description:
      "What lavender means: calm, grace and nostalgia, its link to the plant and to LGBTQ+ history, its spiritual meaning, and how to use this soft purple.",
    answer:
      "Lavender is a pale purple that stands for calm, grace and gentleness. It takes its name and much of its meaning from the plant, which people associate with rest, clean linen and soothing scents. It also carries nostalgia and romance, and it has a long history as a color of LGBTQ+ identity.",
    authoredOnly: true,
    relatedLinks: [
      { title: "Lavender color codes", href: "/colors/lavender" },
    ],
    keyTakeaways: [
      "Lavender means calm, grace and gentleness, borrowed from the plant.",
      "It carries nostalgia and romance, and is a historic color of LGBTQ+ identity.",
      "In modern spiritual practice it's linked to intuition, peace and healing.",
      "The web color is very pale (#E6E6FA); the flower is deeper, around #B57EDC.",
    ],
    sections: [
      {
        title: "A color named after a plant",
        body: "The color is named after lavender, the herb grown across the Mediterranean and famous for the purple fields of Provence. Its scent has been used for centuries in soaps, sachets and linen cupboards, and today in sleep and relaxation products, so the color carries the same associations: clean, soothing and restful.",
      },
      {
        title: "How lavender makes people feel",
        body: "Lavender is softer and quieter than purple. It feels gentle, calm and a little dreamy, with a nostalgic, vintage edge, like old letters or a grandmother's garden. In Western marketing it is often coded as feminine, and it can feel sweet or wistful depending on what it is paired with.",
      },
      {
        title: "Lavender in LGBTQ+ history",
        body: "Lavender became linked with gay and lesbian identity in the twentieth century. The 1950s 'Lavender Scare' was the US government's purge of gay employees from federal jobs, and in 1970 lesbian activists in New York took the name 'Lavender Menace' to protest their exclusion from the women's movement. The color has stood for pride and visibility ever since.",
      },
      {
        title: "The spiritual side of lavender",
        body: "In modern spiritual practice purples, lavender included, are tied to intuition and spiritual awareness, and lighter purples to gentleness and healing. Combined with the plant's calming reputation, that makes lavender a popular color for meditation rooms, yoga studios and sleep spaces.",
      },
      {
        title: "Lavender in design",
        body: "Wellness, beauty, sleep and baby brands use lavender to feel calm and kind. It pairs well with sage green, cream, soft gray, navy and muted gold. One thing to know: the web color named lavender (#E6E6FA) is so pale it is almost white. The color most people picture, the flower, is deeper, around #B57EDC. Either way, use a dark purple or charcoal for text on it.",
      },
      {
        title: "Lavender, lilac or purple?",
        body: "All three are purples. Lavender is pale and leans slightly blue and gray; lilac is pinker and warmer; purple is deeper and more saturated. Lavender is the calmest of the three, which is why it so often turns up in rooms and products meant to help you slow down.",
      },
    ],
    faq: [
      { question: "What does the color lavender symbolize?", answer: "Calm, grace, gentleness and a soft kind of romance, much of it borrowed from the lavender plant and its soothing scent. It can also feel nostalgic and vintage." },
      { question: "What does lavender mean spiritually?", answer: "In modern spiritual practice lavender, like other purples, is linked with intuition, peace, healing and spiritual awareness. People often use it in meditation and sleep spaces." },
      { question: "What does lavender mean in the LGBTQ+ community?", answer: "Lavender has been tied to gay and lesbian identity since the twentieth century, from the 1950s 'Lavender Scare' to the 1970 lesbian activist group known as the Lavender Menace." },
      { question: "What is the difference between lavender and lilac?", answer: "Both are pale purples. Lavender leans slightly blue and gray; lilac leans pinker and warmer." },
      { question: "What colors go with lavender?", answer: "Sage green, cream, soft gray, navy and muted gold. For contrast, pair it with deep plum or charcoal text." },
    ],
  },
  turquoise: {
    title: "Turquoise Color Meaning: Symbolism & Spiritual Meaning",
    description:
      "What turquoise means: calm, clarity and protection, its role as a treasured stone in Native American and Persian cultures, its spiritual meaning, and how to use it.",
    answer:
      "Turquoise sits between blue and green and stands for calm, clarity, healing and protection. Its meaning comes from both the tropical sea and the stone it's named after, which has been treasured as a protective, lucky gem for thousands of years, from Persia and Tibet to the Native American peoples of the Southwest.",
    authoredOnly: true,
    relatedLinks: [
      { title: "Turquoise color codes", href: "/colors/turquoise" },
    ],
    keyTakeaways: [
      "Turquoise means calm, clarity, healing and protection.",
      "It's named after a stone treasured as protective in Persian, Tibetan and Native American cultures.",
      "It's a December birthstone and, in crystal practice, a stone of clear communication.",
      "On screens, use dark text on turquoise; white text is hard to read.",
    ],
    sections: [
      {
        title: "Named after a stone",
        body: "The word turquoise comes from the old French for 'Turkish', because the stone first reached Europe along Turkish trade routes. It was mined in Persia, in the Sinai by the ancient Egyptians, and in what is now the American Southwest, and each of those places gave the stone, and later the color, its own layers of meaning.",
      },
      {
        title: "A protective stone across cultures",
        body: "Among Southwest peoples such as the Navajo, Zuni and Pueblo, turquoise is a sacred stone used in jewelry and ceremony and associated with protection, health and good fortune. In Persia it decorated palaces and mosques, and in Tibet turquoise jewelry has long been prized. Few colors carry such a consistent meaning across such different cultures.",
      },
      {
        title: "How turquoise makes people feel",
        body: "Turquoise combines blue's calm with green's sense of balance, then adds brightness. The result feels fresh, clear and lively without being aggressive. For most people it also calls up tropical water and holidays, which is why it reads as relaxing and optimistic at the same time.",
      },
      {
        title: "The spiritual meaning of turquoise",
        body: "Turquoise is one of the birthstones for December. In crystal and chakra practice it is often linked with the throat chakra, speaking clearly and emotional balance, and it is still widely worn as a protective or good-luck stone, carrying forward the traditions of the cultures that first treasured it.",
      },
      {
        title: "Turquoise in design",
        body: "Travel, spa, wellness, summer and children's brands use turquoise, as does Southwest-style decor. Coral is its classic partner because the two sit roughly across the color wheel; white, sand, navy and gold also work well. On a screen, bright turquoise is light, so it needs dark text, while white text on it is hard to read.",
      },
      {
        title: "Turquoise, teal or aqua?",
        body: "These three blue-greens are easy to mix up. Turquoise is bright and fairly light; teal is deeper and more muted; aqua, or cyan, is lighter and bluer. If a color makes you think of a swimming pool or a tropical lagoon, it is probably turquoise.",
      },
    ],
    faq: [
      { question: "What does the color turquoise symbolize?", answer: "Calm, clarity, healing and protection. It mixes blue's calm with green's balance, and the stone it's named after has long been treated as a protective, lucky gem." },
      { question: "What does turquoise mean spiritually?", answer: "In many traditions the stone is protective and brings good fortune. In modern crystal and chakra practice turquoise is often linked with the throat chakra, speaking clearly and emotional balance." },
      { question: "Why is turquoise important in Native American culture?", answer: "Among Southwest peoples such as the Navajo, Zuni and Pueblo, turquoise is a sacred stone used in jewelry and ceremony and associated with protection, health and good fortune." },
      { question: "Is turquoise a birthstone?", answer: "Yes. Turquoise is one of the birthstones for December, along with zircon and tanzanite." },
      { question: "What colors go with turquoise?", answer: "Coral, white, sand, navy and gold. Coral is the classic pairing because it sits roughly across the color wheel." },
    ],
  },
  navy: {
    title: "Navy Blue Color Meaning: Symbolism & Psychology",
    description:
      "What navy blue means: authority, trust and calm confidence, where the name comes from, why it's the color of uniforms and suits, and how to use it.",
    answer:
      "Navy blue stands for authority, trust, stability and calm confidence. It takes its name from naval uniforms and still carries that disciplined, dependable feel. It's serious without the harshness of black, which is why it is so common in suits, uniforms and finance brands.",
    authoredOnly: true,
    relatedLinks: [
      { title: "Navy color codes", href: "/colors/navy" },
      { title: "Colors that go with navy blue", href: "/blog/colors-that-go-with-navy-blue" },
    ],
    keyTakeaways: [
      "Navy means authority, trust, stability and calm confidence.",
      "The name comes from naval uniforms; the Royal Navy adopted dark blue in 1748.",
      "It works as a dark neutral in fashion, interiors and web design.",
      "Too much navy can feel conservative; warm accents balance it.",
    ],
    sections: [
      {
        title: "Named after the navy",
        body: "In 1748 Britain's Royal Navy adopted dark blue coats for its officers, and the shade came to be called navy blue. Navies, police forces and airlines around the world later chose similar blues, which is how the color became shorthand for order, rank and service.",
      },
      {
        title: "How navy makes people feel",
        body: "Navy feels dependable, composed and competent. It has the seriousness of black but none of its severity, so it reads as approachable authority. Compared with brighter blues it feels older, steadier and less playful, which is exactly why people reach for it when they want to be taken seriously.",
      },
      {
        title: "The color of trust",
        body: "Business suits, school blazers, police uniforms, banks, law firms and insurers all lean on navy. It signals expertise without aggression: the message is 'you can rely on us', not 'look at us'. That quiet reliability is also why navy is a safe choice for a job interview.",
      },
      {
        title: "A dark neutral that goes with everything",
        body: "In fashion and interiors navy is treated almost like black, a dark neutral that pairs with nearly any color. With white and red it turns nautical; with camel and cream it turns classic; with mustard, coral or orange it turns bold. Our guide to colors that go with navy blue, linked below, covers eighteen of those pairings.",
      },
      {
        title: "Navy in branding and design",
        body: "Finance, insurance, healthcare and corporate brands use navy as a primary color, and it works just as well as a text color. White text on navy has very high contrast, so it is a reliable choice for headers and buttons. The web color named navy (#000080) is a pure, fully saturated blue; many brands prefer a softer, grayer navy such as #1F2A44.",
      },
      {
        title: "When navy works against you",
        body: "The same qualities that make navy trustworthy can make it feel conservative or corporate when it dominates. A navy-only brand can look interchangeable with every bank. One warm accent, such as mustard, coral or camel, keeps navy confident without letting it become cold.",
      },
    ],
    faq: [
      { question: "What does navy blue symbolize?", answer: "Authority, trust, stability, discipline and calm confidence. It's serious like black but feels more approachable." },
      { question: "Why is it called navy blue?", answer: "Because of naval uniforms. The British Royal Navy adopted dark blue coats for its officers in 1748, and the shade became known as navy blue." },
      { question: "What does wearing navy blue say about a person?", answer: "Navy usually reads as dependable, competent and composed, which is why it is a classic choice for job interviews and business suits." },
      { question: "Is navy blue a neutral?", answer: "In fashion and interiors it's treated as a dark neutral, because it goes with almost every color, from white and camel to mustard and coral." },
      { question: "What is the hex code for navy blue?", answer: "The web color named navy is #000080. Many brands use a softer, grayer navy such as #1F2A44. The navy color page lists every code." },
    ],
  },
  maroon: {
    title: "Maroon Color Meaning: Symbolism & Psychology",
    description:
      "What maroon means: strength, ambition and quiet sophistication, where the name comes from, why universities and monks wear it, and how it differs from burgundy.",
    answer:
      "Maroon is a deep brownish red that stands for strength, ambition, seriousness and quiet sophistication. It keeps some of red's passion but tones down the urgency, so it feels mature and grounded rather than loud. It's a traditional color in universities, sport and Buddhist robes.",
    authoredOnly: true,
    relatedLinks: [
      { title: "Maroon color codes", href: "/colors/maroon" },
    ],
    keyTakeaways: [
      "Maroon means strength, ambition and quiet sophistication.",
      "Its name comes from the French word for chestnut.",
      "It's a traditional color of universities, sports teams and Tibetan Buddhist robes.",
      "Maroon is browner than burgundy and darker than crimson.",
    ],
    sections: [
      {
        title: "A color named after chestnuts",
        body: "Maroon comes from the French marron, meaning chestnut, after the deep brownish red of the nut's skin. English speakers started using it as a color name in the late 1700s, and the brown in it is still what separates maroon from other deep reds.",
      },
      {
        title: "How maroon makes people feel",
        body: "Maroon feels warm, serious and self-assured. It has red's energy and passion, but held in check, so it comes across as controlled ambition rather than alarm. In large amounts it can feel heavy or old-fashioned; in the right dose it feels confident and established.",
      },
      {
        title: "School colors and team colors",
        body: "Plenty of American universities and sports teams wear maroon, including Texas A&M and the University of Chicago. On a jersey or a crest it signals tradition, pride and endurance, a color that has been around long enough to earn respect.",
      },
      {
        title: "Maroon robes",
        body: "Monks in Tibetan and Burmese Buddhist traditions wear maroon or deep red robes. The robes are a sign of renunciation and a simple life rather than a fashion choice, which adds a contemplative, disciplined layer to the color's meaning.",
      },
      {
        title: "Maroon in branding and design",
        body: "Wine, luxury goods, law, education and autumn campaigns use maroon. It pairs well with cream, gold, navy, charcoal, blush and sage; cream and gold give it a classic, collegiate look. White text on maroon is very easy to read, so it works for headers, badges and buttons.",
      },
      {
        title: "Maroon, burgundy or crimson?",
        body: "These deep reds are often confused. Maroon leans brown, like chestnut. Burgundy leans purple, like the red wine it's named after. Crimson is brighter and a little bluer, closer to a true red. Of the three, maroon is the most earthy and understated.",
      },
    ],
    faq: [
      { question: "What does the color maroon symbolize?", answer: "Strength, ambition, seriousness and quiet confidence. It has red's warmth and passion, toned down into something steadier and more mature." },
      { question: "What is the difference between maroon and burgundy?", answer: "Maroon leans brown, like chestnut; burgundy leans purple, like red wine. Both are deep reds." },
      { question: "Why do Buddhist monks wear maroon?", answer: "Monks in Tibetan and Burmese Buddhist traditions wear maroon or deep red robes as a sign of renunciation and a simple life." },
      { question: "Is maroon a warm color?", answer: "Yes. It's a dark red with brown in it, so it reads warm, but its depth makes it calmer than bright red." },
      { question: "What colors go with maroon?", answer: "Cream, gold, navy, charcoal, blush and sage. Gold and cream give it a classic, collegiate look." },
    ],
  },
  indigo: {
    title: "Indigo Color Meaning: Symbolism & Spiritual Meaning",
    description:
      "What indigo means: intuition, depth and wisdom, its history as a precious dye behind blue jeans, why Newton put it in the rainbow, and its spiritual meaning.",
    answer:
      "Indigo is a deep blue-violet that stands for intuition, depth, wisdom and focus. It comes from one of the world's oldest dyes, made from the indigo plant, and it sits in the rainbow because Isaac Newton named it as one of seven colors. In modern spiritual practice it's tied to the third eye and inner insight.",
    authoredOnly: true,
    relatedLinks: [
      { title: "Indigo color codes", href: "/colors/indigo" },
    ],
    keyTakeaways: [
      "Indigo means intuition, depth, wisdom and focus.",
      "It's named after one of the oldest dyes, still used for blue jeans.",
      "Newton put it in the rainbow as one of seven colors.",
      "In modern chakra systems it's the color of the third eye.",
    ],
    sections: [
      {
        title: "A color named after a dye",
        body: "Indigo dye comes from plants of the Indigofera family and has been used for thousands of years across India, Africa, Asia and the Americas. It was valuable enough to be called 'blue gold' in the trade with Europe. Today it is the dye behind blue jeans, which makes indigo one of the most worn colors in the world.",
      },
      {
        title: "Why indigo is in the rainbow",
        body: "When Isaac Newton split sunlight with a prism, he named seven colors, adding indigo between blue and violet partly to match the seven notes of the musical scale. Many people today can't pick out a separate indigo band, which is why its place in the rainbow is still debated, but the name stuck.",
      },
      {
        title: "How indigo makes people feel",
        body: "Indigo feels deep, quiet and introspective, like the sky just after dusk. It suggests concentration and seriousness rather than cheerfulness. In large amounts it can feel mysterious or heavy; as an accent it adds depth and a sense of calm focus.",
      },
      {
        title: "The spiritual meaning of indigo",
        body: "In modern chakra systems indigo is the color of the third eye, the sixth chakra, which is linked with intuition, perception and imagination. That's why indigo shows up so often in meditation apps, wellness branding and anything that wants to suggest inner wisdom.",
      },
      {
        title: "Indigo in design",
        body: "Tech, education, finance and night-mode interfaces use deep indigo because it is rich without being as cold as navy. It pairs well with gold, coral, cream, silver and soft lavender; indigo and gold is a classic, luxurious combination. White text on indigo is very easy to read.",
      },
      {
        title: "Indigo, navy or violet?",
        body: "Indigo sits between blue and violet. Navy is a dark blue with no purple in it; violet is lighter and clearly purple. The web color named indigo (#4B0082) leans noticeably toward purple, while denim indigo leans toward blue, so the word covers a range rather than one exact shade.",
      },
    ],
    faq: [
      { question: "What does the color indigo symbolize?", answer: "Intuition, depth, wisdom, focus and integrity. Its darkness makes it feel calm and introspective, like the night sky." },
      { question: "What does indigo mean spiritually?", answer: "In modern chakra systems indigo is the color of the third eye, the sixth chakra, linked with intuition, perception and imagination. It's often used in meditation." },
      { question: "Is indigo blue or purple?", answer: "In between. Indigo is a deep blue with violet in it; the web color indigo (#4B0082) leans clearly toward purple, while denim indigo leans blue." },
      { question: "Why is indigo in the rainbow?", answer: "Isaac Newton named seven colors in the spectrum, including indigo, partly to match the seven notes of the musical scale. Many people today see it as just a band of deep blue." },
      { question: "What colors go with indigo?", answer: "Gold, coral, cream, silver and soft lavender. Indigo and gold is a classic, rich pairing." },
    ],
  },
  violet: {
    title: "Violet Color Meaning: Symbolism & Spiritual Meaning",
    description:
      "What violet means: imagination, spirituality and dignity, its place at the end of the rainbow, its link to royalty and the suffragettes, and its spiritual meaning.",
    answer:
      "Violet stands for imagination, spirituality, dignity and creativity. It's the last color of the rainbow, with the shortest wavelength we can see, and it shares purple's long link with royalty and the sacred. The flower that gave it its name adds a gentler, more modest side.",
    authoredOnly: true,
    relatedLinks: [
      { title: "Violet color codes", href: "/colors/violet" },
    ],
    keyTakeaways: [
      "Violet means imagination, spirituality, dignity and creativity.",
      "It's the end of the visible spectrum, just before ultraviolet.",
      "It shares purple's royal history and was a suffragette color.",
      "In modern chakra systems it's linked with the crown chakra.",
    ],
    sections: [
      {
        title: "The end of the rainbow",
        body: "Violet has the shortest wavelength of any color we can see, at the far end of the spectrum. Just beyond it is ultraviolet, light our eyes can't detect at all. That position at the edge of what is visible is part of why violet so often stands for the mysterious and the spiritual.",
      },
      {
        title: "Royalty and the sacred",
        body: "In the ancient world purple dyes were rare and expensive, so purples, violet among them, became the colors of emperors and royalty. In Christian tradition purple and violet are the liturgical colors of Advent and Lent, seasons of reflection, which links the color with seriousness and devotion as well as rank.",
      },
      {
        title: "The flower and modesty",
        body: "Violet is also a small, low-growing flower, and in Victorian flower language violets stood for modesty and faithfulness. That's where the phrase 'shrinking violet' for a shy person comes from, and it gives the color a softer, more humble side next to its royal one.",
      },
      {
        title: "Violet and the suffragettes",
        body: "From 1908 the Women's Social and Political Union in Britain used purple, white and green as its colors: purple for dignity, white for purity and green for hope. Violet and purple have been associated with women's rights movements ever since.",
      },
      {
        title: "The spiritual meaning of violet",
        body: "In modern chakra systems violet is the color of the crown chakra, linked with spiritual awareness and connection to something larger than yourself. That's why violet and purple light up so many meditation, healing and spiritual spaces.",
      },
      {
        title: "Violet in design",
        body: "Creative, beauty, wellness and spiritual brands use violet to feel imaginative and a little magical. Soft yellow sits opposite it on the color wheel and makes it pop; sage, cream, silver and deep green also work. Note that the web color named violet (#EE82EE) is a light, pinkish purple, not the deep spectral violet, so it needs dark text.",
      },
    ],
    faq: [
      { question: "What does the color violet symbolize?", answer: "Imagination, spirituality, dignity and creativity. Through the flower it can also stand for modesty and faithfulness." },
      { question: "What does violet mean spiritually?", answer: "In modern chakra systems violet is the color of the crown chakra, linked with spiritual awareness and connection. It's widely used in meditation and healing spaces." },
      { question: "What is the difference between violet and purple?", answer: "Violet is a spectral color at the end of the rainbow, leaning blue; purple is a mix of red and blue and can lean redder. In everyday speech the words often overlap." },
      { question: "Why was violet a suffragette color?", answer: "From 1908 the Women's Social and Political Union used purple, white and green: purple for dignity, white for purity and green for hope." },
      { question: "What colors go with violet?", answer: "Soft yellow, sage, cream, silver and deep green. Yellow sits opposite violet on the color wheel and makes it pop." },
    ],
  },
  magenta: {
    title: "Magenta Color Meaning: Symbolism & Psychology",
    description:
      "What magenta means: creativity, confidence and nonconformity, why it isn't in the rainbow, how a battle gave it its name, and how to use it.",
    answer:
      "Magenta stands for creativity, confidence, nonconformity and emotional energy. It's a vivid purplish red that your brain creates from red and blue light, which is why it has no place in the rainbow. It feels bold, playful and a little rebellious.",
    authoredOnly: true,
    relatedLinks: [
      { title: "Magenta color codes", href: "/colors/magenta" },
    ],
    keyTakeaways: [
      "Magenta means creativity, confidence and nonconformity.",
      "It isn't in the rainbow; your brain makes it from red and blue light.",
      "It's named after the 1859 Battle of Magenta in Italy.",
      "On screens, magenta and fuchsia are the same color: #FF00FF.",
    ],
    sections: [
      {
        title: "The color the rainbow leaves out",
        body: "No single wavelength of light looks magenta. When your eyes receive red and blue light without green, your brain fills the gap with this vivid purple-pink. That's why magenta isn't in the rainbow, and why on a color wheel it's the color that joins the red end of the spectrum back to the blue end.",
      },
      {
        title: "Named after a battle",
        body: "The dye behind the name was first called fuchsine. It was renamed magenta after the Battle of Magenta in northern Italy in 1859, the year it was introduced, and the name stuck to the color long after the battle was forgotten.",
      },
      {
        title: "How magenta makes people feel",
        body: "Magenta mixes red's passion with purple's imagination. It feels energetic, confident, playful and unconventional, a color for people who don't mind standing out. In large doses it can feel loud or exhausting, which is why it usually works best as a strong accent.",
      },
      {
        title: "A primary color of print",
        body: "Magenta is the M in CMYK, one of the three colored inks every printer uses. On screens it is made by running red and blue at full strength with no green. So even people who never choose it see it every day, hidden inside printed photos and packaging.",
      },
      {
        title: "Magenta in branding and design",
        body: "Beauty, fashion, music, entertainment and telecom brands use magenta to look bold and modern; Deutsche Telekom and T-Mobile are known for it. It pairs with black, white, navy, teal and lime for a vivid look, or with soft gray and cream to calm it down. Dark text reads better on bright magenta than white text does.",
      },
      {
        title: "Magenta, fuchsia or hot pink?",
        body: "On screens, magenta and fuchsia are literally the same color: the web color names both mean #FF00FF. In fashion and paint, fuchsia often describes a slightly pinker shade, and hot pink is lighter and less purple than either.",
      },
    ],
    faq: [
      { question: "What does the color magenta symbolize?", answer: "Creativity, confidence, nonconformity and emotional energy. It combines red's passion with purple's imagination." },
      { question: "Why is magenta not in the rainbow?", answer: "No single wavelength of light looks magenta. Your brain creates it when your eyes get red and blue light without green, so it sits outside the rainbow." },
      { question: "Is magenta the same as fuchsia?", answer: "On screens, yes: the web color names magenta and fuchsia both mean #FF00FF. In paint and fashion, fuchsia is often used for a slightly pinker shade." },
      { question: "Where does the name magenta come from?", answer: "The dye was named after the Battle of Magenta in northern Italy in 1859, the year it was introduced." },
      { question: "What colors go with magenta?", answer: "Black, white, navy, teal and lime for a bold look; soft gray or cream to calm it down." },
    ],
  },
  coral: {
    title: "Coral Color Meaning: Symbolism & Psychology",
    description:
      "What coral means: warmth, optimism and playfulness, its link to the sea and to Pantone's Living Coral, and how to use this pink-orange in design and fashion.",
    answer:
      "Coral is a warm pink-orange that stands for warmth, optimism, playfulness and sociability. It's named after the sea creatures that build reefs, so it also carries a tropical, summery feel. It's friendlier than red and softer than orange, which makes it an easy accent for fashion, homes and brands.",
    authoredOnly: true,
    relatedLinks: [
      { title: "Coral color codes", href: "/colors/coral" },
    ],
    keyTakeaways: [
      "Coral means warmth, optimism, playfulness and sociability.",
      "Its name and summery feel come from coral reefs.",
      "Pantone made Living Coral its 2019 Color of the Year.",
      "On screens, use dark text on coral, or a deeper coral for white-text buttons.",
    ],
    sections: [
      {
        title: "Named after the reef",
        body: "The color is named after coral, the colonies of tiny sea animals that build reefs, and especially the pink-orange coral long used in jewelry. Because of that, the color calls up warm water, beaches and summer for most people, even when it's used far from the sea.",
      },
      {
        title: "How coral makes people feel",
        body: "Coral feels friendly, upbeat and inviting. It has orange's energy and pink's softness, so it comes across as cheerful without being aggressive. It's a sociable color, the kind used to make a brand or a room feel welcoming and young at heart.",
      },
      {
        title: "Living Coral",
        body: "Pantone named Living Coral (PANTONE 16-1546) its Color of the Year for 2019. The choice brought the shade into fashion, beauty and product design for a season, and it's still one of the most recognizable warm accents of the last decade.",
      },
      {
        title: "Coral as a charm",
        body: "Red coral has been worn as a protective charm in Mediterranean cultures for centuries, and in Vedic astrology it is the gemstone associated with Mars. Coral is also a traditional gift for a thirty-fifth wedding anniversary, which gives the color a quietly lucky, celebratory side.",
      },
      {
        title: "Coral in fashion and design",
        body: "Coral is a summer favorite in fashion and a popular accent in kitchens, cushions and children's rooms. Navy and coral is a classic nautical pairing; turquoise and coral feel tropical; mint, white, sand and gold also work. On a screen, white text on bright coral is hard to read, so use dark text, or deepen the coral for buttons.",
      },
      {
        title: "Coral, salmon or peach?",
        body: "Coral is the most saturated of the three, a clear pink-orange. Salmon is lighter and pinker, like the fish. Peach is paler and more orange-beige. Coral is the one that still reads as a confident color rather than a soft neutral.",
      },
    ],
    faq: [
      { question: "What does the color coral symbolize?", answer: "Warmth, optimism, playfulness and friendliness. Because of its link with reefs and the sea, it also feels summery and tropical." },
      { question: "Is coral pink or orange?", answer: "Both. Coral is a pink-orange; the web color coral (#FF7F50) leans orange, while some fashion corals lean pinker." },
      { question: "What does coral mean spiritually?", answer: "Red coral has long been worn as a protective charm in Mediterranean cultures and is the Vedic astrology gemstone for Mars. The color itself is linked with warmth, vitality and emotional openness." },
      { question: "What colors go with coral?", answer: "Navy, turquoise, mint, white, sand and gold. Navy and coral is a classic nautical pairing; turquoise and coral feel tropical." },
      { question: "Was coral a Pantone Color of the Year?", answer: "Yes. Pantone named Living Coral (PANTONE 16-1546) its Color of the Year for 2019." },
    ],
  },
  beige: {
    title: "Beige Color Meaning: Symbolism & Psychology",
    description:
      "What beige means: calm, simplicity and reliability, where the name comes from, why it's the default neutral in homes and quiet fashion, and how to keep it from feeling dull.",
    answer:
      "Beige stands for calm, simplicity, comfort and reliability. It's a pale sandy neutral named after undyed wool, so it feels natural, warm and unfussy. It rarely draws attention to itself, which makes it a dependable background and, if overused, a little bland.",
    authoredOnly: true,
    relatedLinks: [
      { title: "Beige color codes", href: "/colors/beige" },
    ],
    keyTakeaways: [
      "Beige means calm, simplicity, comfort and reliability.",
      "The name comes from the French word for undyed wool.",
      "It's a default neutral in homes and a staple of quiet, minimal fashion.",
      "Add one strong accent so beige reads calm rather than dull.",
    ],
    sections: [
      {
        title: "Named after undyed wool",
        body: "Beige is a French word for the natural color of wool that hasn't been bleached or dyed, and it came into English as a color name in the late 1800s. That origin is still part of its meaning: beige feels natural, honest and unprocessed.",
      },
      {
        title: "How beige makes people feel",
        body: "Beige feels calm, safe and cozy. It's warmer than white and softer than gray, so it makes a space or a design feel relaxed without demanding attention. The flip side is that a world made entirely of beige can feel dull or overly cautious.",
      },
      {
        title: "Why homes love beige",
        body: "Beige has been a go-to wall and furniture color for decades because it works with almost any floor, wood or fabric and suits buyers and renters with very different tastes. In recent years warm neutrals like beige and greige have also been replacing the cool grays that dominated interiors for a long time.",
      },
      {
        title: "Beige in fashion",
        body: "Trench coats, linen, knitwear and tailored trousers have made beige a fashion staple. It's central to minimal, 'quiet luxury' and capsule wardrobes, where the point is clothes that look expensive and timeless rather than loud.",
      },
      {
        title: "Beige in branding and design",
        body: "Skincare, sustainable products, minimal brands and hospitality use beige to feel calm and natural. On screens it makes a soft, warm background behind dark text, and it needs a deeper accent color for buttons and links. The web color named beige (#F5F5DC) is very pale and slightly yellow; many design beiges are warmer, closer to sand.",
      },
      {
        title: "Beige, tan, cream or ivory?",
        body: "Beige is a sandy color with a touch of gray. Tan is darker and browner. Cream is paler and more yellow, like dairy cream. Ivory is whiter than all of them. If a color looks like a linen shirt or a sandy beach, it's beige.",
      },
    ],
    faq: [
      { question: "What does the color beige symbolize?", answer: "Calm, simplicity, comfort and dependability. As a natural, undyed-looking color it also suggests honesty and a lack of fuss." },
      { question: "Is beige a warm or cool color?", answer: "Usually warm. Beige is a pale sandy color with yellow and a little gray in it; some greige mixes lean cooler." },
      { question: "What is the difference between beige and cream?", answer: "Cream is paler and more yellow, like dairy cream; beige is sandier with a touch of gray. Ivory is whiter than both." },
      { question: "Why is beige so popular in homes?", answer: "It's warm, easy to live with and works with almost any furniture or flooring, so it suits buyers and renters with different tastes." },
      { question: "What colors go with beige?", answer: "White, navy, olive, sage, terracotta, black and soft blue. One deep accent keeps a beige room or brand from feeling flat." },
    ],
  },
  olive: {
    title: "Olive Color Meaning: Symbolism & Psychology",
    description:
      "What olive green means: peace, wisdom and resilience, from the olive branch to army uniforms, how it feels, and how to use it in design and fashion.",
    answer:
      "Olive is a muted yellow-green that stands for peace, wisdom, resilience and a grounded connection to nature. It carries the ancient symbolism of the olive branch and the practical toughness of military olive drab, so it feels earthy, calm and dependable.",
    authoredOnly: true,
    relatedLinks: [
      { title: "Olive color codes", href: "/colors/olive" },
    ],
    keyTakeaways: [
      "Olive means peace, wisdom, resilience and a grounded link to nature.",
      "Its symbolism comes from the olive branch and the olive wreaths of ancient Greece.",
      "Military olive drab gave it a tough, practical side.",
      "It pairs well with cream, terracotta, mustard and rust.",
    ],
    sections: [
      {
        title: "The olive branch",
        body: "The olive branch has been a symbol of peace since ancient times. In the story of Noah a dove returns with an olive leaf as a sign the flood is over, and in ancient Greece winners at the Olympic Games were crowned with olive wreaths. Offering an olive branch still means making peace.",
      },
      {
        title: "From uniforms to everyday wear",
        body: "Olive drab was the standard color of US Army uniforms and equipment through the Second World War and long after, because it blended into landscapes. That gave olive a tough, practical and dependable side, which lives on in utility jackets, cargo pants and outdoor gear.",
      },
      {
        title: "How olive makes people feel",
        body: "Olive feels grounded, calm, natural and a little mature. It's less fresh and bright than leaf green, more like the dusty green of olive groves. In large amounts it can feel somber or military; with warm partners it feels earthy and welcoming.",
      },
      {
        title: "The Mediterranean connection",
        body: "Olive trees, olive oil and the food and homes of the Mediterranean give the color a sun-warmed, rustic and healthy feel. That's why food, wellness and natural-living brands often reach for olive when they want to suggest something wholesome and unhurried.",
      },
      {
        title: "Olive in branding and design",
        body: "Sustainable, outdoor, organic and menswear brands use olive to feel natural and durable. It pairs well with cream, terracotta, mustard, rust, navy and blush; olive and terracotta is a classic earthy combination. On screens, check the contrast before putting text on olive, since mid olives sit close to the limit for both dark and white text.",
      },
      {
        title: "Olive, sage or khaki?",
        body: "Olive is a darker, warmer yellow-green. Sage is grayer, lighter and cooler. Khaki is lighter still and closer to sand or beige. Olive and khaki both trace back to military uniforms, but olive is the greener and more dramatic of the two.",
      },
    ],
    faq: [
      { question: "What does the color olive symbolize?", answer: "Peace, wisdom, resilience and harmony with nature. The olive branch has been a sign of peace since ancient times." },
      { question: "Is olive green a warm or cool color?", answer: "Olive is a warm green, because it has a lot of yellow in it. That's why it pairs so well with earthy reds and browns." },
      { question: "What does olive green mean spiritually?", answer: "Through the olive branch and the dove in the story of Noah, olive is tied to peace, renewal and hope. It's also seen as a color of quiet wisdom." },
      { question: "What is the difference between olive and khaki?", answer: "Olive is a darker, greener yellow-green; khaki is lighter and closer to beige or sand. Both trace back to military uniforms." },
      { question: "What colors go with olive green?", answer: "Cream, white, terracotta, mustard, rust, navy and blush. Olive and terracotta is a classic earthy pairing." },
    ],
  },
};
