export interface FireBaseData {
    lenguaje: string;
    ruta: SkillDataNode[]; 
}

export interface SkillDataNode {
    tec: string;
    descr: string;
    childs: SkillDataNode[];
  }