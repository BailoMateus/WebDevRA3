/**
 * Valida se o título tem no mínimo 3 caracteres
 * @param {string} titulo
 * @returns {Object}
 */
function validarTitulo(titulo) {
  const tituloTrim = titulo.trim();
  
  if (!tituloTrim) {
    return {
      valido: false,
      mensagem: "O título é obrigatório."
    };
  }
  
  if (tituloTrim.length < 3) {
    return {
      valido: false,
      mensagem: "O título deve conter no mínimo 3 caracteres."
    };
  }
  
  return {
    valido: true,
    mensagem: ""
  };
}

/**
 * Valida se o autor foi preenchido
 * @param {string} autor
 * @returns {Object}
 */
function validarAutor(autor) {
  const autorTrim = autor.trim();
  
  if (!autorTrim) {
    return {
      valido: false,
      mensagem: "O autor é obrigatório."
    };
  }
  
  return {
    valido: true,
    mensagem: ""
  };
}

/**
 * Valida se o ano é número válido
 * @param {string|number} ano
 * @returns {Object}
 */
function validarAno(ano) {
  if (!ano) {
    return {
      valido: false,
      mensagem: "O ano é obrigatório."
    };
  }
  
  const anoNum = Number(ano);
  
  if (isNaN(anoNum) || !Number.isInteger(anoNum)) {
    return {
      valido: false,
      mensagem: "O ano deve ser um número inteiro válido."
    };
  }
  
  const anoAtual = new Date().getFullYear();
  const anoMinimo = 1000;
  
  if (anoNum < anoMinimo || anoNum > anoAtual + 1) {
    return {
      valido: false,
      mensagem: `O ano deve estar entre ${anoMinimo} e ${anoAtual + 1}.`
    };
  }
  
  return {
    valido: true,
    mensagem: ""
  };
}

/**
 * Valida se o gênero foi preenchido
 * @param {string} genero
 * @returns {Object}
 */
function validarGenero(genero) {
  const generoTrim = genero.trim();
  
  if (!generoTrim) {
    return {
      valido: false,
      mensagem: "O gênero é obrigatório."
    };
  }
  
  return {
    valido: true,
    mensagem: ""
  };
}

/**
 * Valida o ID quando necessário (para edição/exclusão)
 * @param {string|number} id
 * @param {boolean} obrigatorio
 * @returns {Object}
 */
function validarId(id, obrigatorio = false) {
  if (!obrigatorio) {
    return { valido: true, mensagem: "" };
  }
  
  if (!id) {
    return {
      valido: false,
      mensagem: "O ID é obrigatório para esta operação."
    };
  }
  
  const idNum = Number(id);
  
  if (isNaN(idNum) || !Number.isInteger(idNum) || idNum <= 0) {
    return {
      valido: false,
      mensagem: "O ID deve ser um número inteiro positivo."
    };
  }
  
  return {
    valido: true,
    mensagem: ""
  };
}

