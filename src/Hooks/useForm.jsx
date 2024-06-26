import React, { useState } from 'react'


const validacao = {
  email:{
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ,
    message: 'Preencha um email válido'
  },
  senha:{
    regex:/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z0-9!@#$%^&*()_+]{6,}$/
    ,
    message: 'Preencha com pelo menos uma letra, numero ou caractere especial [ a-A, 1, @ ]'
  }
}

const useForm = (type) => {
    const [value, setValue]=useState('')
    const [error, setError]=useState(null)

    function validate(value){
      if(type === false) return true // se na passagem de paramentro do useForm estiver 'false' não passara pela validacao
      if(value.length === 0){
        setError('Preencha um valor')
        return false
      }else if(validacao[type] && !validacao[type].regex.test(value)){
        setError(validacao[type].message)
        return false
      }else{
        setError(null)
        return true
      }
    }

    function reset() {
      setValue("");
      setError(null);
    }
  
    function onChange({target}){
        if(error) validate(target.value)
        setValue(target.value)
    }
  return {
    value,
    setValue,
    onChange,
    error,
    setError,
    validate: () => validate(value),
    onBlur: () => validate(value),
    reset: ()=> reset(),
  }
}

export default useForm
