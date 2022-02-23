import {Link} from 'react-router-dom'
import {FiUsers, FiCodesandbox, FiCopy, FiActivity, FiCalendar, FiSettings, FiTrello, FiFileText} from 'react-icons/fi';
import {Fragment} from "react";


export default function Dashboard({children}) {
    const menu = [
        {to: '/', label: 'Dashboard', icon: FiTrello},
        {to: '/calendar', label: 'Calendar', icon: FiCalendar},
        {to: '/client', label: 'Clients', icon: FiUsers},
        {to: '/contracts', label: 'Contracts', icon: FiFileText},
        {to: '/expenses', label: 'Expenses', icon: FiActivity},
        {to: '/invoices', label: 'Invoices', icon: FiCopy},
        {to: '/product', label: 'Products', icon: FiCodesandbox},
        {flex: true},
        {to: '/settings', label: 'Settings', icon: FiSettings},
    ];

    return (
        <div className={'d-flex bg-gray-lighter f-1'}>
            <div className="bg-primary-50 b-r-1 b-primary d-flex" style={{flexDirection: 'column'}}>
                {menu.map((item,i) => (
                    <Fragment key={i}>
                        {item.flex ? (
                            <div key={item} className={'f-1'}>&nbsp;</div>
                        ): (
                            <div className={'m-y-2 b-b-1 b-primary '} key={item.to}>
                                <Link to={item.to}
                                      className={'text-decoration-none font-md text-white p-x-3 hover:text-accent'}>
                                    <item.icon/> {item.label}
                                </Link>
                            </div>
                        )}

                    </Fragment>

                ))}
            </div>
            <div className="f-1">
                <div className="container bg-white-light b-rounded b-1 b-gray m-y-5">
                    {children}
                </div>
            </div>
        </div>
    );
}