import {observer} from "mobx-react-lite";
import {Redirect} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {updateState} from "../utils/stateUpdater";
import auth from "../services/auth";
import Modal from "../components/Modal";


export default observer(({authentication}) => {
    const [credentials, setCredentials] = useState({
        mode: 'login',
        email: '',
        password: '',
        passwordRepeat: '',
        tac: false
    });
    const [modalVisible, setModalVisible] = useState(false)
    const [serverError, setServerError] = useState('')

    const updateCredentials = updateState(setCredentials);
    const switchMode = ev => {
        setCredentials({...credentials, mode: credentials.mode === 'login' ? 'register' : 'login'})
    }
    const passwordRepeat = useRef();
    useEffect(() => {
        if (passwordRepeat.current !== undefined) {
            if (passwordRepeat.current?.value !== credentials.password && credentials.password.length > 5) {
                passwordRepeat.current.setCustomValidity("no match")
            } else if (passwordRepeat.current?.value === credentials.password) {
                passwordRepeat.current.setCustomValidity("")
            }
        }

    }, [credentials])
    const submit = async ev => {
        ev.preventDefault();
        try {
            const res = await auth[credentials.mode](credentials)
            authentication.login(res)
        } catch (e) {
            if(e.response){
                setServerError(e.response.data.error);
            }
            setModalVisible(true)
            setCredentials(state => ({...state, password: ''}))
        }
    }
    const loginError = () => (<>
            <p>Server answered with:</p>
            <p className={'font-strong'}>{serverError}</p>
            <button className="btn-primary" onClick={() => setModalVisible(false)}>Try again</button>
        </>
    );
    return (
        <>
            {authentication.token ? (
                <Redirect to={'/'}/>
            ) : (
                <div className={'grid m-t-5'}>
                    <h2 className="place-x-center">Login</h2>
                    <form onSubmit={submit} className="grid place-x-center w-30p">
                        <div className="input">
                            <input value={credentials.email} name="email" onChange={updateCredentials} required
                                   type="email" id={'email'} placeholder={'Email'}/>
                            <label htmlFor="email">Email</label>
                            <div className="input-error">Please use a valid email address</div>
                        </div>
                        <div className="input">
                            <input value={credentials.password} required minLength={6} name="password"
                                   onChange={updateCredentials} type="password" id={'password'}
                                   placeholder={'Password'}/>
                            <label htmlFor="password">Password</label>
                            <div className="input-error">At least 6 characters!</div>
                        </div>
                        {credentials.mode === 'register' && (
                            <>
                                <div className="input">
                                    <input ref={passwordRepeat} required name="passwordRepeat"
                                           onChange={updateCredentials} type="password" id={'passwordRepeat'}
                                           placeholder={'Repeat password'}/>
                                    <label htmlFor="passwordRepeat">Repeat password</label>
                                    <div className="input-error">Passwords do not match</div>
                                </div>
                                <div className="d-flex m-y-4">
                                    <input name={'tac'} onChange={updateCredentials} type="checkbox" required role={'switch'}/>
                                    <span className={'f-1 p-l-2'}>Accept Terms and Conditions</span>
                                </div>
                            </>
                        )}
                        <div className="place-x-end">
                            <button className={'btn-primary'} type={"submit"}>{credentials.mode}</button>
                        </div>
                        <div>
                            No account yet?
                            <button type={'button'} className={'clickable'} onClick={switchMode}>click to
                                register</button>
                        </div>
                    </form>
                </div>
            )}
            <Modal visible={modalVisible} setVisible={setModalVisible} title={'Something went wrong'}
                   component={loginError}/>
        </>
    )
})