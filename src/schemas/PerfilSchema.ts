import * as Yup from 'yup';

export const PerfilSchema = Yup.object().shape({
    username: Yup.string()
      .required('O nome de usuário é obrigatório'),
    dataNascimento: Yup.string()
      .required('A data de nascimento é obrigatória'),
    genero: Yup.string()
      .required('O gênero é obrigatório'),
    emailOuTelefone: Yup.string()
      .required('O email ou telefone é obrigatório'),
    senha: Yup.string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .required('A senha é obrigatória'),
  });
  