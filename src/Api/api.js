// const URL = "http://localhost:3333";
const URL = "https://felipejohnny.com";
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
export function GET_TO_ID(tableName, id,token) {
  return {
    url: `${URL}/api/${tableName}/${id}`,
    options: {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token} `,
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
export function UPDATE_DATA(tableName,id, token,formData) {
  return {
    url:`${URL}/api/${tableName}/${id}`,
    options: {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${token} `,
      },
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

//=================[autenticado] Cria Pedido====================//
export function POST_DATA_NOVO_PEDIDO(tableName,token, produtos){
  return{
      url:`${URL}/api/${tableName}`,
      options:{
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token} `,
        },
        body: JSON.stringify({ produtos }),
      },
  }
}

//=================Retorna PEdidos por Usuario====================//
export function GET_PEDIDOS_POR_USER_ID(id,token) {
  return {
    url: `${URL}/api/pedido/usuario/${id}`,
    options: {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token} `,
      },
    },
  };
}