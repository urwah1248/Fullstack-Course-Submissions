import Notification from "./Notification"
const Login = ({username, setUsername, handleLogin, password, setPassword, errorMessage}) => {
    return (
        <form onSubmit={handleLogin}>
            <h2>Login</h2>
            <Notification message={errorMessage}/>
            <label htmlFor="username"> Username
                <input type="text" name="username" id="username" value={username} onChange={(e)=> setUsername(e.target.value)} required />
            </label>
            <br />
            <label htmlFor="password"> Password
                <input type="password" name="password" id="password" value={password} onChange={(e)=> setPassword(e.target.value)} required />
            </label>
            <br />
            <button>Login</button>
        </form>
    )
}
export default Login