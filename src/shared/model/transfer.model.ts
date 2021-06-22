export interface ITransfer {
  id?: string;
  origin_id?: string;
  destiny_id?: string;
  product_local_donation_id?: string;
  transfer_date?: Date;
  description?: string;
  amount?: number;
}
