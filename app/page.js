import Banner from "@/components/home/banner/Banner";
import Countries from "@/components/home/countries/Countries";
import Packages from "@/components/home/packages/Packages";
import BannerAd from "@/components/home/bannerAd/BannerAd";
import Events from "@/components/home/events/Events";
import Experience from "@/components/home/experience/Experience";
import Blog from "@/components/home/blog/Blog";


export default function Home() {
  return (
    <>
    <Banner />
    <Countries />
    <Packages />
    <BannerAd />
    <Events />
    <Experience />
    <BannerAd />
    <Blog />
    </>
  );  
}
