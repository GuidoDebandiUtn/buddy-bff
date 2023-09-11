document.addEventListener("DOMContentLoaded", () => {
  const resetForm = document.querySelector("#reset-form");
  const idUserInput = document.querySelector("#idUser");

  const passwordInput = document.querySelector("#password");
  const confirmInput = document.querySelector("#confirm-password"); // Cambiado a confirmInput
  const showPasswordBtn = document.querySelector("#show-password-btn");

  showPasswordBtn.addEventListener("click", () => {
    togglePasswordVisibility(passwordInput);
    togglePasswordVisibility(confirmInput);
  });

  function togglePasswordVisibility(input) {
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  }

  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const password = passwordInput.value;
    const confirmPassword = confirmInput.value; // Cambiado a confirmInput
    const idUser = idUserInput.value;

    // Validación de contraseña
    const passwordRegex = /^(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      alert(
        "La contraseña debe tener al menos 8 caracteres, 1 número y 1 caracter especial."
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/security/auth/changePassword/${idUser}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      if (response.ok) {
        alert("Cambio de contraseña exitoso.");
      } else {
        const errorData = await response.json();
        alert(`Error al cambiar la contraseña: ${errorData.message}`);
      }
    } catch (error) {
      alert(
        "Ha ocurrido un error. Por favor, inténtalo nuevamente más tarde.",
        error
      );
    }
  });
});
