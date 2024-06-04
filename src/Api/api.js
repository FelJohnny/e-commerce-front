const URL = "http://localhost:3333";

//=================LOGIN/REGISTER====================//

export function POST_LOGIN(dataLogin) {
  return {
    url: `${URL}/api/auth/login`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataLogin),
    },
  };
}

export function POST_REGISTER(dataregister) {
  return {
    url: `${URL}/api/auth/register`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataregister),
    },
  };
}

//=================Retorna lista de dados====================//
export function GET_ALL(tableName) {
  return {
    url: `${URL}/api/${tableName}`,
    options: {
      method: "GET",
      Headers: {
        Accept: "application/json",
      },
    },
  };
}

export function GET_ALL_PAGE(tableName,page) {
  return {
    url: `${URL}/api/${tableName}/?page=${page}`,
    options: {
      method: "GET",
      Headers: {
        Accept: "application/json",
      },
    },
  };
}


//=================Retorna registro unico por ID====================//
export function GET_TO_ID(tableName, id) {
  return {
    url: `${URL}/api/${tableName}/${id}`,
    options: {
      method: "GET",
      Headers: {
        Accept: "application/json",
      },
    },
  };
}
//=================[autenticado] Retorna usuario unico====================//
export function GET_AUTH_USER(token, id) {
  return {
    url: `${URL}/api/auth/login/${id}`,
    options: {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token} `,
      },
    },
  };
}
//=================Retorna lista de join ATIVOS com relação entre tabelas====================//
export function GET_INNER(tableName1, tableName2,page) {
  return {
    url: `${URL}/api/${tableName1}/${tableName2}/?page=${page}`,
    options: {
      method: "GET"
    },
  };
}

//=================Retorna lista de join TOTAL entre duas entidades====================//
export function GET_PRODUTOS_POR_USUARIO(id,token) {
  return {
    url: `${URL}/api/produto/usuario/${id}`,
    options: {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token} `,
      },
    },
  };
}

//=================Retorna dado unico com inner join====================//
export function GET_INNER_ID(tableName1, tableName2,id) {
  return {
    url: `${URL}/api/${tableName1}/${tableName2}/${id}`,
    options: {
      method: "GET"
    },
  };
}

//=================Cria novo produto====================//
export function POST_DATA_NOVO_PRODUTO(tableName,token, formData){
  return{
      url:`${URL}/api/${tableName}`,
      options:{
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token} `,
        },
      },
  }
}

//=================[autenticado] Atualiza registro====================//
export function UPDATE_DATA(tableName, updateData, id, token) {
  return {
    url: `${URL}/api/${tableName}/${id}`,
    options: {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
      body: JSON.stringify(updateData),
    },
  };
}

//=================[autenticado] Deleta registro====================//
export function DELETE_DATA(tableName, id, token) {
  return {
    url: `${URL}/api/${tableName}/${id}`,
    options: {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token} `,
      },
    },
  };
}

//=================Envia email para reset de senha====================//
export function RECOVER_PASSWORD(tableName,email) {
  return {
    url: `${URL}/api/${tableName}/`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    },
  };
}

//=================[autenticado] definir nova senha====================//
export function UPDATE_PASSWORD(tableName,newPassword,token) {
  return {
    url: `${URL}/api/${tableName}/${token}`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPassword),
    },
  };
}
//=================Envio de email====================//
export function SEND_EMAIL(emailBody) {
  return {
    url: `${URL}/api/send-email`,
    options: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailBody),
    },
  };
}