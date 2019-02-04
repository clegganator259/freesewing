import { version } from "../package.json";

export default {
  name: "examples",
  version,
  // This is not needed, but is here to sidestep an issue in freesewing
  // that needs to be fixed but hasn't yet
  dependencies: {
    path_attr: "path_ops"
  },
  parts: [
    "point_attr",
    "path__curve",
    "path_curve_",
    "path_attr",
    "path_clone",
    "path_divide",
    "path_edge",
    "path_end",
    "path_intersects",
    "path_intersectsx",
    "path_intersectsy",
    "path_join",
    "path_length",
    "path_offset",
    "path_ops",
    "path_reverse",
    "path_shiftalong",
    "path_shiftfractionalong",
    "path_split",
    "path_start",
    "path_translate",
    "path_trim",
    "plugin_cutonfold",
    "plugin_dimension",
    "plugin_grainline",
    "plugin_logo",
    "plugin_scalebox",
    "plugin_title",
    "point_angle",
    "point_attr",
    "point_clone",
    "point_copy",
    "point_dist",
    "point_dx",
    "point_dy",
    "point_flipx",
    "point_flipy",
    "point_shift",
    "point_shiftfractiontowards",
    "point_shifttowards",
    "point_shiftoutwards",
    "point_sitson",
    "point_rotate",
    "point_translate",
    "settings_sa",
    "snippet_attr",
    "snippet_clone",
    "utils_linesintersect",
    "utils_beamsintersect",
    "utils_beamintersectsx",
    "utils_beamintersectsy",
    "utils_lineintersectscurve",
    "utils_curvesintersect",
    "utils_pointonbeam",
    "utils_pointonline",
    "utils_pointoncurve",
    "utils_circlesintersect",
    "utils_beamintersectscircle",
    "utils_lineintersectscircle"
  ]
};
