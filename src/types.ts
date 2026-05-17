export interface SteamApp {
  item_type: number;
  id: number;
  success: number;
  visible: boolean;
  name: string;
  store_url_path: string;
  appid: number;
  type: number;
  is_early_access?: boolean;
  categories: Categories;
  basic_info: BasicInfo;
  best_purchase_option?: BestPurchaseOption;
  screenshots: Screenshots;
  full_description_bbcode: string;
  is_free?: boolean;
  content_descriptorids?: number[];
  related_items?: RelatedItems;
  free_weekend?: FreeWeekend;
}

export interface Categories {
  supported_player_categoryids: number[];
  feature_categoryids?: number[];
  controller_categoryids?: number[];
}

export interface BasicInfo {
  short_description?: string;
  publishers?: Publisher[];
  developers: Developer[];
  franchises?: Franchise[];
  capsule_headline?: string;
}

export interface Publisher {
  name: string;
  creator_clan_account_id?: number;
}

export interface Developer {
  name: string;
  creator_clan_account_id?: number;
}

export interface Franchise {
  name: string;
  creator_clan_account_id?: number;
}

export interface BestPurchaseOption {
  bundleid?: number;
  purchase_option_name: string;
  final_price_in_cents: string;
  original_price_in_cents?: string;
  formatted_final_price: string;
  formatted_original_price?: string;
  discount_pct?: number;
  bundle_discount_pct?: number;
  price_before_bundle_discount?: string;
  formatted_price_before_bundle_discount?: string;
  active_discounts?: ActiveDiscount[];
  user_can_purchase_as_gift: boolean;
  hide_discount_pct_for_compliance: boolean;
  included_game_count: number;
  must_purchase_as_set: boolean;
  package_group: string;
  price_cannot_be_displayed_as_discount: boolean;
  packageid?: number;
  free_with_master_sub_appid?: number;
  recurrence_info?: RecurrenceInfo;
}

export interface ActiveDiscount {
  discount_amount: string;
  discount_description: string;
  discount_end_date: number;
}

export interface RecurrenceInfo {
  packageid: number;
  billing_agreement_type: number;
  renewal_time_unit: number;
  renewal_time_period: number;
  renewal_price_in_cents: string;
  formatted_renewal_price: string;
}

export interface Screenshots {
  all_ages_screenshots?: AllAgesScreenshot[];
  mature_content_screenshots?: MatureContentScreenshot[];
}

export interface AllAgesScreenshot {
  filename: string;
  ordinal: number;
}

export interface MatureContentScreenshot {
  filename: string;
  ordinal: number;
}

export interface RelatedItems {
  demo_appid?: number[];
  standalone_demo_appid?: number[];
  demos?: Demo[];
  standalone_demos?: StandaloneDemo[];
  parent_appid?: number;
  playtests?: Playtest[];
}

export interface Demo {
  appid: number;
  show_above_purchase: boolean;
  label?: string;
}

export interface StandaloneDemo {
  appid: number;
  show_above_purchase: boolean;
}

export interface Playtest {
  appid: number;
  is_open: boolean;
}

export interface FreeWeekend {
  start_time: number;
  end_time: number;
}
