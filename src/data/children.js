// Sample data. Later this comes from the server over the socket.

export const bus = {
  number: '07',
  plate: 'RJ19 PB 1234',
  driver: 'Ramesh Kumar',
  run: 'Morning run',
  // Set when the school gives this route a different bus or driver today.
  changedToday: true,
  // Time to the next stop where one of your children is waiting.
  eta: { stop: 'Oak Ave', minutes: 6, km: 1.2 },
};

export const children = [
  {
    id: '1',
    name: 'Aarav Kapoor',
    grade: 'Grade 4',
    stop: 'Maple St pickup',
    status: 'onbus', // 'wait' | 'onbus' | 'atschool' | 'home' | 'absent'
    pickedAt: '7:42 am',
    droppedAt: null,
  },
  {
    id: '2',
    name: 'Maya Kapoor',
    grade: 'Grade 2',
    stop: 'Oak Ave pickup',
    status: 'wait',
    pickedAt: null,
    droppedAt: null,
  },
];

// Newest first. The type picks the sentence, in English or Hindi.
export const alerts = [
  { id: 'a3', type: 'near', minutes: 6, stop: 'Oak Ave', at: '7:49 am' },
  { id: 'a2', type: 'picked', child: 'Aarav', at: '7:42 am' },
  { id: 'a1', type: 'late', minutes: 10, at: '7:20 am' },
];

// Written by the school in the admin app.
export const notices = [
  {
    id: 'n2',
    date: '22 Nov',
    en: 'No bus on Monday 24 Nov: school holiday.',
    hi: 'सोमवार 24 नवंबर को बस नहीं आएगी: स्कूल की छुट्टी।',
  },
  {
    id: 'n1',
    date: '20 Nov',
    en: 'From next week the afternoon bus leaves school at 1:30 pm.',
    hi: 'अगले हफ़्ते से दोपहर की बस 1:30 बजे स्कूल से निकलेगी।',
  },
];

// Last 7 school days, newest first. null = that trip did not happen.
export const history = [
  {
    date: 'Fri 21 Nov',
    trips: [
      { childId: '1', morning: ['7:41 am', '8:04 am'], afternoon: ['1:32 pm', '2:01 pm'] },
      { childId: '2', morning: ['7:52 am', '8:04 am'], afternoon: ['1:32 pm', '1:55 pm'] },
    ],
  },
  {
    date: 'Thu 20 Nov',
    trips: [
      { childId: '1', morning: ['7:44 am', '8:07 am'], afternoon: ['1:30 pm', '2:03 pm'] },
      { childId: '2', absent: true },
    ],
  },
  {
    date: 'Wed 19 Nov',
    trips: [
      { childId: '1', morning: ['7:40 am', '8:02 am'], afternoon: ['1:31 pm', '1:59 pm'] },
      { childId: '2', morning: ['7:51 am', '8:02 am'], afternoon: ['1:31 pm', '1:53 pm'] },
    ],
  },
  {
    date: 'Tue 18 Nov',
    trips: [
      { childId: '1', morning: ['7:55 am', '8:19 am'], afternoon: ['1:30 pm', '2:00 pm'] },
      { childId: '2', morning: ['8:06 am', '8:19 am'], afternoon: ['1:30 pm', '1:54 pm'] },
    ],
  },
  {
    date: 'Mon 17 Nov',
    trips: [
      { childId: '1', morning: ['7:42 am', '8:05 am'], afternoon: ['1:33 pm', '2:02 pm'] },
      { childId: '2', morning: ['7:53 am', '8:05 am'], afternoon: ['1:33 pm', '1:56 pm'] },
    ],
  },
  {
    date: 'Sat 15 Nov',
    trips: [
      { childId: '1', morning: ['7:43 am', '8:06 am'], afternoon: null },
      { childId: '2', morning: ['7:54 am', '8:06 am'], afternoon: null },
    ],
  },
  {
    date: 'Fri 14 Nov',
    trips: [
      { childId: '1', absent: true },
      { childId: '2', morning: ['7:52 am', '8:03 am'], afternoon: ['1:31 pm', '1:55 pm'] },
    ],
  },
];
