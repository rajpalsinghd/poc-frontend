export const searchElements = [
  {
    id: "1",
    sourcePosition: "right",
    type: "input", // input node
    data: { label: "Goto URL" },
    position: { x: 25, y: 25 },
  },
  // default node
  {
    id: "2",
    sourcePosition: "right",
    targetPosition: "left",
    // you can also pass a React component as a label
    data: { label: <div>Input Box</div> },
    position: { x: 235, y: 25 },
  },
  {
    id: "3",
    sourcePosition: "right",
    targetPosition: "left",
    type: "output", // output node
    data: { label: "Click" },
    position: { x: 445, y: 25 },
  },
  // animated edge
  {
    id: "e1-2",
    // label: "animated styled edge",
    source: "1",
    target: "2",
    animated: true,
  },
  { id: "e2-3", source: "2", target: "3" },
];