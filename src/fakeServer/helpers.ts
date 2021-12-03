import {PracticesPatients, Practices} from './type';

const getPulseOximeterData = async (url: string) => {
  switch (url) {
    case 'pulseox/01.json':
      return (await import('../../data/pulseox/01.json')).default;

    case 'pulseox/02.json':
      return (await import('../../data/pulseox/02.json')).default;

    case 'pulseox/03.json':
      return (await import('../../data/pulseox/03.json')).default;

    case 'pulseox/04.json':
      return (await import('../../data/pulseox/04.json')).default;

    case 'pulseox/05.json':
      return (await import('../../data/pulseox/05.json')).default;

    case 'pulseox/06.json':
      return (await import('../../data/pulseox/06.json')).default;

    case 'pulseox/07.json':
      return (await import('../../data/pulseox/07.json')).default;

    case 'pulseox/08.json':
      return (await import('../../data/pulseox/08.json')).default;

    case 'pulseox/09.json':
      return (await import('../../data/pulseox/09.json')).default;

    case 'pulseox/10.json':
      return (await import('../../data/pulseox/10.json')).default;

    default:
      return [];
  }
};

export const getAverageSPO = async (url: string) => {
  const data = await getPulseOximeterData(url);
  const startTime = data[0].TIMESTAMP;

  const normalRange = data.map((item, i) => {
    if (
      item.TIMESTAMP - 5000 < startTime &&
      (item.SPO2 > 100 || item.SPO2 < 80)
    ) {
      const sliceArr = data.splice(0, i);
      const filterArr = sliceArr.filter(el => el.SPO2 < 100 || el.SPO2 > 80);
      const avr =
        sliceArr.reduce((acc, el) => acc + el.SPO2, 0) / filterArr.length || 90;
      return {...item, SPO2: avr};
    } else if (item.SPO2 > 100 || item.SPO2 < 80) {
      const sliceArr = data.filter(
        el =>
          el.TIMESTAMP < item.TIMESTAMP && el.TIMESTAMP > item.TIMESTAMP - 5000,
      );
      const avr =
        sliceArr.reduce((acc, el) => acc + el.SPO2, 0) / sliceArr.length;
      return {...item, SPO2: avr};
    }
    return item;
  });
  const result = normalRange.reduce((acc, item) => (acc += +item.SPO2), 0);
  return +(result / data.length).toFixed(2);
};

export const getPracticesName = (
  dbGpPracticesPatients: PracticesPatients[],
  dbPractices: Practices[],
  patientId: number,
) => {
  const gpPracticeId = dbGpPracticesPatients.filter(
    item => item.patientId === patientId,
  );
  const practiceName = gpPracticeId.map(item => {
    const practice = dbPractices.find(
      practices => practices.id === item.gpPracticeId,
    );
    if (practice) {
      return practice.name;
    }
  });
  return practiceName;
};
