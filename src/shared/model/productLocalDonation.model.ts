export interface IProductLocalDonation {
  id?: string;
  name?: string;
  donation_id?: string;
  local_id?: string;
  product_id?: string;
  brand?: string;
  ncm_code?: string;
  'count(*)'?: number;
  unity_measurement?: string;
  expiration_date?: Date;
}
