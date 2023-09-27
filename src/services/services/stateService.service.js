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
        idService,
        idServiceState,
      },
      {
        fields: [
          "idUserAuthor",
          "createdAt",
          "updatedAt",
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
    const actualState = await StateService.findOne({
      where: {
        idService,
      },
      order: [["createdAt", "DESC"]],
    });

    actualState.active = false;

    await actualState.save();

    await createStateService(idService, idServiceState, idUserAuthor);

    return;
  } catch (error) {
    throw error;
  }
}
