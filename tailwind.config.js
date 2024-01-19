const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dark-background': 'linear-gradient(45deg, rgba(65, 62, 150, 1) 0%, rgba(13, 15, 35, 1) 100%)',
        'light-background': 'linear-gradient(to right, #06b6d4, #3b82f6)',
      },
      colors: {
        'eagle-union': '#1f77b4', // USN
        'royal-navy': '#aec7e8', //HMS
        'sakura-empire': '#ff7f0e', //IJN
        'ironblood': '#ffbb78', //KMS
        'dragon-empire': '#2ca02c', //ROC/PRAN
        'northern-parliament': '#98df8a', //SN
        'iris-libre': '#ff9896', // FFNF
        'vichya-dominion': '#9467bd', //MNF
        'sardegna-empire': '#c5b0d5', //RM
        'unknown': '#8c564b', // MISELLANEOUS
        'iris-orthodoxy': '#d62728', // EMPTY
        'meta': '#ff7f0e', // META
        'bilibili': '#ffbb78', // BILIBILI
        'universal': '#2ca02c', // UNIVERSAL
        'venus-vacation': '#98df8a', // VV
        'neptunia': '#ff9896', // NEPTUNIA
        'atelier': '#9467bd', // ATELIER
        'kizunaai': '#c5b0d5', // KIZUNA AI
        'hololive': '#8c564b', // HOLOLIVE
        'tempesta': '#e377c2', // TEMPESTA
        'ssss': '#7f7f7f', // SSSS
        'utawarerumono': '#bcbd22', // UTAWARERUMONO
        'siren': '#17becf', // SIREN
        'miscellaneous': '#1f77b4', // MISELLANEOUS
        'atelier-sirens': '#aec7e8', // ATELIER SIRENS
        'atelier-mobs': '#ff7f0e', // ATELIER MOBS
        'idolmaster': '#ffbb78', // IDOLMASTER

      }
    },
  },

  safelist: [
    'bg-eagle-union',
    'bg-royal-navy',
    'bg-sakura-empire',
    'bg-ironblood',
    'bg-dragon-empery',
    'bg-northern-parliament',
    'bg-iris-orthodoxy',
    'bg-iris-libre',
    'bg-vichya-dominion',
    'bg-sardegna-empire',
    'bg-dragon-empire',
    'bg-idolmaster',
    'bg-meta',
    'bg-bilibili',
    'bg-universal',
    'bg-venus-vacation',
    'bg-neptunia',
    'bg-atelier',
    'bg-kizunaai',
    'bg-hololive',
    'bg-tempesta',
    'bg-ssss',
    'bg-utawarerumono',
    'bg-siren',
    'bg-miscellaneous',
    'bg-atelier-sirens',
    'bg-atelier-mobs',
    'bg-unknown',
    'eagle-union',
    'royal-navy',
    'sakura-empire',
    'ironblood',
    'dragon-empire',
    'northern-parliament',
    'iris-orthodoxy',
    'iris-libre',
    'vichya-dominion',
    'sardegna-empire',
    'idolmaster',
    'bilibili',
    'universal',
    'venus-vacation',
    'neptunia',
    'atelier',
    'kizunaAI',
    'hololive',
    'tempesta',
    'ssss',
    'utawarerumono',
    'siren',
    'miscellaneous',
    'atelier-sirens',
    'atelier-mobs',
    // añade aquí cualquier otra clase que quieras proteger
  ],
  darkMode: "class",
  plugins: [nextui()],
}

