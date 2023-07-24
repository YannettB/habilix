import { DataSet } from "vis-network";
import { SkillNode } from "./skill-node.model";

export class SkillData {
    "nodes": DataSet<SkillNode>;
    "edges": DataSet<any>;
}