import { useState } from "react";
import Search from "../Navbar/Search";
import Subnav from "../Navbar/SubNav";
import { MainDivBg, SecondarySpanColor } from "../Other/GlobalComponent";
import { LogoSecondary } from "../Other/LogoComponent";
import SearchDisplay from "../SearchBar/SearchDisplay";
import { useRouter } from "next/router";


export default function ProductNav() {
    const [searchFilter, setSearchFilter] = useState({
        price: false,
        sold: false,
        search1: '',
        search2: '',
        asc: false,
        desc: false,
    });
    const router = useRouter();
    const handleSort = (sortType: any) => {
        // toggle sort direction if already selected
        if (sortType === 'asc' && searchFilter.asc) {
            setSearchFilter({ ...searchFilter, asc: false, desc: true });
        } else if (sortType === 'desc' && searchFilter.desc) {
            setSearchFilter({ ...searchFilter, asc: true, desc: false });
        } else {
            // toggle sort type and reset direction

            setSearchFilter({
                ...searchFilter,
                asc: sortType === 'asc',
                desc: sortType === 'desc',
            });
        }
    };
    return (
        <MainDivBg className="private-nav">
            <SecondarySpanColor>
                Sort By:

            </SecondarySpanColor>
            <div className="sort">
                <button onClick={() => handleSort('price')}>
                    Price {searchFilter.price && '✔️'}
                </button>
                <button onClick={() => handleSort('sold')}>
                    Sold {searchFilter.sold && '✔️'}
                </button>
            </div>
            <div className="search-container">
                <SearchDisplay />
            </div>
        </MainDivBg>
    );
}