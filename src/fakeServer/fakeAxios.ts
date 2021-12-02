import {checkupsControllers, patientsController} from './controllers';

export enum ENPOINTS {
  CARE_HOMES = 'care_homes',
  CHECKUPS = 'checkups',
  GP_PRACTICES_PATIENTS = 'gp_practices_patients',
  GP_PRACTICES = 'gp_practices',
  USERS = 'users',
  PATIENTS = 'patients',
}

export const fakeAxios = (endpoint: ENPOINTS, id?: number): any =>
  new Promise((res, rej) => {
    try {
      switch (endpoint) {
        case ENPOINTS.CARE_HOMES:
          setTimeout(async () => {
            const db = (await import('../../data/care_homes.json')).default;
            res(db);
          }, 1000);
          break;
        case ENPOINTS.CHECKUPS:
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
        case ENPOINTS.PATIENTS:
          setTimeout(async () => {
            const dbPatients = (await import('../../data/patients.json'))
              .default;
            const dbGpPractiesPatients = (
              await import('../../data/gp_practices_patients.json')
            ).default;
            const dbPracties = (await import('../../data/gp_practices.json'))
              .default;
            if (id) {
              const dataWithAssignedPractices = patientsController(
                dbPatients,
                dbGpPractiesPatients,
                dbPracties,
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
