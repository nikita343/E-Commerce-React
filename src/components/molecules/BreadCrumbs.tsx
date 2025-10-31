import { useLocation, Link } from "react-router";

const BreadCrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  let path = "";
  return (
    <div className="breadcrumbs">
      <Link className="button__link" to="/">
        Index
      </Link>

      {pathnames.map((name, index) => {
        path += `${name}`;
        const editedName =
          name.charAt(0).toUpperCase() + name.slice(1).replace("-", " ");

        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <span key={path} className="text-size-regular">
            / {editedName}
          </span>
        ) : (
          <span key={path} className="">
            /{" "}
            <Link className="button__link" to={`/${path}`}>
              {editedName}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
