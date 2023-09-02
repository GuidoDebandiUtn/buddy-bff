import { getIdToken } from "../../helpers/authHelper.js";
import { createComplaint, deleteComplaint, getAllComplaints,getComplaintById } from "../services/complaint.service.js";



export async function postComplaint(req, res) {
    const idComplainant = await getIdToken(req.header("auth-token"));
  
    try {
      const newComplaint = await createComplaint(req.body, idComplainant);
  
      return res
        .status(201)
        .json({ message: "Se creó exitosamente la denuncia", newComplaint });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }



  export async function getComplaintsAll(req, res) {
    const {  page, size,} = req.query;
  
    try {
      const complaints = await getAllComplaints(page, size);
  
      if (!complaints[0]) {
        return res.status(404).json({ message: "No existen denuncias activas" });
      }
  
      return res.status(200).json(complaints);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }



  export async function complaintDelete(req, res) {
    const { idComplaint } = req.params;
  
    try {
      const complaint = await getComplaintById(idComplaint);
  
      if (!complaint[0]) {
        return res
          .status(404)
          .json({ message: "No se ha encontrado la denuncia que se quiere eliminar" });
      }
  
      await deleteComplaint(idComplaint);
  
      return res
        .status(200)
        .json({ message: "Se ha dado de baja correctamente la denuncia" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }