export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function getRowStatusLabel(status: string): string {
  if (status === "dim") return "Inativa";
  if (status === "success") return "OK";
  return "Alerta";
}
