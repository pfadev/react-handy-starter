import common from "./common";
import production from "./production";

export default DEV ? common : { ...common, ...production };
