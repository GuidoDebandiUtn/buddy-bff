
import { countActiveAdoptions, countActiveServices, countActiveUsers, countAdoptionsSuccess, countFoundsSuccess, countLostActives } from "../service/counts.service.js";




export async function getSucessLosts(req, res) {
  const userPermissions = req.user.permissions;

  try {

    let requiredPermissions=['READ_REPORTS_SUCCESS_LOSTS',];
    const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
  
    if (!hasAllPermissions) {
      return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
    }

    const data = await countFoundsSuccess();

    return res.status(200).json({quantity: data.quantity, message:`Se han encontrado ${data.quantity} busquedas resueltas exitosamente`});
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }

}


export async function getSucessAdoptions(req, res) {
  try {
      const userPermissions = req.user.permissions;
      let requiredPermissions=['READ_REPORTS_SUCCESS_ADOPTIONS','READ_REPORTES'];
      const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
    
      if (!hasAllPermissions) {
        return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
      }
      const data = await countAdoptionsSuccess();
  
      return res.status(200).json({quantity: data.quantity, message:`Se han encontrado ${data.quantity} adopciones resueltas exitosamente`});
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  
}


export async function getActiveUsers(req, res) {

    try {
      const userPermissions = req.user.permissions;
      let requiredPermissions=['READ_REPORTS_ACTIVE_USERS','READ_REPORTES'];
      const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
    
      if (!hasAllPermissions) {
        return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
      }

      const data = await countActiveUsers();
  
      return res.status(200).json({ quantity: data.quantity, message:`Se han encontrado ${data.quantity} usuarios activos dentro de la aplicacion`});
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  
}

export async function getActiveLosts(req, res) {

    try {
      const userPermissions = req.user.permissions;
      let requiredPermissions=['READ_REPORTS_ACTIVE_LOSTS','READ_REPORTES'];
      const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
    
      if (!hasAllPermissions) {
        return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
      }

      const data = await countLostActives();
  
      return res.status(200).json({quantity: data.quantity, message:`Se han encontrado ${data.quantity} busquedas de mascotas activas dentro de la aplicacion`});
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  
}

export async function getActiveAdoptions(req, res) {

    try {

      const userPermissions = req.user.permissions;
      let requiredPermissions=['READ_REPORTS_ACTIVE_ADOPTIONS','READ_REPORTES'];
      const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
    
      if (!hasAllPermissions) {
        return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
      }

      const data = await countActiveAdoptions();
  
      return res.status(200).json({ quantity: data.quantity, message:`Se han encontrado ${data.quantity} adopciones de mascotas activas dentro de la aplicacion`});
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  
}


export async function getActiveServices(req, res) {

    try {

      const userPermissions = req.user.permissions;
      let requiredPermissions=['READ_REPORTS_ACTIVE_SERVICES','READ_REPORTES'];
      const hasAllPermissions = requiredPermissions.every(permission => userPermissions.includes(permission));
    
      if (!hasAllPermissions) {
        return res.status(403).json({ message: "No se cuenta con todos los permissions necesarios" });
      }

      const data = await countActiveServices();
  
      return res.status(200).json({ quantity: data.quantity, message:`Se han encontrado ${data.quantity} servicios de mascotas activas dentro de la aplicacion`});
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  
}





