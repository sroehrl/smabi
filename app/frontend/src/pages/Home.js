import Dashboard from "../layout/Dashboard";
export default function Home(){
    return (
        <Dashboard children={(
            <div className={'p-3'}>
                <p>Dashboard</p>
            </div>
        )}/>
    )
}