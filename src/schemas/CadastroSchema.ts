import * as Yup from 'yup';
import { validarCPF } from '@/utils/cpfValidator';

export const CadastroSchema = Yup.object().shape({
  nomeCompleto: Yup.string()
    .required('Nome completo é obrigatório')
    .trim(),

  email: Yup.string()
    .email('Email inválido')
    .required('Email é obrigatório')
    .trim(),

  senha: Yup.string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .required('Senha é obrigatória')
    .trim(),

  confirmarSenha: Yup.string()
    .oneOf([Yup.ref('senha')], 'As senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),

  dataNascimento: Yup.string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      'Data de nascimento inválida (use DD/MM/AAAA)'
    )
    .test(
      'data-valida',
      'Data de nascimento inválida',
      (value) => {
        if (!value) return false;
        const [dia, mes, ano] = value.split('/');
        const data = new Date(`${ano}-${mes}-${dia}`);
        return !isNaN(data.getTime());
      }
    )
    .required('Data de nascimento é obrigatória'),

    cpf: Yup.string()
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
    .test('cpf-valido', 'CPF inválido', (value) => {
      return validarCPF(value || '');
    })
    .required('CPF é obrigatório'),

  telefone: Yup.string()
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido')
    .required('Telefone é obrigatório'),

  endereco: Yup.object().shape({
    cep: Yup.string()
      .matches(/^\d{5}-\d{3}$/, 'CEP inválido'),
    rua: Yup.string()
      .required('Rua é obrigatória'),
    numero: Yup.string()
      .required('Número é obrigatório'),
    complemento: Yup.string(),
    bairro: Yup.string()
      .required('Bairro é obrigatório'),
    cidade: Yup.string()
      .required('Cidade é obrigatória'),
    estado: Yup.string()
      .required('Estado é obrigatório'),
  })
});