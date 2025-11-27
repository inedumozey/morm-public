import { Client } from "pg";
const DATABASE_URL = process.env.NEXT_PUBLIC_DATABASE_URL || "";

export class MormDocs {
  private client: any = null;
  private databaseUrl = "";

  constructor() {
    this.databaseUrl = DATABASE_URL;
  }

  /** Connect to a database */
  private async connect(dbUrl?: string) {
    this.client = new Client({
      connectionString: dbUrl || this.databaseUrl,
      ssl: { rejectUnauthorized: false },
    });
    await this.client.connect();
  }

  /** Disconnect */
  private async disconnect() {
    if (this.client) {
      await this.client.end();
      this.client = null;
      console.log("✅ Disconnected");
    }
  }

  /** Run raw SQL */
  private async query(sql: string, values: any[] = []) {
    if (!this.client) throw new Error("❌ No database connection");
    return await this.client.query(sql, values);
  }

  /** Fetch all docs */
  async getDocs() {
    await this.connect();
    const res = await this.query(`
      SELECT * FROM docs
      WHERE is_deleted = false
      ORDER BY id ASC;
    `);

    await this.disconnect();
    return res.rows;
  }
}
