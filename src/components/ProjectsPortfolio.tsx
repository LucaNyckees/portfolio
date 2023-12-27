import colors from "../variables/tagcolors";
import { useState } from "react";
import projContents from "../variables/projects";
import Modal from "./Modal";


function ProjLocationLabels() {
  return (
    <>
      <div className="proj-location-legend">
        <p id="proj-loc-1">Laboratory for Topology and Neuroscience at EPFL</p>
        <p id="proj-loc-2">Quanthome SA, Lausanne</p>
        <p id="proj-loc-3">Academical Curriculum at EPFL</p>
      </div>
    </>
  );
}

function Label(tag: string) {
  let val = "black";
  for (let key in colors) {
    if (key === tag) {
      val = colors[key];
    }
  }
  return <label style={{ backgroundColor: "#aac4ff7e" }}>#{tag}</label>;
}

function LabelList(tags: Array<string>, cut: number) {
  return (
    <>
      <div className="labels-front">{tags.slice(0, cut).map(Label)}</div>
      <div className="labels-front">
        {tags.slice(cut, tags.length).map(Label)}
      </div>
    </>
  );
}

function Project(index: number) {
  let project = projContents[index];
  const [show, setShow] = useState(false);
  let proj_id = `proj${index}`;
  const lock =
    [4, 5, 6, 7].indexOf(index) > -1 ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-lock"
        viewBox="0 0 16 16"
        color="rgba(11, 8, 24, 0.606)"
      >
        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      </svg>
    ) : (
      <></>
    );
  const id = `myModal${index}`;
  let circle_color = ''
  if ([0, 1, 2, 3].includes(index)) {
    circle_color = 'var(--topocolor)';
  } else if ([4, 5, 6, 7].includes(index)) {
    circle_color = 'var(--qhcolor)';
  }
  else {
    circle_color = 'var(--epflcolor)';
  }
  return (
    <>
      <button
        id={proj_id}
        type="button"
        className="about-col"
        style={{ position: 'relative' }}
        onClick={() => setShow(true)}
      >
        <p id={proj_id + "P"}>
          {project.title}
          {lock}
        </p>
        <img
          src={project.imageSource}
          style={{ width: project.rel_width }}
        ></img>
        <div className="labels-front">
          {LabelList(project.labels, project.cut)}
        </div>
        <div className="proj-location-label" style={{ border: `1.8px solid ${circle_color}` }}></div>
      </button>
      <div className="App">
        <Modal
          className="project"
          id={id}
          {...{ index, show, closeModal: () => setShow(false) }}
        />
      </div>
    </>
  );
}

function BoardRow(indices: Array<number>) {
  let row_id = `projRow${Math.floor(indices[0] / 4)}`;
  return (
    <>
      <div className="row" id={row_id}>
        {indices.map(Project)}
      </div>
    </>
  );
}

function Board(props: any) {
  let indices = Array.from(projContents.keys());
  return (
    <>
      <div id="allProjects">
        {BoardRow([0, 1, 2, 3])}
        {BoardRow([4, 5, 6, 7])}
        {BoardRow([8, 9, 10, 11])}
      </div>
    </>
  );
}

export { Board, ProjLocationLabels };
