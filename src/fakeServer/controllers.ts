import {getAvaregeSPO, getPracticesName} from './helpers';
import {Checkups, PracitesPatients, Practices, Patients} from './type';

export const checkupsControllers = async (db: Checkups[], id: number) => {
  const checkupsData = db.filter(item => item.patientId === id);
  const result = [];
  const averageSPO2 = [];
  for (let item of checkupsData) {
    if (item.pulseOximeterData?.length) {
      for (const el of item.pulseOximeterData) {
        const average = await getAvaregeSPO(el);
        averageSPO2.push(average);
      }
      result.push({
        ...item,
        averageSPO2,
      });
    } else {
      result.push(item);
    }
  }
  return result;
};

export const patientsController = (
  dbPatients: Patients[],
  dbGpPractiesPatients: PracitesPatients[],
  dbPractices: Practices[],
  id: number,
) => {
  const data = dbPatients.filter(item => item.careHomeId === id);
  const dataWithAssignedPractices = data.map(item => ({
    ...item,
    assignedPractices: getPracticesName(
      dbGpPractiesPatients,
      dbPractices,
      item.id,
    ),
  }));
  return dataWithAssignedPractices;
};
