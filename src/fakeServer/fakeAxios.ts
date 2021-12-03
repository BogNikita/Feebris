import {checkupsControllers, patientsController} from './controllers';

export enum ENDPOINTS {
  CARE_HOMES = 'care_homes',
  CHECKUPS = 'checkups',
  PATIENTS = 'patients',
}

export const fakeAxios = (endpoint: ENDPOINTS, id?: number): any =>
  new Promise((res, rej) => {
    try {
      switch (endpoint) {
        case ENDPOINTS.CARE_HOMES:
          setTimeout(async () => {
            const db = (await import('../../data/care_homes.json')).default;
            res(db);
          }, 1000);
          break;
        case ENDPOINTS.CHECKUPS:
          setTimeout(async () => {
            const db = (await import('../../data/checkups.json')).default;
            if (id) {
              const result = await checkupsControllers(db, id);
              res(result);
            } else {
              rej('id not found');
            }
          }, 1000);
          break;
        case ENDPOINTS.PATIENTS:
          setTimeout(async () => {
            const dbPatients = (await import('../../data/patients.json'))
              .default;
            const dbGpPracticesPatients = (
              await import('../../data/gp_practices_patients.json')
            ).default;
            const dbPractices = (await import('../../data/gp_practices.json'))
              .default;
            if (id) {
              const dataWithAssignedPractices = patientsController(
                dbPatients,
                dbGpPracticesPatients,
                dbPractices,
                id,
              );
              res(dataWithAssignedPractices);
            } else {
              rej('id not found');
            }
          }, 1000);
          break;
        default:
          break;
      }
    } catch (error) {
      rej(error);
    }
  });
