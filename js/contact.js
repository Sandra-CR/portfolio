// Initialise EmailJS et gere le formulaire de contact
(function() {
  emailjs.init({
    publicKey: "StJICsheTly4VbyiX",
  });
})();

window.onload = function() {
  const form = document.getElementById('contact-form');
  const submitButton = form.querySelector('input[type="submit"]');
  const defaultLabel = submitButton.value;
  const successMsg = "L'e-mail a bien ete envoye !";
  const errorMsg = "L'envoi a echoue, veuillez reessayer.";

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    submitButton.disabled = true;
    submitButton.value = 'Envoi en cours...';

    emailjs.sendForm('service_vw2z2n3', 'template_ojooikt', this)
    .then(() => {
      submitButton.value = successMsg;
      submitButton.disabled = false;
      setTimeout(() => {
        submitButton.value = defaultLabel;
      }, 3000);
      console.log(successMsg);
    }, (error) => {
      submitButton.value = errorMsg;
      submitButton.disabled = false;
      console.log(errorMsg, error);
      setTimeout(() => {
        submitButton.value = defaultLabel;
      }, 3000);
    });
  });
};
