function validarForm() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input');

    let isValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.classList.add('invalid');
            isValid = false;
        } else {
            input.classList.remove('invalid');
        }
    });

    return isValid;
}

function enviarForm() {
    if (validarForm()) {
        enviarWhatsApp();
    }
}

// Função de máscara de telefone
function mascararTelefone(telefone) {
    const texto = telefone.value;
    const textoApenasNumeros = texto.replace(/\D/g, '').substring(0, 11);

    let telefoneFormatado = textoApenasNumeros.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');

    if (textoApenasNumeros.length < 11) {
        telefoneFormatado = textoApenasNumeros.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }

    telefone.value = telefoneFormatado;
}

// Adicionar evento de input ao campo de telefone
const campoTelefone = document.getElementById('input-phone');
campoTelefone.addEventListener('input', function () {
    mascararTelefone(this);
});

function enviarWhatsApp() {

    const name = document.getElementById('input-name').value;
    const email = document.getElementById('input-email').value;
    const phone = document.getElementById('input-phone').value;
    const message = document.getElementById('input-message').value;

    const text = `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nMensagem: ${message}`;
    const encodedText = encodeURIComponent(text);
    const phoneWithoutMask = phone.replace(/[-()\s]/g,'');
    const url = `https://wa.me/55${phoneWithoutMask}?text=${encodedText}`;

    window.open(url, '_blank');
}