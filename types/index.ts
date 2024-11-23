export interface AccessTokenResponse {
  access_token: string;
  athlete: IUser;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}

export interface IUser {
  badge_type_id: number;
  bio: any;
  city: any;
  country: any;
  created_at: string;
  firstname: string;
  follower: any;
  friend: any;
  id: number;
  lastname: string;
  premium: boolean;
  profile: string;
  profile_medium: string;
  resource_state: number;
  sex: string;
  state: any;
  summit: boolean;
  updated_at: string;
  username: any;
  weight: any;
}

export interface IActivities {
  resource_state: number;
  athlete: Athlete;
  name: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  type: string;
  sport_type: string;
  workout_type: number;
  id: number;
  start_date: string;
  start_date_local: string;
  timezone: string;
  utc_offset: number;
  location_city: any;
  location_state: any;
  location_country: any;
  achievement_count: number;
  kudos_count: number;
  comment_count: number;
  athlete_count: number;
  photo_count: number;
  map: Map;
  trainer: boolean;
  commute: boolean;
  manual: boolean;
  private: boolean;
  visibility: string;
  flagged: boolean;
  gear_id: any;
  start_latlng: any[];
  end_latlng: any[];
  average_speed: number;
  max_speed: number;
  has_heartrate: boolean;
  heartrate_opt_out: boolean;
  display_hide_heartrate_option: boolean;
  upload_id: any;
  external_id: any;
  from_accepted_tag: boolean;
  pr_count: number;
  total_photo_count: number;
  has_kudoed: boolean;
}

export interface Athlete {
  id: number;
  resource_state: number;
}

export interface Map {
  id: string;
  summary_polyline: string;
  resource_state: number;
}

export type Column<T> = {
  key: keyof T;
  label: string;
  numeric?: boolean;
};

export type GenericDataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
};
