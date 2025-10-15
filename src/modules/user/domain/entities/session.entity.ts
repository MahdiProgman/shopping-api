interface SessionProps {
  id?: string;
  device_name: string;
  refresh_token_hash: string;
  user_id: string;
  last_seen?: Date;
  expires_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export class Session {
  private static EXPIRATION_TIME_IN_MS: number = 7 * 24 * 60 * 60 * 1000;

  public readonly id?: string;
  public readonly device_name: string;
  public readonly refresh_token_hash: string;
  public readonly user_id: string;
  public readonly last_seen?: Date;
  public readonly expires_at: Date;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  constructor(props: SessionProps) {
    this.id = props.id;
    this.device_name = props.device_name;
    this.refresh_token_hash = props.refresh_token_hash;
    this.user_id = props.user_id;
    this.last_seen = props.last_seen;
    this.expires_at = props.expires_at ?? Session.getExpirationTime();
    this.created_at = props.created_at;
    this.updated_at = props.updated_at;
  }

  private static getExpirationTime() {
    const time = new Date();

    time.setTime(time.getTime() + Session.EXPIRATION_TIME_IN_MS);

    return time;
  }

  public getObject() {
    return {
      id: this.id,
      device_name: this.device_name,
      user_id: this.user_id,
      last_seen: this.last_seen,
      expires_at: this.expires_at,
      created_at: this.created_at,
      updated_at: this.updated_at,
    };
  }
}
