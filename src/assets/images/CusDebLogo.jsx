import React from "react";
import PropTypes from "prop-types";

const sizes = {
    xs: {
        width: 60,
        height: 40,
    },
    s: {
        width: 70,
        height: 30,
    },
    l: {
        width: 140,
        height: 100,
    },
};

const CusDebLogo = ({ size, short }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={sizes[size].width}
        height={sizes[size].height}
        fillRule="evenodd"
        clipRule="evenodd"
        imageRendering="optimizeQuality"
        shapeRendering="geometricPrecision"
        textRendering="geometricPrecision"
        version="1.1"
        viewBox={`0 0 1028.58 ${short ? 421.26 : 736.902}`}
    >
        <g transform="translate(-75.76 -222.498)">
            <g>
                <g>
                    <path
                        fill="#7396c5"
                        d="M504.99 222.57H578.08V295.65999999999997H504.99z"
                        className="fil0"
                    />
                    <path
                        fill="#324475"
                        d="M504.96 309.57H578.05V382.65999999999997H504.96z"
                        className="fil1"
                    />
                    <path
                        fill="#7396c5"
                        d="M504.94 396.6H578.03V469.69000000000005H504.94z"
                        className="fil0"
                    />
                    <path
                        fill="#7396c5"
                        d="M504.95 483.59H578.04V556.68H504.95z"
                        className="fil0"
                    />
                    <path
                        fill="#324475"
                        d="M504.95 570.62H578.04V643.71H504.95z"
                        className="fil1"
                    />
                    <path
                        fill="#324475"
                        d="M418.02 309.62H491.11V382.71000000000004H418.02z"
                        className="fil1"
                    />
                    <path
                        fill="#7396c5"
                        d="M418 396.65H491.09000000000003V469.74H418z"
                        className="fil0"
                    />
                    <path
                        fill="#7396c5"
                        d="M418 483.65H491.09000000000003V556.74H418z"
                        className="fil0"
                    />
                    <path
                        fill="#324475"
                        d="M418 570.67H491.09000000000003V643.76H418z"
                        className="fil1"
                    />
                    <path
                        fill="#7396c5"
                        d="M331.05 309.55H404.14V382.64H331.05z"
                        className="fil0"
                    />
                    <path
                        fill="#324475"
                        d="M331.03 396.58H404.12V469.66999999999996H331.03z"
                        className="fil1"
                    />
                    <path
                        fill="#324475"
                        d="M331.03 483.58H404.12V556.67H331.03z"
                        className="fil1"
                    />
                    <path
                        fill="#7396c5"
                        d="M331.03 570.6H404.12V643.69H331.03z"
                        className="fil0"
                    />
                    <path
                        fill="#7396c5"
                        d="M244.07 396.68H317.15999999999997V469.77H244.07z"
                        className="fil0"
                    />
                    <path
                        fill="#7396c5"
                        d="M244.07 483.68H317.15999999999997V556.77H244.07z"
                        className="fil0"
                    />
                    <path
                        fill="#7396c5"
                        d="M419.51 223.38H492.6V296.47H419.51z"
                        className="fil0"
                    />
                    <g>
                        <path
                            fill="#7396c5"
                            d="M591.75 222.81c84.38-5.2 229.58 54.49 235.22 191.1 125.73-4.76 162.74 229.24-26.83 229.34l-208.39-.01z"
                            className="fil0"
                        />
                        <path
                            fill="#324475"
                            fillRule="nonzero"
                            d="M591.75 310.58c212.89-1.04 221.72 331.2 0 332.67z"
                            className="fil2"
                        />
                        <path
                            fill="#7396c5"
                            fillRule="nonzero"
                            d="M591.75 382.99c119.7-.59 124.66 186.22 0 187.04z"
                            className="fil3"
                        />
                    </g>
                </g>
                {!short && (
                    <path
                        fill="#2b2a29"
                        fillRule="nonzero"
                        d="M160.89 767.94c-48.46 0-85.13 34.05-85.13 95.6s36.67 95.6 86.44 95.6c43.21 0 70.72-19.64 77.27-53.17.26-1.83-.53-3.14-2.62-3.14h-16.5c-1.84 0-2.62 1.05-3.15 2.62-6.55 20.95-23.57 35.36-55 35.36-34.05 0-62.87-23.58-62.87-77.27 0-53.7 28.82-77.27 61.56-77.27 31.43 0 48.45 14.41 55 35.36.52 1.57 1.31 2.62 3.14 2.62h16.51c2.09 0 2.88-1.31 2.61-3.14-6.54-33.53-34.04-53.17-77.26-53.17zm178.37 191.2c30.12 0 45.84-20.95 45.84-20.95l2.35 14.4c.26 1.84 1.05 2.62 2.88 2.62h14.41c1.83 0 2.62-.78 2.62-2.62V817.7c0-1.83-.79-2.62-2.62-2.62h-18.33c-1.84 0-2.63.79-2.63 2.62v95.61c0 .26-15.71 27.5-43.21 27.5-20.96 0-37.98-14.41-37.98-43.22V817.7c0-1.83-.79-2.62-2.62-2.62h-18.34c-1.83 0-2.62.79-2.62 2.62v79.89c0 39.29 26.2 61.55 60.25 61.55zm235.99-39.29c0-19.64-13.09-33.78-41.91-40.6l-32.74-7.85c-20.69-4.98-27.5-11.79-27.5-22.27 0-10.47 10.48-19.64 35.36-19.64 22.26 0 35.36 9.43 43.22 23.57 1.05 1.84 1.31 2.62 3.14 2.62h16.5c2.1 0 3.15-1.31 2.62-3.14-6.55-24.1-28.81-41.39-65.48-41.39-37.98 0-58.93 17.03-58.93 39.29 0 19.65 12.83 33.53 41.91 40.6l32.74 7.86c20.69 4.98 27.5 11.78 27.5 22.26 0 10.48-10.48 19.65-36.67 19.65-24.88 0-37.98-9.43-45.84-23.58-1.05-1.83-1.31-2.62-3.14-2.62h-16.5c-2.1 0-3.15 1.31-2.62 3.15 6.55 24.09 28.29 41.38 68.1 41.38 39.29 0 60.24-17.02 60.24-39.29zm62.87 17.03V790.2h39.28c37.98 0 66.79 23.57 66.79 73.34s-28.81 73.34-66.79 73.34zm39.28 18.33c53.7 0 90.37-34.05 90.37-91.67 0-57.62-36.67-91.67-90.37-91.67h-60.24c-1.83 0-2.62.78-2.62 2.61v178.11c0 1.84.79 2.62 2.62 2.62zm187.28-125.72c22.26 0 43.22 17.02 44.53 45.84h-88.8c2.89-31.44 21.48-45.84 44.27-45.84zm62.86 64.17c3.41 0 5.24-1.83 5.24-5.24v-6.55c0-43.21-28.81-70.72-68.1-70.72-39.29 0-68.1 24.89-68.1 73.34 0 49.77 28.81 74.91 68.1 74.91 36.67 0 57.62-17.28 64.17-41.38.53-1.83-.52-3.14-2.62-3.14h-16.5c-1.83 0-2.09.78-3.14 2.62-7.86 14.14-19.65 23.57-41.91 23.57-23.05 0-41.38-14.41-44.27-47.41zm110.01-82.51c-22.26 0-39.29 7.86-39.29 7.86v-44.53c0-1.83-.78-2.61-2.62-2.61h-18.33c-1.84 0-2.62.78-2.62 2.61v168.95s23.57 15.71 61.55 15.71c39.29 0 68.1-24.88 68.1-74.65 0-48.45-28.81-73.34-66.79-73.34zm-3.93 129.66c-19.64 0-35.36-7.6-35.36-7.86v-95.6s17.03-7.86 36.67-7.86c26.19 0 45.84 17.02 45.84 55 0 39.29-19.65 56.32-47.15 56.32z"
                        className="fil4"
                    />
                )}
            </g>
        </g>
    </svg>
);

CusDebLogo.propTypes = {
    size: PropTypes.string,
    short: PropTypes.bool,
};

CusDebLogo.defaultProps = {
    size: "s",
    short: false,
};

export default CusDebLogo;