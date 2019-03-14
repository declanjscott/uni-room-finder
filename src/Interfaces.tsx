export interface Room {
  name: string;
  id: string;
  building_id: string;
}

export interface FreePeriod {
  start: Date;
  end: Date;
  room_id: string;
  building_id: string;
  id: string;
  duration: number;
  visible: boolean;
}

export interface Building {
  name: string;
  id: string;
}
