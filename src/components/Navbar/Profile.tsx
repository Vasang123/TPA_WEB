import Link from "next/link";
import { LogoSecondary } from "../Other/LogoComponent";
import { useContext, useEffect, useState } from "react";
import { SecondaryBoldColor } from "../Other/GlobalComponent";
import { LanguageContext } from "../Language/LanguageContext";


export default function Profile() {
  const { lang } = useContext(LanguageContext);
  const [user, setUser] = useState(null);
  console.log(lang.is_eng);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="account-container">
      {user ? (
        user.role_id === 3 ? (
          <Link href="/admin/home">
            <LogoSecondary className="uil uil-user" />
          </Link>
        ) : (
          <Link href="/profile">
            <LogoSecondary className="uil uil-user" />
          </Link>
        )
      ) : (
        <Link href="/signup">
          <LogoSecondary className="uil uil-user" />
        </Link>
      )}

      <div className="address-temp">
        {user ? (
          user.role_id === 3 ? (
            <Link href="/admin/home">
              <div className="address-welcome">
                <>
                  {lang.is_eng == true ? 'Welcome,' : 'Halo,'}
                </>
              </div>
              <div className="address-select">
                <span>
                  <SecondaryBoldColor>{user.firstName}</SecondaryBoldColor>
                </span>
              </div>
            </Link>
          ) : (
            <Link href="/profile">
              <div className="address-welcome">
                <>
                  {lang.is_eng == true ? 'Welcome,' : 'Halo,'}
                </>

              </div>
              <div className="address-select">
                <span>
                  <SecondaryBoldColor>{user.firstName}</SecondaryBoldColor>
                </span>
              </div>
            </Link>
          )
        ) : (
          <Link href="/signup">
            <div className="address-welcome">Welcome</div>
            <div className="address-select">
              <span>
                <SecondaryBoldColor>SignIn/</SecondaryBoldColor>
              </span>
              <span>
                <SecondaryBoldColor>Register</SecondaryBoldColor>
              </span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
