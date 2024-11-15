import { useRouter } from "next/router";

export const getStaticPaths = async () => {

  const res = await fetch("https://fakestoreapi.com/products");
  const allPosts = await res.json()

  const pages = allPosts.slice(0,allPosts.length / 2).map((product)=>{
    return {params : {category : product.category, id : String(product.id) }}
  })

  return{
    paths : pages,
    fallback : "blocking"
  }


};

export const getStaticProps = async ({params}) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);

    const data = await res.json();

    return {
      props: {
        product: data,
      },
    };
  } catch (error) {
    console.log(error);
  }
};

const ProductsInfoPage = ({ product }) => {
  const router = useRouter()

  if(router.isFallback) return <h1>...Loading</h1>

  return (
    <>
      <main className="min-h-screen my-32 flex justify-center items-center ">
        <div className="border rounded-lg p-4 max-w-xs mx-auto text-center shadow-lg">
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-auto rounded-lg mb-4"
          />
          <h2 className="text-lg font-bold mb-2">{product?.title}</h2>
          <p className="text-sm text-gray-500 mb-2">
            Category: {product?.category}
          </p>
          <p className="text-sm text-gray-700 mb-4">{product?.description}</p>
          <p className="text-xl font-semibold mb-2">Price: ${product?.price}</p>
          <p className="text-yellow-500">Rating: {product?.rating.rate}/5</p>
        </div>
      </main>
    </>
  );
};

export default ProductsInfoPage;
