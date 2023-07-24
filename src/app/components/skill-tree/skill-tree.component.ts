import { Component, AfterViewInit, Inject } from '@angular/core';
import { DataSet } from "vis-data/peer";
import { Network } from "vis-network/peer";
import { DOCUMENT } from '@angular/common';
import { SkillNode } from 'src/app/models/skill-node.model';
import { SkillData } from 'src/app/models/skill-data.model';
import { FirebaseDataService } from 'src/app/services/firebase-data.service';
import { SkillPlanNode, SkillDataNode } from 'src/app/models/skill-plan.model';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-skill-tree',
  templateUrl: './skill-tree.component.html',
  styleUrls: ['./skill-tree.component.css']
})

export class SkillTreeComponent implements AfterViewInit {
  @Inject(DOCUMENT) document: Document | undefined

  constructor(private fireBaseDataService: FirebaseDataService) { }

  ngAfterViewInit() {
    this.fireBaseDataService.obtenerDatosDummy().then((res: SkillPlanNode[]) => {
      const container = document.getElementById("tree-container");
      const data: SkillData = this.buildTree(res);
      const options = environment.treeOptions;

      if (container) {
        const tree = new Network(container, data, options);
        this.treeDetail(tree, data);
      }
    }).catch((error) => {
      console.error('Error al cargar y configurar nodos:', error);
    });
  }

  treeDetail(tree: Network, data: SkillData) {
    tree.on('select', function (params) {
      const nodeId = params.nodes[0];
      if (nodeId !== undefined) {
        const skillNodes: SkillNode[] = data.nodes.get();
        const node = skillNodes[nodeId];
        const infoText = `Tecnología: ${node.label}`;
        if (document) {
          let nodeInfoText = document.getElementById('node-info-text');
          let nodeInfo = document.getElementById('node-info');
          if (nodeInfoText && nodeInfo) {
            nodeInfoText.innerText = infoText;
            nodeInfo.style.display = 'block';
          }
        }
      } else {
        if (document) {
          let nodeInfo = document.getElementById('node-info');
          if (nodeInfo) {
            nodeInfo.style.display = 'none';
          }
        }
      }
    });
  }

  processNode(node: SkillDataNode, level: number, parent: any, parentColor: string | undefined, nodes: SkillNode[], edges: { from: never; to: number; smooth: { type: string; forceDirection: string; }; }[]) {
    const hasChildren = node.childs.length > 0;
    const id = this.addNode(node.tec.tec, node.tec.descr, level, parent, hasChildren, parentColor, nodes, edges);
    for (const child of node.childs) {
      this.processNode(child, level + 1, id, nodes[id].color, nodes, edges);
    }
  }

  getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  addNode(tec: string, descr: string, level: number, parent = null, hasChildren = false, parentColor = 'green', nodes: SkillNode[], edges: { from: never; to: number; smooth: { type: string; forceDirection: string; }; }[] ) {
    const id = nodes.length;
    const color = parent === null ? 'blue' : hasChildren ? this.getRandomColor() : parentColor;
    nodes.push({
      id: id,
      label: `${tec}\n${descr}`,
      level: level,
      color: color,
      shape: 'box',
      widthMin: 20,
      widthMax: 20,
      font: { size: 14, face: 'Arial', color: 'white' },
      title: `<div style="display:flex; justify-content:center; align-items:center;"><img src="images/technology.png" style="width:25px; height:25px; margin-right:5px;">${tec}</div>`,
      opacity: 0.8
    });
    if (parent !== null) {
      edges.push({
        from: parent,
        to: id,
        smooth: { type: 'cubicBezier', forceDirection: 'vertical' }
      });
    }
    return id;
  }

  buildTree(data: SkillPlanNode[]): SkillData {
    let nodes: SkillNode[] = [];
    let edges: any[] = [];

    for (const topLevelNode of data) {
      const parentId = this.addNode(topLevelNode.lenguaje, "", 0, null, false, 'green', nodes, edges);
      for (const routeNode of topLevelNode.ruta) {
        this.processNode(routeNode, 1, parentId, nodes[parentId].color, nodes, edges);
      }
    }

    const treeData: SkillData = { nodes: new DataSet<SkillNode>(nodes), edges: new DataSet<any>(edges) };

    return treeData;
  }


}


