import {getAverageSPO, getPracticesName} from './helpers';
import {Checkups, PracticesPatients, Practices, Patients} from './type';

export const checkupsControllers = async (db: Checkups[], id: number) => {
  const checkupsData = db.filter(item => item.patientId === id);
  const result = [];
  const averageSPO2 = [];
  for (let item of checkupsData) {
    if (item.pulseOximeterData?.length) {
      for (const el of item.pulseOximeterData) {
        const average = await getAverageSPO(el);
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
  dbGpPracticesPatients: PracticesPatients[],
  dbPractices: Practices[],
  id: number,
) => {
  const data = dbPatients.filter(item => item.careHomeId === id);
  const dataWithAssignedPractices = data.map(item => ({
    ...item,
    assignedPractices: getPracticesName(
      dbGpPracticesPatients,
      dbPractices,
      item.id,
    ),
  }));
  return dataWithAssignedPractices;
};
