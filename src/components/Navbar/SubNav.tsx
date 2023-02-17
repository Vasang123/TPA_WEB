import { MainDivBg, SecondaryLinkColor, SecondaryLinkColor2} from "../Other/GlobalComponent";
export default function Subnav(){
    return(
        <MainDivBg className="sub-nav" >
            <div className="left-sub-nav">
                <ul className="sub-nav-items">
                    <li> <b ><SecondaryLinkColor href="">Today&apos;s Best Deals</SecondaryLinkColor></b></li>
                    <li> <b><SecondaryLinkColor href="">Best Seller</SecondaryLinkColor></b></li>
                    <li> <b><SecondaryLinkColor href="">Big Game TV Deals</SecondaryLinkColor></b></li>
                    <li> <b><SecondaryLinkColor href="">RTX 4080/4090 Gaming Laptops</SecondaryLinkColor></b></li>
                    <li> <b><SecondaryLinkColor href="" className="special">Valentine&apos;s Day</SecondaryLinkColor></b></li>
                    <li> <b><SecondaryLinkColor href="">Pc Builder</SecondaryLinkColor></b></li>
                    <li> <b><SecondaryLinkColor href="" >Browsing History</SecondaryLinkColor></b></li>
                    <li> <b><SecondaryLinkColor href="">Gaming PC Finder</SecondaryLinkColor></b></li>
                </ul>
            </div>
            <div className="right-sub-nav">
                <ul className="right-nav-items">
                    <li> <b><SecondaryLinkColor href="" className="newegg"><span>NEWEGG</span>BUSINESS</SecondaryLinkColor></b></li>
                    <li> <b ><SecondaryLinkColor2 href="" className="blue-box blue-1"><i className="uil uil-comment-alt-message"></i>FEEDBACK</SecondaryLinkColor2></b></li>
                    <li> <b><SecondaryLinkColor2 href="" className="blue-box blue-2"><i className="uil uil-question-circle"></i>HELP CENTER</SecondaryLinkColor2></b></li>
                </ul>
            </div>
        </MainDivBg>
    );
}