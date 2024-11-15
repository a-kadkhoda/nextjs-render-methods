import Card from "@/components/Card";
import Link from "next/link";

export const getStaticProps = async () => {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    return {
      props: { products: data },
      revalidate: 60 * 60 * 24
    };
  } catch (error) {
    console.log(error);
  }
};

const ProductsPage = ({ products }) => {
  return (
    <>
      <main className="min-h-screen my-32 ">
        <div className="container grid grid-cols-6 gap-10 ">
          {products?.map((item) => {
            return (
              <Link
                key={item.id}
                className="flex justify-cente"
                href={`/products/${item.category}/${item.id}`}
              >
                <Card {...item} />
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default ProductsPage;
