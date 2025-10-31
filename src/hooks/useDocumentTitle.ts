import { useLayoutEffect } from "react";

const useDocumentTitle = (title: any) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title =
        "Aetheria — The Apothecary of Time | Fragrances Beyond Eras";
    }
  }, [title]);
};

export default useDocumentTitle;
