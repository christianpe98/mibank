export interface DepositDto {
  cardNumber: string;
  cardPin: string;
  iban: string;
  amount: number;
}

export interface Account {
  id: string;
  iban: string;
  amount: number;
  bankId: string;
}
