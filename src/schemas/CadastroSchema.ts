import * as Yup from 'yup';

export const CadastroSchema = Yup.object().shape({
  nome: Yup.string()
    .required('O nome é obrigatório'),
  email: Yup.string()
    .email('Email inválido')
    .required('O email é obrigatório'),
  senha: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha')], 'As senhas devem ser iguais') 
    .required('Confirme a senha'),
  telefone: Yup.string()
    .matches(/^\d+$/, 'O telefone deve conter apenas números')
    .min(10, 'O telefone deve ter pelo menos 10 dígitos')
    .required('O telefone é obrigatório'),
  endereco: Yup.string()
    .required('O endereço é obrigatório'),
});