import React, { Component } from "react";
export interface Rotation {
  degrees: number;
  animated: boolean;
}
export class DownArrow extends Component<Rotation, {}> {
  public static defaultProps = {
    degrees: 0,
    animated: false
  };
  render() {
    return (
      <svg
        style={{
          transition: this.props.animated ? "300ms ease-in-out" : "none"
        }}
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        transform={`rotate(${this.props.degrees})`}
        viewBox="0 0 49 28"
        version="1.1"
      >
        <g
          id="Welcome"
          stroke="none"
          stroke-width="1"
          fill="none"
          fill-rule="evenodd"
        >
          <g
            id="Desktop-HD"
            transform="translate(-642.000000, -77.000000)"
            fill="#2B32B2"
          >
            <g id="Arrow-down" transform="translate(642.000000, 77.000000)">
              <path
                d="M24.2421271,19.0766641 L42.333649,1.05141155 C43.7421948,-0.351974787 46.0204314,-0.351974787 47.4289772,1.05141155 C48.8308593,2.44815853 48.8350221,4.71689563 47.4382752,6.11877771 C47.4351815,6.1218827 47.4320822,6.12498201 47.4289772,6.12807562 L27.0476641,26.4347319 C26.2776655,27.20191 25.2477689,27.549701 24.2421271,27.4781047 C23.2364854,27.549701 22.2065888,27.20191 21.4365901,26.4347319 L1.05527704,6.12807562 C-0.346605035,4.73132865 -0.350767855,2.46259155 1.04597912,1.06070947 C1.04907274,1.05760448 1.05217205,1.05450517 1.05527704,1.05141155 C2.46382289,-0.351974787 4.74205946,-0.351974787 6.15060531,1.05141155 L24.2421271,19.0766641 Z"
                id="Combined-Shape"
              />
            </g>
          </g>
        </g>
      </svg>
    );
  }
}
