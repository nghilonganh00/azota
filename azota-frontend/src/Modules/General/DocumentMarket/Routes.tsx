import CommonLayout from "../../../Globals/Layouts/teacherLayout";
import ListDocument from "./ListDocument/listDocument";

const DocumentMarketRoutes = {
  path: "document-market",
  element: <CommonLayout />,
  children: [
    {
      path: "list-document",
      element: <ListDocument />,
    },
  ],
};

export default DocumentMarketRoutes;
