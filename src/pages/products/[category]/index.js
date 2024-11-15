import Card from "@/components/Card";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";


export const getServerSideProps = async(context)=>{
    try {
      const res = await fetch(`https://fakestoreapi.com/products/category/${context.query.category}`)
      const data = await res.json()
      
      return{
        props : {
          products : data
        }
      }

    } catch (error) {
      console.log(error);
      return{
        redirect :{
          destination : "/404",
          permanent: false
        }
      }
    }

}





const CategoryPage = ({products}) => {
  return (
    <>
      <main className="min-h-screen my-32 ">
        <div className="container grid grid-cols-6 gap-10 ">
          {products?.map((item) => {
            return (
              <Link
                key={item.id}
                className="flex justify-center"
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

export default CategoryPage;
