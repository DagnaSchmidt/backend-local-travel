import Search from "../components/search/Search";
import Traffic from "../components/traffic/Traffic";
import Transport from "../components/transport/Transport";
import Weather from "../components/weather/Weather";
import Layout from "../components/layout/Layout";
import Places from "@/components/places/Places";

export default function Home() {
  return (
    <div>
      <Search />
      <Layout>
        <div
          className='xl:col-span-5 w-full flex flex-col gap-4'
        >
          <Transport />
          <Weather />
        </div>
        <div
          className='xl:col-span-7 w-full flex flex-col gap-4'
        >
          <Traffic />
          <Places />
        </div>
      </Layout>
    </div>
  );
};
