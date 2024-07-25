import NewsList from "../components/NewsList";

function HomePage() {
  return (
   <div className='h-full w-full'>
        <div className='text-2xl my-4 font-bold text-center text-black'>News App</div>
        <NewsList/>
   </div>
  );
}

export default HomePage;
