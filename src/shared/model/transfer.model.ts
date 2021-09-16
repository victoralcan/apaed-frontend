import { ILocal } from './local.model';
import { IProductLocalDonationGet } from './productLocalDonation.model';

export interface ITransferGet {
  id?: string;
  origin_id?: string;
  origin?: ILocal;
  destiny_id?: string;
  destiny?: ILocal;
  product_local_donation_id?: string;
  productLocalDonation: IProductLocalDonationGet;
  transfer_date?: string;
  description?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ITransferPostPut {
  id?: string;
  destiny_id?: string;
  destiny?: ILocal;
  product_id?: string;
  transfer_date?: string;
  description?: string;
  amount?: number;
  expiration_date?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}
