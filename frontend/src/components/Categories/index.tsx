import { Link } from "react-router-dom";

const Categories = ({ category }: any) => {
  return (
    <Link to={`/category/${category.slug}`}>
      <div className="flex flex-col items-center group cursor-pointer">
        <div
          className="w-16 h-16 rounded-full bg-cover group-hover:bg-gray-200"
          style={{ backgroundImage: category.coverImg ? `url(${category.coverImg})` : "#000" }}
        />
        <span className="mt-3 text-sm text-center font-medium" key={category.id}>
          {category.name}
        </span>
      </div>
    </Link>
  );
};

export default Categories;
