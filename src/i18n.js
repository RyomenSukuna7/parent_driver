import { createContext, useContext, useState } from 'react';

// Every word the parent app shows, in English and Hindi.
const STRINGS = {
  en: {
    eyebrow: 'Parent',
    title: 'Bus tracker',
    driver: 'Driver',
    etaTitle: 'Arriving soon',
    eta: (stop, min, km) => `Bus reaches ${stop} in about ${min} min · ${km} km away`,
    changeTitle: "Today's bus has changed",
    changeBody: (plate, driver) =>
      `Today's bus is ${plate}, driver ${driver}. Please check the number plate before your child gets on.`,
    alerts: 'Alerts',
    alert: (a) =>
      ({
        near: `Bus is ${a.minutes} min away from ${a.stop}`,
        picked: `${a.child} picked up`,
        dropped: `${a.child} dropped at ${a.place}`,
        late: `Bus is running ${a.minutes} min late`,
      })[a.type] ?? '',
    busLocation: 'Bus location',
    live: 'Live',
    busLegend: (n) => `Bus ${n}`,
    school: 'School',
    route: 'Route',
    yourChildren: 'Your children',
    students: (n) => `${n} students`,
    status: {
      wait: 'Waiting at stop',
      onbus: 'On the bus',
      atschool: 'At school',
      home: 'Dropped at home',
      absent: 'Not coming today',
      unknown: 'No update',
    },
    pickedAt: (t) => `Picked up at ${t}`,
    droppedAt: (t) => `Dropped at ${t}`,
    notComing: 'Not coming today',
    comingAfterAll: 'Coming today after all',
    confirmAbsent: (name) => `Is ${name} not coming today?`,
    confirmAbsentBody: 'The driver will skip this stop today.',
    confirmComing: (name) => `Is ${name} coming today after all?`,
    confirmComingBody: 'The driver will stop here again today.',
    cancel: 'Cancel',
    confirm: 'Confirm',
    notices: 'School notices',
    history: 'Trip history',
    historySub: 'Last 7 days',
    viewHistory: 'See trip history',
    back: 'Back',
    morning: 'Morning',
    afternoon: 'Afternoon',
    absentDay: 'Absent',
  },
  hi: {
    eyebrow: 'अभिभावक',
    title: 'बस ट्रैकर',
    driver: 'ड्राइवर',
    etaTitle: 'बस आने वाली है',
    eta: (stop, min, km) => `बस लगभग ${min} मिनट में ${stop} पहुँचेगी · ${km} किमी दूर`,
    changeTitle: 'आज बस बदली गई है',
    changeBody: (plate, driver) =>
      `आज बस ${plate} है, ड्राइवर ${driver}। बच्चे को बैठाने से पहले नंबर प्लेट ज़रूर देखें।`,
    alerts: 'सूचनाएँ',
    alert: (a) =>
      ({
        near: `बस ${a.stop} से ${a.minutes} मिनट दूर है`,
        picked: `${a.child} बस में बैठ गया`,
        dropped: `${a.child} को ${a.place} पर उतारा गया`,
        late: `बस ${a.minutes} मिनट देर से चल रही है`,
      })[a.type] ?? '',
    busLocation: 'बस की लोकेशन',
    live: 'लाइव',
    busLegend: (n) => `बस ${n}`,
    school: 'स्कूल',
    route: 'रूट',
    yourChildren: 'आपके बच्चे',
    students: (n) => `${n} बच्चे`,
    status: {
      wait: 'स्टॉप पर इंतज़ार',
      onbus: 'बस में',
      atschool: 'स्कूल पहुँचा',
      home: 'घर छोड़ा',
      absent: 'आज नहीं आएगा',
      unknown: 'कोई अपडेट नहीं',
    },
    pickedAt: (t) => `${t} पर बस में बैठा`,
    droppedAt: (t) => `${t} पर उतारा`,
    notComing: 'आज नहीं आएगा',
    comingAfterAll: 'आज आएगा',
    confirmAbsent: (name) => `क्या ${name} आज नहीं आएगा?`,
    confirmAbsentBody: 'ड्राइवर आज इस स्टॉप पर नहीं रुकेगा।',
    confirmComing: (name) => `क्या ${name} आज आएगा?`,
    confirmComingBody: 'ड्राइवर आज फिर से इस स्टॉप पर रुकेगा।',
    cancel: 'रद्द करें',
    confirm: 'पक्का करें',
    notices: 'स्कूल की सूचनाएँ',
    history: 'यात्रा इतिहास',
    historySub: 'पिछले 7 दिन',
    viewHistory: 'यात्रा इतिहास देखें',
    back: 'वापस',
    morning: 'सुबह',
    afternoon: 'दोपहर',
    absentDay: 'अनुपस्थित',
  },
};

const LangContext = createContext({ lang: 'en', t: STRINGS.en, setLang: () => {} });

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en');
  return (
    <LangContext.Provider value={{ lang, t: STRINGS[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

// const { t, lang, setLang } = useLang();
export const useLang = () => useContext(LangContext);
