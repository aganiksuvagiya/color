import type { ColorMeaningOverride } from "./content";

// Full, hand-written /color-meanings pages for named colors people actually search meanings
// for. Each one is about symbolism, history, culture and feeling; codes and conversions live on
// /colors/<name> (at most a one-line FAQ answer here when people ask for them), and each page is
// written for its own color rather than from a shared template. A color listed here becomes indexable again (see isColorMeaningIndexable).
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
  // Base hues. These three had the most question searches in Search Console ("what does white
  // represent", "what does black symbolize", "what does yellow mean"), so each FAQ also answers
  // the code question in one line and points to the /colors page for the rest.
  white: {
    title: "White Color Meaning: What White Symbolizes",
    description:
      "What the color white means: purity, cleanliness and new beginnings in the West, mourning in much of Asia, weddings, religion, and how white feels in design.",
    answer:
      "White stands for purity, cleanliness, peace and new beginnings in most Western cultures, which is why it is the color of wedding dresses, doctors' coats and flags of truce. In surveys in Europe and the United States, people link it most with perfection, goodness, honesty and the new. But its meaning isn't universal: in China, Korea and other parts of Asia, white is the traditional color of mourning.",
    authoredOnly: true,
    keyTakeaways: [
      "In the West, white means purity, cleanliness, peace, honesty and new beginnings.",
      "In China, Korea and many other Asian cultures, white is the color of mourning and funerals.",
      "The white wedding dress became popular after Queen Victoria wore white lace in 1840.",
      "White is achromatic: it has no hue and reflects all visible wavelengths, so it's the lightest color but not a vivid one.",
    ],
    sections: [
      {
        title: "What does white represent?",
        body: "In Western cultures white represents purity, innocence, cleanliness, peace and a fresh start. In surveys in Europe and the United States it is the color most often linked with perfection, the good, honesty, cleanliness, the beginning, the new, neutrality and exactness. That's why we talk about a clean slate or a white lie (a harmless one), why hospitals and labs are white, and why a white flag is the sign of truce. White also feels calm and open, because it gives the eye nothing to compete with.",
      },
      {
        title: "White in history and religion",
        body: "White has been a sacred and official color for thousands of years. In ancient Egypt and Rome, priestesses wore white as a sign of purity, and Roman citizens wore white togas. The pope has worn white since 1566. Pilgrims in Islam and in Japan's Shinto religion wear white, and in India white stands for purity, divinity, detachment and serenity. Many religions use white for baptism, festivals and their most important ceremonies.",
      },
      {
        title: "White at weddings, and at funerals",
        body: "The white wedding dress is younger than it seems. Royal brides wore white before, but most women married in their best dress of any color until Queen Victoria wore a white lace gown in 1840, which set the fashion in Europe and America. In Japan, too, white is the most common wedding color. Yet in China, Korea and other Asian countries white, more precisely the off-white of undyed linen, is the traditional color of mourning and funerals. Even in Europe, widows often wore white for mourning until the 16th century.",
      },
      {
        title: "Is white a color?",
        body: "Yes, though a special one. White is achromatic: it has no hue at all, like black and gray. A white surface reflects and scatters almost all visible wavelengths of light, and white light from the sun or a screen contains every color mixed together; on a screen it's red, green and blue light at full strength. So white is the lightest possible color, but not a vibrant one, because vibrancy comes from saturation and white has none.",
      },
      {
        title: "How white feels in design",
        body: "White space is what makes a design feel calm, premium and easy to read. Luxury brands, galleries and tech products use a lot of it so that type, photos and products carry the message. Too much pure white can feel cold or clinical, which is why many designers prefer a warm off-white or ivory for large areas. For global audiences, remember that a white-and-black design can read as a funeral announcement in parts of Asia.",
      },
    ],
    faq: [
      { question: "What does white represent?", answer: "In Western cultures, purity, cleanliness, peace, honesty and new beginnings. In surveys it's the color most linked with perfection and the good." },
      { question: "What does the color white symbolize in other cultures?", answer: "In China, Korea and other parts of Asia it is the traditional color of mourning. In India it symbolizes purity, divinity and serenity, and in Japan it's also the usual wedding color." },
      { question: "Is white a color?", answer: "Yes. It's an achromatic color, with no hue, like black and gray. White light contains all visible colors, and a white surface reflects them all." },
      { question: "Is white a bright color?", answer: "White is the lightest color there is, so it's bright, but it isn't vibrant: it has no saturation. Vivid colors look brighter against it." },
      { question: "Why do brides wear white?", answer: "Mostly because of Queen Victoria, who wore a white lace gown in 1840 and set the fashion. Before that, most brides wore their best dress of any color." },
      { question: "What is the color code for white?", answer: "White is #FFFFFF (shorthand #FFF), RGB 255, 255, 255 and CMYK 0, 0, 0, 0. Off-whites such as ivory #FFFFF0 have a slight tint." },
    ],
  },
  black: {
    title: "Black Color Meaning: What Black Symbolizes",
    description:
      "What the color black means: power, elegance, mourning and mystery, its history from ancient Egypt to Chanel, and whether black is a color or a shade.",
    answer:
      "Black stands for power, elegance, authority and formality, and also for mourning, mystery and the unknown. In surveys in Europe and North America it is the color most linked with mourning, the end, secrets, magic, force and elegance. Its meaning has swung over time: ancient Egyptians saw black as the color of fertile soil and life, while Rome made it the color of mourning, and Coco Chanel made it the height of style.",
    authoredOnly: true,
    keyTakeaways: [
      "Black means power, elegance, authority and formality, but also mourning, mystery and fear.",
      "In ancient Egypt black was positive: the color of the fertile Nile soil.",
      "Judges' robes, formal suits and the little black dress all come from black's link with dignity and restraint.",
      "Black is achromatic: the absence or full absorption of visible light. Adding black to a hue makes a shade.",
    ],
    sections: [
      {
        title: "What does black represent?",
        body: "Black represents power, seriousness, sophistication and formality, and it is the classic color of elegance. It also stands for darkness, death and mourning, secrets and mystery, and sometimes fear or evil. In surveys in Europe and North America, black is the color most often linked with mourning, the end, secrets, magic, force, violence, fear, evil and elegance. Which side shows depends on context: a black evening dress feels refined, a black cloud feels threatening.",
      },
      {
        title: "Black in history",
        body: "Black is one of the oldest colors in art: Neolithic cave painters used charcoal. For the ancient Egyptians it was positive, the color of the rich black soil left by the Nile floods and therefore of fertility and life. The ancient Greeks linked it with the underworld, and in the Roman Empire it became the color of mourning. In the 14th century black became the color of royalty, clergy, judges and officials in much of Europe, a sign of dignity and restraint. That's why judges still wear black robes.",
      },
      {
        title: "Black in fashion: elegance and power",
        body: "In the 19th century black was the standard for businessmen, statesmen and evening wear. For women, the turning point came in 1926, when Coco Chanel published a drawing of a simple black dress in Vogue: the little black dress. Since then black has been the safe choice for anything formal, which is why a new trend is said to be \"the new black\". In branding, black signals luxury and confidence, especially with generous space and a single accent such as gold or white.",
      },
      {
        title: "Black and mourning",
        body: "Across Europe and the Americas, black is the main color of mourning, a custom that goes back to the Roman Empire. It isn't universal: in China, Korea and other parts of Asia, white is the traditional color of mourning. In Japan, condolence gifts are often tied with black and white ribbons.",
      },
      {
        title: "Is black a color, or a shade?",
        body: "Black is the absence or complete absorption of visible light, so a physicist might say it isn't a color of light. In everyday use, art and design it is a color: an achromatic one, with no hue, like white and gray. Black isn't a shade itself, but it makes shades: a shade is any hue with black added (navy is a shade of blue, maroon a shade of red). Adding white makes a tint, and adding gray makes a tone.",
      },
      {
        title: "What dark colors represent",
        body: "Dark colors in general borrow some of black's meaning. Navy, charcoal, forest green and burgundy feel serious, stable and grown-up, which is why they are popular for finance, law and luxury. They read as calmer and warmer than pure black, so many designers use a very dark gray or navy for text and large areas instead of #000000.",
      },
    ],
    faq: [
      { question: "What does black represent?", answer: "Power, elegance, authority and formality, and also mourning, mystery, secrets and fear. In surveys it's the color most linked with mourning and elegance." },
      { question: "What does the color black symbolize in different cultures?", answer: "In Europe and the Americas it's the main color of mourning. In ancient Egypt it meant fertility and life. In much of Asia, white rather than black is the traditional mourning color." },
      { question: "Is black a color?", answer: "In everyday use and design, yes: an achromatic color with no hue. In physics, black is the absence or full absorption of visible light." },
      { question: "Is black a shade?", answer: "Not itself. Black is what makes shades: a shade is a hue with black added, like navy from blue. Black plus white makes gray." },
      { question: "What do dark colors represent?", answer: "Seriousness, stability, authority and sophistication. Navy, charcoal and burgundy share some of black's meaning but feel softer." },
      { question: "What is the color code for black?", answer: "Black is #000000 (shorthand #000), RGB 0, 0, 0 and CMYK 0, 0, 0, 100. Many designs use a softer near-black such as #111111 for text." },
    ],
  },
  yellow: {
    title: "Yellow Color Meaning: What Yellow Stands For",
    description:
      "What yellow means: happiness, warmth and optimism, but also caution and jealousy. Yellow in China, Buddhism and traffic signs, plus its hex and RGB code.",
    answer:
      "Yellow stands for happiness, optimism, warmth and energy, the color of sunshine. In surveys in Europe and North America people link it most with amusement, humor, happiness and spontaneity, but also with envy, jealousy and, in the US, cowardice. Because it's so easy to see, it also means caution: school buses, taxis, warning signs and the middle traffic light. In China, bright yellow was the emperor's color.",
    authoredOnly: true,
    keyTakeaways: [
      "Yellow means happiness, optimism, warmth and energy, but also jealousy, betrayal and caution.",
      "In China bright yellow was the imperial color, worn only by the emperor and his household.",
      "Yellow is easy to see from a distance, so it's used for school buses, taxis and warning signs.",
      "Yellow is #FFFF00 on screens (RGB 255, 255, 0), hue 60°: red and green light at full strength.",
    ],
    sections: [
      {
        title: "What does yellow mean?",
        body: "Yellow is the color of sunshine, so it means warmth, happiness, optimism and energy. In surveys in Europe, Canada and the United States, yellow is the color people most often link with amusement, gentleness, humor, happiness and spontaneity. It also has a darker side: the same surveys connect it with duplicity, envy, jealousy and greed, and in the US with cowardice, as in calling someone yellow. That double meaning is why yellow is often called the color of ambivalence.",
      },
      {
        title: "Yellow means caution",
        body: "Yellow is one of the easiest colors to see from a distance, so it's used where being seen matters: school buses in the US and Canada, taxis, fire engines in some places and road equipment. Warning signs use yellow because it traditionally signals caution rather than danger, and a yellow traffic light means slow down, not stop. Paired with black, yellow makes the classic warning look, from hazard tape to wasps.",
      },
      {
        title: "Yellow in China and Asia",
        body: "In China yellow has the opposite reputation to its Western one. Bright yellow was the color of the Middle Kingdom and could be worn only by the emperor and his household, and the legendary first emperor is called the Yellow Emperor. Across China and many Asian countries yellow is linked with royalty, nobility, respect, happiness, glory, harmony and wisdom. In Buddhism, monks' robes have been dyed in saffron and other yellow to orange dyes since soon after the Buddha's death.",
      },
      {
        title: "Yellow in history",
        body: "Yellow ochre was one of the very first pigments: a yellow horse at Lascaux cave in France was painted about 17,000 years ago. In medieval Europe yellow often carried negative meanings: it was associated with Judas and betrayal and used to mark heretics, and in the 20th century Jews in Nazi-occupied Europe were forced to wear a yellow star. Today, in the West, the cheerful meaning is the one most people think of first.",
      },
      {
        title: "What hue is yellow, and its codes",
        body: "Yellow sits between green and orange in the spectrum, at a wavelength of roughly 575 to 585 nanometers. On a screen it's made by mixing red and green light at full strength: #FFFF00, RGB 255, 255, 0, hue 60° in HSL. In printing it's one of the three primary inks (CMYK 0, 0, 100, 0). Between yellow and green sits chartreuse or yellow-green; in CSS, yellowgreen is #9ACD32 and chartreuse #7FFF00.",
      },
      {
        title: "Using yellow in design",
        body: "Yellow grabs attention, so it's best as an accent: a highlight, a badge, a single button. It's almost invisible as text on white: #FFFF00 on white measures 1.0:1, while black on yellow measures 19.5:1. Soft, buttery yellows feel friendly and warm on large areas; bright lemon yellow is energetic but tiring over a whole page. Mustard and gold are the grown-up versions when bright yellow feels too playful.",
      },
    ],
    faq: [
      { question: "What does yellow mean?", answer: "Happiness, optimism, warmth and energy, like sunshine. It can also mean caution, jealousy, betrayal and, in the US, cowardice." },
      { question: "What does yellow stand for in different cultures?", answer: "In China and much of Asia, royalty, nobility, harmony and wisdom: bright yellow was the emperor's color. In Buddhism, monks wear saffron and yellow robes. In the West it mostly means happiness and caution." },
      { question: "What is yellow in RGB and hex?", answer: "Pure yellow is #FFFF00, RGB 255, 255, 0. Its HSL value is hue 60°, saturation 100%, lightness 50%, and in print it's CMYK 0, 0, 100, 0." },
      { question: "What hue is yellow?", answer: "60° on the screen color wheel, halfway between red (0°) and green (120°). In the spectrum, yellow light is roughly 575 to 585 nm." },
      { question: "What color is yellow and green?", answer: "Yellow-green, also called chartreuse. In CSS, yellowgreen is #9ACD32 and chartreuse is #7FFF00." },
      { question: "Why is yellow used for warning signs and school buses?", answer: "It's very easy to see from a distance and traditionally signals caution rather than danger, so it suits buses, taxis, road work and warning signs." },
    ],
  },
  // The other ten base hues (2026-11-17). Search Console demand on these pages is small (azure
  // 294 impressions in 16 months, blue 62, teal 29, the rest 12 or fewer) and mostly
  // "<color> color meaning" / "<color> color definition", so each answers that first. Facts come
  // from the Wikipedia article for each color. Owner rule (2026-11-17): content has to read as
  // written by a person, so each page has its own structure, plain wording, and something only
  // HueFlow can say (numbers from our palette library, Tailwind contrast checks and the Machado
  // color-blind simulator in lib/colorblind.ts).
  blue: {
    title: "Blue Color Meaning: What Blue Symbolizes",
    description:
      "Blue means calm, trust and harmony, and sometimes sadness. Why it's the favorite color in the US and Europe, how a rare pigment became everyday, and blue in design.",
    answer:
      "Blue usually means calm, trust and harmony. People in the US and Europe also connect it with confidence, intelligence and infinity, and on its gloomier side with cold, distance and sadness. It's the color both men and women there most often name as their favorite, which goes a long way to explaining why the UN and EU flags are blue and why so many banks choose it.",
    authoredOnly: true,
    keyTakeaways: [
      "Blue means calm, trust and harmony, with a sad side: cold, distance, feeling blue.",
      "In the US and Europe, more people pick blue as their favorite color than any other.",
      "Blue used to be a luxury: ultramarine, ground from lapis lazuli, was the priciest pigment of the Renaissance.",
    ],
    sections: [
      {
        title: "What people mean by blue",
        body: "Blue is the sky and the open sea, so most of what it means has to do with space and quiet: calm, depth, distance, something you can rely on. In surveys in the US and Europe, people tie it to harmony, confidence, masculinity, knowledge, intelligence, calmness, imagination and infinity, as well as cold and sadness. The UN and the European Union both picked blue flags for the harmony part. English keeps the sad part alive in a phrase: feeling blue.",
      },
      {
        title: "Why so many people's favorite is blue",
        body: "In the United States and across Europe, blue is the color both men and women are most likely to name as their favorite, and at least one recent survey found the same in China, Malaysia and Indonesia. There's no single agreed explanation. A reasonable guess is that almost nothing bad is attached to blue: it isn't rotting food, blood or a warning sign. It's a hard color to dislike.",
      },
      {
        title: "When blue was a luxury",
        body: "It's easy to forget how hard blue used to be to make. Ancient Egyptians cut lapis lazuli into jewelry, and Renaissance painters ground the same stone into ultramarine, the most expensive pigment on their shelves. Chinese potters were painting cobalt blue onto porcelain by the eighth century, and medieval glassmakers put it into cathedral windows. Everyday blue cloth in Europe came from woad until finer indigo arrived from America. Only later did dark blue settle into uniforms and, after that, office suits.",
      },
      {
        title: "Not every language has one blue",
        body: "Russian has no single word for blue. Goluboy is light blue and siniy is dark blue, and speakers treat them as two different colors. Japanese and Lakota went the other way and used one word for blue and green, so a green traffic light in Japan is still called ao. Linguists have also noticed that languages don't start out with a word for blue; it tends to come later. And in Hindu art, Krishna and Rama are usually painted with blue skin.",
      },
      {
        title: "Blue in HueFlow's palettes",
        body: "Of the 240 palettes in our palette library, 70 include at least one blue, about 29%. Only orange turns up more often. Blue also holds up well for people with red-green color blindness: run pure blue #0000FF through our deuteranopia simulator and it comes out as #003DFB, still clearly blue. If you need one signal color that nearly everyone reads the same way, blue is the safe pick.",
      },
    ],
    faq: [
      { question: "What does the color blue mean?", answer: "Calm, trust and harmony, plus confidence and intelligence. Its sad side is cold, distance and melancholy." },
      { question: "What is the definition of the color blue?", answer: "Blue is light with a wavelength of roughly 450 to 495 nanometers, between violet and green. On screens it's one of the three primaries, #0000FF." },
      { question: "Why is the sky blue?", answer: "Air scatters the short blue wavelengths of sunlight much more than the long red ones (Rayleigh scattering), so blue reaches your eyes from every part of the sky." },
      { question: "What is the color code for blue?", answer: "Pure blue is #0000FF (RGB 0, 0, 255). For links and buttons, a softer blue such as #2563EB reads better." },
    ],
  },
  azure: {
    title: "Azure Color Meaning: What Azure Represents",
    description:
      "What color azure is (a bright sky blue between blue and cyan), what it means, where the name comes from, azure in heraldry and Chinese myth, and azure vs teal.",
    answer:
      "Azure is a bright, clear sky blue, halfway between blue and cyan. Its meaning comes straight from that sky: openness, calm, clarity, a cloudless day. The word was borrowed from the name of lapis lazuli, so it has always carried a hint of something precious. Heraldry uses azure as its word for blue, and in Chinese myth the Azure Dragon represents the east.",
    authoredOnly: true,
    keyTakeaways: [
      "Azure is the blue of a clear sky, halfway between blue and cyan (#007FFF).",
      "It means openness, calm and clarity, and it's lighter and less serious than navy or royal blue.",
      "The name comes from lapis lazuli, by way of Persian lāžaward and Arabic lāzaward.",
      "The CSS color called azure is a near-white tint, #F0FFFF, which confuses a lot of people.",
    ],
    sections: [
      {
        title: "What color is azure?",
        body: "Picture the sky at noon on a cloudless day: that's azure. On a screen it's #007FFF, exactly halfway between pure blue and cyan, at hue 210°. It's brighter and a touch greener than blue, and far more saturated than sky blue. One catch: type azure into CSS and you get #F0FFFF, an almost-white cyan, because the web inherited an old Unix color list that used the name differently.",
      },
      {
        title: "What azure means",
        body: "Since it's the color of the sky, azure means open space and good weather: clarity, calm, freedom, nothing in the way. It keeps blue's steadiness and drops some of blue's seriousness. The French Riviera's nickname, the Côte d'Azur, works because everyone can picture the water and sky it promises.",
      },
      {
        title: "A name borrowed from a stone",
        body: "In Persian, lāžaward named both a deep blue stone, lapis lazuli, and the place it was mined. Arabic made it lāzaward, French made it azur, and Italian, Spanish and Portuguese turned it into azzurro and azul. Lapis was rare and expensive, so the color word started life with a little luxury attached.",
      },
      {
        title: "Azure on coats of arms",
        body: "Heraldry has its own color words, and azure is the one for blue, next to gules for red, vert for green, sable for black and purpure for purple. In medieval arms only red was more common, and azure kept gaining ground. Engravers printing in black and white showed it with horizontal lines. Today's heralds don't give the colors fixed meanings, though writers between the 15th and 17th centuries tied them to planets, gems and virtues.",
      },
      {
        title: "Dragons, footballers and police",
        body: "In Chinese mythology the Azure Dragon is one of the Four Symbols and represents the east and spring; Japan knows it as Seiryū and Korea as Cheongryong. Italy took Savoy azure as a national color, which is why its football team is gli Azzurri and its state police use azure. Hebrew's sacred blue, tekhelet, is often translated as azure too.",
      },
    ],
    faq: [
      { question: "What color is azure?", answer: "A bright sky blue, halfway between blue and cyan: #007FFF on screens." },
      { question: "What does azure mean?", answer: "Clear skies: openness, calm, clarity and freedom." },
      { question: "Is azure the same as teal?", answer: "No. Teal (#008080) is a dark blue-green. Azure (#007FFF) is a much lighter, brighter sky blue." },
      { question: "What does azure mean in heraldry?", answer: "It's the heraldic word for blue. Black-and-white engravings show it with horizontal lines." },
      { question: "What is the color code for azure?", answer: "#007FFF, sometimes written #0080FF. The CSS keyword azure gives #F0FFFF, a near-white cyan." },
    ],
  },
  teal: {
    title: "Teal Color Meaning: What Teal Represents",
    description:
      "What teal means: calm and balance between blue and green. Why it's named after a duck, the teal ribbon, its 1990s moment, and what to check before you brand in teal.",
    answer:
      "Teal reads as calm and balanced, with a bit more life than navy and a bit more polish than green. It's a deep blue-green, so it borrows trust from blue and freshness from green. Teal is also the awareness color for ovarian cancer, and the name comes from a small duck, the Eurasian teal.",
    authoredOnly: true,
    keyTakeaways: [
      "Teal suggests calm, balance and quiet confidence: blue's steadiness plus green's freshness.",
      "It's named after the Eurasian teal, a duck with a blue-green stripe on its head, and has been a color word since 1917.",
      "Teal ribbons mark ovarian cancer awareness.",
    ],
    sections: [
      {
        title: "What teal means",
        body: "Teal sits where blue turns into green and takes something from each: blue's calm and reliability, green's freshness and health. People tend to read it as balanced and quietly confident. It's less formal than navy and less outdoorsy than forest green, so it suits healthcare, wellness and finance brands that want to look trustworthy without looking like a bank.",
      },
      {
        title: "Named after a duck",
        body: "The Eurasian teal is a small dabbling duck with a blue-green stripe on its head, and the color takes its name from it. Teal only became a color word in English in 1917, a newcomer next to blue or green. It had its big moment later: in North America teal was a fad color in the 1990s, when many sports teams put it on their uniforms, and Windows 95 greeted millions of people with a teal desktop.",
      },
      {
        title: "The teal ribbon",
        body: "Teal is the color of ovarian cancer awareness. Survivors and supporters wear teal ribbons, bracelets, T-shirts and hats to draw attention to the disease, so for a health charity teal will already mean something to many people.",
      },
      {
        title: "Before you brand in teal",
        body: "Teal works for text and for backgrounds, which is rare. #008080 on white measures 4.77:1, and white text on teal measures the same. If you use Tailwind, teal-700 (#0F766E, 5.47:1) is the lightest step that's safe for text on white; teal-500 only manages 2.49:1. Film colorists have made 'orange and teal' a cliché, warm skin against cool shadows, so an orange accent will look familiar. One thing to test: with protanopia, our color-blind simulator turns #008080 into #777980, a plain gray, so don't let teal versus gray carry meaning on its own.",
      },
    ],
    faq: [
      { question: "What does teal mean?", answer: "Calm, balance and quiet confidence. It mixes blue's trust with green's freshness." },
      { question: "Is teal blue or green?", answer: "Both. It's a dark blue-green at hue 180°, the same hue as cyan at half brightness." },
      { question: "What's the difference between teal and turquoise?", answer: "Teal (#008080) is darker and more muted. Turquoise (#40E0D0) is lighter and greener, and named after the gemstone." },
      { question: "What is the color code for teal?", answer: "#008080, RGB 0, 128, 128 and CMYK 100, 0, 0, 50." },
    ],
  },
  red: {
    title: "Red Color Meaning: What Red Symbolizes",
    description:
      "What red means, from love and passion to anger and danger, why it's lucky in China and India, red's history from ochre to cardinals, and red for color-blind users.",
    answer:
      "Red is the color of blood and fire, so its meanings run hot: love, passion, energy and joy, and also anger and danger. Surveys in Europe and the US link it with heat, activity, passion, sexuality, anger, love and joy. In China and India red is lucky and festive. And almost everywhere, a red light means stop.",
    authoredOnly: true,
    keyTakeaways: [
      "Red means love, passion and energy. It can just as easily mean anger and danger.",
      "In China, India and much of Asia it's the color of luck and celebration.",
      "Red ochre was among the very first paints people used.",
      "To color-blind users, a typical error red and success green can look almost the same.",
    ],
    sections: [
      {
        title: "What is red, exactly?",
        body: "Red is the long end of the visible spectrum: light with a wavelength of roughly 625 to 740 nanometers, just past orange. On a screen it's one of the three primaries, #FF0000. It's also one of the oldest color words in English, first recorded around the year 700.",
      },
      {
        title: "What red means",
        body: "Red pulls in two directions at once. Valentine's hearts, roses and lipstick sit on one side; fire alarms, stop signs and error messages on the other. Ask people in Europe or the US and they connect red with heat, activity, passion, sexuality, anger, love and joy, often all in the same breath. Context decides which one people see: a red dress, a red price tag and a red warning banner say three very different things.",
      },
      {
        title: "Lucky red",
        body: "Travel east and red loses most of its menace. In China it's the color of happiness and good fortune. It was used on early pottery and later on palace gates and walls, and it's still everywhere at weddings and New Year. In India red is linked with Lakshmi, the goddess of wealth, and some Hindu women wear a line of red sindoor in their hair parting to show they're married.",
      },
      {
        title: "Red through history",
        body: "Red ochre is one of the oldest paints there is. Ancient Egyptians and Mayans colored their faces red for ceremonies, and a Roman general celebrating a victory had his body painted red. Renaissance nobles wore reds dyed with kermes and cochineal, both made from insects, and cochineal from Spanish Mexico became a big export to Europe. Catholic cardinals wear red; the cardinal bird is named after them. After the 1917 revolution in Russia, the red flag became the sign of communism and socialism.",
      },
      {
        title: "Red, and what color-blind users see",
        body: "Red is the color almost every interface uses for errors, and that's where it gets risky. We ran Tailwind's red-600 and green-600, a very common error and success pair, through our deuteranopia simulator. They came out as #8F801B and #958951: two muddy olives with a contrast of just 1.13:1 between them. Pure #FF0000 turns into an olive yellow, #A39000. So give every red message an icon or a word, and for red text on white use red-600 (#DC2626, 4.83:1) or darker, because pure #FF0000 only reaches about 4:1.",
      },
    ],
    faq: [
      { question: "What does the color red mean?", answer: "Love, passion, energy and joy on one side; anger and danger on the other." },
      { question: "What does red symbolize in China?", answer: "Happiness and good fortune. It's the color of weddings and New Year." },
      { question: "Do bulls hate red?", answer: "No. Bulls charge the matador's cape because it moves, not because it's red." },
      { question: "What is the color code for red?", answer: "Pure red is #FF0000 (RGB 255, 0, 0). For text on white, #DC2626 or #CC0000 reads better." },
    ],
  },
  green: {
    title: "Green Color Meaning: What Green Symbolizes",
    description:
      "What green means: nature, life, health and hope, and envy. Green in Islam, Ireland and China, why medieval bankers wore green, and why 'green means go' has limits.",
    answer:
      "Green means nature and life: growth, health, youth, spring and hope. It also has one famous bad habit, envy. Surveys in American, European and Islamic countries all put nature and life first. In China and most of Asia its associations are very positive, while in Europe and the US it can also hint at poison or sickness. And at every traffic light, green means go.",
    authoredOnly: true,
    keyTakeaways: [
      "Green means nature, life, health, youth, spring and hope. Its one famous negative is envy.",
      "It's the historic color of Islam and is on the flags of nearly all Islamic countries.",
      "Medieval Europe dressed merchants and bankers in green and nobles in red.",
      "Red and green status colors can look almost identical to color-blind users, so add icons.",
    ],
    sections: [
      {
        title: "What green means",
        body: "Green is leaves, grass and spring, so nearly everything it means is about being alive: growth, health, youth, freshness, hope. Surveys in American, European and Islamic countries agree on that core, listing nature, life, health, youth, spring, hope and envy. Envy is the odd one out, and it comes from Shakespeare, whose Othello warns against 'the green-eyed monster'. Where cultures split is the dark side: in Europe and the US green can also suggest toxicity and poor health, while in China and most of Asia it's a positive symbol of fertility and happiness.",
      },
      {
        title: "Green in Islam, Ireland and China",
        body: "Green is the historic color of Islam, representing the lush vegetation of Paradise. It was the color of the Prophet Muhammad's banner and is on the flags of nearly all Islamic countries. Ireland has a long tradition of green as the color of the island and of Gaelic culture, hence the green streets on St. Patrick's Day. In China green belongs to the east, sunrise and growth, although 'wearing a green hat' is an old way of saying a man's wife is unfaithful.",
      },
      {
        title: "Bankers in green, nobles in red",
        body: "Ancient Egyptians saw green as the color of regeneration and rebirth, and Romans got a green pigment, verdigris, by exposing copper to fermenting wine. In medieval and Renaissance Europe green dressed merchants, bankers and the gentry, while red was kept for the nobility. You can still see the split in London, where the House of Commons sits on green benches and the House of Lords on red. The Mona Lisa, for what it's worth, wears green.",
      },
      {
        title: "Go, safe, done",
        body: "A green light means go, and interfaces copied it: green checkmarks, green 'saved' messages, green rising numbers. That works for most people but not everyone. Tailwind's green-600 (#16A34A), a common success color, turns into #958951 in our deuteranopia simulator, nearly the same olive as the red-600 error color beside it. Pair green with a checkmark or a word. Since the 1980s green has also been the color of environmental politics, with Green parties across Europe.",
      },
    ],
    faq: [
      { question: "What does the color green mean?", answer: "Nature, life, health, youth, spring and hope, and also envy." },
      { question: "What does green mean in Islam?", answer: "It's the historic color of Islam, representing Paradise, and it was the color of the Prophet Muhammad's banner." },
      { question: "What is the color code for green?", answer: "CSS green is #008000 (RGB 0, 128, 0). Full-strength screen green, #00FF00, is called lime in CSS." },
    ],
  },
  brown: {
    title: "Brown Color Meaning: What Brown Represents",
    description:
      "What brown is (a dark, muted orange) and what it means: earth, warmth, reliability and simplicity. Monks' robes, painters' umber, and why packaging turned brown.",
    answer:
      "Brown is a dark, muted orange or red: the color of soil, wood, coffee and leather. That gives it a solid, down-to-earth meaning: warmth, stability, reliability and simplicity. For centuries brown was what the poor and humble monks wore, and since the late 20th century it has come to signal natural and healthy, from brown bread to brown paper bags.",
    authoredOnly: true,
    keyTakeaways: [
      "Brown means earth, warmth, reliability and simplicity; it can also look plain or dull.",
      "There's no brown in the rainbow. It's dark orange or red seen next to brighter colors.",
      "Franciscan monks wore brown on purpose, as a sign of humility and poverty.",
    ],
    sections: [
      {
        title: "What is brown?",
        body: "There's no brown wavelength of light, and no brown in the rainbow. Brown is what an orange or red looks like when it's dark and muted compared with what's around it. On screens that means red at medium strength, green lower and blue lowest; in print, mostly yellow ink with a little magenta and black. CSS brown, #A52A2A, is a reddish brown. Saddle brown #8B4513 and chocolate #D2691E are warmer.",
      },
      {
        title: "What brown means",
        body: "Think of the brown things you touch in a day: wood, bread, coffee, leather, earth. That's where its meaning comes from. People read brown as warm, solid, honest and unpretentious, a color that isn't trying to impress anyone. The flip side is real too. Brown can look plain or old-fashioned, and when Europeans and Americans are asked for their favorite color, it regularly lands near the bottom.",
      },
      {
        title: "Peasants and monks",
        body: "In ancient Rome the common people were called pullati, 'those dressed in brown'. In medieval Europe grey and brown were the colors of the poor, and an English law of 1363 ordered poor people to wear russet, a coarse brownish cloth. Franciscan monks chose brown robes deliberately, as a sign of humility and poverty.",
      },
      {
        title: "Painters' browns",
        body: "Earth browns are some of the oldest colors in art. Paintings using umber date to around 40,000 BC, and the brown horses in the Lascaux cave are about 17,300 years old. Renaissance painters relied on raw umber, dug from around Umbria, and raw sienna from near Siena. Caravaggio and Rembrandt built their deep shadows out of browns, and Leonardo da Vinci and Raphael drew in sepia, a reddish-brown ink made from cuttlefish.",
      },
      {
        title: "How brown became 'natural'",
        body: "In the late 20th century brown picked up a new meaning in the West: simple, inexpensive, natural and healthy. Brown bread, brown sugar and plain brown paper bags started to look more wholesome than their white versions. Our own palette library shows the same pull: brown turns up in 45 of its 240 palettes, and 26 of those are tagged earthy and 17 autumn.",
      },
      {
        title: "Tea, coffee and chestnuts",
        body: "Plenty of languages name brown after something brown. Japanese chairo means 'tea color', Turkish kahverengi means 'coffee color', and Portuguese, Spanish and French take their words from the chestnut. English brún was first written down as a color name around the year 1000.",
      },
    ],
    faq: [
      { question: "What does the color brown mean?", answer: "Earth, warmth, stability, reliability and simplicity. It can also look plain or dull." },
      { question: "What is the definition of brown?", answer: "A dark, usually muted shade of orange or red: the color of earth, wood and coffee." },
      { question: "Why did monks wear brown?", answer: "Franciscan monks wore brown robes as a sign of humility and poverty. In medieval Europe brown and grey were the colors of the poor." },
      { question: "What is the color code for brown?", answer: "CSS brown is #A52A2A (RGB 165, 42, 42). Saddle brown #8B4513 and chocolate #D2691E are warmer browns." },
    ],
  },
  gray: {
    title: "Gray Color Meaning: What Gray Represents",
    description:
      "What gray means: neutral, calm and modest, but also dull and unsure. Grey vs gray, grey friars, gray flannel suits, gray hair, and how to pick a gray for design.",
    answer:
      "Gray is the in-between color, and that's most of what it means: neutral, balanced, reserved, sometimes undecided. Surveys in Europe and North America link it with neutrality, conformity, boredom, uncertainty, old age, indifference and humility, and only about one percent of people pick it as a favorite. Designers love it for the same reason everyone else finds it dull: it stays out of the way.",
    authoredOnly: true,
    keyTakeaways: [
      "Gray means neutral, balanced and modest, but also dull, conforming or unsure.",
      "Grey is the usual British spelling and gray the American one. Both are correct.",
      "Undyed wool made gray the color of peasants and friars; English Franciscans were the grey friars.",
      "Gray needs less darkening than colorful hues: Tailwind's gray-500 (#6B7280) already passes as text on white.",
    ],
    sections: [
      {
        title: "What gray means",
        body: "Gray sits halfway between black and white, and most of its meanings come from being in the middle: neutral, balanced, reserved, unsure which way to go. Surveys in Europe and North America put it next to neutrality, conformity, boredom, uncertainty, old age, indifference and humility, and only about one percent of people name it as their favorite color. Nobody gets excited about gray, and that's exactly why designers use so much of it. It lets everything else on the page do the talking.",
      },
      {
        title: "Grey or gray?",
        body: "Both are right. Grey is the main spelling in British and Commonwealth English and gray in American English, and the split only settled in around the 20th century. CSS doesn't mind either: gray and grey both give #808080.",
      },
      {
        title: "Friars and factory girls",
        body: "For most of history gray simply meant undyed wool, which made it the color of peasants and the poor. Cistercian monks and Franciscan and Capuchin friars wore it to show their vows of humility and poverty; in England and Scotland the Franciscans were known as the grey friars. In 19th-century Paris, the young women who worked in factories and workshops wore gray so often that they were nicknamed grisettes.",
      },
      {
        title: "Gray suits, gray uniforms",
        body: "The gray business suit appeared in London in the mid-19th century, and after the Second World War it became shorthand for conformity, the subject of the 1955 novel The Man in the Gray Flannel Suit. Armies liked gray for a practical reason: soldiers in gray were harder to spot than soldiers in blue or red. The Confederate Army wore it in the American Civil War, and the Prussian Army switched to it in 1910.",
      },
      {
        title: "Gray hair, gray areas, gray matter",
        body: "English uses gray for all sorts of in-between things. Hair turns gray as it loses pigment, so gray means age, and with it experience. A gray area is neither clearly right nor clearly wrong. And grey matter, a name for brain tissue, has made gray a shorthand for brains.",
      },
      {
        title: "Picking a gray for design",
        body: "No gray stays perfectly neutral once it's on a page. Add a little yellow, orange or red and you get a warm gray that looks soft and human; add green, blue or violet and it turns cool and technical. For text, contrast matters more than temperature: mid gray #808080 reaches only 3.95:1 on white. Gray also needs less darkening than colorful hues do. In Tailwind's scales, gray-500 (#6B7280, 4.83:1) already passes as text on white, while red and blue need their 600 step and green, teal and yellow their 700.",
      },
    ],
    faq: [
      { question: "What does the color gray mean?", answer: "Neutral, balanced, calm and modest. On the downside: dull, conforming, uncertain." },
      { question: "Is it grey or gray?", answer: "Both: grey is the usual British spelling, gray the American one. In CSS they're the same color." },
      { question: "Why is gray associated with old age?", answer: "Hair loses its pigment with age and turns gray, then white, so gray became a sign of age and of experience." },
      { question: "What is the difference between warm and cool gray?", answer: "Warm grays have a little yellow, orange or red in them; cool grays a little green, blue or violet." },
      { question: "What is the color code for gray?", answer: "CSS gray (or grey) is #808080. Oddly, CSS darkgray is #A9A9A9, which is lighter than gray." },
    ],
  },
  orange: {
    title: "Orange Color Meaning: What Orange Symbolizes",
    description:
      "What orange means: warmth, energy, fun and the unconventional. Why it's named after the fruit, saffron robes, the Dutch House of Orange, and safety orange.",
    answer:
      "Orange is warm, loud and friendly: fun, energy, enthusiasm and a streak of the unconventional. In surveys in Europe and the US it comes up for amusement, extroversion, warmth, fire and activity, plus autumn and Halloween. It's sacred in Hinduism and Buddhism, it's the national color of the Netherlands, and because it's so easy to spot, it's what life jackets are made of.",
    authoredOnly: true,
    keyTakeaways: [
      "Orange means warmth, energy, fun and the unconventional, with a hint of danger.",
      "The fruit came first: orange became an English color word in 1502. Before that it was 'yellow-red'.",
      "The Dutch wear orange for their royal House of Orange-Nassau, whose name has nothing to do with the fruit.",
      "Orange is the most common hue in HueFlow's palette library: 94 of 240 palettes.",
    ],
    sections: [
      {
        title: "What orange means",
        body: "Orange has red's energy without red's alarm, and yellow's cheer without yellow's childishness. People in Europe and the US link it with amusement, the unconventional, extroversion, warmth, fire, energy, activity, danger, taste and smell, and with autumn and Halloween. It's a sociable, slightly cheeky color, a good fit for brands that would rather look fun than formal.",
      },
      {
        title: "The fruit came first",
        body: "English named the color after the fruit, not the other way round. The earliest known use of orange as a color word is from 1502, in a record of clothes bought for Margaret Tudor. Before that, English speakers made do with ġeolurēad, 'yellow-red'.",
      },
      {
        title: "Saffron robes",
        body: "Orange matters in both Hinduism and Buddhism. Theravada Buddhist monks typically wear saffron robes, and saffron and orange run through Hindu religious life. In those settings orange is serene and sacred, nothing like a Halloween pumpkin.",
      },
      {
        title: "Why the Dutch wear orange",
        body: "The Netherlands' royal family is the House of Orange-Nassau, which goes back to 1163 and the Principality of Orange, a place whose name has nothing to do with the fruit. That's where the orange shirts and orange stadiums come from. Orange has shown up in politics elsewhere too: it was the color of Ukraine's Orange Revolution in 2004, and it's the political color of Christian democracy.",
      },
      {
        title: "Safety orange",
        body: "Orange is one of the easiest colors to see in dim light and against water, so life rafts, life jackets, buoys and road-work gear are orange. San Francisco's Golden Gate Bridge is painted International Orange partly so it stays visible in fog.",
      },
      {
        title: "Orange on screens",
        body: "Orange is the most common hue in HueFlow's palette library: 94 of our 240 palettes include at least one orange, often in the summer, bright and autumn sets. It's also one of the hardest hues to use for text. CSS orange #FFA500 measures only 1.97:1 on white, and Tailwind's orange-500 manages 2.8:1; orange-700 (#C2410C, 5.18:1) is the first step that works for text. On orange buttons, dark text beats white by a mile: #111111 on #FFA500 reaches 9.56:1.",
      },
    ],
    faq: [
      { question: "What does the color orange mean?", answer: "Warmth, energy, fun, enthusiasm and the unconventional. It can also signal danger." },
      { question: "Was orange named after the fruit?", answer: "Yes. The fruit came first, and orange became a color word in English in 1502." },
      { question: "What is the color code for orange?", answer: "CSS orange is #FFA500 (RGB 255, 165, 0). The orange exactly halfway between red and yellow on screens is #FF8000." },
    ],
  },
  purple: {
    title: "Purple Color Meaning: What Purple Symbolizes",
    description:
      "What purple means: royalty, luxury, magic and mystery. Why Tyrian purple took ten thousand snails a gram, emperors and bishops, Perkin's mauve, and purple vs violet.",
    answer:
      "Purple means royalty, luxury, ambition, magic and mystery. Surveys in Europe and the US connect it with rarity, royalty, luxury, ambition, magic, mystery, piety and spirituality. Nearly all of that goes back to one ancient dye, Tyrian purple, made from sea snails at such cost that for centuries mostly emperors wore it.",
    authoredOnly: true,
    keyTakeaways: [
      "Purple means royalty, luxury, magic, mystery and spirituality.",
      "Tyrian purple took about ten thousand sea snails for a single gram of dye.",
      "Purple isn't in the rainbow; it's red and blue light mixed. Violet is the spectral one.",
    ],
    sections: [
      {
        title: "What purple means",
        body: "Purple has meant power and rarity for more than two thousand years. Surveys in Europe and the United States still tie it to rarity, royalty, luxury, ambition, magic, mystery, piety and spirituality, and, paired with pink, to eroticism, femininity and seduction. Halfway between calm blue and hot red, it manages to look dignified and a little strange at the same time.",
      },
      {
        title: "Ten thousand snails",
        body: "The ancient purple, Tyrian purple, came from a mucus secreted by the spiny dye-murex sea snail. Making it was slow and messy, and it took thousands of tiny snails to get even a little dye. A gram made to the original recipe in 2000 used ten thousand molluscs and cost two thousand euros. The most prized shades were said to look like dried blood. In the late Roman Empire, selling purple cloth was a state monopoly protected by the death penalty.",
      },
      {
        title: "Emperors and bishops",
        body: "Roman senators wore a purple stripe on their togas, and a general's triumphal toga was solid purple embroidered with gold. Under the Empire purple slid toward the emperors alone. Byzantine and Holy Roman emperors kept it, and Roman Catholic bishops followed. 'Born in the purple' comes from the Byzantine court, for children born to a reigning emperor. Japan, too, has traditionally associated purple with the emperor and the aristocracy.",
      },
      {
        title: "Perkin's accident",
        body: "Purple stopped being rare in 1856, when the young chemist William Henry Perkin accidentally made mauveine, the first synthetic dye, and mauve became a craze. China had its own story: it got purple from the purple gromwell plant and was the first culture to develop a synthetic purple. Later, purple, white and green became the colors of the British women's suffrage movement, and in the US the Purple Heart is given to those wounded or killed in service.",
      },
      {
        title: "Purple or violet?",
        body: "Violet is in the rainbow, at the shortest wavelengths we can see. Purple isn't: it's red and blue light mixed. In everyday speech purple means the redder hues and violet the bluer ones. CSS purple, #800080, is a dark, even mix that reads well as text on white (9.42:1), while CSS violet, #EE82EE, is a light, pinkish lilac.",
      },
      {
        title: "Rare in palettes, tricky for color blindness",
        body: "Purple is the least common hue in HueFlow's palette library, in 29 of 240 palettes (12%), which is one reason a purple brand still stands out. Test it for color blindness, though. Our deuteranopia simulator turns #800080 into #304B7D, a dull blue, so purple and blue placed side by side can merge into one.",
      },
    ],
    faq: [
      { question: "What does the color purple mean?", answer: "Royalty, luxury, ambition, magic, mystery and spirituality." },
      { question: "Why is purple associated with royalty?", answer: "Tyrian purple dye took thousands of sea snails to make, so only emperors and the very rich could afford it." },
      { question: "What is the difference between purple and violet?", answer: "Violet is a spectral color at the short end of the rainbow; purple is a mix of red and blue light." },
      { question: "What is the color code for purple?", answer: "CSS purple is #800080 (RGB 128, 0, 128). Rebecca purple #663399 and violet #EE82EE are other CSS purples." },
    ],
  },
  pink: {
    title: "Pink Color Meaning: What Pink Represents",
    description:
      "What pink means: tenderness, sweetness, romance and play. Why pink was once a boys' color, the flower behind the name, cherry blossoms and the pink ribbon.",
    answer:
      "Pink is a light red, and it keeps red's warmth while dropping the aggression: tenderness, sweetness, romance and play. Today it's closely tied to femininity, but that's a fairly recent idea. Before the second half of the 20th century, pink was often thought of as a boys' color. Pink is also the color of breast cancer awareness and, in Japan, of cherry blossoms and spring.",
    authoredOnly: true,
    keyTakeaways: [
      "Pink means tenderness, sweetness, romance and play, and today femininity.",
      "Before the second half of the 20th century, pink often stood for masculinity.",
      "CSS pink #FFC0CB is too light for text (1.54:1 on white); Tailwind's pink-600 #DB2777 is the first step that passes.",
    ],
    sections: [
      {
        title: "What pink means",
        body: "Pink sits between red and white, which is a good way to think about its meaning: red's warmth and affection, softened. People read it as tender, sweet, romantic and playful, and in surveys it's also the color most linked with sweet foods and drinks. Saturation changes the mood a lot. Hot pink is loud, young and confident; pale pink is quiet and calm.",
      },
      {
        title: "Pink used to be for boys",
        body: "Before the second half of the 20th century, pink often stood for masculinity. A June 1918 trade article in Earnshaw's gave the rule as 'pink for the boys, and blue for the girls'. Pink started marking girls in the 1940s, and scholars tie its full switch to femininity to the launch of Barbie in 1959.",
      },
      {
        title: "Named after a flower",
        body: "Pinks are flowers in the Dianthus family, and the color takes its name from them; their own name refers to the frilled edges of their petals. Pink only became a color word in the late 17th century, a youngster next to red.",
      },
      {
        title: "Cherry blossoms",
        body: "In Japan pink is the color of spring, because of the cherry blossoms. Japanese has a word for cherry-blossom pink, sakura-iro, and an older one taken from the peach blossom, momo-iro.",
      },
      {
        title: "Ribbons and triangles",
        body: "Since 1991 the pink ribbon has been the international symbol of breast cancer awareness. The pink triangle has a darker history: in Nazi concentration camps, prisoners accused of homosexuality were forced to wear one. It has since become a symbol of the gay rights movement.",
      },
      {
        title: "Pompadour pink, shocking pink",
        body: "In 18th-century France, Madame de Pompadour had the Sèvres porcelain factory make a pink of her own and helped make pink and blue the fashion colors at Versailles. In the 20th century the designer Elsa Schiaparelli launched 'shocking pink', a vivid magenta-pink.",
      },
      {
        title: "Pink on screens",
        body: "Light pinks need care. CSS pink #FFC0CB measures only 1.54:1 on white, so keep it for backgrounds behind dark text. For pink text, Tailwind's pink-600 (#DB2777, 4.6:1) is the first step that passes. One more check: with protanopia, our color-blind simulator turns #FFC0CB into #C9CACB, a light gray, so a pink highlight can simply disappear for some users.",
      },
    ],
    faq: [
      { question: "What does the color pink mean?", answer: "Tenderness, sweetness, romance and play, and today femininity." },
      { question: "Was pink a boys' color?", answer: "Before the second half of the 20th century it often was. A 1918 trade article gave the rule as pink for boys and blue for girls." },
      { question: "What does hot pink mean?", answer: "Hot pink keeps pink's playfulness and adds confidence and energy, so it reads as bold and young rather than soft." },
      { question: "What does a pink ribbon mean?", answer: "Breast cancer awareness. It has been the international symbol since 1991." },
      { question: "What is the color code for pink?", answer: "CSS pink is #FFC0CB (RGB 255, 192, 203). Hot pink is #FF69B4 and deep pink #FF1493." },
    ],
  },
};
