import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
    title: string;
    userName?: string;
    onLogout: () => void;
}

function Header({ title, userName, onLogout}: HeaderProps) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    const handleLogout = () => {
        console.log('Logging out...');
        onLogout(); // Call the prop function
        setShowDropdown(false);
  };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <header style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            border: '1px solid #2775c4ff',
            borderRadius: '10px',
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <h1 style={{ color: 'white' }}>{title}</h1>

                {/* User Dropdown */}
                {userName && (
                    <div style={{ position: 'relative' }} ref={dropdownRef}>
                        <span
                            onClick={() => setShowDropdown(!showDropdown)}
                            style={{
                                cursor: "pointer",
                                padding: '5px 10px',
                                borderRadius: '4px',
                                backgroundColor: showDropdown ? '#e0e0e0' : 'transparent',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#789fc5ff'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                            <span style={{ color: 'white', fontWeight: 'bold' }}>👤{userName}</span> ▼
                        </span>
                        {showDropdown && (
                            <div style={{
                                position: 'absolute',
                                right: 0,
                                top: '100%',
                                backgroundColor: '#789fc5ff',
                                border: '1px solid #ccc',
                                borderRadius: '10px',
                                padding: '8px',
                                minWidth: '120px',
                                boxShadow: '0 2px 8px #0000001a',
                                zIndex: 1000
                            }}>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        border: 'none',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        borderRadius: '4px',
                                        backgroundColor: '#007bff',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;