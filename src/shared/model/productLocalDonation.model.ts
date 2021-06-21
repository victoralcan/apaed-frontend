export interface IProductLocalDonation {
  id?: string;
  name?: string;
  donation_id: string;
  local_id?: string;
  product_id: string;
  ncm_code?: string;
  amount: number;
  expiration_date: Date;
}
