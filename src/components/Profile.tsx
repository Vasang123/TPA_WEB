import Link from "next/link";
import { LogoSecondary } from "./LogoComponent";
import { useEffect, useState } from "react";
import { SecondaryBoldColor } from "./GlobalComponent";


export default function Profile() {
  const [user, setUser] = useState(null);
  
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
              <div className="address-welcome">Welcome,</div>
              <div className="address-select">
                <span>
                  <SecondaryBoldColor>{user.firstName}</SecondaryBoldColor>
                </span>
              </div>
            </Link>
          ) : (
            <Link href="/profile">
              <div className="address-welcome">Welcome,</div>
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
