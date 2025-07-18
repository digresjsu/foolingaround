class OdooAPI {

    private baseUrl: string;
    private database: string;
    private uid: number | null = null;
    private sessionID: string | null = null;

    constructor(baseURL: string, database: string) {
        this.baseUrl = baseURL;
        this.database = database;
    }

    /* Protože private */
    getBaseUrl(): string {
        return this.baseUrl;
    }

    getDatabase(): string {
        return this.database;
    }


    private async jsonrpc(url: string, method: string, params: any) {
        const payload = {
            jsonrpc: '2.0',
            method: 'call',
            params: params,
            id: Math.floor(Math.random() * 1000000)
        };
    
    try {
        console.log(`🔍 Making request to: ${this.baseUrl}${url}`);
        console.log('📤 Request payload:', JSON.stringify(payload, null, 2));
        const response = await fetch(`${this.baseUrl}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload),
            credentials: 'include'
        });
        console.log(`📥 Response status: ${response.status} ${response.statusText}`);
        console.log('📥 Response headers:', Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('📥 Response data:', JSON.stringify(data, null, 2));

        if(data.error) {
            throw new Error(`Odoo API error: ${data.error.message}`);
        }
        return data.result;

    } catch (error) {
        console.error('💥 Complete error details:', error);
        throw error;
    }

    };

    async login(username: string, password: string) {
        try {
        const result = await this.jsonrpc('/web/session/authenticate', 'call', {
            db: this.database,
            login: username,
            password: password
        }); 
        if (result.uid) {
            this.uid = result.uid;
            this.sessionID = result.session_id;
            return {
                success: true,
                uid: result.uid,
                session_id: result.sessionID,
                company_id: result.company_id,
                name: result.name,

            }
        } else {
            return {
                success: false,
                error: 'Invalid username or password'
            };
        }
        } catch (error) {
            return {
                success: false,
                error: typeof error === 'object' && error !== null && 'message' in error ? (error as { message: string }).message : String(error)
            };
        }  
    }

    async getUserInfo() {
        if (!this.uid) {
            throw new Error('User is not logged in');
        }

        return await this.jsonrpc('/web/session/get_session_info', 'call', {
            model: 'res.users',
            method: 'read',
            args: [[this.uid], ['name', 'login', 'company_id']],
            kwargs: {}
        });
    }

    async logout() {
    try {
      await this.jsonrpc('/web/session/destroy', 'call', {});
      this.uid = null;
      this.sessionID = null;
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}

export const testOdooAPI = async () => {
    try {
    // Test 1: Try to login
    console.log('1. Testing login...');
    const odoo = new OdooAPI('/odoo', 'digres-cz-pokusy1-main-21601808');
    const loginResult = await odoo.login('kkr@digres.cz', 'FFmiFa0n');
    console.log('Login result:', loginResult);
    
    if (loginResult.success) {
      console.log('✅ Login successful!');
      
      // Test 2: Try to get user info
      console.log('2. Testing user info...');
      const userInfo = await odoo.getUserInfo();
      console.log('User info:', userInfo);
    } else {
      console.log('❌ Login failed:', loginResult.error);
    }
    } catch (error) {
    console.log('❌ Connection error:', error);
  }
};

export { OdooAPI };

export const OdooApi = new OdooAPI('/odoo', 'digres-cz-pokusy1-main-21601808');

export default OdooApi;