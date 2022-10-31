import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LogoIcon from '../images/Arch_Logo_Icon_42x42.png';
import { useHistory } from 'react-router-dom';
import { WaxLoginService } from '../WaxLoginService';
import { useDispatch } from 'react-redux';
import { setPlayerLogout } from '../GlobalState/WaxReducer';

export const Menu = (props) => {

    const dispatch = useDispatch();
    const locationHistory = useHistory();
    const WaxState = useSelector((store) => store.wax);

    const handleLogin = () => {
        WaxLoginService.login(() => {
            if (WaxLoginService.isLogged()) {
                locationHistory.push('/home');
            } else {
                dispatch(setPlayerLogout());
            }
        });
    }

    const onHandleLogout = () => {
        WaxLoginService.logout();
    }

    return (
        <nav id="menu" className="d-flex justify-content-between align-items-center px-5">
            {
                (WaxState.isLogged) ?
                    <Redirect to="/home" /> :
                    <></>
            }
            <div className="d-flex align-items-center">
                <img src={LogoIcon} alt="LogoIcon" width="42" />
                <div className="ms-4 text-white">
                    {(WaxState.isLogged) ?
                        `${WaxState.name} - Wallet: ${WaxState.balance}` : ''

                    }
                </div>
            </div>
            <div className="d-flex">
                <Link to="/" className="btn-item">Main</Link>
                <Link to="/home" className={`${(WaxState.isLogged) ? '' : "disable"} btn-item`}>Home</Link>
                <Link to="/page2" className={`${(WaxState.isLogged) ? '' : "disable"} btn-item`}>Page2</Link>
                {
                    !WaxState.isLogged ?
                    <button className="btn-item" onClick={handleLogin}><img src="images/waxp_logo_gray.png" alt="Loggin" width="24" /> Connect WAX Wallet</button>
                    :
                    <Link to="/" className="btn-item" onClick={onHandleLogout}><img src="images/waxp_logo_color.png" alt="Loggin" width="24" /> Disconnect WAX Wallet</Link>
                }
            </div>
        </nav>
    );
}
