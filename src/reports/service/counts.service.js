import { sequelize } from "../../database/database.js";



export async function countFoundsSuccess() {
  try {
    const query = `
    SELECT COUNT(*) as quantity
    FROM publicationsearches AS search
    JOIN publicationstates AS state
    ON search.idPublicationState = state.IdPublicationState
    WHERE state.NAME = 'RESUELTO'`;

    const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

    return result[0];
  } catch (error) {
    throw error;
  }
}


export async function countAdoptionsSuccess() {
    try {
      const query = `
      SELECT COUNT(*) as quantity
      FROM publicationadoptions AS adoption
      JOIN publicationstates AS state
      ON adoption.idPublicationState = state.IdPublicationState
      WHERE state.NAME = 'RESUELTO'`;
  
      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
  
      return result[0];
    } catch (error) {
      throw error;
    }
}

export async function countLostActives() {
    try {
        const query = `
        SELECT COUNT(*) as quantity
        FROM publicationsearches AS search
        JOIN publicationstates AS state
        ON search.idPublicationState = state.IdPublicationState
        WHERE state.NAME = 'ACTIVO'`;
  
      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });

  
      return result[0];
    } catch (error) {
      throw error;
    }
}

export async function countActiveAdoptions() {
    try {
        const query = `
        SELECT COUNT(*) as quantity
        FROM publicationadoptions AS adoption
        JOIN publicationstates AS state
        ON adoption.idPublicationState = state.IdPublicationState
        WHERE state.NAME = 'ACTIVO'`;
  
      const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
  
      return result[0];
    } catch (error) {
      throw error;
    }
}

export async function countActiveUsers() {
    try {
        const query = `
        SELECT Count(*)  as quantity
        FROM (
            SELECT idUser 
            FROM stateusers AS state
            JOIN userstates AS us ON us.idUserState = state.idUserState 
            WHERE us.userStateName = 'ACTIVO' AND idUser IS NOT NULL 
            GROUP BY idUser
        ) AS ActiveUsersCount`;

        const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    
        return result[0];
    } catch (error) {
        throw error;
    }
}


export async function countActiveServices() {
    try {
        const query = `
        SELECT Count(*)  as quantity
        FROM (
            SELECT idService 
            FROM stateservices AS state
            JOIN servicestates AS us ON us.idServiceState  = state.idServiceState 
            WHERE us.serviceStateName  = 'ACTIVO' AND idservice  IS NOT NULL 
            GROUP BY idservice 
        ) AS ActiveServiceCount`;
    
        const result = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
    
        return result[0];
    } catch (error) {
        throw error;
    }
}