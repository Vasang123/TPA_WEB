import style from '@/styles/Home/landingpage.module.scss'
import Carousel from './Carousel'
import { SecondaryLandingMenu, SecondarySpanColor } from '../Other/GlobalComponent'
import { LogoSecondary } from '../Other/LogoComponent'
import { useEffect, useState } from 'react';
import { Promo } from '@/types/models';
export default function LandingPage() {
  const [carousel, setCarousel] = useState<Promo[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://localhost:8000/api/carousel`);
      const data = await res.json();
      setCarousel(data);
    }

    fetchData();
  }, []);
  const slides = carousel.map((item) => {
    return {
      image: item.image
    };
  });




  return (
    <>

      <div className={style.landing_page}>
        <SecondaryLandingMenu className={style.landing_menu}>
          <ul>
            <li>
              <SecondarySpanColor> <i className="uil uil-monitor"></i>
                Components & Storage </SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
            <li>
              <SecondarySpanColor> <i className="uil uil-laptop"></i>
                Computer Systems</SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
            <li>
              <SecondarySpanColor> <i className="uil uil-keyboard"></i>
                Computer Peripherals</SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
            <li>
              <SecondarySpanColor> <i className="uil uil-archive"></i>
                Appliances</SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
            <li>
              <SecondarySpanColor>  <i className="uil uil-tv-retro"></i>
                TV & Home Theater</SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
            <li>
              <SecondarySpanColor> <i className="uil uil-plug"></i>
                Electronics</SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
            <li>
              <SecondarySpanColor> <i className="uil uil-laptop"></i>
                Gaming & VR</SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
            <li>
              <SecondarySpanColor><i className="uil uil-signal"></i>
                Networking</SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
            <li>
              <SecondarySpanColor><i className="uil uil-mobile-android"></i>
                Smart Home & Security</SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
            <li>
              <SecondarySpanColor><i className="uil uil-bag-alt"></i>
                Office Solutions</SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
            <li>
              <SecondarySpanColor> <i className="uil uil-hdd"></i>
                Software & Services</SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
            <li>
              <SecondarySpanColor><i className="uil uil-car-sideview"></i>
                Automotive & Tools</SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
            <li>
              <SecondarySpanColor> <i className="uil uil-home"></i>
                Home & Outdoors </SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
            <li>
              <SecondarySpanColor>  <i className="uil uil-shield-plus"></i>
                Health & Sports</SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
            <li>
              <SecondarySpanColor> <i className="uil uil-desktop-cloud-alt"></i>
                Toys, Drones & Maker</SecondarySpanColor>
              <LogoSecondary className="uil uil-angle-right-b"></LogoSecondary>
            </li>
          </ul>
        </SecondaryLandingMenu>
        <div className={style.caraousel}>
          <Carousel slides={slides} />
        </div>
      </div>
    </>
  )
}