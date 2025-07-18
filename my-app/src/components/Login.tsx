import { useState } from 'react';
import { OdooApi } from '../services/odooApi';

interface LoginProps {
    onLogin: (userInfo: any) => void;
}

function Login({ onLogin }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        if (!username || !password) {
            setError('Please enter both username and password');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const result = await OdooApi.login(username, password);
            if (result.success) {
                console.log('Login successful:', result);
                onLogin({
                    uid: result.uid,
                    username: result.name,
                    name: result.name,
                    company_id: result.company_id,
                });
            } else {
                console.log('Login failed:', result.error);
                setError(result.error || 'Login failed.');
            }
        } catch (error) {
            console.error('💥 Login error:', error);
            setError('Connection error. Please check your internet connection.');
        }
        setIsLoading(false);
    };

    return (

        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f9fa',
        }}>

            <div style={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                width: '400px',
                maxWidth: '400px',
            }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏢</div>
                    <h1 style={{ margin: 0, color: '#2c3e50' }}>Your Company</h1>
                    <p style={{ color: '#666', margin: '8px 0 0 0' }}>Sign in to your dashboard</p>
                </div>

                {/* Login Form */}
                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2c3e50' }}>
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                        disabled={isLoading}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#2c3e50' }}>
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                        style={{
                            width: '100%',
                            padding: '12px',
                            border: '1px solid #ddd',
                            borderRadius: '4px',
                            fontSize: '16px',
                            boxSizing: 'border-box'
                        }}
                        disabled={isLoading}
                    />
                </div>
                {error && (
                    <div style={{
                        backgroundColor: '#f8d7da',
                        color: '#721c24',
                        padding: '12px',
                        borderRadius: '4px',
                        marginBottom: '20px',
                        border: '1px solid #f5c6cb'
                    }}>
                        {error}
                    </div>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={isLoading || !username || !password}
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: isLoading || !username || !password ? '#6c757d' : '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: isLoading || !username || !password ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
            </div>
        </div>
    )

}

export default Login;