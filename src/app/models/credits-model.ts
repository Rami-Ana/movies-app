export interface ModelActor {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface ModelStaff {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;
}

export interface ModelCredits {
  id: number;
  cast: ModelActor[];
  crew: ModelStaff[];
}