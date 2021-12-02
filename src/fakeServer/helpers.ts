import {PracitesPatients, Practices} from './type';

const getPulseoxData = async (url: string) => {
  switch (url) {
    case 'pulseox/01.json': {
      const data = (await import('../../data/pulseox/01.json')).default;
      return data;
    }
    case 'pulseox/02.json': {
      const data = (await import('../../data/pulseox/02.json')).default;
      return data;
    }
    case 'pulseox/03.json': {
      const data = (await import('../../data/pulseox/03.json')).default;
      return data;
    }
    case 'pulseox/04.json': {
      const data = (await import('../../data/pulseox/04.json')).default;
      return data;
    }
    case 'pulseox/05.json': {
      const data = (await import('../../data/pulseox/05.json')).default;
      return data;
    }
    case 'pulseox/06.json': {
      const data = (await import('../../data/pulseox/06.json')).default;
      return data;
    }
    case 'pulseox/07.json': {
      const data = (await import('../../data/pulseox/07.json')).default;
      return data;
    }
    case 'pulseox/08.json': {
      const data = (await import('../../data/pulseox/08.json')).default;
      return data;
    }
    case 'pulseox/09.json': {
      const data = (await import('../../data/pulseox/09.json')).default;
      return data;
    }
    case 'pulseox/10.json': {
      const data = (await import('../../data/pulseox/10.json')).default;
      return data;
    }
    default:
      return [];
  }
};

export const getAvaregeSPO = async (url: string) => {
  const data = await getPulseoxData(url);
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
  dbGpPractiesPatients: PracitesPatients[],
  dbPractices: Practices[],
  pacientId: number,
) => {
  const gpPracticeId = dbGpPractiesPatients.filter(
    item => item.patientId === pacientId,
  );
  const practicIdtoName = gpPracticeId.map(item => {
    const practice = dbPractices.find(
      practices => practices.id === item.gpPracticeId,
    );
    if (practice) {
      return practice.name;
    }
  });
  return practicIdtoName;
};
