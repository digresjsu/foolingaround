interface WidgetProps {
    title: string;
    id: string;
    children: React.ReactNode;
    onRemove: (id: string) => void;
}

function Widget({ title, id, children, onRemove }: WidgetProps) {

    return (
        // Container
        <div style={{
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            position: 'relative',
            minHeight: '200px',
            transition: 'box-shadow 0.2s',
        }}

        // Hover
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
        >

        {/* Header */}
        <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '12px',
        borderBottom: '1px solid #eee',
        paddingBottom: '8px'
      }}>

        <h3 style={{ margin: 0, fontSize: '16px', color: '#2c3e50' }}>{title}</h3>
        {/* Remove */}
        <button 
          onClick={() => onRemove(id)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#999',
            padding: '4px',
            borderRadius: '4px'
          }}
          
          // Hover
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          ✕
        </button>
      </div>

       <div>
        {children}
      </div>
    </div>
    );
}

export default Widget;