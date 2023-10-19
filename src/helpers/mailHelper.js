import nodemailer from "nodemailer";

export async function validateMail(mail, idUser) {
  const transport = await infoTransport();

  await transport.sendMail({
    from: "applicationbuddyproject@gmail.com",
    to: mail,
    subject: "Valida tu usario",
    text: "",
    html: `
            <p>Hola! Valida tu usuario:</p>

            <p>Tu cuenta esta lista para ser validada, dale click al siguiente enlace 
            <a href="${process.env.BACKEND_URL}/security/auth/validateAccount/${idUser}">Validar cuenta</a>.</p>

            <p>Si no creaste esta cuenta en BUDDY!, ignora el mensaje.</p>
            <p>Equipo de BUDDY!<p>
            `,
  });
}

export async function resetPasswordMail(mail, idUser) {
  const transport = await infoTransport();

  await transport.sendMail({
    from: "applicationbuddyproject@gmail.com",
    to: mail,
    subject: "Restablecer contraseña",
    text: "",
    html: `
            <p>Hola! Estas restableciendo tu contraseña:</p>

            <p>Genera una contraseña nueva con este link: 
            <a href="${process.env.BACKEND_URL}/security/auth/changePassword/${idUser}">Reestablecer contraseña</a>.</p>

            <p>Si no pediste cambiar la contraseña, ignora el mensaje.</p>
            <p>Equipo de BUDDY!<p>
        `,
  });
}
export async function sendValidationUserEmail(mail, html) {
  const transport = await infoTransport();

  await transport.sendMail({
    from: "applicationbuddyproject@gmail.com",
    to: mail,
    subject: "Solicitud de validacion de usuario",
    text: "",
    html: html,
  });
}

export async function infoTransport() {
  const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  return transport;
}
