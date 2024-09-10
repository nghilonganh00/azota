import ListDocument from "./ListDocument/listDocument";

const DocumentMarketRoutes = {
  path: "document-market",
  children: [
    {
      path: "list-document",
      element: <ListDocument />,
    },
  ],
};

export default DocumentMarketRoutes;
