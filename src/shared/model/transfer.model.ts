import { ILocal } from './local.model';

export interface ITransferGet {
  id?: string;
  origin_id?: string;
  origin?: ILocal;
  destiny_id?: string;
  destiny?: ILocal;
  transfer_date?: string;
  description?: string;
  product_name?: string;
  product_brand?: string;
  product_ncm_code?: string;
  total_amount_tranfered?: number;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ITransferPostPut {
  id?: string;
  destiny_id?: string;
  destiny?: ILocal;
  product_id?: string;
  product_name?: string;
  product_brand?: string;
  product_ncm_code?: string;
  total_amount_transfered?: number;
  transfer_date?: string;
  description?: string;
  expiration_date?: string;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}
