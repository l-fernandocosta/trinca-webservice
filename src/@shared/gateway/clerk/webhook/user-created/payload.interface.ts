export interface UserCreatedPayload {
  data: Data;
  object: string;
  type: string;
}

export interface Data {
  birthday: string;
  created_at: number;
  email_addresses: Emailaddress[];
  external_accounts: any[];
  external_id: string;
  first_name: string;
  gender: string;
  id: string;
  image_url: string;
  last_name: string;
  last_sign_in_at: number;
  object: string;
  password_enabled: boolean;
  phone_numbers: any[];
  primary_email_address_id: string;
  primary_phone_number_id?: any;
  primary_web3_wallet_id?: any;
  profile_image_url: string;
  two_factor_enabled: boolean;
  updated_at: number;
  username?: any;
  web3_wallets: any[];
}

export interface Emailaddress {
  email_address: string;
  id: string;
  linked_to: any[];
  object: string;
  verification: Verification;
}

export interface Verification {
  status: string;
  strategy: string;
}
