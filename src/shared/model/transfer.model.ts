import { IFoodStamp } from './foodStamp.model';
import { ILocal } from './local.model';

export interface ITransferGet {
  id?: string;
  origin_id?: string;
  origin?: ILocal | IFoodStamp;
  destiny_id?: string;
  destiny?: ILocal | IFoodStamp;
  transfer_date?: string;
  description?: string;
  product_name?: string;
  product_brand?: string;
  product_ncm_code?: string;
  total_amount_transfered?: number;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ITransferPostPut {
  id?: string;
  destiny_id?: string;
  destiny?: ILocal | IFoodStamp;
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
