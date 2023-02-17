import style from '@/styles/Home/landingpage.module.scss'
import Carousel from './Carousel'
import { SecondaryLandingMenu, SecondarySpanColor } from '../Other/GlobalComponent'
import { LogoSecondary } from '../Other/LogoComponent'
export default function LandingPage(){
    const slides = [
        {url:"http://localhost:3000/carousel/1.jpg", title : '1'},
        {url:"http://localhost:3000/carousel/2.jpg", title : '2'},
        {url:"http://localhost:3000/carousel/3.jpg", title : '3'},
        {url:"http://localhost:3000/carousel/4.jpg", title : '4'},
        {url:"http://localhost:3000/carousel/5.jpg", title : '5'},
        {url:"http://localhost:3000/carousel/6.jpg", title : '6'},
        {url:"http://localhost:3000/carousel/7.jpg", title : '7'},
        {url:"http://localhost:3000/carousel/8.jpg", title : '8'},
        {url:"http://localhost:3000/carousel/9.jpg", title : '9'},
        {url:"http://localhost:3000/carousel/10.jpg", title : '10'},
        {url:"http://localhost:3000/carousel/11.jpg", title : '11'},
        {url:"http://localhost:3000/carousel/12.jpg", title : '12'},
        {url:"http://localhost:3000/carousel/13.jpg", title : '13'},
        {url:"http://localhost:3000/carousel/14.jpg", title : '14'},
        {url:"http://localhost:3000/carousel/15.jpg", title : '15'},
        {url:"http://localhost:3000/carousel/16.jpg", title : '16'},
        {url:"http://localhost:3000/carousel/17.jpg", title : '17'},
        {url:"http://localhost:3000/carousel/18.jpg", title : '18'},
        {url:"http://localhost:3000/carousel/19.jpg", title : '19'},
        {url:"http://localhost:3000/carousel/20.jpg", title : '20'},
    ]
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
                    <Carousel slides={slides}/>
                </div>
        </div>
        </>
    )
}