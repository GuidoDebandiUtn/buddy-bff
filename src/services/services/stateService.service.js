import { StateService } from "../../models/StateService.js";

export async function createStateService(
  idService,
  idServiceState,
  idUserAuthor
) {
  let idAuthor;

  if (idUserAuthor) {
    idAuthor = idUserAuthor;
  } else {
    idAuthor = idService;
  }

  try {
    const newStateService = await StateService.create(
      {
        idUserAuthor: idAuthor,
        createdDate: new Date(),
        updatedDate: new Date(),
        idService,
        idServiceState,
      },
      {
        fields: [
          "idUserAuthor",
          "createdDate",
          "updatedDate",
          "idService",
          "idServiceState",
        ],
      }
    );

    return newStateService;
  } catch (error) {
    throw error;
  }
}

export async function changeStateService(
  idService,
  idServiceState,
  idUserAuthor
) {
  try {
    const state = await StateService.findOne({
      where: {
        idService,
      },
      order: [["createdDate", "DESC"]],
    });

    state.updatedDate = new Date();

    await state.save();

    await createStateService(idService, idServiceState, idUserAuthor);

    return;
  } catch (error) {
    throw error;
  }
}
