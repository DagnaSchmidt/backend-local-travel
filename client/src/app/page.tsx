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
        <Transport />
        <Weather />
        <Traffic />
        <Places />
      </Layout>
    </div>
  );
};
