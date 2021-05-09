import groupGet from "./group.service/get";
import groupUpdate from "./group.service/update";
import groupDelete from "./group.service/delete";

export default {
  ...groupGet,
  ...groupUpdate,
  ...groupDelete,
};
