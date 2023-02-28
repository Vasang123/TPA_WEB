import { useEffect, useState } from "react";
import { LogoSecondary } from "../Other/LogoComponent";
import { SecondaryBoldColor } from "../Other/GlobalComponent";
import axios from "axios";


export default function CurrentLocation() {
    const [user, setUser] = useState(null);
    const [CurrCountry, setCurrCountry] = useState('')
    const [CurrCity, setCurrCity] = useState('')
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=335cd95ddcef469fbfc4eeed46703620&pretty=1&no_annotations=1&language=en`);
            const { country, city } = response.data.results[0].components;
            setCurrCountry(country);
            setCurrCity(city);
        });

    }, []);
    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);
    return (
        <div className="address-container">
            <LogoSecondary className="uil uil-map-marker"></LogoSecondary>
            <div className="address-temp">
                <div className="address-select">
                    {
                        user ? (
                            <span ><SecondaryBoldColor className="location-container">{CurrCity},{CurrCountry}</SecondaryBoldColor></span>
                        ) : (
                            <>
                                <div className="address-welcome">
                                    Hello
                                </div>
                                <span><SecondaryBoldColor>Select</SecondaryBoldColor></span>
                                <span><SecondaryBoldColor>Address</SecondaryBoldColor></span>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}