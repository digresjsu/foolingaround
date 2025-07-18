import { useState } from 'react';
import Header from './components/Header.tsx';
import Layout from './components/Layout.tsx';
import Widget from './components/Widget.tsx';
import Login from './components/Login.tsx';
import { OdooApi } from './services/odooApi.ts';

interface User {
  uid: number;
  username: string;
  name: string;
  company_id: number;
}

function App() {
  const [currentPage, setCurrentPage] = useState('Dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (userInfo: any) => {
    setCurrentUser(userInfo);
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      await OdooApi.logout();
      setIsLoggedIn(false);
      setCurrentUser(null);
      setCurrentPage('Dashboard'); // Reset to Dashboard on logout
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoggedIn(false);
      setCurrentUser(null);
      setCurrentPage('Dashboard'); // Reset to Dashboard on error
    }
  };

  const goToDashboard = () => setCurrentPage('Dashboard');

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage} onLogoClick={goToDashboard}>
      <Header title="Odoo Dashboard" userName={currentUser?.name || currentUser?.username || 'User'} onLogout={handleLogout}/>
      <div style={{ padding: '10px 20px' }}>
        {currentPage === 'Dashboard' && <DashboardPage />}
        {currentPage === 'Customers' && <CustomersPage />}
        {currentPage === 'Products' && <ProductsPage />}
        {currentPage === 'Sales' && <SalesPage />}
      </div>
    </Layout>
  )
}

function DashboardPage() {
  const [widgets, setWidgets] = useState([
    { id: '1', type: 'sales', title: 'Sales Overview' },
    { id: '2', type: 'customers', title: 'Customer Stats' },
    { id: '3', type: 'tasks', title: 'Recent Tasks' }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newWidgetType, setNewWidgetType] = useState('sales');
  const [newWidgetTitle, setNewWidgetTitle] = useState('');

  const widgetTypes = [
    { value: 'sales', label: 'Sales Overview' },
    { value: 'customers', label: 'Customer Stats' },
    { value: 'tasks', label: 'Recent Tasks' },
    { value: 'inventory', label: 'Inventory Status' }
  ];

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter(widget => widget.id !== id));
  };

  const addWidget = () => {
    const newId = Date.now().toString(); // Simple ID generation
    const defaultTitle = widgetTypes.find(type => type.value === newWidgetType)?.label || 'New Widget';
    
    const newWidget = {
      id: newId,
      type: newWidgetType,
      title: newWidgetTitle || defaultTitle
    };

    setWidgets([...widgets, newWidget]);
    
    // Reset form
    setShowAddForm(false);
    setNewWidgetTitle('');
    setNewWidgetType('sales');
  };

    const renderWidgetContent = (type: string) => {
      switch (type) {
        case 'sales': return <SalesWidget />;
        case 'customers': return <CustomersWidget />;
        case 'inventory': return <InventoryWidget />;
        default: return <div>Unknown widget type</div>;
      }
    };

    return (
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{ margin: 0, color: '#2c3e50' }}>Dashboard</h2>

          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              + Add Widget
            </button>
          ) : (
            // Add Widget Form
            <div style={{
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
              padding: '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              border: '1px solid #ddd'
            }}>
              <select
                value={newWidgetType}
                onChange={(e) => setNewWidgetType(e.target.value)}
                style={{
                  padding: '6px 8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc'
                }}
              >
                {widgetTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Custom title (optional)"
                value={newWidgetTitle}
                onChange={(e) => setNewWidgetTitle(e.target.value)}
                style={{
                  padding: '6px 8px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  minWidth: '150px'
                }}
              />

              <button
                onClick={addWidget}
                style={{
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Add
              </button>

              <button
                onClick={() => {
                  setShowAddForm(false);
                  setNewWidgetTitle('');
                }}
                style={{
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {widgets.map(widget => (
            <Widget
              key={widget.id}
              id={widget.id}
              title={widget.title}
              onRemove={removeWidget}
            >
              {renderWidgetContent(widget.type)}
            </Widget>
          ))}
        </div>
      </div>
    );
  };

  function CustomersPage() {
    return <div>Customers Content</div>;
  };

  function ProductsPage() {
    return <div>Products Content</div>;
  };

  function SalesPage() {
    return <div>Sales Content</div>;
  };

  function SalesWidget() {
    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#28a745', margin: '0' }}>$12,450</p>
          <p style={{ margin: '4px 0', color: '#666' }}>Total Sales This Month</p>
        </div>
        <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <p style={{ fontSize: '14px', color: '#28a745', margin: 0 }}>
            ↗️ +15% from last month
          </p>
        </div>
      </div>
    );
  }

  function CustomersWidget() {
    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: '12px' }}>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#007bff', margin: '0' }}>847</p>
          <p style={{ margin: '4px 0', color: '#666' }}>Active Customers</p>
        </div>
        <div style={{ padding: '8px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <p style={{ fontSize: '14px', color: '#007bff', margin: 0 }}>
            ↗️ +23 new this week
          </p>
        </div>
      </div>
    );
  }
  function InventoryWidget() {
  return (
    <div>
      <div style={{ marginBottom: '12px' }}>
        <p style={{ fontWeight: 'bold', color: '#2c3e50', margin: '0 0 8px 0' }}>📦 Inventory Status</p>
      </div>
      <div style={{ fontSize: '14px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #eee' }}>
          <span>In Stock:</span>
          <span style={{ color: '#28a745', fontWeight: 'bold' }}>1,247 items</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #eee' }}>
          <span>Low Stock:</span>
          <span style={{ color: '#ffc107', fontWeight: 'bold' }}>23 items</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
          <span>Out of Stock:</span>
          <span style={{ color: '#dc3545', fontWeight: 'bold' }}>5 items</span>
        </div>
      </div>
    </div>
  );
}

  export default App
