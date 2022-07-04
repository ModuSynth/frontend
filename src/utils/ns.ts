import { namespace } from "vuex-class";

const ns = {
  nodes: namespace('nodes'),
  stages: namespace('stages'),
  links: namespace('links')
}

export default ns;