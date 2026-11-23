import { ModelMovie } from "./movie-model";

export interface ModelPersonDetail {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
}

//reparto 
export interface ModelCastMovie extends ModelMovie {
  character : string,
}

//equipo (detras de camaras: directores, guionistas,productores.)
export interface ModelCrewMovie extends ModelMovie{
  job: string,
  departament: string,
}

export interface ModelPersonCredits {
  cast: ModelCastMovie[],
  crew : ModelCrewMovie[],
}