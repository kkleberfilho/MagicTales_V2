export const formatarTelefone = (telefone: string) => {
  if (!telefone) return '';
  return telefone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
};

export const formatarCEP = (cep: string) => {
  if (!cep) return '';
  return cep
    .replace(/\D/g, '')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{3})\d+?$/, '$1');
};

export const formatarData = (data: string) => {
  if (!data) return '';
  // Se for no formato ISO (YYYY-MM-DD)
  if (data.includes('-')) {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }
  return data;
};