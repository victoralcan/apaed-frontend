export const formataData = (date: Date) => {
  console.log(date);
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date.toString()));
};
