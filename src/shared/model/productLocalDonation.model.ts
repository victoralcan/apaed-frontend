import { IDonation } from './donation.model';
import { ILocal } from './local.model';
import { IProduct } from './product.model';

export interface IProductLocalDonation {
  id?: string;
  name?: string;
  donation_id?: string;
  local_id?: string;
  product_id?: string;
  brand?: string;
  ncm_code?: string;
  count?: number;
  unity_measurement?: string;
  expiration_date?: Date;
  minimal_qntt?: number;
  totalAmount?: number;
}

export interface IProductLocalDonationGet {
  id?: string;
  donation_id?: string;
  donation?: IDonation;
  local_id?: string;
  local?: ILocal;
  product_id?: string;
  product?: IProduct;
  expiration_date?: string;
  active?: boolean;
  totalAmount?: number;
  created_at?: string;
  updated_at?: string;
}

export interface IProductLocalDonationPostPut extends IProductLocalDonationGet {
  amount?: number;
}
