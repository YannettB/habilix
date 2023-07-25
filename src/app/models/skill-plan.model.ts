import { SkillTec } from "./skill-tec.model";

export class SkillPlanNode {
    "id": string;
    "lenguaje": string;
    "usuarios": string[];
    "puntuacion"?: number | null;
    "ruta": SkillDataNode[]; 
}

export class SkillDataNode {
    "tec": SkillTec;
    "puntuacion"?: number | null;
    "childs": SkillDataNode[];
}