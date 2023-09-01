import { sequelize } from "../../database/database.js";



export async function countFoundsSuccess() {
  try {
    const query = `
    SELECT COUNT(*)
    FROM publicationsearches AS search
    JOIN publicationstates AS state
    ON search.idPublicationState = state.IdPublicationState
    WHERE state.NAME = 'RESUELTO'`;

    const quantity = await sequelize.query(query);

    return quantity;
  } catch (error) {
    throw error;
  }
}


export async function countAdoptionsSuccess() {
    try {
      const query = `
      SELECT COUNT(*)
      FROM publicationadoptions AS adoption
      JOIN publicationstates AS state
      ON adoption.idPublicationState = state.IdPublicationState
      WHERE state.NAME = 'RESUELTO'`;
  
      const quantity = await sequelize.query(query);
  
      return quantity;
    } catch (error) {
      throw error;
    }
}

export async function countLostActives() {
    try {
        const query = `
        SELECT COUNT(*)
        FROM publicationsearches AS search
        JOIN publicationstates AS state
        ON search.idPublicationState = state.IdPublicationState
        WHERE state.NAME = 'ACTIVO'`;
  
      const quantity = await sequelize.query(query);
  
      return quantity;
    } catch (error) {
      throw error;
    }
}

export async function countActiveAdoptions() {
    try {
        const query = `
        SELECT COUNT(*)
        FROM publicationadoptions AS adoption
        JOIN publicationstates AS state
        ON adoption.idPublicationState = state.IdPublicationState
        WHERE state.NAME = 'ACTIVO'`;
  
      const quantity = await sequelize.query(query);
  
      return quantity;
    } catch (error) {
      throw error;
    }
}

export async function countActiveUsers() {
    try {
        const query = `
        SELECT Count(*) 
        FROM (
            SELECT idUser 
            FROM stateusers AS state
            JOIN userstates AS us ON us.idUserState = state.idUserState 
            WHERE us.userStateName = 'ACTIVO' AND idUser IS NOT NULL 
            GROUP BY idUser
        ) AS ActiveUsersCount`;

        const quantity = await sequelize.query(query);
    
        return quantity;
    } catch (error) {
        throw error;
    }
}


export async function countActiveServices() {
    try {
        const query = `
        SELECT Count(*) 
        FROM (
            SELECT idService 
            FROM stateservices AS state
            JOIN servicestates AS us ON us.idServiceState  = state.idServiceState 
            WHERE us.serviceStateName  = 'ACTIVO' AND idservice  IS NOT NULL 
            GROUP BY idservice 
        ) AS ActiveServiceCount`;
    
        const quantity = await sequelize.query(query);
    
        return quantity;
    } catch (error) {
        throw error;
    }
}






router.get('reports/services-actives',);