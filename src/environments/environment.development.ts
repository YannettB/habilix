export const environment = {
    production: false,
    firebaseConfig: {
        apiKey: "AIzaSyD-BXImw-th8FRx9N4Dfe98S0jD2m8ktZg",
        authDomain: "naneproject-6ea8e.firebaseapp.com",
        projectId: "naneproject-6ea8e",
        storageBucket: "naneproject-6ea8e.appspot.com",
        messagingSenderId: "591470636428",
        appId: "1:591470636428:web:70ed79b081387117e2faa9"
      },
      treeOptions: {
        nodes: {
          shapeProperties: {
            borderRadius: 3
          },
          margin: {
            top: 10,
            right: 20,
            bottom: 10,
            left: 20
          }
        },
        layout: {
          hierarchical: {
            direction: "LR",//"UD",
            sortMethod: "directed",
            nodeSpacing: 150,
            levelSeparation: 200
          }
        },
        edges: {
          smooth: {
            enabled: true,
            type: "dynamic",
            forceDirection: "none",
            roundness: 0.5
          },
          arrows: { to: true }
        },
        physics: {
          enabled: true,
          hierarchicalRepulsion: {
            nodeDistance: 120,
            springLength: 200,
            springConstant: 0.01
          },
          maxVelocity: 50,
          minVelocity: 0.1,
          solver: 'barnesHut',
          stabilization: {
            enabled: true,
            iterations: 1000,
            updateInterval: 100,
            onlyDynamicEdges: false,
            fit: true
          },
          timestep: 0.5,
          adaptiveTimestep: true,
          wind: { x: 0, y: 0 }
        }
      }
};
