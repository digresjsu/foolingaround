interface LayoutProps {
    children: React.ReactNode;
    currentPage: string;
    onNavigate: (page: string) => void;
    onLogoClick: () => void;
}

function Layout({ children, currentPage, onNavigate, onLogoClick }: LayoutProps) {
    const navItems = [
        { id: 'Dashboard', name: 'Dashboard', icon: '📊' },
        { id: 'Customers', name: 'Customers', icon: '👥' },
        { id: 'Products', name: 'Products', icon: '📦' },
        { id: 'Sales', name: 'Sales', icon: '💰' },
        { id: 'Inventory', name: 'Inventory', icon: '📦' },
    ];
    
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{
                width: '150px',
                backgroundColor: '#e7edf3ff',
                color: '#2775c4ff',
                padding: '20px'
            }}>
                <div onClick={onLogoClick}
                    style={{
                        cursor: 'pointer',
                        border: '1px solid #2775c4ff',
                        borderRadius: '10px',
                        textAlign: 'center',
                        transition: 'background-color 0.2s',
                        backgroundColor: '#007bff',
                        padding: '20px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#789fc5ff'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
                >
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏢</div>
                    <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>Your Company</div>
                    <div style={{ fontSize: '12px', opacity: 0.8, color: 'white' }}>Dashboard</div>
                </div>
                <nav>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {navItems.map(item => (
                            <li key={item.id} 
                            style={{ margin: '10px 0', fontSize: '18px', border: '1px solid transparent', borderRadius: '6px' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c0c8d0ff'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                <a
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onNavigate(item.id);
                                    }}
                                    style={{
                                        color: currentPage === item.id ? '#3498db' : 'white',
                                        textDecoration: 'none',
                                        fontWeight: currentPage === item.id ? 'bold' : 'normal'
                                    }}
                                >
                                    <span style={{ marginRight: '8px' }}>{item.icon}</span>
                                    <span style={{ color: '#3498db' }}>{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>
            {/* Main Content */}
            <main style={{ flex: 1, backgroundColor: '#e7edf3ff' }}>
                {children}
            </main>
        </div>
    );
}

export default Layout;