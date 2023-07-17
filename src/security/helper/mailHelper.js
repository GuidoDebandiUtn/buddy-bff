import nodemailer from "nodemailer";

export async function validateMail(userName, mail, idUser) {
  const transport = await infoTransport();

  await transport.sendMail({
    from: '"BUDDY!"',
    to: mail,
    subject: "Valida tu usario",
    text: "",
    html: `
            <p>Hola ${userName}, valida tu usuario</p>

            <p>Tu cuenta esta lista para ser validada, dale click al siguiente enlace 
            <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 4000
    }/security/auth/validateAccount/${idUser}">Validar cuenta</a> </p>

            <p>Si no creaste esta cuenta en BUDDY!, ignora el mensaje</p>
        `,
  });
}

export async function resetPasswordMail(userName, mail, idUser) {
  const transport = await infoTransport();
  console.log(userName, mail, idUser);
  await transport.sendMail({
    from: "BUDDY!",
    to: mail,
    subject: "Restablecer contraseña",
    text: "",
    html: `
            <p>Hola ${userName}, estas restableciendo tu contraseña</p>

            <p>Genera una contraseña nueva con este link: 
            <a href="${process.env.BACKEND_URL}:${
      process.env.PORT ?? 4000
    }/auth/resetPassword/${idUser}">Reestablecer contraseña</a> </p>

            <p>Si no pediste cambiar la contraseña, ignora el mensaje</p>
        `,
  });
}

export async function infoTransport() {
  const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });
  return transport;
}
